const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: String }],
  category: { type: String, enum: ['web', 'mobile'], default: 'web' },
  image: { type: String },
  github: { type: String },
  live: { type: String },
  featured: { type: Boolean, default: false }
});

module.exports = mongoose.model('Project', ProjectSchema);
