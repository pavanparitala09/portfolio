const express = require('express');
const router = express.Router();
const Bio = require('../models/Bio');
const Project = require('../models/Project');
const Skill = require('../models/Skill');

// @route   GET api/public/bio
// @desc    Get bio data
// @access  Public
router.get('/bio', async (req, res) => {
  try {
    const bio = await Bio.findOne();
    res.json(bio || {});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/public/projects
// @desc    Get all projects
// @access  Public
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/public/skills
// @desc    Get all skills
// @access  Public
router.get('/skills', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
