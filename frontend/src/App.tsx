import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { createContext, useState } from "react";
import { getJWTCookie } from "./helpers";

interface CurrentUserContextType {
  currentUser: string | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<string | null>>;
}

export const CurrentUserContext = createContext<CurrentUserContextType | null>(
  null
);

function App() {
  const jwt = getJWTCookie();
  const [currentUser, setCurrentUser] = useState(jwt);
  return (
    <>
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Navbar></Navbar>
        <Outlet></Outlet>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
