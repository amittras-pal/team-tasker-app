import React from "react";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="authenticated">
      <h3>Add Navbar Here</h3>
      <Outlet />
    </div>
  );
};

export default Home;
