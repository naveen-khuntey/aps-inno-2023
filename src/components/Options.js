import React from "react";

const Options = ({ children, onClick, type, addClassNames }) => {
  return (
    <button
      onClick={onClick}
      className="options_btn"
    >
      {children}
    </button>
  );
};

export default Options;