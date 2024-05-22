import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom"; // Import useHistory

import Vigilante from "../components/Vigilante";
import Admin from "../components/Admin";

export default function Main() {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState(""); // Add username state
  const history = useHistory(); // Initialize useHistory

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        setRole(response.data.user[0].role);
        setUsername(response.data.user[0].username); // Set username
      }
    });
  }, []);

  const logout = () => {
    Axios.get("http://localhost:3001/logout").then((response) => {
        setRole("");
        setUsername(""); // Clear username
        history.push("/registration"); // Redirect to /registration after successful logout
    });
  };

  return (
    <div>
      {role == "vigilante" && <Vigilante />}
      {role == "admin" && <Admin username={username} />}
      <button onClick={logout}>Logout</button> {/* Logout button */}
    </div>
  );
}