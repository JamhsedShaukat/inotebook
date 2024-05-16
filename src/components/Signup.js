import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import backgroundImage from "../images/BackGround.jpg"; // Import your background image

const Signup = (props) => {
  // let success=false;
  const [credentials, setCredentials] = useState({name:"", email: "", password: "",cpassword:"" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      //savr the token and redirct
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      props.showAlert("acount created successfuly ",'success');
    } else {
      props.showAlert("invalid details ",'danger');
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
        justifyContent: "flex-start",
        position:"fixed",
        alignItems: "center",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Add text shadow for better visibility
        backdropFilter: "blur(5px)", // Add blur effect
      }}
    >
    <div className=" my-2">
            <h2 className="mb-3">SignUp to continue to INoteBook </h2>
      <form className="my-4 w-100 h-75 bg-light p-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            // aria-describedby="emailHelp"
            value={credentials.name}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
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
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            value={credentials.cpassword}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary my-2">
          Submit
        </button>
      </form>
    </div>
    </motion.div>
  );
};

export default Signup;
