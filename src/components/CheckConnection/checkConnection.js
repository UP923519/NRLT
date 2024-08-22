import React from "react";
import useNetworkStatus from "check-user-network-status";

export function CheckConnection() {
  const networkStatus = useNetworkStatus();
  if (networkStatus === false)
    return (
      <div>
        <p className="highlights" style={{ fontSize: "large" }}>
          <br />
          No internet connection
          <br />
          <br />
        </p>
        <br />
      </div>
    );
}
