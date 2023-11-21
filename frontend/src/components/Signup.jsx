import React, { useState } from "react";
import { Label, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../utils/endpoints";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleUserSignup = async () => {
    const { firstname, lastname, username, password, confirmpassword } =
      formData;

    if (!firstname || !lastname || !username || !password || !confirmpassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmpassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await signupUser({
        firstname,
        lastname,
        username,
        password,
      });

      if (response.ok) {
        navigate("/login");
      } else {
        const errorData = await response.json();
        setError(errorData.msg);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred, please try again");
    }
  };

  return (
    <div className="center-page">
      <div className="w-8/12 sm:w-6/12 p-4 flex flex-col border border-slate-700 bg-slate-700 rounded-md shadow-lg">
        <h1 className="text-center font-bold text-2xl text-white my-2">
          Sign Up
        </h1>
        {error && <span className="text-red-500 text-xs">{error}</span>}
        <Label htmlFor="firstname" className="text-white">
          First Name
        </Label>
        <TextInput
          id="firstname"
          value={formData.firstname}
          onChange={(e) => handleChange("firstname", e.target.value)}
          className="my-2"
        />
        <Label htmlFor="lastname" className="text-white">
          Last Name
        </Label>
        <TextInput
          id="lastname"
          value={formData.lastname}
          onChange={(e) => handleChange("lastname", e.target.value)}
          className="my-2"
        />
        <Label htmlFor="username" className="text-white">
          Username
        </Label>
        <TextInput
          id="username"
          value={formData.username}
          onChange={(e) => handleChange("username", e.target.value)}
          className="my-2"
        />
        <Label htmlFor="password" className="text-white">
          Password
        </Label>
        <TextInput
          id="password"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          type="password"
          className="my-2"
        />
        <Label htmlFor="confirmpassword" className="text-white">
          Confirm Password
        </Label>
        <TextInput
          id="confirmpassword"
          value={formData.confirmpassword}
          onChange={(e) => handleChange("confirmpassword", e.target.value)}
          type="password"
          className="mt-2 mb-1"
        />
        <button
          className="bg-violet-400 hover:bg-violet-500 p-2 mt-2 text-white rounded-md"
          onClick={handleUserSignup}
        >
          Submit
        </button>
        <span className="mt-2 text-center text-white">
          Already have an account?{" "}
          <a
            href="#"
            className="text-blue-500"
            onClick={() => navigate("/Login")}
          >
            Login
          </a>
        </span>
      </div>
    </div>
  );
};

export default Signup;
