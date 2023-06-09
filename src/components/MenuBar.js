import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

import { AuthContext } from "../context/auth";

function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;
  let path = "/";
  if (pathname === "/") {
    path = "home";
  } else if (pathname === "/Login") {
    path = "login";
  } else {
    path = "register";
  }

  const [activeItem, setActiveItem] = useState(path);
  useEffect(() => {
    setActiveItem("home");
  }, [logout]);
  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item name={user.username} active as={Link} to="/" />
      <Menu.Menu position="right">
        <Menu.Item name="logout" onClick={logout} />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/Login"
        />
      </Menu.Menu>
      <Menu.Item
        name="register"
        active={activeItem === "register"}
        onClick={handleItemClick}
        as={Link}
        to="/Register"
      />
    </Menu>
  );
  return menuBar;
}

export default MenuBar;
