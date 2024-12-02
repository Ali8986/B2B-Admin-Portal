import React from "react";
const CustomButton = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`custom-button ${className}`} // Add custom styling
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;
