import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <Link to="/" className="font-bold">MovieApp</Link>
      <div>
        <Link to="/favorites" className="mr-4">Favorites</Link>
        <Link to="/recommended">Recommended</Link>
      </div>
    </nav>
  );
};

export default Navbar;
