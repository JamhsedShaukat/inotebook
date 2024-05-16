// App.js

import "./App.css";
// index.js or App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navebar from "./components/Navebar";
import { Home } from "./components/Home.js";
import About from "./components/About.js";
import NoteState from "./context/notes/NoteState.js";
import  Alert  from "./components/Alert.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <>
      <NoteState>
        <Router>
          <Navebar />
          <Alert alert={alert}/>
          {/* <div className="container"> */}
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}/>} />
              <Route exact path="/About" element={<About />} />
              <Route exact path="/Login" element={<Login showAlert={showAlert}/>} />
              <Route exact path="/Signup" element={<Signup showAlert={showAlert} />} />
              {/* <Route exact path="/User" element={<User/>}/> */}
            </Routes>
          {/* </div> */}
        </Router>
      </NoteState>
    </>
  );
}

export default App;

//to start server " npm sun both "