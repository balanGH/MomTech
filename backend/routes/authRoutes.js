const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Mom = require('../models/Mom');
const Babysitter = require('../models/Babysitter');
const { sendVerificationEmail } = require('../utils/authUtils');

// Register Mom
router.post('/register/mom', async (req, res) => {
  try {
    const { email, password, name, phone } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET);
    
    const mom = new Mom({
      email,
      password: hashedPassword,
      name,
      phone,
      verificationToken
    });

    await mom.save();
    await sendVerificationEmail(email, verificationToken);
    
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password, userType } = req.body;
    const Model = userType === 'mom' ? Mom : Babysitter;
    const user = await Model.findOne({ email });

    if (!user) throw new Error('User not found');
    if (!(await bcrypt.compare(password, user.password))) throw new Error('Invalid credentials');
    if (!user.verification && userType === 'mom') throw new Error('Email not verified');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, userType });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = router;