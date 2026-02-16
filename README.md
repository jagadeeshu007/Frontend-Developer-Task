# Frontend Developer Task - Fullstack Project

This is a **Fullstack web application** built as part of the Frontend Developer Task.  

## Overview
- **Frontend:** React.js  
- **Backend:** Node.js + Express.js + MongoDB  
- **Authentication:** JWT-based login/signup  
- **Features:** User registration, login, profile, task management  

## Project Structure
Fullstack/
├── client/ # React frontend
├── server/ # Node.js backend
└── README.md


## How to Run

### Backend
1. Go to server folder: `cd server`  
2. Install dependencies: `npm install`  
3. Create `.env` file:
MONGO_URI=<your_mongo_connection_string>
JWT_SECRET=mysecret123
PORT=5000

4. Start server: `node index.js`  

### Frontend
1. Go to client folder: `cd client`  
2. Install dependencies: `npm install`  
3. Start frontend: `npm start`  

## Notes
- `node_modules` are excluded. Run `npm install` before using.  
- Protected routes require JWT token in Authorization header:
