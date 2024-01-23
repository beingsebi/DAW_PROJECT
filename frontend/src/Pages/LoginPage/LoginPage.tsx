import React, { SyntheticEvent, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { API_URL } from "../../helpers";
import { CurrentUserContext } from "../../App";

interface Props {}

const LoginPage = (props: Props) => {
  const [vusername, setUsername] = useState("");
  const [vpassword, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const context = useContext(CurrentUserContext);

  // interface LoginDto {
  //   Username: string;
  //   Password: string;
  // }

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
      // context?.setCurrentUser();
    } catch (error) {
      console.error("Error:", error);
    }

    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/" />;
  }
  // ...

  return (
    <>
      <br />
      <br />
      <h1 style={{ marginLeft: "20%" }}>Please sign in</h1>

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

// import React, { useState } from "react";
// import { API_URL } from "../../helpers";

// interface LoginResponse {
//   userName: string;
//   email: string;
//   token: string;
// }

// interface LoginDto {
//   Username: string;
//   Password: string;
// }

// const LoginPage: React.FC = () => {
//   const [username, setUsername] = useState<string>("");
//   const [password, setPassword] = useState<string>("");

//   const handleLogin = async () => {
//     try {
//       const response = await fetch(API_URL + "/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           Username: username,
//           Password: password,
//         } as LoginDto),
//       });

//       if (!response.ok) {
//         // Handle error
//         console.error("Login failed");
//         return;
//       }

//       const data: LoginResponse = await response.json();
//       // Do something with the response data, e.g., store it in the state or local storage
//       console.log("Login successful", data);
//     } catch (error) {
//       console.error("Error during login:", error);
//     }
//   };

//   return (
//     <div>
//       <label>
//         Username:
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </label>
//       <br />
//       <label>
//         Password:
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </label>
//       <br />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default LoginPage;
