iNoteBook
iNoteBook is a simple note-taking web application built using React.js for the frontend and Express.js for the backend. It allows users to create, read, update, and delete notes, along with user authentication and authorization features.

Features
User authentication and authorization
Add, view, update, and delete notes
Responsive design using Bootstrap
Fuzzy search for notes
Secure authentication using JWT tokens
Backend server built with Express.js and MongoDB as the database
Technologies Used
Frontend:

React.js
React Router DOM
Framer Motion for animations
Bootstrap for styling
Backend:

Express.js
MongoDB Atlas for cloud database storage
JSON Web Tokens (JWT) for user authentication
Installation
To run this project locally, follow these steps:

Clone the repository:

bash
Copy code
git clone <repository_url>
Install dependencies for both the frontend and backend:

bash
Copy code
cd iNoteBook
cd frontend
npm install
cd ../backend
npm install
Set up MongoDB Atlas and obtain your connection URI.

Create a .env file in the backend directory and add the following:

plaintext
Copy code
MONGODB_URI=<your_mongodb_connection_uri>
JWT_SECRET=<your_jwt_secret>
Start the backend server:

bash
Copy code
npm start
Start the frontend:

bash
Copy code
cd ../frontend
npm start
Access the application at http://localhost:3000 in your browser.

API Endpoints
POST /api/auth/createuser: Register a new user.
POST /api/auth/login: Authenticate an existing user.
GET /api/auth/getuser: Get logged-in user details.
GET /api/notes/fetchallnotes: Get all notes of the logged-in user.
POST /api/notes/addnote: Add a new note.
PUT /api/notes/updatenote/:id: Update an existing note.
DELETE /api/notes/deletenote/:id: Delete a note.
Folder Structure
bash
Copy code
iNoteBook/
│
├── frontend/              # React.js frontend files
├── backend/               # Express.js backend files
├── models/                # Mongoose models
│   ├── Notes.js           # Notes model
│   └── User.js            # User model
├── middleware/            # Middleware functions
│   └── fetchuser.js       # Fetch user middleware
├── images/                # Images used in the frontend
└── db.js                  # MongoDB connection setup
Credits
This project is inspired by various tutorials and guides on React.js and Express.js development.
