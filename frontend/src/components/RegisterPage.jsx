import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerRequest } from "../api/users";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [email, setEmail] = useState("");

  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: () => registerRequest(username, email, password),
    onSuccess: (response) => {
      setToken(response.data.access, response.data.refresh);
      navigate("/login");
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const handleForm = (e) => {
    e.preventDefault();

    password === password1 ? registerMutation.mutate() : console.log("error");
  };

  return (
    <main className="flex justify-center items-center h-screen">
      <ToastContainer position="top-center" theme="dark" />
      <section className="bg-[#161B22] border border-[#30363C] p-8 rounded-lg shadow-lg flex flex-col gap-8 ">
        <h1 className="text-xl">Sign up</h1>
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

          <label htmlFor="email" className="flex flex-col">
            Email
            <input
              type="email"
              placeholder="Enter an email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <label htmlFor="password" className="flex flex-col">
            Confirm password
            <input
              type="password"
              placeholder="Confirm password"
              name="password1"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              className="input"
            />
          </label>
          <button type="submit" className="submit">
            Submit
          </button>
        </form>
        <span>
          Do you already have an account?
          <Link to="/login">
            <span className="text-[#3081F7] hover:underline"> Sign In</span>
          </Link>
        </span>
      </section>
    </main>
  );
};
