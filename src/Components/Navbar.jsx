import IsLoginNav from "./IsloginNav";
import AdminNav from "./adminNav";
import UserNav from "./UserNav";
import { UserContext } from "../context/UserContext";
import { useContext, useEffect, useState } from "react";

const Navbar = () => {
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    console.log(state);
  }, []);

  if (state.user.role === "admin") {
    return <AdminNav />;
  } else if (state.user.role === "user") {
    return <UserNav />;
  } else {
    return <IsLoginNav />;
  }
};

export default Navbar;
