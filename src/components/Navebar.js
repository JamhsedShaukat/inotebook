import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {
    Link,
    useLocation
  } from "react-router-dom";
 

const Navebar = () => {
  let navigate = useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/login');

  }
  const location = useLocation();
  useEffect(()=>{
    // console.log(location)
  },[location]);

  return (
    <>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg  text-dark"style={{ position: 'fixed', width: '100%', zIndex: '100', top: '0' }}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            INoteBook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==='/Home'?"active":""}`} aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==='/About'?"active":""}`} to="/About">
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem('token')?<form className="d-flex flex-lg-row flex-column">
             <Link className="btn btn-outline-success me-lg-1 mb-lg-0 mb-md-1 " to="/login" role="button">Login</Link>
              <Link className="btn btn-outline-success ms-lg-1 mt-lg-0 mt-md-1 " to="/signup" role="button">SignUp</Link>
            </form>:<button className="btn btn-primary" onClick={handleLogout}>LogOut</button>
            }
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navebar;
