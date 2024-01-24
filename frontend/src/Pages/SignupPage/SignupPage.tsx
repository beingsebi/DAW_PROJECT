import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { API_URL } from "../../helpers";
import { CurrentUserContext } from "../../App";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  // const context = useContext(CurrentUserContext);

  const handleClick = async () => {
    try {
      const response = await fetch(API_URL + "/register", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });
      if (!response.ok) {
        console.log(response.statusText);
        const data = await response.json();
        alert("Register failed: " + data[0].description);
        return;
      }
      console.log("Register successful");
      setRedirect(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (redirect) {
    return <Navigate to="../login" />;
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
            handleClick();
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
            type="email"
            className="form-control border-2 border-black p-2"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
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
              Sign up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignupPage;
