import React from "react";

interface IButton {
  name: string;
  onClick: () => void;
  className: string;
  disabled?: boolean;
}

const CustomButton = ({ name, onClick, className, disabled }: IButton) => {
  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      {name}
    </button>
  );
};

export default CustomButton;
