import React from "react";

interface Props {
  position: string;
  children: JSX.Element[];
}

const Grid: React.FC<Props> = ({ position, children }) => {
  return (
    <div className={`flex flex-col `}>
      <h4 className="text-2xl text-center mb-4">{position}</h4>
      <div className="grid gap-2 grid-cols-3">{children}</div>
    </div>
  );
};

export default Grid;
