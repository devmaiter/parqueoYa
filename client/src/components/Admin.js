import React from "react";

export default function Admin({ username }) { // Add username as a prop
  return (
    <div>
      <h1>Admin: {username}</h1> {/* Print the username */}
      <img src="https://www.facebook.com/images/fb_icon_325x325.png" />
    </div>
  );
}