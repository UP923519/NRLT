import React, {useState} from 'react';
import PropTypes from 'prop-types';
//import videoBg from '../../assets/videoBg.mp4';
import {ref, onValue, query, set, orderByChild} from "firebase/database";
import StartFirebase from "../DataFeed/firebase";
import bcrypt from 'bcryptjs'

import './Login.css';

const db = StartFirebase();
let records = [];
const salt = bcrypt.genSaltSync(10);
let first_promise;


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
      }, 1000);
  });
  };


async function loginUser(credentials) {
  console.log(credentials, "test2");
    return fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

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
      alert("This account does not exist, a new account has been created.\nPlease remember your details.");
    
    }
}

export default function Login({setToken}) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  localStorage.setItem('username',"Peter");
  let records = [];
  let recordsCheck = [];
  let savedPassword2;
  let hashedPassword;

  setToken({token: 'User'});

  const handleSubmit = async e => {
    /*e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
    console.log(token, "is token");*/

    //const dbref = ref(db, user2);
    const dbref = query(ref(db, username+"Login"));
    if (password != undefined){
      hashedPassword = bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u');
    }

    onValue(dbref, (snapshot)=>{
        snapshot.forEach(childSnapshot => {
            let keyName = childSnapshot.key;
            let data = childSnapshot.val();
            records.push({"date": keyName, "data":data})   
            savedPassword2 = data.Password;    
        });
    });

    setTimeout(
      function() {
        try {
          let test = records[0].data.Password;
        } catch (error) {
          console.error(error);
          console.log("account doesn't exist");

          onValue(dbref, (snapshot)=>{
            snapshot.forEach(childSnapshot => {
                let keyName = childSnapshot.key;
                let data = childSnapshot.val();
                recordsCheck.push({"date": keyName, "data":data})   
            });
            console.log("account doesn't exist check 2");

          });

          try {
            let test = recordsCheck[0].data.Password;
          } catch (error) {
            console.error(error);
          }

          if (username != undefined && username != "" && password != "" && password != undefined){
            setTimeout(
              function() {
                verifyUser(username, hashedPassword);
              }
              .bind(this),2000
              );
            } else{
            alert("Username and password fields cannot be blank.")
          }
          
        }
    
        let savedPassword = records[0].data.Password;

        if (savedPassword == hashedPassword && savedPassword2 == hashedPassword && username != undefined && username != "" && password != "" && password != undefined){
          console.log("passwords do match");
          setToken({token: 'User'});
        } else {
          console.log ("passwords don't match");
          console.log ("Entered is: ", hashedPassword);
          console.log ("Saved is: ", savedPassword);
          console.log ("Saved2 is: ", savedPassword2);


          if (password == "" || password == undefined){
            alert("Password field cannot be blank");
          } else {
            alert("Incorrect username or password");
          }
        }
      

      }
      .bind(this),
      500
    );

  }

  return (
    <div className = "main">
      <div className = "overlay"></div>
      <div className="login-wrapper">     
        <div className = "divLoginInput1"> 
          <h1 style = {{color: "#2d9ba1"}} >Carbon Tracker</h1>
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
            <button id = "loginButton" type="submit" onClick = {handleSubmit}>￫ Log In {username} </button>
          </div>
        </div>
      </div>
    </div>

  )
}


Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }
