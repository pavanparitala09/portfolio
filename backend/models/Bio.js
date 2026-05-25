const mongoose = require('mongoose');

const BioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roles: [{ type: String }],
  description: { type: String },
  aboutHeadline: { type: String },
  aboutPara1: { type: String },
  aboutPara2: { type: String },
  aboutPara3: { type: String },
  email: { type: String },
  github: { type: String },
  linkedin: { type: String }
});

module.exports = mongoose.model('Bio', BioSchema);
