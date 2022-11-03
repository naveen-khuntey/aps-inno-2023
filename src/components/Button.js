import React from "react";

const Button = ({ children, onClick, type, addClassNames }) => {
  let color = "rose";
  return (
    <button
      onClick={onClick}
      className={`bg-${color}-500 focus:outline-none py-3 px-6 text-white shadow rounded ${addClassNames}`}
    >
      {children}
    </button>
  );
};

export default Button;
