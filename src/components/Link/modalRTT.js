import React, { useState, useEffect, useRef } from "react";
import { Table } from "react-bootstrap";
import Box from "@mui/material/Box";
import {
  Button,
  LinearProgress,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";

export default function ModalRTT({ url, openRTT, setOpenRTT, style, data }) {
  const handleClose = () => setOpenRTT(false);

  useEffect(() => {
    console.log("openRTT", openRTT);
    console.log("data", data);
  }, [openRTT]);

  return (
    <>
      {data && (
        <Modal
          open={openRTT}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="transactions">
            <p style={{ margin: "5px" }}>Additional train details</p>
            <iframe
              className="transactions"
              style={{
                height: "270px",
                border: "0",
                marginTop: "3px",
                width: "99%",
                overflow: "scroll",
                maxHeight: "65vh",
              }}
              id="iFrameExample"
              src={
                "https://www.realtimetrains.co.uk/service/gb-nr:" +
                data.uid +
                "/" +
                data.rid.slice(0, 4) +
                "-" +
                data.rid.slice(4, 6) +
                "-" +
                data.rid.slice(6, 8) +
                "/detailed"
              }
            ></iframe>
          </Box>
        </Modal>
      )}
    </>
  );
}
