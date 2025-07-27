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

Here’s your improved **README.md** file content formatted for direct use in your project. You can copy-paste this into a `README.md` file at the root of your `MomTech` project.

---

```markdown
# MomTech

**Smart Babysitting and Baby Care Support System for New Moms**

---

## 👩‍🍼 Overview

**MomTech** is a comprehensive **React Native + Node.js + MongoDB-based** mobile app designed to support new mothers with essential baby care tools. It features babysitter booking, child health tracking, AI-powered chatbot, event reminders, and more — all in one user-friendly platform.

---

## 📱 Features

### ✅ For Moms

- **🧑‍🍼 Babysitter Search & Booking**
  - Filter by availability, fare, experience, specialties, and rating.
  - One-tap appointment requests.

- **📊 Child Health Overview**
  - Log health metrics: height, weight, temperature.
  - View chronological entries.

- **📆 Upcoming Events**
  - Auto-synced vaccination dates, doctor appointments, and awareness programs.
  - Managed via admin dashboard.

- **🤖 AI Chatbot**
  - 24/7 support for baby care queries.
  - Uses NLP for contextual responses.

- **👩‍👧 Profile Management**
  - Edit mom and child profiles.
  - Store allergies, medical conditions, and other details securely.

---

## 🛠 Tech Stack

### 📲 Frontend

- React Native (Expo)
- React Navigation
- Axios
- TailwindCSS / Custom Styling

### 🌐 Backend

- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer for uploads

---

## 📂 Folder Structure

```

MomTech/
├── backend/
│   ├── models/
│   ├── routes/
│   └── controllers/
├── frontend/
│   ├── screens/
│   ├── components/
│   └── api/
└── README.md

````

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js & npm
- MongoDB (local or cloud - MongoDB Atlas)
- Expo CLI (for React Native)

---

### ⚙️ Backend Setup

```bash
cd backend
npm install
npm start
````

Create a `.env` file in the `backend` folder:

```env
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_secret_key
```

---

### 📲 Frontend Setup

```bash
cd frontend
npm install
npx expo start
```

Update the API base URL in `frontend/api/base_api.js`:

```js
const apiClient = axios.create({
  baseURL: 'http://<your-local-ip>:5000/mom',
});
```

> Replace `<your-local-ip>` with your actual IP address (e.g., `192.168.1.10`)

---

## 👩‍💼 Admin Functionalities

* Secure admin login
* Add/edit baby care events (vaccinations, appointments, awareness programs)
* Manage babysitter document verification

---

## 🔐 Authentication

* JWT-based login and session handling
* Role-based schema:

  * Moms
  * Babysitters
  * Admin

---

## 🌟 Demo Highlights

* 📆 Admin creates events shown in moms’ timeline
* 🧒 Moms log baby health updates
* 👩‍🍼 Moms browse and book babysitters
* 🤖 Chatbot offers 24/7 assistance
* 🙍 Profile screen displays personal & health data

---

## 🧭 Future Enhancements (Optional Ideas)

* In-app chat between moms and babysitters
* Push notifications for upcoming events
* Payment gateway integration
* Multi-language support for chatbot

---

## 📜 License

This project is built for educational and demonstration purposes.
Feel free to fork, adapt, and build upon it.

---

## 🙌 Acknowledgments

* Developed by: [balnGH](https://github.com/balnGH), [lashmie](https://github.com/lashmie), [vivamuss](https://github.com/vivamuss)
* Guided by faculty at College of Engineering, Guindy
* Thanks to all testers and contributors

```

---

Let me know if you'd like:
- Markdown badges (e.g., React Native, Node.js)
- Screenshots / demo GIF support
- A `CONTRIBUTING.md` file  
- Deployment guide (e.g., using Heroku, MongoDB Atlas, Vercel)

I'm happy to add any of that!
```
