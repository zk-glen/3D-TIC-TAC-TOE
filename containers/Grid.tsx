import React from "react";

interface Props {
  position: string;
  children: JSX.Element[];
}

const Grid: React.FC<Props> = ({ position, children }) => {
  return (
    <div>
      <h4>{position}</h4>
      <div className="grid gap-1 grid-cols-3">{children}</div>
    </div>
  );
};

export default Grid;
