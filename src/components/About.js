
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./About.css"; // Import the CSS file
import backgroundImage from "../images/BackGround.jpg";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      style={{
                background: `url(${backgroundImage}) center/cover no-repeat fixed`,
                color: "#000", // Darker shade of green, adjust as needed
                backgroundAttachment: 'fixed',
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Add text shadow for better visibility
                backdropFilter: "blur(5px)", // Add blur effect
              }}
    >
      <div className="container">
      <h2 className="display-4 mb-4">About INoteBook</h2>
      <p className="lead">
        Welcome to <strong>INoteBook</strong>, your personal space for organizing and managing your notes efficiently.
      </p>
      <p>
        At INoteBook, we understand the importance of keeping your thoughts, ideas, and tasks organized. Our goal is to provide you with a simple and intuitive platform to create, edit, and organize your notes seamlessly.
      </p>

      <div className="border border-3 border-primary p-4 rounded mb-4">
        <h4 className="mb-4">Key Features</h4>
        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Create and Edit Notes</h5>
                <p className="card-text">Effortlessly create and edit your notes with our user-friendly interface.</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Organize with Tags</h5>
                <p className="card-text">Tag your notes for better categorization and organization.</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Cloud Storage</h5>
                <p className="card-text">Access your notes from anywhere using our secure cloud storage.</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Responsive Design</h5>
                <p className="card-text">Enjoy a responsive and user-friendly interface for a great user experience.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h4 className="mt-4">Why Choose INoteBook?</h4>
      <p>
        INoteBook is designed to be your go-to solution for note-taking, whether you're a student, professional, or anyone who values organized information. We prioritize simplicity and functionality, making it easy for you to focus on what matters — your ideas.
      </p>
      
      <div className="mt-4">
        <Link to="/signup" className="btn btn-primary me-3">Sign Up</Link>
        <Link to="/login" className="btn btn-outline-primary">Sign In</Link>
      </div>

      <div className="mt-5 text-center text-muted">
        <p>Ready to experience the power of INoteBook? Sign up today and start organizing your thoughts in a more efficient and structured way.</p>
        <p>If you have any questions or feedback, feel free to <Link to="/contact">contact us</Link>. We're here to help you make the most of your note-taking journey.</p>
      </div>

      <footer className="mt-5 text-center text-white">
        <p className="text-dark">&copy; 2023 INoteBook. All Rights Reserved.</p>
      </footer>
      </div>
    </motion.div>
  );
};

export default About;
