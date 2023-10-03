import React, { useState } from "react";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");


  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div>
        <div>
          <span>
            <Logo />
          </span>
        </div>
        <h2>Sign in to your account</h2>
        <p>
          <Link to="/signup">Sign Up</Link>
        </p>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                      value
                    ) || "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="password"
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
            <button type="submit">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
