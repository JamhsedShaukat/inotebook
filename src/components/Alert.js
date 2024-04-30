import React from "react";
import backgroundImage from "../images/BackGround.jpg";


function Alert(props) {
  const capitalize = (word) => { 
    if( word ==="danger"){
      word = "error";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    <div style={{
      background: `url(${backgroundImage}) center/cover no-repeat fixed`,
      marginRight:"-20px",
      color: "#000", // Darker shade of green, adjust as needed
      // padding: "20px",
      backgroundAttachment: 'fixed',
      height: "50px",
      marginTop:"50px",
      textAlign:"center",
      justifyContent: "center",
      alignItems: "center",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Add text shadow for better visibility
      backdropFilter: "blur(5px)", // Add blur effect
    }}>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade
          show`}
          role="alert"
        >
          <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
        </div>
      )}
    </div>
  );
}

export default Alert;
