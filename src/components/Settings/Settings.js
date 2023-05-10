import React, {useState} from 'react';
import { Link } from 'react-router-dom';

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
    currentFontSize = "Increased font size"
} 
if (localStorage.getItem("fontSize") == 11){
    currentFontSize = "Decreased font size"
} 

if (localStorage.getItem("darkMode") == null){
    currentTheme = "Colourful theme"
} 
if (localStorage.getItem("darkMode") == "#ffffff"){
    currentTheme = "Light theme"
} 
if (localStorage.getItem("darkMode") == "#c7dcff"){
    currentTheme = "Colourful theme"
} 

export default function Settings(){
    const [fontSize, setFontSize] = useState(16);

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
        localStorage.setItem("darkMode", "#c7dcff");

    }

    function lightMode(){
        localStorage.setItem("darkMode", "#ffffff");

    }

    return(
        <div style={{width:"98vw", height:"100vh"}}>
            <h3>App Options</h3>
            <div className = "optionInput">
                <h3>Display Settings</h3>
                <div> Current theme: {currentTheme}<br/>
                    <a href="/IOTSystem">
                        <button id = "useCurrentLocation" onClick={darkMode}>
                            Colourful mode
                        </button>
                        <button id = "useCurrentLocation" onClick={lightMode}>
                            Light mode
                        </button>
                    </a>
                </div>
                <br/>
                <div> Current font size: {currentFontSize}<br/>
                    <button id = "useCurrentLocation" onClick={fontSizeIncrease}>
                        + Increased font size
                    </button>
                    <button id = "useCurrentLocation" onClick={fontSizeDecrease}>
                        - Decreased font size
                    </button><br/> 
                    <button id = "useCurrentLocation" onClick={fontSizeReset}>
                        Standard font size
                    </button><br/>
        
                </div>
                <br/>
                <a href="/IOTSystem">
                <button style = {{textDecoration: "none"}}id = "manualSubmitButton">
                    ☑ Apply
                </button>
                </a>
                <p style = {{fontSize: Number(localStorage.getItem("fontSize"))}}>
                    Example text to test font size
                </p><br/>
            </div>
        </div>
    )

}