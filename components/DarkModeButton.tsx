import React from "react";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";

interface Props {
  darkMode: boolean;
  onClick: () => void;
}

const DarkModeButton: React.FC<Props> = ({ darkMode, onClick }) => {
  return (
    <div
      className="flex cursor-pointer justify-between items-center px-2 border-gray-default border-2 rounded-full h-10 w-20 bg-white dark:bg-dark-mode-button-black relative"
      onClick={onClick}
    >
      <IoSunnyOutline className="text-dark-mode-yellow-1 w-6 h-6" />
      <IoMoonOutline className="text-white-500 w-6 h-6" />
      <div
        className={`
        border-4
        border-dark-mode-yellow-1
        dark:border-white
        bg-dark-mode-yellow-2
        dark:bg-dark-mode-night-1
       
        rounded-full
        h-8 w-8 
        absolute 
        top-1/2 
        transform 
        -translate-y-1/2  
        right-1/4     
        dark:left-1/4 
        translate-x-1/2
        dark:-translate-x-1/2
        transition-transform toggle-dark-timing duration-500 `}
      ></div>
    </div>
  );
};

export default DarkModeButton;
