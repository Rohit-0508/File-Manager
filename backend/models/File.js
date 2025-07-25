const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder',
    required: false,
    default: null
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('File', fileSchema);
