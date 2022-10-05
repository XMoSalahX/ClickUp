import React from "react";

const Imgsgroup = ({ ImgGroupArray }) => {
  return ImgGroupArray.map((el) => {
    return (
      <span
        key={el.id}
        style={{
          width: el.width,
          height: el.height,
          backgroundImage: `url(${el.href})`,
          display: "inline-block",
          marginRight: el.marginRight,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      ></span>
    );
  });
};

export default React.memo(Imgsgroup);
