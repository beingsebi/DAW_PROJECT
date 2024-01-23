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

function LoggedIn(jwtToken: string) {
  const decodedToken = decodeToken(jwtToken);

  return (
    <>
      <div className="flex flex-wrap space-x-10">
        <div>{decodedToken.given_name}</div>
        <a>Logout</a>
      </div>
    </>
  );
}

const Navbar = (props: Props) => {
  const jwtToken = useContext(CurrentUserContext)?.currentUser;
  const toRender = jwtToken ? LoggedIn(jwtToken) : NotLoggedIn();
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
