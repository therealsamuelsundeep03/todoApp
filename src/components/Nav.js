import React from "react";
import { Button } from "react-bootstrap";

import useAuth from "../hooks/useAuth";

import { useNavigate } from "react-router-dom";

const Nav = () => {
  const user = useAuth();
  const navigate = useNavigate();

  const style = {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
  };

  return (
    <>
      <div className="nav" style={style}>
        <div>TODO</div>
        {/*  if user logged in only then show logout button */}
        {user?.length && (
          <Button
            variant="primary"
            className="sm-3"
            style={{width:'7rem'}}
            onClick={() => {
                // remove the user from the local storage on user log out
                localStorage.removeItem("user");
                navigate('/login');
            }}
          >
            Logout
          </Button>
        )}
      </div>
    </>
  );
};

export default Nav;
