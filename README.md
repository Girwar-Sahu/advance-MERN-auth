# Advanced MERN Authentication

This project is an advanced authentication system built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It provides a robust and secure authentication solution for web applications.

## Features

- User registration and login
- Email verification
- Password reset functionality
- JWT (JSON Web Token) based authentication
- Protected routes on both client and server sides
- User profile management
- Responsive design for mobile and desktop

## Technologies Used

- **Frontend:**
  - React.js
  - Redux for state management
  - React Router for navigation
  - RTK query for API request
  - Tailwind CSS for styling

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB for database
  - Mongoose as ODM (Object Document Mapper)
  - JWT for token-based authentication
  - Bcrypt for password hashing
  - Nodemailer for sending emails

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Girwar-Sahu/advance-MERN-auth.git
   cd advance-MERN-auth
   ```

2. Install dependencies for both frontend and backend:
   ```
   npm install (backend)
   cd client && npm install (frontend)
   ```

3. Set up environment variables:
   - Create a `.env` file in the `server` directory
   - Add the following variables:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     EMAIL_SERVICE=your_email_service
     EMAIL_USERNAME=your_email_username
     EMAIL_PASSWORD=your_email_password
     CLIENT_URL=http://localhost:3000
     ```

## Usage

1. Start the backend server:
   ```
   npm run dev
   ```

2. Start the frontend development server:
   ```
   cd client
   npm run dev
   ```

3. Open your browser and visit `http://localhost:3000` to use the application.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

Girwar Sahu - [GitHub Profile](https://github.com/Girwar-Sahu)

Project Link: [https://github.com/Girwar-Sahu/advance-MERN-auth](https://github.com/Girwar-Sahu/advance-MERN-auth)
