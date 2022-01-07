import { authService } from "fbase";
import React from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/twitterclone");
  };
  return (
    <>
      <span>Profile</span>
      <button onClick={onLogOutClick}>Sign Out</button>
    </>
  );
}
export default Profile;
