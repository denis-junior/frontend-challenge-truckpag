import React from "react";
import "../App.css";
import { Ili } from "../interfaces/general";

export default function Li({ label, icon, active, onClick, backColor }: Ili) {
  return (
    <p
      style={{
        display: "flex",
        alignItems: "center",
        margin: "0",
        marginLeft: "1rem",
        padding: ".3rem",
        borderRadius: "5px",
        justifyContent: "center",
        cursor: "pointer",
        backgroundColor: active ? backColor : "transparent",
      }}
      onClick={onClick}
      className={`li`}

    >
      <span style={{marginRight: ".3rem"}}>{icon}</span>
      {label}
    </p>
  );
}
