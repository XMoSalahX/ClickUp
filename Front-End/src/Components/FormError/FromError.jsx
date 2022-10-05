import React from "react";

const FromError = ({ errorMsg }) => {
  return (
    <div
      style={{
        color: "red",
        textAlign: "center",
        fontSize: "12px",
        marginBottom: "20px",
        display: errorMsg ? "block" : "none",
      }}
    >
      {errorMsg}
    </div>
  );
};

export default React.memo(FromError);
