const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const cloudinary = require('./config/cloudinary');

const Bio = require('./models/Bio');
const Project = require('./models/Project');

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB Atlas');

    // 1. Upload Profile Photo if present
    const profilePath = path.join(__dirname, '../frontend/src/assets/profile.jpg');
    if (fs.existsSync(profilePath)) {
      console.log('Uploading profile photo to Cloudinary...');
      const profileUpload = await cloudinary.uploader.upload(profilePath, {
        folder: 'portfolio/profile',
        public_id: 'profile_avatar',
        overwrite: true
      });
      console.log('✅ Profile photo uploaded:', profileUpload.secure_url);

      const bio = await Bio.findOne();
      if (bio) {
        bio.avatar = profileUpload.secure_url;
        await bio.save();
        console.log('✅ Bio avatar updated in MongoDB Atlas');
      }
    }

    // 2. Upload and update Projects
    const projects = await Project.find();
    console.log(`Found ${projects.length} projects in database.`);

    for (const project of projects) {
      console.log(`Processing project: "${project.title}" (current image: ${project.image})`);

      let localFilePath = null;

      if (project.image) {
        // Already on Cloudinary?
        if (project.image.includes('res.cloudinary.com')) {
          console.log(`  -> Already on Cloudinary. Skipping.`);
          continue;
        }

        // Check if from uploads/
        if (project.image.includes('/uploads/')) {
          const filename = project.image.split('/uploads/').pop();
          const candidate = path.join(__dirname, 'uploads', filename);
          if (fs.existsSync(candidate)) {
            localFilePath = candidate;
          }
        }
        // Check if public/image.png or similar relative path
        else if (project.image.includes('image.png') || project.image.startsWith('./')) {
          const filename = project.image.replace(/^\.\//, '');
          const candidate = path.join(__dirname, '../frontend/public', filename);
          if (fs.existsSync(candidate)) {
            localFilePath = candidate;
          }
        }
      }

      if (localFilePath) {
        console.log(`  -> Uploading local file: ${localFilePath}`);
        const uploadResult = await cloudinary.uploader.upload(localFilePath, {
          folder: 'portfolio/projects'
        });
        project.image = uploadResult.secure_url;
        await project.save();
        console.log(`  ✅ Project updated with Cloudinary URL: ${uploadResult.secure_url}`);
      } else {
        console.log(`  -> No matching local file found for image: ${project.image}`);
      }
    }

    console.log('\n🎉 Migration complete!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  }
};

migrate();
