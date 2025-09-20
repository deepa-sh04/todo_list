const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Todo text is required'],
    minlength: [1, 'Todo text cannot be empty'],
    maxlength: [200, 'Todo text cannot exceed 200 characters'],
    trim: true 
  },
  completed: {
    type: Boolean,
    default: false
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Todo', todoSchema);