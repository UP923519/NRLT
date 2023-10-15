import React from "react";
import { Detector, Online, Offline } from "react-detect-offline";

export function CheckConnection() { 
    return (
        
            <div>
              <Online></Online>
              <Offline>No internet connection</Offline>
            </div>
    )
}