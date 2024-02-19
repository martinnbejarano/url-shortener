import { Outlet, Link } from "react-router-dom";
import { FaLink } from "react-icons/fa6";
import { logout } from "../api/useAxios";
import { useAuthStore } from "../store/auth";
import { jwtDecode } from "jwt-decode";

export const Header = () => {
  const { isAuth, access } = useAuthStore();

  return (
    <>
      <header className="bg-[#191919] sticky top-0 w-full h-[72px] flex flex-row justify-between items-center px-8 shadow">
        <div className="flex gap-1 justify-start items-center hover:opacity-60 transition-all">
          <FaLink />
          <h1 className="cursor-pointer">Shortener URL</h1>
        </div>

        {isAuth ? (
          <div className="flex gap-16 px-8 rounded-md">
            <h3 className="hover:opacity-60 cursor-pointer transition-all">
              # {jwtDecode(access).username}
            </h3>
            <button
              onClick={logout}
              className="hover:opacity-60 cursor-pointer transition-all"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex gap-16 px-8 rounded-md">
            <button onClick={logout}>
              <Link
                className="hover:opacity-60 cursor-pointer transition-all"
                to="/login"
              >
                Sign In
              </Link>
            </button>
            <Link
              className="hover:opacity-60 cursor-pointer transition-all"
              to="/register"
            >
              Sign Up
            </Link>
          </div>
        )}
      </header>
      <Outlet />
    </>
  );
};
