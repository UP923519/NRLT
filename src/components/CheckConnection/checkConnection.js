import React from "react";
import { Detector, Online, Offline } from "react-detect-offline";

export function CheckConnection() { 
    return (
        
            <div>
              <Online></Online>
              <Offline><p className = "highlights" style = {{fontSize: "large"}}><br/>No internet connection<br/><br/></p><br/></Offline>
            </div>
    )
}