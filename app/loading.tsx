import React from "react";

// Default values shown

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span className="loading loading-infinity loading-lg text-primary"></span>
    </div>
  );
};

export default Loading;
