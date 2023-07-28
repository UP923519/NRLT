import React, { useEffect } from "react";
import Navbar from '../Navbar/Navbar.js';
import Login, {} from '../Login/Login';
import useToken from './useToken';

import Nimage from '../../assets/NationalRailLogo.png';


export const theUser = localStorage.getItem('username');


if (localStorage.getItem("fontSize") == null){
  localStorage.setItem("fontSize", 16);
}

let backGroundColour = "#edf8ff";
let colour = "black";


if (localStorage.getItem("darkMode") == "#000000"){
  console.log("darkModeActive");
  backGroundColour = "#c1ecf0";
  colour = "#ffffff";
}


<style name="MyTheme" parent="Theme.AppCompat.Light.NoActionBar">
    <item name="android:windowLightStatusBar">true</item>
    <item name="android:statusBarColor">@android:color/white</item>
</style>


function App() {
  const { token, setToken, removeToken, getToken} = useToken();
  const greeting = "greeting";
  const displayAction = false;

  useEffect(() => {
    document.body.style.backgroundColor = (localStorage.getItem("darkMode"));
  }, []);

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (   
    <div className="wrapper" style = {{fontSize: Number(localStorage.getItem("fontSize")), backgroundColor: localStorage.getItem("darkMode"), color: colour}}>
      <p><img src={Nimage} alt="powered by National Rail Enquiries" width="85" /></p>

      <h2 className = "titleClass" style = {{color: "#2d9ba1", backgroundColor:backGroundColour, borderRadius:"20px"}}>National Rail Live</h2>


      <br/>
      <div>
        <Navbar />
      </div>

    </div>
  );
}

export default App;


