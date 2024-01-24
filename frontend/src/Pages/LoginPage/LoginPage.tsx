import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { API_URL } from "../../helpers";
import { CurrentUserContext } from "../../App";

const LoginPage = () => {
  const [vusername, setUsername] = useState("");
  const [vpassword, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const context = useContext(CurrentUserContext);

  const handleClick = async (v_username: string, v_password: string) => {
    try {
      // console.log(v_username, v_password);
      const response = await fetch(API_URL + "/login", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          Username: v_username,
          Password: v_password,
        }).toString(),
      });
      if (!response.ok) {
        alert("Login failed");
        return;
      }

      const data = await response.json();
      console.log("Login successful");
      context?.setCurrentUser(data.token);
      setRedirect(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <br />
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleClick(vusername, vpassword);
          }}>
          <br />
          <input
            type="username"
            className="form-control border-2 border-black p-2"
            placeholder="Username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <br /> <br />
          <input
            type="password"
            className="form-control border-2 border-black p-2"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "21px",
            }}>
            <button type="submit" className="hover:underline transition">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
