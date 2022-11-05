import React from "react";
import "./Button.css";
const Button = ({ children, onClick, type, addClassNames }) => {
  let color = "purple";

  if (type === "error") {
    color = "green";
  }
  return (
    <button
      onClick={onClick}
      className={`btn`}
    >
      {children}
    </button>
  );
};

export default Button;
