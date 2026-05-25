# Developer Portfolio & Admin Panel

A premium, modern, and highly interactive Developer Portfolio website featuring a custom glassmorphic design and a secure Admin Dashboard to manage profile bio, skills categories, project showcases, and contact messages.

---

## 🚀 Features

- **Portfolio Frontend**:
  - Premium Dark-Themed Glassmorphic UI with smooth scroll navigation and custom micro-animations.
  - Dynamic typewriter effect for professional roles.
  - Interactive Project Showcase categorized by type (Web, Mobile, etc.) with custom hover actions.
  - Skill levels with clean progress bars and icons.
  - Fully functional Contact Form.
- **Admin Dashboard Panel (Private)**:
  - Accessible via secure path `/admin/login` using JWT authentication.
  - **Manage Bio**: Real-time updates to contact info, hero text, and description.
  - **Manage Skills**: Add, edit, or remove skill levels and categories.
  - **Manage Projects**: Add, update, or remove projects.
  - **Local Image Uploads**: Select local images to upload directly using a built-in upload area powered by `multer`. Displays progress status and a preview thumbnail.
  - **Contact Messages**: Read messages sent by portfolio visitors in real-time, sorted by date.

---

## 🛠️ Technology Stack

- **Frontend**:
  - React.js (Vite)
  - React Router DOM
  - React Icons
  - Pure Vanilla CSS
- **Backend**:
  - Node.js (Express)
  - MongoDB (Mongoose)
  - JWT (JSON Web Tokens) & BcryptJS (Password hashing)
  - Multer (Local disk image uploads)

---

## 📁 Project Structure

```text
Portfolio/
├── backend/
│   ├── middleware/      # Express authorization middlewares
│   ├── models/          # Mongoose DB Schemas (User, Bio, Project, Skill, Contact)
│   ├── routes/          # REST API Endpoints (admin, auth, public, contact)
│   ├── uploads/         # Local folder where project images are stored
│   ├── package.json     # Backend configuration & scripts
│   └── server.js        # Main entry point of Backend API
├── frontend/
│   ├── public/          # Public static assets
│   ├── src/
│   │   ├── components/  # Reusable UI parts (Navbar, Hero, Projects, Skills, etc.)
│   │   ├── pages/       # Login page & Admin Dashboard panel
│   │   ├── App.jsx      # React router routing configuration
│   │   ├── index.css    # Core design tokens and system variables
│   │   └── main.jsx     # App entry point
│   ├── package.json     # Frontend configuration & scripts
│   └── vite.config.js   # Vite configuration
└── README.md            # Root project documentation
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB running locally or a MongoDB Atlas connection string

### 1. Setup Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/portfolio
   JWT_SECRET=your_secret_key_here
   ```
4. Seed the database with initial developer data (optional):
   ```bash
   node seed.js
   ```
5. Start backend development server:
   ```bash
   npm run dev
   ```

### 2. Setup Frontend
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start frontend dev server:
   ```bash
   npm run dev
   ```
4. Access the web app in your browser at `http://localhost:5173`.
