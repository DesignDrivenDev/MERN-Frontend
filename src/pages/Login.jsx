import React, { useContext, useState } from "react";
import loginIcon from "../assets/signin.gif";
import { Link, useNavigate } from "react-router-dom";
import SummaryAPI from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(Context);
  // const generalContext = useContext(Context);

  // console.log(fetchUserDetails(), "generalContext");

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryAPI.signIn.url, {
      method: SummaryAPI.signIn.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData.message);
      await fetchUserDetails();
      navigate("/");
    }
    if (responseData.error) {
      toast.error(responseData.message);
    }
  };

  return (
    <section id="login">
      <div className="mx-auto container w-11/12 grid place-items-center h-screen">
        <div className="bg-white p-8 w-full max-w-md mx-auto rounded-md">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcon} alt="login icon" className="" />
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email">Email : </label>
              <div>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  placeholder="email.."
                  className="w-full h-full outline-none border border-black p-2 rounded-md"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password">Password : </label>
              <div className="flex items-center">
                <input
                  type={showPassword ? "password" : "text"}
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="password.."
                  className="w-full h-full outline-none border border-black p-2 rounded-md"
                />

                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="cursor-pointer"
                >
                  {!showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  )}
                </span>
              </div>
            </div>
            <Link
              to={"/forgot-password"}
              className="block w-fit ml-auto hover:underline text-sm"
            >
              Forgot Password
            </Link>

            <button
              type="submit"
              className="w-full bg-red-800 text-white py-2 rounded-md"
            >
              Login
            </button>
          </form>

          <div className="pt-4">
            <span>Don't have account?</span>
            <Link to={"/register"} className="text-blue-800 pl-1">
              register
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
