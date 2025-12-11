# Wedding Invitation Backend

A Node.js/Express backend service for managing wedding invitation RSVPs.

## Features

- RESTful API for guest management
- MongoDB integration for data persistence
- RSVP tracking and statistics
- Dietary restrictions tracking
- Guest message collection

## Prerequisites

- Node.js 14+ 
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/wedding-invitation
FRONTEND_URL=http://localhost:5173
```

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
- `GET /api/health` - Check if the API is running

### Guest Management
- `POST /api/guests` - Create a new guest RSVP
- `GET /api/guests` - Get all guests
- `GET /api/guests/:id` - Get a specific guest
- `PUT /api/guests/:id` - Update guest information
- `DELETE /api/guests/:id` - Delete a guest

### Statistics
- `GET /api/guests/stats/rsvp` - Get RSVP statistics

## Example Request

```bash
curl -X POST http://localhost:5000/api/guests \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "numberOfGuests": 2,
    "dietaryRestrictions": "Vegetarian",
    "message": "Excited to celebrate with you!"
  }'
```

## Project Structure

```
backend/
├── models/           # MongoDB schemas
│   └── Guest.js     # Guest model
├── controllers/      # Business logic
│   └── guestController.js
├── routes/          # API routes
│   └── guestRoutes.js
├── server.js        # Main server file
├── package.json     # Dependencies
├── .env.example     # Environment variables template
└── README.md        # This file
```

## Environment Variables

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `MONGODB_URI` - MongoDB connection string
- `FRONTEND_URL` - Frontend URL for CORS configuration

## Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Dev Dependencies

- **nodemon** - Auto-restart server on file changes

## License

ISC
