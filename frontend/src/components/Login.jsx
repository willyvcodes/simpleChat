import React, { useEffect, useState } from "react";
import { Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

const Login = ({ onUserLogin, loginError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    if (username.trim() !== "" || password.trim() !== "") {
      await onUserLogin({
        username: username,
        password: password,
      });
    }
  };

  useEffect(() => {
    loginError = "";
  }, []);

  return (
    <div className="center-page">
      <div className="w-7/12 sm:w-5/12 md:w-3/12 p-4 flex flex-col gap-4 border border-slate-700 bg-slate-700 rounded-md shadow-lg">
        <h1 className="text-center font-bold text-xl text-white">Login</h1>
        {loginError && <p className="text-red-500 text-xs">{loginError}</p>}
        <Label htmlFor="username" className="text-white">
          Username
        </Label>
        <TextInput
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <Label htmlFor="password" className="text-white">
          Password
        </Label>
        <TextInput
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyPress}
          type="password"
        />
        <button
          className="bg-violet-400 hover:bg-violet-500 p-2 text-white rounded-md"
          onClick={handleLogin}
        >
          Login
        </button>
        <span className="text-center text-white">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Signup
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
