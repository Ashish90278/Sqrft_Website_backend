require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// Routes
const formRoutes = require('./routes/formRoutes');
const authRoutes = require("./routes/auth");
const applicationRoute = require('./routes/applicationRoute');
const testimonialUserRoutes  = require('./routes/testimonialRoutes');
const mediaRoutes = require('./routes/mediaRoute');
const teamMemberRoutes = require('./routes/teamRoute');
const contactRoutes = require('./routes/contactRoutes');
const blogRoutes = require('./routes/blogRoute');

const app = express();
const PORT = process.env.PORT || 5247;

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('✅ MongoDB Connected Successfully!'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads folder
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// API Routes
app.use('/api/auth', authRoutes);
app.use('/api', applicationRoute);
app.use('/api/contacts', contactRoutes);
app.use('/api/form', formRoutes);
app.use('/api/testimonialUsers', testimonialUserRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/teamMembers', teamMemberRoutes);
app.use('/api/blogs', blogRoutes);

// Health check route
app.get('/', (req, res) => {
  res.status(200).send('🚀 Server is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
