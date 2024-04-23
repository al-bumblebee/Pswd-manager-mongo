import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-purple-200">
      <div className="mycontainer flex justify-between items-center h-14 px-4 py-5">
        <div className="logo font-bold">Pswd-Manager</div>
        <button>
          <span className="font-bold gap-4">  Github</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
