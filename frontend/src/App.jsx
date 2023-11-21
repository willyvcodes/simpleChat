import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import { loginUser } from "./utils/endpoints";

const App = () => {
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  // const handleUserLogin = async (userCredentials) => {
  //   try {
  //     const response = await loginUser(userCredentials);
  //     if (response.ok) {
  //       const user = await response.json();
  //       setUser(user);
  //       setLoginError(null);
  //       navigate("/dashboard");
  //     } else {
  //       console.error("Login failed");
  //       setLoginError("Invalid username or password");
  //     }
  //   } catch (error) {
  //     console.error("Error during login:", error);
  //     setLoginError("An error occurred, please try again");
  //   }
  // };

  useEffect(() => {
    // if (!user) {
    //   navigate("/login");
    // }
    setUser({
      firstname: "william",
      lastname: "valido",
      avatar: "",
      username: "wvalido",
    });
  }, []);

  return (
    <Routes>
      {/* <Route
        path="/login"
        element={
          <Login onUserLogin={handleUserLogin} loginError={loginError} />
        }
      /> */}
      {/* <Route path="/signup" element={<Signup />} /> */}
      {/* <Route path="/dashboard" element={<Dashboard user={user} />} /> */}
      <Route path="/" element={<Dashboard user={user} />} />
    </Routes>
  );
};

export default App;
