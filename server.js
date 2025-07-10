// Load environment variables (optional)
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT =  3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
const mongoURI ='mongodb+srv://hemanthanamala220:ofWhBKLhSVHX4LKG@cluster0.uuhtdpx.mongodb.net/contactFormDB?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Schema and model
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// Routes
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({ message: '✅ Message received successfully.' });
  } catch (error) {
    console.error('❌ Error saving contact:', error);
    res.status(500).json({ error: 'Failed to save message.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
