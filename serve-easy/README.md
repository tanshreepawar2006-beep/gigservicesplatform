# ServeEasy — On-Demand Local Home Services Platform

ServeEasy is a modern, production-ready full-stack web application for booking verified local home services (AC repair, deep cleaning, plumbing, electrical, salon at home, accent painting, and appliance repair). Built with a clean, high-performance tech stack and a premium design system.

---

## 🌟 Tech Stack

### **Frontend**
- **Framework:** React.js 18 + Vite
- **Styling:** Tailwind CSS + Custom Design System
- **Icons:** Lucide React
- **Animations:** Framer Motion (subtle page transitions, micro-interactions, spring checkmarks)
- **Routing:** React Router v6

### **Backend**
- **Runtime:** Node.js + Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens) with `bcryptjs` password hashing
- **Embedded Database Fallback:** `mongodb-memory-server` included out-of-the-box so the app runs without mandatory local Mongo installation.

---

## 📂 Project Architecture (Monorepo)

```text
serve-easy/
├── server/                    # Node.js + Express Backend API
│   ├── config/                # Database connection & memory fallback
│   ├── middleware/            # JWT protect & provider authorization
│   ├── models/                # User, Service, and Booking Mongoose Schemas
│   ├── routes/                # Auth (/api/auth), Services (/api/services), Bookings (/api/bookings)
│   ├── seed/                  # Seeding script with 5 providers, 12 services, sample bookings
│   ├── server.js              # Express app entry point
│   ├── .env.example
│   └── package.json
│
├── client/                    # React + Vite Frontend App
│   ├── src/
│   │   ├── components/        # Navbar, Footer, ServiceCard, BookingCard, Modals, StatusBadge, EmptyState, SkeletonLoader
│   │   ├── context/           # AuthContext (JWT, user state, login, signup, logout)
│   │   ├── pages/             # LandingPage, CustomerDashboard, ProviderDashboard, ServiceDetailPage, MyBookingsPage, Auth Pages, 404
│   │   ├── services/          # Fetch API client layer
│   │   ├── App.jsx            # Router setup
│   │   └── main.jsx           # React DOM root
│   ├── .env.example
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## 🔑 Demo Login Credentials (Ready to Test)

To test the application end-to-end immediately:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Customer** | `customer@serveeasy.com` | `password123` |
| **Service Provider** | `provider@serveeasy.com` | `password123` |

---

## 🚀 Quickstart & Setup Guide

### 1. Prerequisite
Ensure you have **Node.js (v18+)** installed.

### 2. Backend Setup
```bash
cd server
npm install

# Seed the database (Populates 5 providers, 12 realistic home services in INR, and 4 sample bookings)
npm run seed

# Start the Express server
npm start
```
*Backend runs at: `http://localhost:5000`*

### 3. Frontend Setup
Open a new terminal window:
```bash
cd client
npm install

# Start the Vite development server
npm run dev
```
*Frontend runs at: `http://localhost:3000`*

---

## ⚡ Core Features & User Flows

1. **Authentication & Authorization:**
   - Role-based signup & login (Customer / Service Provider).
   - Real-time client & server validation with friendly error banners.
   - JWT tokens stored in browser local storage and auto-attached in `Authorization: Bearer <token>` headers.
   - Protected routes automatically redirect unauthenticated users.

2. **Customer Experience:**
   - Interactive landing page with value prop, category grid, 3-step workflow & testimonials.
   - Catalog dashboard with live keyword search and category chips filtering.
   - Detailed service page with partner bio, location, duration, and sticky CTA.
   - Doorstep appointment booking modal with date picker, time slots, address, and special notes.
   - Animated success state checkmark upon order placement.
   - Booking tracker with real-time status badges (`Pending`, `Accepted`, `Completed`, `Cancelled`).

3. **Service Provider Experience:**
   - Dedicated provider dashboard with overview statistics (Active listings, Pending requests, Completed jobs, Total earnings in INR).
   - Full service CRUD (Add new service, Edit listing details, Delete listing).
   - Incoming job request manager to Accept or Decline incoming customer requests, or mark active jobs as Completed.

---

## 🛡️ Production Build Test

To verify clean production bundle build with zero errors:
```bash
cd client
npm run build
```
