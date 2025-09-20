const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());  
app.use(express.json());  


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todoapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const Todo = require('./models/todo');






// Replace the existing GET /api/todos endpoint with this:
app.get('/api/todos', async (req, res) => {
  try {
    const { search, completed, priority } = req.query;
    let filter = {};
    
    // Search filter - case insensitive text search
    if (search) {
      filter.text = { $regex: search, $options: 'i' };
    }
    
    // Completed filter
    if (completed !== undefined && completed !== '') {
      filter.completed = completed === 'true';
    }
    
    // Priority filter
    if (priority) {
      filter.priority = priority;
    }
    
    const todos = await Todo.find(filter).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.post('/api/todos', async (req, res) => {
  try {
    const todo = new Todo({
      text: req.body.text
    });
    const newTodo = await todo.save();
    res.status(201).json(newTodo); 
  } catch (error) {
    res.status(400).json({ message: error.message }); 
  }
});


app.put('/api/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true } 
    );
    res.json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/todos/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((error, req, res, next) => {
  console.error('Error:', error);
  
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation Error',
      errors: Object.values(error.errors).map(e => e.message)
    });
  }
  
  if (error.name === 'CastError') {
    return res.status(400).json({ 
      message: 'Invalid ID format' 
    });
  }
  
  res.status(500).json({ 
    message: 'Something went wrong on the server' 
  });
});
app.patch('/api/todos/add-priority', async (req, res) => {
  try {
    // Update the PHP todo to have high priority
    await Todo.findByIdAndUpdate("68cec815ae17d71ebbd60065", {
      priority: "high"
    });

    // Update the Java todo to have medium priority  
    await Todo.findByIdAndUpdate("68cebfe99f4dfe85f8860429", {
      priority: "medium"
    });

    res.json({ message: 'Priorities added successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});