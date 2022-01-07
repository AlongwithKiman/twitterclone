import React from "react";
import { Link } from "react-router-dom";
function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/twitterclone">Home</Link>
        </li>
        <li>
          <Link to="/twitterclone/profile">My Profile</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
