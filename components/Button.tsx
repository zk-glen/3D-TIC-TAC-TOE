import React from "react";

interface Props {
  mainColor: string;
  hoverColor: string;
  onClick?: () => void;
  text: string;
}

const Button: React.FC<Props> = ({ mainColor, hoverColor, text, onClick }) => {
  return (
    <button
      className={`inline-flex items-center px-4 py-2 bg-${mainColor} hover:bg-${hoverColor} text-white text-sm font-medium rounded-md mx-2`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
