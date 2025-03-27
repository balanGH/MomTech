const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { createWorker } = require('tesseract.js');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/momtech', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const babysitterSchema = new mongoose.Schema({
  name: String,
  documents: {
    babysitting: String,
    firstAid: String,
    anaphylaxis: String,
    otherDocuments: String,
  },
  verified: { type: Boolean, default: false },
});

const Babysitter = mongoose.model('Babysitter', babysitterSchema);

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.fields([
  { name: 'babysitting' },
  { name: 'firstAid' },
  { name: 'anaphylaxis' },
  { name: 'otherDocuments' },
]), async (req, res) => {
  try {
    const { name } = req.body;
    const files = req.files;
    
    if (!files || !name) {
      return res.status(400).json({ error: 'Missing files or name' });
    }

    let verified = await verifyDocuments(files, name);
    
    const babysitter = new Babysitter({
      name,
      documents: {
        babysitting: files.babysitting ? files.babysitting[0].path : '',
        firstAid: files.firstAid ? files.firstAid[0].path : '',
        anaphylaxis: files.anaphylaxis ? files.anaphylaxis[0].path : '',
        otherDocuments: files.otherDocuments ? files.otherDocuments[0].path : '',
      },
      verified,
    });

    await babysitter.save();
    res.json({ message: 'Documents uploaded successfully', verified });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

async function verifyDocuments(files, expectedName) {
  const worker = createWorker();
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');

  for (const key in files) {
    if (files[key]) {
      const filePath = files[key][0].path;
      const { data: { text } } = await worker.recognize(filePath);
      if (!text.includes(expectedName)) {
        await worker.terminate();
        return false;
      }
    }
  }
  await worker.terminate();
  return true;
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
