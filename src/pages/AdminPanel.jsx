import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="h-[calc(100vh-165px)] hidden md:flex m-2 gap-4">
      <aside className="bg-white min-h-full w-full max-w-60 ">
        <div className="flex flex-col justify-center items-center bg-blue-950 p-4">
          <div>
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                alt="user profile"
                className="h-24 w-24
               object-cover object-center rounded-full"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            )}
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-semibold capitalize text-white">
              {user?.name}
            </h1>
            <p className="text-white/70 text-sm">{user?.role}</p>
          </div>
        </div>
        <div>
          <nav className="grid py-6 font-semibold w-11/12 mx-auto">
            <Link to={"all-users"} className={`px-2 py-2 hover:bg-slate-200`}>
              All users
            </Link>
            <Link
              to={"all-products"}
              className={`px-2 py-2 hover:bg-slate-200`}
            >
              Proucts
            </Link>
          </nav>
        </div>
      </aside>
      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
