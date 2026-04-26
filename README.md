# Codeforces Contest Tracker

A MERN stack application to track Codeforces performance using the Codeforces API.

## Features
- Search for Codeforces handles
- View user statistics (Contests, Rank, Rating)
- Detailed contest history table
- Visualized performance metrics

## Tech Stack
- **Frontend**: React (Vite), Vanilla CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB instance (local or Atlas)

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your MongoDB URI:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## License
MIT
