import React, { useContext } from "react";
import logo from "./logo.png";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../App";
import { decodeToken } from "../../helpers";

interface Props {}

function NotLoggedIn() {
  return (
    <>
      <div className="flex items-center space-x-6 text-black lg:hidden">
        {/* Show these elements on screens smaller than lg */}
        <div className="hover:text-darkBlue">
          <Link to="/login" className="text-black hover:text-darkBlue">
            Login
          </Link>
        </div>
        <a
          href=""
          className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70">
          <Link to="/signup" className="text-black hover:text-darkBlue">
            Signup
          </Link>
        </a>
      </div>
      <div className="hidden lg:flex items-center space-x-6 text-back">
        {/* Hide these elements on screens smaller than lg */}
        <div className="hover:text-darkBlue">
          <Link to="/login" className="text-black hover:text-darkBlue">
            Login
          </Link>
        </div>
        <a
          href=""
          className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70">
          <Link to="/signup" className="text-black hover:text-darkBlue">
            Signup
          </Link>
        </a>
      </div>
    </>
  );
}

function LoggedIn(jwtToken: string, context: any | null) {
  const decodedToken = decodeToken(jwtToken);

  const handleLogout = (e: any) => {
    e.preventDefault();
    console.log("logout");
    context.setCurrentUser(null);
    document.cookie =
      "jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  return (
    <>
      <div className="flex items-center space-x-6 text-black lg:hidden">
        {/* Show these elements on screens smaller than lg */}
        <div className="text-black">{decodedToken.given_name}</div>
        <a
          href=""
          onClick={handleLogout}
          className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70">
          Logout
        </a>
      </div>
      <div className="hidden lg:flex items-center space-x-6 text-back">
        {/* Hide these elements on screens smaller than lg */}
        <div className="text-black">{decodedToken.given_name}</div>
        <a
          href=""
          onClick={(e) => {
            e.preventDefault();
            handleLogout(e);
            context.setCurrentUser(null);
          }}
          className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70">
          Logout
        </a>
      </div>
    </>
  );
}

const Navbar = (props: Props) => {
  const context = useContext(CurrentUserContext);
  const jwtToken = context?.currentUser;
  const toRender = jwtToken ? LoggedIn(jwtToken, context) : NotLoggedIn();
  return (
    <nav className="relative container mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-20">
          <Link to="/">
            <img src={logo} max-width="200px" max-height="200px" alt="" />
          </Link>
          <div className="hidden font-bold lg:flex">
            <Link to="/search" className="text-black hover:text-darkBlue">
              Search
            </Link>
          </div>
        </div>
        {toRender}
      </div>
    </nav>
  );
};

export default Navbar;
