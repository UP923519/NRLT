import React, {useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import videoBg from '../../assets/videoBg.mp4';
import {ref, onValue, query, set, orderByChild} from "firebase/database";
import StartFirebase from "../DataFeed/firebase";
import bcrypt from 'bcryptjs'

import './Login.css';

const db = StartFirebase();
let records = [];
const salt = bcrypt.genSaltSync(10);
let first_promise;

var passwFormat=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;


async function getPassWord(username){
  console.log("username is ", username);
  const dbref = query(ref(db, username+"Login"));
  records = [];
  onValue(dbref, (snapshot)=>{
    snapshot.forEach(childSnapshot => {
        let keyName = childSnapshot.key;
        let data = childSnapshot.val();
        records.push({"date": keyName, "data":data})
        console.log("datais", data)
    });
  });
  return records;
}

export var first_function = function(username) {
  let t = getPassWord(username);
  return new Promise(resolve => {
      setTimeout(function() {
      resolve(t);
      console.log("Returned first promise");
      }, 0);
  });
  };

async function verifyUser(username, hashedPassword) {
  first_promise = await first_function(username);
    try {
      let test = first_promise[0].data.Password;
      console.log ("promise is", first_promise[0].data.Password);
      alert("An error occurred, please try again.");
    } catch (error) {
      set(ref(db, username+"Login"+"/"+"Login"+"/"),
      {
          Password: hashedPassword
      });
      alert("This account does not exist, a new account has been created.\nPlease remember your details. \nPlease log in now.");
    
    }
}

export default function Login({setToken}) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  localStorage.setItem('username',username);
  let records = [];
  let recordsCheck = [];
  let savedPassword2;
  let hashedPassword;

  useEffect(() => {
  });
  localStorage.setItem('username',username);

    
  const dbref = query(ref(db, username+"Login"));
  onValue(dbref, (snapshot)=>{
    snapshot.forEach(childSnapshot => {
        let keyName = childSnapshot.key;
        let data = childSnapshot.val();
        records.push({"date": keyName, "data":data})   
        savedPassword2 = data.Password; 
    });
  }, []);

  const handleSubmit = async e => {
    if (password != undefined){
      hashedPassword = bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u');
    }
        try {
          let testPW = records[0].data.Password;
          if (testPW == hashedPassword && savedPassword2 == hashedPassword && username != undefined && username != "" && password != "" && password != undefined){
            console.log("passwords do match");
            setToken({token: 'User'});
          } else {
            console.log ("passwords don't match");
            console.log ("Entered is: ", hashedPassword);
            console.log ("Saved is: ", testPW);
            console.log ("Saved2 is: ", savedPassword2);
            if (password == "" || password == undefined){
              alert("Password field cannot be blank");
            } else if (!password.match(passwFormat)) {
              alert("Passwords must be between 8 to 15 characters which contains at least one numeric digit and a special character\nNo account? Try a new username/password combination");
            } else {
              alert("Incorrect username or password\nNo account? Try a new username/password combination");
            }
          }
        } catch (error) {
          console.error(error);
          //alert("Account doesn't exist.");
          if (password == "" || password == undefined){
            alert("Password field cannot be blank");
          } else if (!password.match(passwFormat)) {
            alert("Passwords must be between 8 to 15 characters which contains at least one numeric digit and a special character");
          } else {
            verifyUser(username, hashedPassword);         
          }
        }
  }

  return (
    <div className = "main">
      <div className = "overlay"></div>
      <video src={videoBg} autoPlay muted> </video>
      <div className="login-wrapper">     
        <div className = "divLoginInput1"> 
          <h1 style = {{color: "#2d9ba1"}} >National Rail Live</h1>
          <h2>Please Log In</h2>
        </div>
        
        <div className = "divLoginInput2">
          <form onSubmit={handleSubmit}>
            <label>
              <h4 className = "titles"><span>Username</span></h4>
              <input style = {{backgroundColor: "#fbfbfbb9", border: "0", borderRadius: "2px"}} type="text" onChange={e => setUserName(e.target.value)}/>
            </label>
            <label>
              <h4 className = "titles"><span>Password</span></h4>
              <input style = {{backgroundColor: "#fbfbfbb9", border: "0", borderRadius: "2px"}}type="password" onChange={e => setPassword(e.target.value)}/>  
            </label>
          </form>
          <div>
            <button id = "loginButton" type="submit" onClick = {handleSubmit}>￫ Log In {username} / Sign Up</button>
          </div>
        </div>
      </div>
    </div>

  )
}


Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }
