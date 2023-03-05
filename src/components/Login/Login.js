import React, {useState} from 'react';
import PropTypes from 'prop-types';
import videoBg from '../../assets/videoBg.mp4';

import './Login.css';

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

export default function Login({setToken}) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  localStorage.setItem('username',username);
 
  const handleSubmit = async e => {
    /*e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
    console.log(token, "is token");*/

    setToken({token: 'User'});
    console.log(username, "test");
  }
  
  return (
    <div className = "main">
      <div className = "overlay"></div>
      <video src={videoBg} autoPlay loop muted> </video>
      <div className="login-wrapper">     
        <div style ={{width: "100%", textAlign: "center"}} className = "divLoginInput1"> 
          <h1 style = {{color: "#2d9ba1"}} >Carbon Tracker</h1>
          <h2>Please Log In</h2>
        </div>
        
        <div style ={{width: "100%"}} className = "divLoginInput2">
          <form onSubmit={handleSubmit}>
            <label>
              <h4 className = "titles"><span>Username</span></h4>
              <input style = {{backgroundColor: "#fbfbfb", border: "0", borderRadius: "2px"}} type="text" onChange={e => setUserName(e.target.value)}/>
            </label>
            <label>
              <h4 className = "titles"><span>Password</span></h4>
              <input style = {{backgroundColor: "#fbfbfb", border: "0", borderRadius: "2px"}}type="password" onChange={e => setPassword(e.target.value)}/>  
            </label>
          </form>
          <div>
            <button id = "loginButton" type="submit" onClick = {handleSubmit}>Login {username} </button>
          </div>
        </div>
      </div>
    </div>

  )
}


Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }
