import { useState } from "react";
import { useAuthStore } from "../store/auth";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { FaLink } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { createShortUrl } from "../api/urls";

export const CreateUrlCard = () => {
  const [shortUrl, setShortUrl] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");

  const createUrlMutation = useMutation({
    mutationFn: () => createShortUrl(shortUrl, originalUrl),
    onSuccess: () => {
      toast.success("url created successfully");
      setOriginalUrl("");
      setShortUrl("");
    },
    onError: (e) => {
      toast.error(e.response.data.error);
    },
    retry: 0,
  });

  const handleForm = (e) => {
    e.preventDefault();
    if (shortUrl === "") {
      toast.error("Please enter a link");
      return;
    }

    useAuthStore.getState().isAuth
      ? createUrlMutation.mutate()
      : toast.error("You must be logged in");
  };

  return (
    <section className="flex h-min  max-w-96 flex-col rounded-lg border border-[#30363C] bg-[#161B22] p-8 shadow-lg md:w-96">
      <ToastContainer position="bottom-right" theme="dark" />
      <form onSubmit={handleForm} className="flex flex-col gap-12">
        <label htmlFor="originalUrl" className="flex flex-col text-lg">
          <div className="flex items-center gap-2">
            <FaLink />
            Shorten a long URL
          </div>
          <input
            type="text"
            placeholder="Enter a long link here"
            name="originalUrl"
            className="input"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
        </label>
        <label htmlFor="shortUrl" className="flex flex-col">
          <div className="flex items-center gap-2 text-lg">
            <FaWandMagicSparkles />
            Customize your link{" "}
            <span className="text-sm font-extralight">(optional)</span>
          </div>
          <input
            type="text"
            placeholder="Enter a slug"
            name="shortUrl"
            className="input"
            value={shortUrl}
            onChange={(e) => setShortUrl(e.target.value)}
          />
        </label>
        <button className="submit">Shorten URL</button>
      </form>
    </section>
  );
};
