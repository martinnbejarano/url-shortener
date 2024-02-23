/* eslint-disable react/prop-types */
import { MdOutlineContentCopy } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";
import { useUrlsStore } from "../store/urls";

export const UrlCard = ({ url }) => {
  const baseURL = import.meta.env.FRONTEND_URL;
  const deleteUrl = useUrlsStore((state) => state.deleteShortLink);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${baseURL}/${url.short_url}`);
    toast.info("🚀 Copied to clipboard");
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deleteUrl(url.short_url);
  };

  return (
    <div className="flex max-w-[300px] items-start justify-between rounded-md border border-[#30363C] p-4">
      <ToastContainer theme="dark" position="bottom-right" />
      <div>
        <div className="flex w-2/3 items-center justify-start space-x-2 overflow-hidden">
          <p>/s/{url.short_url}</p>
          <MdOutlineContentCopy
            onClick={handleCopy}
            className="transition hover:text-gray-400 active:text-white"
          />
        </div>
        <p className="text-gray-500">{url.original_url}</p>
      </div>
      <button
        className="flex items-center justify-between text-gray-500 transition hover:text-red-600 active:text-red-900"
        onClick={handleDelete}
      >
        <FaTrashAlt />
        <p>Delete</p>
      </button>
    </div>
  );
};
