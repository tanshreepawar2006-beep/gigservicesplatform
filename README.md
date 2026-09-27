# ServeEasy 🛠️✨
> **Premium On-Demand Home Services Booking Platform**  
> Built with modern React 18, Vite, Tailwind CSS, Framer Motion, Node.js, Express, and MongoDB (Mongoose).

---

## 🌟 Overview & Product Philosophy

**ServeEasy** is a production-grade full-stack home services marketplace (inspired by the quality and aesthetic of Urban Company) crafted with intentional simplicity in scope, but **top-tier visual and architectural quality**.

- **No bloated complexity:** 2 core roles (Customer & Service Provider), streamlined booking pipeline, and lightning-fast responses.
- **Top-Tier UI/UX:** Curated Emerald-Teal brand palette, subtle Framer Motion micro-interactions, responsive mobile layouts, real-time input validations, shimmer skeletons, and custom empty states.
- **Zero Configuration Fallback:** Features automatic detection: connects directly to real MongoDB (Atlas/Local) when `MONGODB_URI` is provided, and gracefully auto-spins an in-memory MongoDB engine locally if no external database is active.

---

## 🏗️ Architecture & Technology Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React 18 + Vite | Lightning-fast HMR and modular component architecture |
| **Styling** | Tailwind CSS | Custom design system (`brand`, `warm`, glassmorphism, soft shadows) |
| **Motion** | Framer Motion | Tasteful page transitions, spring cards, interactive tabs |
| **Icons** | Lucide React | High-legibility modern iconography |
| **Backend** | Node.js + Express.js | REST API with clean MVC controllers and route guards |
| **Database** | MongoDB + Mongoose | Schema validation, relationships (`User`, `Service`, `Booking`) |
| **Authentication** | JWT + Bcrypt.js | 30-day stateless tokens, role authorization (`customer` / `provider`) |

---

## ⚡ Instant Demo Credentials

For quick evaluation without manual signup:

| Role | Email | Password | What You Can Test |
| :--- | :--- | :--- | :--- |
| **Customer** | `customer@serveeasy.in` | `password123` | Browse catalog, book services, view active bookings, cancel pending slots |
| **Provider** | `provider@serveeasy.in` | `password123` | Provider stats, accept/complete customer requests, publish/edit services |
| **Provider 2** | `sunita@serveeasy.in` | `password123` | Deep cleaning specialist profile, manage cleaning orders |

> 💡 **Tip:** On the Login page and Navbar, you can also click the **"Quick Demo"** pill for **1-click instant login**!

---

## 📁 Project Structure

```
gigservices project/
├── package.json               # Root convenience scripts (run backend & frontend)
├── README.md                  # Comprehensive platform documentation
├── backend/
│   ├── .env.example           # Environment variables template
│   ├── package.json
│   └── src/
│       ├── config/db.js       # Auto-connecting MongoDB / Memory-Server adapter
│       ├── models/            # Mongoose schemas: User, Service, Booking
│       ├── controllers/       # Auth, Services, Bookings business logic
│       ├── middleware/        # JWT Protect, Role Authorize, Error handlers
│       ├── routes/            # REST API endpoints
│       ├── seeds/             # Seed data with 5 Indian providers & 12 services
│       └── server.js          # Express entrypoint with auto-seed logic
└── frontend/
    ├── .env.example           # Frontend environment configuration
    ├── package.json
    ├── vite.config.js         # Vite configuration with API proxying
    ├── tailwind.config.js     # Custom design tokens, colors & typography
    ├── index.html             # SEO meta tags, Plus Jakarta Sans typography
    └── src/
        ├── components/
        │   ├── common/        # Navbar, Footer, StatusBadge, Skeletons, EmptyState
        │   ├── landing/       # Hero, CategoryGrid, HowItWorks, Testimonials
        │   ├── services/      # ServiceCard, ServiceFilterBar, BookingModal
        │   └── provider/      # ProviderStats, ServiceModal (Add/Edit)
        ├── context/           # AuthContext, ToastContext
        ├── pages/             # Landing, Login, Signup, CustomerHub, ServiceDetail,
        │                      # BookingConfirmation, MyBookings, ProviderHub, NotFound
        ├── services/api.js    # Axios client with JWT interceptors
        ├── App.jsx            # Routing and role-protected guards
        └── main.jsx
```

---

## 🚀 Quickstart Guide

### 1. Prerequisites
- **Node.js** v18+ (tested on Node v24)
- **npm** v9+

### 2. Installation
Install dependencies for both projects in one command:
```bash
npm run install:all
```
*(Or navigate to `backend/` and `frontend/` separately and run `npm install`)*

### 3. Environment Variables
Both `backend/.env` and `frontend/.env` come pre-configured out-of-the-box.
- Backend (`backend/.env`):
  ```env
  PORT=5000
  MONGODB_URI=mongodb://127.0.0.1:27017/serveeasy
  JWT_SECRET=serveeasy_super_secret_jwt_key_2026_dev_prod
  NODE_ENV=development
  FRONTEND_URL=http://localhost:5173
  ```
- Frontend (`frontend/.env`):
  ```env
  VITE_API_URL=http://localhost:5000/api
  ```

### 4. Seed the Database
Populate 5 realistic Indian providers, 12 categorized services with high-resolution imagery, and sample active bookings:
```bash
npm run seed
```
*(Note: If you start the backend server without running seed manually, the server auto-detects an empty database and seeds automatically!)*

### 5. Running the Application
In separate terminal tabs:
```bash
# Terminal 1: Start Backend (Port 5000)
npm run start:backend

# Terminal 2: Start Frontend (Port 5173)
npm run start:frontend
```

Now open **http://localhost:5173** in your browser!

---

## 🔄 End-to-End User Journeys

### 1. Customer Experience
1. **Landing:** View Hero, explore category cards, inspect 3-step workflow and customer testimonials.
2. **Browse & Filter:** Search by keywords (e.g., "AC", "leak", "cleaning"), filter by category chips, and sort by price/rating.
3. **Service Details:** Inspect transparent package inclusions, duration, pricing in INR, and verified partner credentials.
4. **Booking:** Choose date, select a convenient 2-hour arrival slot, provide address & notes.
5. **Confirmation:** Enjoy satisfying celebratory success screen with booking reference.
6. **Track & Manage:** View appointment status in **My Bookings** with status badge timeline; cancel if needed.

### 2. Service Provider Experience
1. **Login:** Log in with `provider@serveeasy.in` (Rajesh Kumar).
2. **Dashboard Overview:** View analytics (Total Listings, Pending Requests, Active Jobs, Total Earnings).
3. **Dispatch & Jobs:** Review incoming customer requests with addresses and notes. Click **"Accept Request"** or **"Mark Job Completed"**.
4. **Catalog Management:** Click **"Publish New Service"** to create a new package with instant category image presets and custom checklist deliverables; edit or delete anytime.

---

## 🌐 Production Deployment

- **Backend (Render / Railway):**
  - Root directory: `backend`
  - Build command: `npm install`
  - Start command: `npm start`
  - Environment variables: `MONGODB_URI` (MongoDB Atlas connection string), `JWT_SECRET`, `PORT=5000`, `FRONTEND_URL` (your frontend domain).
- **Frontend (Vercel / Netlify):**
  - Root directory: `frontend`
  - Build command: `npm run build`
  - Output directory: `dist`
  - Environment variables: `VITE_API_URL=https://your-backend.onrender.com/api`

---

## 🛡️ License
ISC License © ServeEasy Team
