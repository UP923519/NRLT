import React, { useState, useEffect } from "react";
import "../App/App.css";
import { Table } from "@mui/material";
export default function ScrollButton({ executeScroll, showScrollButton }) {
  return (
    <>
      <Table>
        <button
          style={{
            display: !showScrollButton && "none",
            position: "fixed",
            top: "90%",
            right: "0px",
            appearance: "none",
            padding: "10px",
            background: "#ffffff88",
            border: " 1px solid #dddddd",
            fontSize: "larger",
            backdropFilter: "blur(5px)",
            zIndex: 999,
          }}
          onClick={() => executeScroll()}
        >
          ⇅
        </button>
      </Table>
    </>
  );
}
