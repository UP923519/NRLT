import React, { Component } from "react";
import { RealTimeData } from "./realTImeData";
import { RealTimeDataAll } from "./realTImeDataAll";


export class ViewAllData extends Component {
  constructor() {
    super();
    this.state = {
      showHideFName: true,
      showHideLName: false
    };
    this.hideComponent = this.hideComponent.bind(this);
  }

  hideComponent(name) {
    switch (name) {
      case "showHideFName":
        this.setState({ showHideFName: !this.state.showHideFName });
        break;
      case "showHideLName":
        this.setState({
            showHideLName: !this.state.showHideLName,
            showHideFName: !this.state.showHideFName
        });
        break;

    }
  }

  render() {
    const { showHideFName, showHideLName } = this.state;
    return (
      <div>
          {showHideFName && (
            <tr>
              <td><RealTimeData/></td>
            </tr>
          )}
          {showHideLName && (
            <tr>
              <td><RealTimeDataAll/></td>

            </tr>
          )}
          {showHideFName && showHideLName && (
            <tr>

            </tr>
          )}
              <button style={{fontSize: "15px"}} id="showHide" onClick={() => this.hideComponent("showHideLName")}>
                ↕ Show/hide all transactions
              </button>
              <br/><br/>
      </div>
    );
  }
}