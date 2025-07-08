import React, { useState, useEffect, useRef } from "react";
import { Table } from "react-bootstrap";
import Fade from "react-reveal/Fade";
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

  return (
    <>
      {data && (
        <Modal
          open={openRTT}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          slotProps={{
            backdrop: {
              sx: {
                //Your style here....
                backgroundColor: "#ffffff55",
                backdropFilter: "blur(3px)",
              },
            },
          }}
        >
          <div>
            <Box sx={style} className="transactions">
              <Fade top duration={500} distance={"100px"}>
                <button
                  onClick={handleClose}
                  style={{
                    position: "absolute",
                    border: "none",
                    background: "none",
                    // backdropFilter: "blur(12px)",
                    paddingBottom: "3px",
                    // position: "sticky",
                    top: "5px",
                    left: "91%",
                    fontSize: "larger",
                    color:
                      localStorage.getItem("darkMode") == "#000000"
                        ? "grey"
                        : "#8f8f8f",
                    borderRadius: "100%",
                    zIndex: "1",
                  }}
                >
                  (x)
                </button>
                <Fade top distance={"100px"} duration={500}>
                  <Typography
                    style={{ marginTop: "-15px" }}
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{ paddingTop: "25px", paddingBottom: "5px" }}
                  >
                    Additional train details
                  </Typography>
                </Fade>
                <iframe
                  className="transactions"
                  style={{
                    height: "270px",
                    border: "0",
                    marginTop: "3px",
                    width: "99%",
                    overflow: "scroll",
                    maxHeight: "65vh",
                    background: "#467083",
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
              </Fade>
            </Box>
          </div>
        </Modal>
      )}
    </>
  );
}
