import React from "react";

interface Props {
  onClick?: () => void;
  disabled: boolean;
  color?: string;
  text?: string;
}

const SquareButton: React.FC<Props> = ({ disabled, onClick, color, text }) => {
  return (
    <button
      className={`
    h-24
    w-24
    rounded-md
    border-solid 
    border-2
    border-default-black
    text-white
    text-7xl
    shadow-violet-shadow
    hover:shadow-none
    hover:scale-102
    transition-transform ease duration-100
    bg-${color ? color : "   bg-gradient-radial"}
    `}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default SquareButton;
