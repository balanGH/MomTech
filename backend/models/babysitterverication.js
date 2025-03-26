const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const app = express();

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/momtech/babysitter', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// MongoDB Schema
const DocumentSchema = new mongoose.Schema({
  babysitterName: String,
  fileName: String,
  filePath: String,
  fileType: String,
  fileSize: Number,
  uploadDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending', 'Verified', 'Rejected'], default: 'Pending' }, // Verification status
});
const Document = mongoose.model('Document', DocumentSchema);

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter for validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Invalid file type. Only PDF, JPG, and PNG are allowed.'), false);
  }
  cb(null, true);
};

// Upload middleware with file size limit (5MB)
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// API route to handle file uploads
app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Check if babysitter has already uploaded the same document
  const existingDocument = await Document.findOne({ babysitterName: req.body.babysitterName, fileName: req.file.filename });
  if (existingDocument) {
    // Delete newly uploaded duplicate file
    fs.unlinkSync(req.file.path);
    return res.status(400).json({ message: 'Duplicate file detected. This document has already been uploaded.' });
  }

  // Save file metadata to MongoDB
  const newDocument = new Document({
    babysitterName: req.body.babysitterName || 'Unknown Babysitter',
    fileName: req.file.filename,
    filePath: req.file.path,
    fileType: req.file.mimetype,
    fileSize: req.file.size,
  });

  try {
    await newDocument.save();
    res.status(200).json({ message: 'File uploaded and saved successfully. Awaiting verification.', document: newDocument });
  } catch (error) {
    console.error('Error saving to MongoDB:', error);
    res.status(500).json({ message: 'Server error while saving file metadata' });
  }
});

// API route to verify a document
app.put('/verify/:id', async (req, res) => {
  try {
    const document = await Document.findByIdAndUpdate(req.params.id, { status: 'Verified' }, { new: true });
    if (!document) return res.status(404).json({ message: 'Document not found' });

    res.json({ message: 'Document verified successfully', document });
  } catch (error) {
    console.error('Error verifying document:', error);
    res.status(500).json({ message: 'Server error while verifying document' });
  }
});

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
