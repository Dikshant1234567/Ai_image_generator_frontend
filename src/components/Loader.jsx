import React from "react";

const Loader = (bgColor) => {
  return (
    <div class={`spinner ${bgColor}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
