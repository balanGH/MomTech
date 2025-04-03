const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  healthoverview:[
	weight:{type:Number},
        height:{type:Number},
        temperature:{type:Number ,min: 28,max:50}}
    ],
    medicalinfo:{
        health
    }
  },
  email: { type: String, unique: true },
  password: String,
  role: String,
  phone: String,
  address: {
    street: String,
    city: String,
    dist: String,
    state: String,
    country: String
  },
  profile_picture: String,
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('user', userSchema);