require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const Babysitter = require('./models/Babysitter');

const app = express();
const PORT = process.env.PORT || 5000;

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Enable CORS
app.use(cors());

// Multer Storage Configuration (Save Files Temporarily)
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

// Upload Route (Handles Multiple Documents)
app.post('/upload', upload.fields([
  { name: 'babysitting', maxCount: 1 },
  { name: 'firstAid', maxCount: 1 },
  { name: 'anaphylaxis', maxCount: 1 },
  { name: 'otherDocuments', maxCount: 1 } // Optional document
]), async (req, res) => {
  try {
    console.log('📂 Files Received:', req.files);

    // Ensure Email Exists in Request
    const userEmail = req.body.email;
    console.log("📧 User Email:", userEmail);
    if (!userEmail) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Required Documents and Expected Keywords
    const requiredDocs = {
      babysitting: 'babysitting certificate',
      firstAid: 'first aid certificate',
      anaphylaxis: 'anaphylaxis certificate'
    };

    // Validate Required Documents
    for (let docType in requiredDocs) {
      if (!req.files[docType]) {
        return res.status(400).json({ error: `${docType} document is required` });
      }

      const filePath = path.join(__dirname, 'uploads', req.files[docType][0].filename);
      const extractedText = await extractTextFromPDF(filePath);
      console.log(`📄 Extracted Text from ${docType}:`, extractedText);

      // Check if expected keyword is in document
      if (!extractedText.toLowerCase().includes(requiredDocs[docType])) {
        return res.status(400).json({ error: `Invalid ${docType} document` });
      }

      // Cleanup Uploaded File
      fs.unlinkSync(filePath);
    }

    // ✅ Optional `otherDocuments` Validation (If Uploaded)
    if (req.files.otherDocuments) {
      const filePath = path.join(__dirname, 'uploads', req.files.otherDocuments[0].filename);
      const extractedText = await extractTextFromPDF(filePath);
      console.log(`📄 Extracted Text from otherDocuments:`, extractedText);
      fs.unlinkSync(filePath); // Clean up after processing
    }

    // ✅ If all required documents are valid, update MongoDB
    const updatedBabysitter = await Babysitter.findOneAndUpdate(
      { email: userEmail },
      { verification: true },
      { new: true }
    );

    if (!updatedBabysitter) {
      return res.status(404).json({ error: 'Babysitter not found' });
    }

    res.json({ message: '✅ Verification successful!', babysitter: updatedBabysitter });

  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Function to Extract Text from PDF
const extractTextFromPDF = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text; // Extracted text from PDF
  } catch (error) {
    console.error('⚠️ PDF Parsing Error:', error);
    return '';
  }
};

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
