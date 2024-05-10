import { useDispatch, useSelector } from "react-redux";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import SummaryAPI from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";

export const Header = () => {
  const user = useSelector((state) => state?.user?.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const fetchData = await fetch(SummaryAPI.logout_user.url, {
      method: SummaryAPI.logout_user.method,
      credentials: "include",
    });
    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/login");
    } else {
      toast.error(data.message);
    }
  };

  return (
    <header className="shadow-md bg-white">
      <div className=" w-11/12 container mx-auto py-2 flex justify-between items-center">
        <div className="">
          <Link to="/">
            <Logo h={60} w={100} />
          </Link>
        </div>
        <div className="hidden md:block">
          <div className="relative">
            <label htmlFor="Search" className="sr-only">
              Search
            </label>

            <input
              type="text"
              id="Search"
              placeholder="Search for..."
              className="w-full min-w-96 px-2 py-1.5 placeholder:text-sm border border-red-900 rounded-lg focus:outline-none"
            />

            <span className="absolute inset-y-0 end-0 grid w-8 place-content-center">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
              >
                <span className="sr-only">Search</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </span>
          </div>
        </div>
        {/* user profile */}
        <div className="flex justify-center items-center gap-x-4 ">
          <div className="relative cursor-pointer">
            <p className="bg-red-500 p-1 h-6 w-6 text-white rounded-full text-center text-xs absolute -top-3 -right-1">
              {" "}
              10
            </p>
            <Link to={"/cart"}>
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
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </Link>
          </div>

          <div className="dropdown dropdown-hover dropdown-end">
            <div tabIndex={0} role="button" className="">
              <Link to="/account">
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    alt="user profile"
                    className="h-12 w-12 object-cover object-center rounded-full"
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
              </Link>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 bg-white shadow-md rounded-box w-36"
            >
              {user?.role === ROLE.ADMIN && (
                <li>
                  <Link
                    className="hover:bg-gray-200"
                    to={"/admin-panel/all-products"}
                  >
                    Admin panel
                  </Link>
                </li>
              )}
              <li>
                {!user?._id ? (
                  <Link to={"/login"} className="hover:bg-gray-200">
                    Login
                  </Link>
                ) : (
                  <div className="hover:bg-gray-200" onClick={handleLogout}>
                    Logout
                  </div>
                )}
              </li>
            </ul>
          </div>
          {/* {user?._id ? (
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-red-800 text-white rounded-3xl text-sm cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <Link
              to={"/login"}
              className="px-3 py-1.5 bg-blue-900 text-white rounded-3xl text-sm cursor-pointer"
            >
              Login
            </Link>
          )} */}
        </div>
      </div>
    </header>
  );
};
