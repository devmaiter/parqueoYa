import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../App.css";
import { useHistory } from "react-router-dom"; // Import useHistory

export default function Registration() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [roleReg, setRoleReg] = useState(""); // New state for role

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const history = useHistory(); // Initialize useHistory

  Axios.defaults.withCredentials = true;

  const register = () => {
    Axios.post("http://localhost:3001/register", {
      username: usernameReg,
      password: passwordReg,
      role: roleReg, // Include role in the request
    }).then((response) => {
      console.log(response);
    });
  };



  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginStatus(response.data.user[0].username);
      }
    });
  }, []);

  return (
    <div className="App">
      <div className="registration">
        <form action="" className="login__form">
          <h1 className="login__title">Registration</h1>

          <div className="login__content">
            <div className="login__box">
              <i className="ri-user-3-line login__icon"></i>

              <div className="login__box-input">
                <input type="text" required className="login__input" id="register-username" placeholder=" " 
                  onChange={(e) => {
                    setUsernameReg(e.target.value);
                  }}
                />
                <label htmlFor="register-username" className="login__label">Username</label>
              </div>
            </div>

            <div className="login__box">
              <i className="ri-lock-2-line login__icon"></i>

              <div className="login__box-input">
                <input type="password" required className="login__input" id="register-password" placeholder=" " 
                  onChange={(e) => {
                    setPasswordReg(e.target.value);
                  }}
                />
                <label htmlFor="register-password" className="login__label">Password</label>
              </div>
            </div>

            <div className="login__box">
              <i className="ri-user-3-line login__icon"></i>

              <div className="login__box-input">
                <input type="text" required className="login__input" id="register-role" placeholder=" " 
                  onChange={(e) => {
                    setRoleReg(e.target.value);
                  }}
                />
                <label htmlFor="register-role" className="login__label">Role</label>
              </div>
            </div>
          </div>
          
          <button className="login__button"  onClick={() => history.push('/Login')}>Login</button>

          <button type="submit" className="login__button" onClick={register}>Register</button>
        </form>
      </div>



      <h1>{loginStatus}</h1>
    </div>
  );
}