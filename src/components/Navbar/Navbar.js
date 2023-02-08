import React from "react";
import { BrowserRouter, Route, Routes, Link, Navigate, NavLink } from 'react-router-dom';

import App from '../App/App.css';
import LinkPage from '../Link/LinkPage';
import Product from '../Product/Product';
import Dashboard from '../Dashboard/Dashboard';
import Preferences from '../Preferences/Preferences';
import Settings from '../Settings/Settings.js';


//const navbar = {backgroundColor: '#9edbd3'};


const Navbar = () => {
  return (
    <BrowserRouter>
      <navbar className = "NavBar1" >
        <NavLink exact className = "topRow2" activeClassName = "topRow2Active" to="/dashboard">Dashboard</NavLink>
        <NavLink className = "topRow2" activeClassName = "topRow2Active" to="/preferences">Transactions</NavLink>
        <NavLink className = "topRow2" activeClassName = "topRow2Active" to="/linkPage">Energy</NavLink>
        <NavLink className = "topRow2" activeClassName = "topRow2Active" to="/product">Journeys</NavLink>
        <NavLink className = "topRow2" activeClassName = "topRow2Active" to="/settings">Settings</NavLink>
      </navbar>

        <Routes>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/preferences" element={<Preferences/>} />
          <Route path="/linkPage" element={<LinkPage/>} />
          <Route path="/product" element={<Product/>} />
          <Route path="/settings" element={<Settings/>} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route
            path="*"
            element={
              <div>
                <h2>404 - Page not found</h2>
                <h3>Sorry, this page doesn't exist here</h3>
                <NavLink exact className = "backHome" activeClassName = "topRow2Active" to="/dashboard">Back to Home</NavLink>

              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    
  );
};

export default Navbar;