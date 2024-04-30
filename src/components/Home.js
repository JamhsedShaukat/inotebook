// Home.js
import { motion } from "framer-motion";
import backgroundImage from "../images/BackGround.jpg"; // Import your background image

import Notes from "./Notes";

export const Home = (props) => {
  
const {showAlert}= props;
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
        backgroundAttachment: 'fixed',
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        // alignItems: "center",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Add text shadow for better visibility
        backdropFilter: "blur(10px)", // Add blur effect
      }}
    > 
    <div className="container ">
      <Notes showAlert={showAlert}/>
    </div>
    </motion.div>
  );
};

// export default Home;
