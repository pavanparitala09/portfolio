const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Bio = require('../models/Bio');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Contact = require('../models/Contact'); // Assuming this exists
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cloudinary = require('../config/cloudinary');

const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }
});

// @route   POST api/admin/upload
// @desc    Upload image to Cloudinary
// @access  Private
router.post('/upload', auth, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'portfolio',
        resource_type: 'auto'
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ msg: 'Cloudinary upload failed', error: error.message });
        }
        res.json({ imageUrl: result.secure_url, publicId: result.public_id });
      }
    );

    uploadStream.end(req.file.buffer);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/admin/messages
// @desc    Get all messages
// @access  Private
router.get('/messages', auth, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/admin/bio
// @desc    Update or Create bio
// @access  Private
router.put('/bio', auth, async (req, res) => {
  try {
    const bioFields = req.body;
    let bio = await Bio.findOne();
    if (bio) {
      bio = await Bio.findOneAndUpdate(
        {},
        { $set: bioFields },
        { new: true }
      );
      return res.json(bio);
    }
    // Create
    bio = new Bio(bioFields);
    await bio.save();
    res.json(bio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/admin/projects
// @desc    Add a new project
// @access  Private
router.post('/projects', auth, async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const project = await newProject.save();
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/admin/projects/:id
// @desc    Update a project
// @access  Private
router.put('/projects/:id', auth, async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/admin/projects/:id
// @desc    Delete a project
// @access  Private
router.delete('/projects/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    await project.deleteOne();
    res.json({ msg: 'Project removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/admin/skills
// @desc    Add a new skill category
// @access  Private
router.post('/skills', auth, async (req, res) => {
  try {
    const newSkill = new Skill(req.body);
    const skill = await newSkill.save();
    res.json(skill);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/admin/skills/:id
// @desc    Update a skill category
// @access  Private
router.put('/skills/:id', auth, async (req, res) => {
  try {
    let skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ msg: 'Skill not found' });

    skill = await Skill.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(skill);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/admin/skills/:id
// @desc    Delete a skill category
// @access  Private
router.delete('/skills/:id', auth, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ msg: 'Skill not found' });

    await skill.deleteOne();
    res.json({ msg: 'Skill removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
