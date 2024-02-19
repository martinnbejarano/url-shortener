import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../api/users";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: () => loginRequest(username, password),
    onSuccess: (response) => {
      setToken(response.data.access, response.data.refresh);
      navigate("/");
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const handleForm = (e) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  return (
    <main className="flex justify-center items-center h-screen">
      <section className="bg-green-50 p-8 rounded-md flex flex-col">
        <h1 className="text-black">Login</h1>
        <form onSubmit={handleForm} className="text-black">
          <label htmlFor="username">
            <input
              type="text"
              placeholder="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              placeholder="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </section>
    </main>
  );
};
