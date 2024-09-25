import React, { forwardRef } from "react";

const Burger = forwardRef(({ active, onClick }, ref) => {
  return (
    <div
      ref={ref}
      className={`burger ${active ? "_active" : ""}`}
      onClick={onClick}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
});

export default Burger;
