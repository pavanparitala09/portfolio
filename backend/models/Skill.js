const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  category: { type: String, required: true },
  iconName: { type: String }, // e.g., 'FiLayout', 'FiServer'
  items: [
    {
      name: { type: String, required: true },
      level: { type: Number, required: true }
    }
  ]
});

module.exports = mongoose.model('Skill', SkillSchema);
