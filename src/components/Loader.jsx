import React from "react";

const Loader = (bgColor) => {
  return (
    <span >
      <div className={`spinner ${bgColor} text-white`}></div>
    </span>
  );
};

export default Loader;
