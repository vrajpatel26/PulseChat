# PulseChat - Real Time Chat Application

PulseChat is a modern real-time chat application built using the MERN Stack and Socket.IO. It enables users to communicate instantly through a responsive and user-friendly interface with secure authentication, online status tracking, typing indicators, image sharing, and real-time message delivery.

## 🚀 Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Secure Cookie-Based Authentication

### Real-Time Communication

* Instant Messaging using Socket.IO
* Real-Time Message Delivery
* Online/Offline User Status
* Typing Indicator
* Last Seen Status
* Live User Presence Updates

### User Management

* View Other Users
* Search Users
* Edit Profile
* Profile Image Upload

### Media Sharing

* Image Sharing in Chats
* Cloudinary Image Storage

### UI & Experience

* Responsive Design
* Modern Chat Interface
* Real-Time Updates Without Refreshing

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Redux Toolkit
* React Router DOM
* Axios
* Socket.IO Client
* React Icons
* Emoji Picker

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.IO
* JWT
* bcryptjs
* Cookie Parser
* Multer
* Cloudinary

---

## 📂 Project Structure

```text
PulseChat/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   ├── cloudinary.js
│   │   └── token.js
│   │
│   ├── controllers/
│   │   ├── auth.controllers.js
│   │   ├── message.controllers.js
│   │   └── user.controllers.js
│   │
│   ├── models/
│   │   ├── user.model.js
│   │   ├── message.model.js
│   │   └── conversation.model.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   └── message.route.js
│   │
│   ├── middlewares/
│   │   ├── isAuth.js
│   │   └── multer.js
│   │
│   └── socket/
│       └── socket.js
```

---

## 🔑 API Routes

### Authentication

```http
POST /api/auth/signup
POST /api/auth/login
GET  /api/auth/logout
```

### Users

```http
GET  /api/user/current
GET  /api/user/others
GET  /api/user/search
PUT  /api/user/profile
```

### Messages

```http
POST /api/message/send/:receiver
GET  /api/message/get/:receiver
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone <repository-url>
cd PulseChat
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

---

## 📸 Screenshots

Add screenshots inside a `screenshots` folder and update the paths below.

### Login Page

<img width="500" height="500" alt="image" src="https://github.com/user-attachments/assets/62974589-bd05-4491-ae17-0f236865ead3" />


### Chat Interface

<img width="1300" height="700" alt="image" src="https://github.com/user-attachments/assets/2c9ae57a-af0e-4734-937f-eee89e36752d" />


### Profile Page

<img width="650" height="500" alt="image" src="https://github.com/user-attachments/assets/d7a9c38f-57a0-41aa-ac50-ac2c53b2555f" />


---

## 🔮 Future Improvements

* ✅ Message Read Receipts (Seen Status)
* Group Chats
* Message Reactions
* File Sharing
* Voice Calling
* Video Calling
* Push Notifications
* Message Deletion
* Chat Themes

---

## 👨‍💻 Author

**Vraj Patel**

* BE Computer Engineering
* MERN Stack Developer
* Passionate about Full Stack Development

LinkedIn: https://www.linkedin.com/in/vraj-patel-3b94542a4/

---

## ⭐ Support

If you found this project helpful, consider giving it a star on GitHub.
