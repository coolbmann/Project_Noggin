import React from "react";
import Icon from "../../assets/icons/TooltipIcon.svg";

interface props {
  bgcolor?: string;
  text?: string;
}

const Tooltip = ({ bgcolor, text }: props) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        width: "100%",
        height: "3rem",
        gap: "0.75rem",
        padding: "0 0.75rem",
        backgroundColor: bgcolor,
        borderRadius: "0.5rem",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img style={{ height: "75%" }} src={Icon} alt="" />
      </div>
      <div
        style={{
          flex: "none",
          fontSize: "0.825rem",
          fontWeight: "400",
          overflow: "none",
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
