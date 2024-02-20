import { Outlet, Link } from "react-router-dom";
import { FaLink } from "react-icons/fa6";
import { logout } from "../api/useAxios";
import { useAuthStore } from "../store/auth";
import { jwtDecode } from "jwt-decode";

export const Header = () => {
  const { isAuth, access } = useAuthStore();

  return (
    <>
      <header className="bg-[#131313] sticky top-0 w-full h-[72px] flex flex-row justify-between items-center px-8 shadow">
        <Link
          to="/"
          className="flex gap-1 justify-start items-center hover:opacity-60 transition-all"
        >
          <FaLink className="text-2xl" />
          <h1 className="cursor-pointer font-semibold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500">
            Shortener URL
          </h1>
        </Link>

        {isAuth ? (
          <div className="flex gap-16 px-8 rounded-md">
            <h3 className="hover:opacity-60 cursor-pointer transition-all text-xl">
              # {jwtDecode(access).username}
            </h3>
            <button
              onClick={logout}
              className="hover:opacity-60 cursor-pointer transition-all text-xl"
            >
              Sign out
            </button>
          </div>
        ) : (
          <div className="flex gap-16 px-8 rounded-md">
            <button onClick={logout}>
              <Link
                className="hover:opacity-60 cursor-pointer transition-all text-xl"
                to="/login"
              >
                Sign in
              </Link>
            </button>
            <Link
              className="hover:opacity-60 cursor-pointer transition-all text-xl"
              to="/register"
            >
              Sign up
            </Link>
          </div>
        )}
      </header>
      <Outlet />
    </>
  );
};
