# 💎 Wedding Invitation

A beautiful, modern wedding invitation web application built with React, TypeScript, and Express.js. Features interactive invitation pages, RSVP management, and a comprehensive admin dashboard.

## ✨ Features

### Guest Experience
- 🎨 **Beautiful UI** - Gradient backgrounds, smooth animations, and responsive design
- 🎵 **Background Music** - Auto-playing wedding audio with user controls
- 📸 **Gallery** - Interactive photo carousel
- 💌 **RSVP Form** - Easy guest responses with message support
- ⏱️ **Event Details** - Countdown, schedule, and location information
- 🎪 **Opening Page** - Personalized invitation with guest name recognition
- 💬 **Quotes & Stories** - Couple's story and wedding quotes

### Admin Dashboard
- 📊 **Dashboard** - Real-time RSVP statistics and confirmation rates
- 👥 **Guest Management** - View, filter, and delete guest records
- 🗑️ **Bulk Operations** - Delete all guests with safety confirmations
- 📥 **Data Export** - CSV export for offline analysis
- 🔐 **Secure Authentication** - API key-based admin access
- 💾 **Persistent Sessions** - LocalStorage-based session management

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling
- **React Router DOM** - Client-side routing

### Backend
- **Node.js & Express.js** - REST API server
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing

## 🚀 Quick Start

### Prerequisites
- Node.js 14+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wedding-invitation
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

   Create `.env` file:
   ```bash
   PORT=3000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/wedding-invitation
   FRONTEND_URL=http://localhost:5173
   ADMIN_KEY=your_secret_admin_key_here
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Server runs on `http://localhost:3000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Development server runs on `http://localhost:5173`

## 📖 Usage

### Accessing the Invitation
- **Main Page**: `http://localhost:5173/`
- **With Guest Name**: `http://localhost:5173/?guest=YourName`

### Admin Dashboard
- **Access**: `http://localhost:5173/admin`
- **Login**: Enter admin key set in `.env` (default: `your_secret_admin_key_here`)
- **Features**:
  - View RSVP statistics
  - Manage guest database
  - Filter by confirmation status
  - Export guest data as CSV
  - Delete individual guests or all guests

## 📁 Project Structure

```
wedding-invitation/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AudioPlayer.tsx
│   │   │   ├── BottomNav.tsx
│   │   │   ├── Countdown.tsx
│   │   │   └── pages/
│   │   │       ├── OpeningPage.tsx
│   │   │       ├── QuotesPage.tsx
│   │   │       ├── CouplePage.tsx
│   │   │       ├── GalleryPage.tsx
│   │   │       ├── EventPage.tsx
│   │   │       ├── LocationPage.tsx
│   │   │       ├── RSVPPage.tsx
│   │   │       ├── ThanksPage.tsx
│   │   │       ├── AdminPage.tsx
│   │   │       └── NotFoundPage.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── assets/
│   │   └── App.tsx
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── package.json
├── backend/
│   ├── controllers/
│   │   ├── guestController.js
│   │   └── adminController.js
│   ├── models/
│   │   └── Guest.js
│   ├── routes/
│   │   ├── guestRoutes.js
│   │   └── adminRoutes.js
│   ├── server.js
│   ├── .env
│   └── package.json
└── README.md
```

## 🔌 API Endpoints

### Guest Endpoints
- `POST /api/guests` - Create RSVP response
- `GET /api/guests` - Get all guest responses

### Admin Endpoints (Requires authentication)
- `GET /api/admin/dashboard` - Get dashboard summary
- `GET /api/admin/stats` - Get RSVP statistics
- `GET /api/admin/guests` - Get all guests
- `GET /api/admin/guests/:status` - Filter guests by status
- `GET /api/admin/export/csv` - Export guests as CSV
- `DELETE /api/admin/guests/:guestId` - Delete single guest
- `DELETE /api/admin/guests-all/delete` - Delete all guests

## 🎯 Customization

### Wedding Details
Edit the couple's information in the relevant page components:
- `OpeningPage.tsx` - Names and date
- `CouplePage.tsx` - Couple's story
- `LocationPage.tsx` - Venue details
- `EventPage.tsx` - Event schedule

### Colors & Styling
Modify Tailwind classes in components or update:
- `tailwind.config.js` - Tailwind configuration
- `src/index.css` - Global styles

### Background Music
Replace `src/assets/music/Backsound.mp3` with your own audio file

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile phones
- 📱 Tablets
- 💻 Desktops

Canvas size: 430x932px (scaled responsively)

## 🔒 Security

- Admin authentication via secure API key
- CORS enabled for configured frontend URL
- Environment variables for sensitive data
- MongoDB with proper indexing

## 📦 Building for Production

### Frontend
```bash
cd frontend
npm run build
```
Output: `frontend/dist/`

### Backend
Production-ready as-is. Deploy to hosting platform (Heroku, Railway, Render, etc.)

## 🗂️ File Organization

- **Unnecessary files removed** - Clean project structure
- **Modular components** - Each page is independent
- **Service layer** - Centralized API calls
- **Environment configuration** - `.env` for sensitive data

## 🎨 Pages Overview

| Page | Purpose |
|------|---------|
| Opening | Personalized invitation greeting |
| Quotes | Romantic quotes & sayings |
| Couple | Bride & groom story |
| Gallery | Photo carousel |
| Event | Wedding schedule & details |
| Location | Venue map & directions |
| RSVP | Guest response form |
| Thanks | Gratitude message |
| Admin | Dashboard for management |
| 404 | Not found page |

## 💡 Tips

- Keep admin key secure and change it in production
- Regularly export guest data for backup
- Test RSVP form with different responses
- Customize colors to match your wedding theme
- Add more photos to the gallery

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Support

For issues or questions, check the code comments and component documentation.

---

**Happy Wedding! 💕**
