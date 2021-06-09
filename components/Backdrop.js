import React, { useState } from "react";
const Backdrop = ({ style, click }) => {
  return (
    <>
      <div onClick={click} className={style}></div>
      <style jsx>{`
        .backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.3);
          z-index: -4;
        }

        .clear-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0);
          z-index: -4;
        }
      `}</style>
    </>
  );
};

export default Backdrop;
