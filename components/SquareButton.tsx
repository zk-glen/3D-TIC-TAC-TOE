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
    border-black
    text-white
    text-7xl
    bg-${color ? color : "black"}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default SquareButton;
