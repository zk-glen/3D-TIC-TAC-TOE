import React from "react";

interface Props {
  onClick?: () => void;
  text: string;
  alternateStyle: boolean;
}

const Button: React.FC<Props> = ({ text, alternateStyle, onClick }) => {
  return (
    <button
      className={`
      py-2 
      px-3 
      rounded
      text-base
      ${
        alternateStyle
          ? "bg-transparent text-default-black border dark:text-white border-default-black dark:border-white hover:text-button-1 dark:hover:text-button-dark-1 hover:border-button-1 dark:hover:border-button-dark-1"
          : "bg-button-1 dark:bg-button-dark-1 hover:bg-button-1-hover dark:hover:bg-button-dark-1-hover text-white dark:text-black"
      }
      hover:shadow-violet-shadow
      dark:hover:shadow-orange-shadow
      inline-flex 
      items-center 
      text-white
      `}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
