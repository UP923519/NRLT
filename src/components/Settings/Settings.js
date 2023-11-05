import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.js';
import Login, {} from '../Login/Login';
import useToken from '../App/useToken';
import byebye from '../App/App.js';

export let currentFontSize;
export let currentTheme;

console.log (localStorage.getItem("darkMode"));

if (localStorage.getItem("fontSize") == null){
    currentFontSize = "Standard font size"
} 

if (localStorage.getItem("fontSize") == 16){
    currentFontSize = "Standard font size"
} 
if (localStorage.getItem("fontSize") == 18){
    currentFontSize = "Large font size"
} 
if (localStorage.getItem("fontSize") == 11){
    currentFontSize = "Small font size"
} 

if (localStorage.getItem("darkMode") == null){
    currentTheme = "Light"
} 
if (localStorage.getItem("darkMode") == "#ffffff"){
    currentTheme = "Light"
} 
if (localStorage.getItem("darkMode") == "#000000"){
    currentTheme = "Dark"
} 
if (localStorage.getItem("darkMode") == "#c7dcff"){
    currentTheme = "Colourful"
    localStorage.setItem("darkMode", "#8297b5");
} 
if (localStorage.getItem("darkMode") == "#8297b5"){
    currentTheme = "Colourful"
} 

export default function Settings(){
    const [fontSize, setFontSize] = useState(16);
    const { token, setToken, removeToken, getToken} = useToken();
    


    function fontSizeIncrease(){
        setFontSize(fontSize + 2);
        localStorage.setItem("fontSize", 18);
        console.log (localStorage.getItem("fontSize"));
    }

    function fontSizeDecrease(){
        setFontSize(fontSize - 2);
        localStorage.setItem("fontSize", 11);
        //console.log (localStorage.getItem("fontSize"));

    }

    
    function fontSizeReset(){
        setFontSize(fontSize - 2);
        localStorage.setItem("fontSize", 16);
        console.log (localStorage.getItem("fontSize"));

    }


    function darkMode(){
        localStorage.setItem("darkMode", "#000000");

    }

    function lightMode(){
        localStorage.setItem("darkMode", "#ffffff");

    }

    function ColourfulMode(){
        localStorage.setItem("darkMode", "#8297b5");

    }

    function logOut(){
        removeToken();
        window.location.reload();
    }

    return(
        <div style={{width:"98vw", height:"100vh"}}>
            <br/>

            <div className = "topBanner1">
                <h4>
                <button id="showHide" style={{fontSize:"medium"}}className = "logOut" onClick={logOut}>
                ￩ Exit to home page
                </button></h4>
            </div>
            <br/>
            <div className = "optionInput">
                <h3>Display Settings</h3>
                <div> Current theme: {currentTheme}<br/>
                    <a href="/NRLT">

                        <button id = "useCurrentLocation" onClick={darkMode}>
                            Dark mode
                        </button>
                        <button id = "useCurrentLocation" onClick={lightMode}>
                            Light mode
                        </button><br/>
                        <button id = "useCurrentLocation" onClick={ColourfulMode}>
                            Colourful mode
                        </button>
                    </a>
                </div>
                <br/>
                <div> Current font size: {currentFontSize}<br/>
                    <button id = "useCurrentLocation" onClick={fontSizeIncrease}>
                        + Large font size
                    </button>
                    <button id = "useCurrentLocation" onClick={fontSizeDecrease}>
                        - Small font size
                    </button><br/> 
                    <button id = "useCurrentLocation" onClick={fontSizeReset}>
                        Standard font size
                    </button><br/>
        
                </div>
                <p style = {{fontSize: Number(localStorage.getItem("fontSize"))}}>
                    Example text to test font size
                </p>
                <a href="/NRLT">
                <button style = {{textDecoration: "none",fontSize: Number(localStorage.getItem("fontSize")-3)}}id = "manualSubmitButton">
                    ☑ Apply font size
                </button>
                </a>
                <br/><br/>
            </div>
        </div>
    )

}