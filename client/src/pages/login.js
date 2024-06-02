// Login.js
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const history = useHistory();

  Axios.defaults.withCredentials = true;

  const login = (event) => {
    event.preventDefault();
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data[0].username);
        history.push("/home"); // Redirige al usuario a la página de inicio después de un inicio de sesión exitoso
      }
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
        <div className="login">
            <form action="" className="login__form" onSubmit={login}>
            <h1 className="login__title">Login</h1>

            <div className="login__content">
                <div className="login__box">
                <i className="ri-user-3-line login__icon"></i>

                <div className="login__box-input">
                    <input type="text" required className="login__input" id="login-email" placeholder=" " 
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                    />
                    <label htmlFor="login-email" className="login__label">Username</label>
                </div>
                </div>

                <div className="login__box">
                <i className="ri-lock-2-line login__icon"></i>

                <div className="login__box-input">
                    <input type="password" required className="login__input" id="login-pass" placeholder=" " 
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    />
                    <label htmlFor="login-pass" className="login__label">Password</label>
                    <i className="ri-eye-off-line login__eye" id="login-eye"></i>
                </div>
                </div>
            </div>

            <button type="submit" className="login__button">Login</button>
            <button className="login__button"  onClick={() => history.push('/registration')}>Register</button>
            </form>
        <h1>{loginStatus}</h1>

        </div>
    </div>
  );
}