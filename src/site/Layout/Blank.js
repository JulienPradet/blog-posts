import React from "react";

const Blank = ({ children, helmet }) => {
  return (
    <div>
      {helmet}
      {children}
    </div>
  );
};

export default Blank;
