import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../api/users";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: () => loginRequest(username, password),
    onSuccess: (response) => {
      setToken(response.data.access, response.data.refresh);
      toast.success("bien");
      navigate("/");
    },
    onError: () => {
      toast.error("Password or username are incorrect");
    },
  });

  const handleForm = (e) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  return (
    <main className="flex justify-center items-center h-screen">
      <ToastContainer position="top-center" theme="dark" />
      <section className="bg-[#161B22] border border-[#30363C] p-8 rounded-lg shadow-lg flex flex-col gap-8 ">
        <h1 className="text-xl">Sign in</h1>
        <form onSubmit={handleForm} className="flex flex-col gap-8 w-[350px]">
          <label htmlFor="username" className="flex flex-col">
            Username
            <input
              type="text"
              placeholder="Enter a username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
            />
          </label>
          <label htmlFor="password" className="flex flex-col">
            Password
            <input
              type="password"
              placeholder="Enter a password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
          </label>
          <button type="submit" className="submit">
            Submit
          </button>
        </form>
        <span>
          Dont you have an account?
          <Link to="/register">
            <span className="text-[#3081F7] hover:underline"> Sign Up</span>
          </Link>
        </span>
      </section>
    </main>
  );
};
