require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const formRoutes = require('./routes/formRoutes');
const authRoutes = require("./routes/auth");
const applicationRoute = require('./routes/applicationRoute');

const testimonialUserRoutes  = require('./routes/testimonialRoutes');
const mediaRoutes = require('./routes/mediaRoute');

const teamMemberRoutes = require('./routes/teamRoute')

const contactRoutes = require('./routes/contactRoutes');
const blogRoutes = require('./routes/blogRoute');

const app = express();
const PORT = process.env.PORT || 5247;

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI;
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB Connected Successfully!'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Routes
app.use('/api/auth', authRoutes);

//Appliaction Route
app.use("/api", applicationRoute);

//Contact Route
app.use('/api/contacts', contactRoutes);

// Static folder for file uploads
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/form', formRoutes);

app.use("/api/testimonialUsers", testimonialUserRoutes);

app.use("/api/media", mediaRoutes);

app.use("/api/teamMembers", teamMemberRoutes )

app.use('/api/blogs', blogRoutes);

// Default Route
app.get('/', (req, res) => {
  res.status(200).send('Server is working!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});