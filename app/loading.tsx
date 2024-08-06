import React from "react";



const Loading = () => {
  return (
    <div 
    
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <span className="loading loading-infinity loading-lg text-primary"></span>
    </div>
  );
};

export default Loading;
