import React from "react";

interface TagProps {
  role: "organizador" | "participante";
}

const Tag = ({ role }: TagProps) => {
  const bgColor = role === "organizador" ? "#00FF4DCC" : "#0F2976";
  const textColor = role === "organizador" ? "#0F2976" : "#00FF4DCC";
  const text = role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <span
      style={{ backgroundColor: bgColor, color: textColor }}
      className="text-sm px-4 py-2 rounded-full font-medium"
    >
      {text}
    </span>
  );
};

export default Tag;