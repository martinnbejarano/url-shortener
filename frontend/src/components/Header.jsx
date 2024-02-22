import { Outlet, Link } from "react-router-dom";
import { FaLink } from "react-icons/fa6";
import { logout } from "../api/useAxios";
import { useAuthStore } from "../store/auth";
import { jwtDecode } from "jwt-decode";

export const Header = () => {
  const { isAuth, access } = useAuthStore();

  return (
    <>
      <header className="sticky top-0 flex h-[72px] w-full flex-row items-center justify-between bg-[#131313] px-8 shadow">
        <Link
          to="/"
          className="flex items-center justify-start gap-1 transition-all hover:opacity-60"
        >
          <FaLink className="text-2xl" />
          <h1 className="cursor-pointer bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500 bg-clip-text font-semibold text-transparent sm:text-xl md:text-2xl">
            Shortener URL
          </h1>
        </Link>

        {isAuth ? (
          <div className="flex gap-16 rounded-md px-8">
            <h3 className="cursor-pointer text-xl transition-all hover:opacity-60">
              # {jwtDecode(access).username}
            </h3>
            <button
              onClick={logout}
              className="cursor-pointer text-xl transition-all hover:opacity-60"
            >
              Sign out
            </button>
          </div>
        ) : (
          <div className="flex gap-12 rounded-md px-8">
            <button onClick={logout}>
              <Link
                className="cursor-pointer text-xl transition-all hover:opacity-60"
                to="/login"
              >
                Sign in
              </Link>
            </button>
            <Link
              className="cursor-pointer text-xl transition-all hover:opacity-60"
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
