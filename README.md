# MomTech
---

*Smart Babysitting and Baby Care Support System for New Moms*

A comprehensive React Native + Node.js + MongoDB-based mobile application designed to assist new mothers with essential tools for baby care. This system integrates babysitter booking, child health tracking, AI chatbot support, personalized event reminders, and more — all in one user-friendly platform.

---

## 📱 Features

### ✅ For Moms:
- **Babysitter Search & Booking**
  - View and filter babysitters by availability, fare, experience, specialties, and rating.
  - Request appointments with a single tap.

- **Child Health Overview**
  - Track and store essential health metrics like height, weight, and temperature.
  - Add new health entries chronologically.

- **Upcoming Events**
  - View scheduled vaccination dates, doctor appointments, and awareness programs.
  - Events are added and managed by the admin dashboard.

- **AI Chatbot**
  - 24/7 intelligent assistant that answers common baby care queries.
  - Powered by NLP for contextual responses.

- **Profile Management**
  - View and edit mom and child profiles.
  - Store allergies, health conditions, and personal info securely.

### For Babysitters
- ** Certificate Verification (PDF Text Extraction)**  
  Upload training certificates (CPR, First Aid, Babysitting, etc.) which are automatically verified for eligibility.

- ** Availability & Specialty Setting**  
  Set working hours, supported locations, and services (e.g., newborn care, special needs).

- ** Earnings and Rating Dashboard**  
  Track total hours, earnings, feedback from moms, and manage your own profile.

- ** Emergency Protocol System**  
  Quick-call system for emergency contacts and moms, including first aid guidelines and panic button.

---

## 🛠 Tech Stack

### Frontend
- **React Native** (Expo)
- **React Navigation**
- **Axios**
- **TailwindCSS / Custom Styling**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB with Mongoose**
- **JWT Authentication**
- **Multer** for profile and certificate uploads

---

## 📂 Folder Structure

```

📦MomTech/
├── 📁backend/
│   ├── models/
│   ├── routes/
│   └── controllers/
├── 📁frontend/
│   ├── screens/
│   ├── components/
│   └── api/
└── README.md

````

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js & npm
- MongoDB (local or cloud)
- Expo CLI

---

### ⚙️ Backend Setup

```bash
cd backend
npm install
npm start
````

> Update your `.env` with the MongoDB URI and secret key:

```env
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_secret
```

---

### 📲 Frontend Setup

```bash
cd frontend
npm install
npx expo start
```

> Update `base_api.js` to point to your backend:

```js
const apiClient = axios.create({
  baseURL: 'http://your-local-ip:5000/mom',
});
```

---

## 👩‍💼 Admin Functionalities

* Login as admin to add baby care events.
* Events appear automatically in the user timeline.
* Admin can also verify babysitter document submissions.

---

## 🔒 Authentication

* JWT-based login and session management.
* Babysitters and moms have separate schemas and roles.

---

## 🌟 Demo Highlights

* 📆 Admin adds new events to notify moms.
* 👩‍🍼 Moms explore and request babysitters.
* 🧒 Moms log baby health updates over time.
* 🤖 Chatbot offers baby care advice 24/7.
* 🙍 Profile screen summarizes baby details and health data.

---

## 📜 License

This project is for educational purposes. Feel free to extend it and adapt it to your own needs.

---

## 🙌 Acknowledgments

* Developed by: [balnGH](https://github.com/balnGH), [lashmie](https://github.com/lashmie), [vivamuss](https://github.com/vivamuss)
* Guided by faculty at College of Engineering, Guindy
* Thanks to all testers and contributors
