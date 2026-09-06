const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const User = require('./models/User');

const username = process.argv[2];
const password = process.argv[3];

if (!username || !password) {
  console.log('\n❌ Missing arguments.');
  console.log('Usage: node reset-admin.js <username> <new_password>');
  console.log('Example: node reset-admin.js admin MySecurePassword123!\n');
  process.exit(1);
}

const resetAdmin = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error('❌ MONGO_URI is missing in backend/.env');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB...');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let user = await User.findOne();
    if (user) {
      user.username = username;
      user.password = hashedPassword;
      await user.save();
      console.log(`\n🎉 Admin user successfully updated!`);
    } else {
      user = new User({ username, password: hashedPassword });
      await user.save();
      console.log(`\n🎉 New admin user created!`);
    }

    console.log(`Username: ${username}`);
    console.log(`Password: (updated successfully)\n`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error resetting admin credentials:', err.message);
    process.exit(1);
  }
};

resetAdmin();
