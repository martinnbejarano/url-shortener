import { useState } from "react";
import { useAuthStore } from "../store/auth";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { FaLink } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";

export const CardUrl = () => {
  const [shortUrl, setShortUrl] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");

  const handleForm = (e) => {
    e.preventDefault();
    if (!useAuthStore.getState().isAuth) {
      toast.error("You must be loged in");
    }
  };

  return (
    <section className="bg-[#161B22] border border-[#30363C] p-8 rounded-lg shadow-lg flex flex-col w-1/3">
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
            <span className="font-extralight text-sm">(optional)</span>
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
      <ToastContainer position="bottom-right" theme="dark" />
    </section>
  );
};
