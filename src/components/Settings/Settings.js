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
        localStorage.setItem("darkMode", "#000000");

    }

    function lightMode(){
        localStorage.setItem("darkMode", "#ffffff");

    }

    function ColourfulMode(){
        localStorage.setItem("darkMode", "#c7dcff");

    }

    return(
        <div style={{width:"98vw", height:"100vh"}}>
            <h3>App Options</h3>
            <div className = "optionInput">
                <h3>Display Settings</h3>
                <div> Current theme: {currentTheme}<br/>
                    <a href="/">

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
                <a href="/">
                <button style = {{textDecoration: "none",fontSize: Number(localStorage.getItem("fontSize")-3)}}id = "manualSubmitButton">
                    ☑ Apply font size
                </button>
                </a>
                <br/><br/>
            </div>
        </div>
    )

}