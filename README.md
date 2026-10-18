<div align="center">

# 💬 Chatly — Real-Time Chat Application

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio&logoColor=white)](https://socket.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)](https://render.com/)

<p align="center">
  A full-stack, responsive real-time chat application featuring instant bidirectional messaging, live online presence, media sharing with Cloudinary & local fallback, user search, profile customization, and secure cookie-based JWT authentication.
</p>

[🚀 Live Demo](https://chat-application-woad-five.vercel.app/) • [⚡ Backend API](https://chatapplication-vnry.onrender.com) • [Report Bug](https://github.com/sachinkumar22018472/chatApplication/issues) • [Request Feature](https://github.com/sachinkumar22018472/chatApplication/issues)

</div>

---

## 🌐 Live Deployments

| Component | Platform | Live URL |
| :--- | :--- | :--- |
| **Frontend** | **Vercel** | [https://chat-application-woad-five.vercel.app](https://chat-application-woad-five.vercel.app) |
| **Backend API** | **Render** | [https://chatapplication-vnry.onrender.com](https://chatapplication-vnry.onrender.com) |

---

## ✨ Features

- **⚡ Real-Time Messaging**: Instant 1-on-1 chatting powered by Socket.IO with zero page reloads.
- **🟢 Live Online/Offline Status**: Real-time user presence detection broadcasted dynamically to connected clients.
- **🖼️ Image & Media Sharing**: Send images directly in chat with live image preview and cancellation option.
- **🛡️ Resilient Storage Fallback**: Automatic Cloudinary cloud image upload with smart fallback to self-hosted static storage when cloud credentials are restricted or offline.
- **👤 Profile Management**: Upload custom profile avatars and update display names seamlessly.
- **🔍 Instant User Search**: Real-time debounce search to discover other users by name or username.
- **😀 Emoji Picker**: Built-in interactive emoji keyboard integrated directly into the message input bar.
- **🔐 Secure Authentication**: 
  - Password hashing with `bcryptjs`.
  - JWT tokens stored in HTTP-only, secure, `SameSite=None` cookies for production cross-domain security.
- **📱 Responsive UI/UX**: Clean, aesthetic Tailwind CSS interface tailored for desktops, tablets, and mobile devices.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js with Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
- **Real-Time Client**: `socket.io-client`
- **HTTP Client**: `axios`
- **Routing**: `react-router-dom`
- **Icons & Extras**: `react-icons`, `emoji-picker-react`

### Backend
- **Runtime**: Node.js
- **Server Framework**: Express.js
- **Real-Time Server**: Socket.IO
- **Database**: MongoDB Atlas via Mongoose ODM
- **File Uploads**: Multer & Cloudinary SDK
- **Security**: JSON Web Tokens (JWT), Bcrypt.js, Cookie-Parser, CORS

---

## 📂 Project Structure

```text
RealTimeChatApp/
├── backend/
│   ├── config/
│   │   ├── cloudinary.js       # Cloudinary setup with local fallback
│   │   ├── db.js               # MongoDB connection setup
│   │   └── token.js            # JWT token generation
│   ├── controllers/
│   │   ├── auth.controller.js  # Signup, login, logout controllers
│   │   ├── message.controller.js # Send & receive message handlers
│   │   └── user.controller.js  # User search, profile edit & retrieval
│   ├── middlewares/
│   │   ├── isAuth.js           # JWT authentication middleware
│   │   └── multer.js           # Disk storage configuration
│   ├── models/
│   │   ├── conversation.model.js
│   │   ├── message.model.js
│   │   └── user.model.js
│   ├── public/                 # Static upload fallback storage
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── message.routes.js
│   │   └── user.routes.js
│   ├── socket/
│   │   └── socket.js           # Socket.IO instance and connection handling
│   ├── .env                    # Environment variables (ignored)
│   ├── .gitignore
│   ├── index.js                # Server entrypoint
│   └── package.json
│
├── frontend/
│   ├── public/                 # Static public assets
│   ├── src/
│   │   ├── assets/             # Images & default avatars
│   │   ├── components/         # MessageArea, SideBar, Sender/Receiver bubbles
│   │   ├── customHooks/        # Custom hooks for messages and users
│   │   ├── pages/              # Login, SignUp, Home, Profile
│   │   ├── redux/              # Redux slices & store
│   │   ├── App.jsx             # Main router & socket lifecycle
│   │   ├── index.css           # Tailwind CSS directives
│   │   └── main.jsx            # Application root & dynamic API URL
│   ├── vercel.json             # Vercel SPA rewrite configuration
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB Atlas](https://www.mongodb.com/) account or local MongoDB instance
- [Cloudinary](https://cloudinary.com/) account (optional for cloud uploads)

### 1. Clone the Repository
```bash
git clone https://github.com/sachinkumar22018472/chatApplication.git
cd chatApplication
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` folder:
   ```env
   PORT=8000
   MONGODB_URL=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   CLOUD_NAME=your_cloudinary_cloud_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *Server will run at `http://localhost:8000`*

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. (Optional) Create a `.env` file in `frontend/` if you want a custom backend URL:
   ```env
   VITE_BACKEND_URL=http://localhost:8000
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *App will run at `http://localhost:5173`*

---

## 📡 API Endpoints

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Register a new user | Public |
| `POST` | `/api/auth/login` | Login and obtain JWT cookie | Public |
| `GET` | `/api/auth/logout` | Clear auth token cookie | Authenticated |

### Users (`/api/user`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/user/current` | Get current logged-in user details | Private |
| `PUT` | `/api/user/profile` | Update user profile name and/or avatar | Private |
| `GET` | `/api/user/others` | Retrieve other registered users | Private |
| `GET` | `/api/user/search?query=...` | Search users by name or username | Private |

### Messages (`/api/message`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/message/send/:receiver` | Send a text and/or image message | Private |
| `GET` | `/api/message/get/:receiver` | Fetch full conversation with a user | Private |

---

## ⚡ Deployment Notes

### Frontend on Vercel
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **SPA Routing**: Handled automatically via [frontend/vercel.json](frontend/vercel.json).

### Backend on Render
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `node index.js`
- **Environment Variables**: Configure `MONGODB_URL`, `JWT_SECRET`, `CLOUD_NAME`, `API_KEY`, `API_SECRET`, and `NODE_ENV=production`.

---

## 👨‍💻 Author

**Sachin Kumar**
- GitHub: [@sachinkumar22018472](https://github.com/sachinkumar22018472)
- Repository: [chatApplication](https://github.com/sachinkumar22018472/chatApplication)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
