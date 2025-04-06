require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const momRoutes = require('./routes/momRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const babysitterRoutes = require('./routes/babysitterRoutes');
const adminRoutes = require('./routes/admin');


const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes); // New auth routes
app.use('/mom',momRoutes);
app.use('/upload', uploadRoutes);
app.use('/babysitters', babysitterRoutes);
app.use('/admin', adminRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});