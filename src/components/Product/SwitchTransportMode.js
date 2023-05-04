import React, { Component } from "react";
import { BrowserRouter, Route, Routes, Link, Navigate, NavLink } from 'react-router-dom';

import Navbar from '../Navbar/Navbar.js';
import "../App/App.css"
import { InputLocation } from './InputLocation';
import { InputLocationCar } from './InputLocationCar';
import { InputLocationFlight } from './InputLocationFlight';
import { InputLocationBus } from './InputLocationBus';

import { GetMiles } from './GetMiles';



export class SwitchTransportMode extends Component {
  constructor() {
    super();
    this.state = {
      showHideRail: true,
      showHideCar: false,
      showHideBus: false,
      showHideFlight: false,
      isFirstActive: true,
      isSecondActive: false,
      isThirdActive: false,
      isFourthActive: false
    };
    this.hideComponent = this.hideComponent.bind(this);
  }

  handleFirstClick = () => {
    this.setState(({ isFirstActive }) => ({ 
      isFirstActive: !isFirstActive 
    }));

    this.setState({ 
      isSecondActive: false,
      isThirdActive: false,
      isFourthActive: false
    });
  };

  handleSecondClick = () => {
    this.setState(({ isSecondActive }) => ({
      isSecondActive: !isSecondActive,      
    }));
    this.setState({ 
      isFirstActive: false,
      isThirdActive: false,
      isFourthActive: false
    });
  };

  handleFourthClick = () => {
    this.setState(({ isFourthActive }) => ({
      isFourthActive: !isFourthActive
    }));
    this.setState({ 
      isSecondActive: false,
      isThirdActive: false,
      isFirstActive: false
    });
  };

  handleThirdClick = () => {
    this.setState(({ isThirdActive }) => ({
      isThirdActive: !isThirdActive
    }));
    this.setState({ 
      isSecondActive: false,
      isFourthActive: false,
      isFirstActive: false
    });
  };

  hideComponent(name) {

    switch (name) {
      case "showHideRail":
        this.setState({ 
          showHideCar: false,
          showHideRail: !this.state.showHideRail,
          showHideBus: false,
          showHideFlight: false,
          isSecondActive: false,
          isThirdActive: false,
          isFourthActive: false
        });
        this.setState(({ isFirstActive }) => ({ isFirstActive: !isFirstActive }));
        break;
      case "showHideCar":
        this.setState({
            showHideCar: !this.state.showHideCar,
            showHideRail: false,
            showHideBus: false,
            showHideFlight: false,
            isFirstActive: false,
            isThirdActive: false,
            isFourthActive: false
        });
        this.setState(({ isSecondActive }) => ({ isSecondActive: !isSecondActive }));

        break;
      case "showHideBus":
        this.setState({
            showHideCar: false,
            showHideRail: false,
            showHideBus: !this.state.showHideBus,
            showHideFlight: false,
            isSecondActive: false,
            isFourthActive: false,
            isFirstActive: false
        });
        this.setState(({ isThirdActive }) => ({ isThirdActive: !isThirdActive }));
        break;
      case "showHideFlight":
        this.setState({
            showHideCar: false,
            showHideRail: false,
            showHideBus: false,
            showHideFlight: !this.state.showHideFlight,
            isSecondActive: false,
            isThirdActive: false,
            isFirstActive: false
        });
        this.setState(({ isFourthActive }) => ({ isFourthActive: !isFourthActive }));
        break;
    }
  }

  render() {
    const { isFirstActive, isSecondActive, isThirdActive, isFourthActive } = this.state;
    const { showHideRail, showHideCar, showHideBus, showHideFlight } = this.state;
    return (
      <div>
        <br/>
          <div className="animation-buttons">
            <navbar className= "switchMode">
                <NavLink  className= {isFirstActive ? "btn-animation" : "active-animation"} onClick={() => this.hideComponent("showHideRail")+this.handleFirstClick && "(active)"}>
                  Rail{isFirstActive}
                </NavLink>
                <NavLink  className={isSecondActive ? "btn-animation" : "active-animation"} onClick={() => this.hideComponent("showHideCar")+this.handleSecondClick && "(active)"}>
                  Car{isSecondActive}
                </NavLink>
                <NavLink  className={isThirdActive ? "btn-animation" : "active-animation"} onClick={() => this.hideComponent("showHideBus")+this.handleThirdClick && "(active)"}>
                  Bus{isThirdActive}
                </NavLink>
                <NavLink  className={isFourthActive ? "btn-animation" : "active-animation"} onClick={() => this.hideComponent("showHideFlight")+this.handleFourthClick && "(active)"}>
                  Flight{isFourthActive}
                </NavLink>
            </navbar>
          </div>
            <br/>
            {showHideRail && (

                  <p>
                    <InputLocation/>
                  </p>

            )}
            {showHideCar && (

                  <p>
                    <InputLocationCar/>
                  </p>

            )}
            {showHideBus && (

                  <p>
                    <InputLocationBus/>
                  </p>

            )}
            {showHideFlight && (

                  <p>
                    <InputLocationFlight/>
                  </p>

            )}
            {showHideRail && showHideCar && showHideBus && showHideFlight &&(
              <tr>
              </tr>
            )}
      </div>
    );
  }
}