import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../images/BackGround.jpg"; // Import your background image

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      //savr the token and redirct
      localStorage.setItem('token', json.authtoken);
      
      props.showAlert("Longin successfuly ",'success');
      navigate("/");
    } else {
      props.showAlert("invalid credentials ",'danger');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0 },
  };
  return (
    <motion.div
    
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className=""
      style={{
        background: `url(${backgroundImage}) center/cover no-repeat fixed`,
        color: "#000", // Darker shade of green, adjust as needed
        // padding: "20px",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        position:"fixed",
        justifyContent: "flex-start",
        padding:"30px 0",
        alignItems: "center",
        alignContent:"center",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Add text shadow for better visibility
        backdropFilter: "blur(5px)", // Add blur effect
      }}
    >
    <div className=" position-fixed ">
      <h2 className=" my-4 text-center">Login to continue to INoteBook</h2>
      <form className="my-4 w-100 h-75 bg-light p-4 " onSubmit={handleSubmit}>
        <div className="my-4">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
          placeholder="Enter your Email"
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
          placeholder="Enter your Password"
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2 align-item-center">
          Submit
        </button>
      </form>
    </div>
    </motion.div>
  );
};

export default Login;
