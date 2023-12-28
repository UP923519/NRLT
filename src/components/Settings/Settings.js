import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.js';
import Login, {} from '../Login/Login';
import useToken from '../App/useToken';
import byebye from '../App/App.js';

export let currentFontSize;
export let currentTheme;
export let currentAzure;
export let serviceCode;



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
    const [currentAzureDisplay, setCurrentAzureDisplay] = useState();
    const [serviceCodeDisplay, setServiceCodeDisplay] = useState();

    
    useEffect(() => {
        if(currentAzureDisplay == undefined){
            if (currentAzure == undefined){
                currentAzure = "External";
                setCurrentAzureDisplay("External");
            } else {
                setCurrentAzureDisplay (currentAzure);

            }
        }

        if(serviceCodeDisplay == undefined){
            if (serviceCode == undefined){
                serviceCode = "Hide";
                setServiceCodeDisplay("Hide");
            } else {
                setServiceCodeDisplay (serviceCode);

            }
        }

    }, []);


    function fontSizeIncrease(){
        setFontSize(fontSize + 2);
        localStorage.setItem("fontSize", 18);
    }

    function fontSizeDecrease(){
        setFontSize(fontSize - 2);
        localStorage.setItem("fontSize", 11);

    }

    
    function fontSizeReset(){
        setFontSize(fontSize - 2);
        localStorage.setItem("fontSize", 16);

    }


    function darkMode(){
        localStorage.setItem("darkMode", "#000000");
        window.location.reload();

    }

    function lightMode(){
        localStorage.setItem("darkMode", "#ffffff");
        window.location.reload();

    }

    function ColourfulMode(){
        localStorage.setItem("darkMode", "#8297b5");
        window.location.reload();

    }

    function logOut(){
        removeToken();
        window.location.reload();
    }

    function applyFont(){
        window.location.reload();
    }

    function changeAzure(){
    if (currentAzure == "Local" ){
        currentAzure = "External";
        setCurrentAzureDisplay("External");
    }
     else if (currentAzure == "External"){
        currentAzure = "Local";

        setCurrentAzureDisplay("Local");
    }
    if (currentAzure == undefined){
        currentAzure = "External";

        setCurrentAzureDisplay("External");


    }


    }

    function showServiceCode(){
        if (serviceCode == "Show" ){
            serviceCode = "Hide";
            setServiceCodeDisplay("Hide");
        }
         else if (serviceCode == "Hide" ){
            serviceCode = "Show";
            setServiceCodeDisplay("Show");
        }
        if (serviceCode == undefined){
            serviceCode = "Hide";
            setServiceCodeDisplay("Hide");
        }    
        }


    return(
        <div style={{width:"98vw", height:"100vh"}}>
            <h3 style={{textAlign:"center"}}>Options</h3>
            <div className = "topBanner1">
                <h4>
                <button id="showHide" style={{fontSize:"medium", padding:"15px"}}className = "logOut" onClick={logOut}>
                ￩ Exit to home page
                </button></h4>
            </div>
            <br/>
            <div className = "optionInput" style={{background:"#b9ebe5"}}>
                <h3>Data Settings</h3>
                <div> Azure server: {currentAzureDisplay} owner<br/>
                <button id = "useCurrentLocation" onClick={changeAzure}>
                            Use Local / External Azure
                        </button>
                </div>
                <br/>
                <div> Show service code in departures/arrivals: {serviceCodeDisplay}<br/>
                <button id = "useCurrentLocation" onClick={showServiceCode}>
                            Show/hide
                </button>
                </div>
                <br/>
            </div>
            <br/><br/>
            <div className = "optionInput">
                <h3>Display Settings</h3>
                <div> Theme: {currentTheme}<br/>

                        <button id = "useCurrentLocation" onClick={darkMode}>
                            Dark mode
                        </button>
                        <button id = "useCurrentLocation" onClick={lightMode}>
                            Light mode
                        </button><br/>
                        <button id = "useCurrentLocation" onClick={ColourfulMode}>
                            Colourful mode
                        </button>
                </div>
                <br/>

                <div> Font size: {currentFontSize}<br/>
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
                <button style = {{textDecoration: "none",fontSize: Number(localStorage.getItem("fontSize")-5)}} 
                id = "manualSubmitButton"
                onClick={applyFont}
                >
                    ☑ Apply font size
                </button>
                <br/><br/>
            </div>
            <br/><br/>

        </div>
    )

}