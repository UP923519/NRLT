import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import videoBg from "../../assets/videoBg.mp4";
import { ref, onValue, query, set, orderByChild } from "firebase/database";
import StartFirebase from "../DataFeed/firebase";
import bcrypt from "bcryptjs";
import Fade from "react-reveal/Fade";

import "./Login.css";

const db = StartFirebase();
let records = [];
const salt = bcrypt.genSaltSync(10);
let first_promise;

var passwFormat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;

async function getPassWord(username) {
  const dbref = query(ref(db, username + "Login"));
  records = [];
  onValue(dbref, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      let keyName = childSnapshot.key;
      let data = childSnapshot.val();
      records.push({ date: keyName, data: data });
    });
  });
  return records;
}

export var first_function = function (username) {
  let t = getPassWord(username);
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve(t);
    }, 0);
  });
};

async function verifyUser(username, hashedPassword) {
  first_promise = await first_function(username);
  try {
    let test = first_promise[0].data.Password;
    alert("An error occurred, please try again.");
  } catch (error) {
    set(ref(db, username + "Login" + "/" + "Login" + "/"), {
      Password: hashedPassword,
    });
    alert(
      "This account does not exist, a new account has been created.\nPlease remember your details. \nPlease log in now."
    );
  }
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  //localStorage.setItem('username',username);
  let records = [];
  let savedPassword2;

  useEffect(() => {});
  localStorage.setItem("username", username);

  const dbref = query(ref(db, username + "Login"));
  onValue(
    dbref,
    (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        let keyName = childSnapshot.key;
        let data = childSnapshot.val();
        records.push({ date: keyName, data: data });
        savedPassword2 = data.Password;
      });
    },
    []
  );

  const handleSubmit = async (e) => {
    setToken({ token: "User" });
  };

  return (
    <Fade top distance={"25px"} duration={1500}>
      <div className="main">
        <div className="overlay"></div>
        <video src={videoBg} autoPlay muted>
          {" "}
        </video>
        <div className="login-wrapper">
          <div className="divLoginInput1">
            <h1 style={{ color: "#2d9ba1" }}>National Rail Live</h1>
            <h2>Welcome!</h2>
          </div>

          <div className="divLoginInput2">
            <div>
              <button id="loginButton" type="submit" onClick={handleSubmit}>
                ￫ Enter {username}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
