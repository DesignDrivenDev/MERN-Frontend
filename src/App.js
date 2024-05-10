import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import SummaryAPI from "./common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
function App() {
  const dispatch = useDispatch();
  const fetchUserDetails = async () => {
    const response = await fetch(SummaryAPI.current_user.url, {
      method: SummaryAPI.current_user.method,
      credentials: "include",
    });
    const userData = await response.json();
    if (userData.success) {
      dispatch(setUserDetails(userData.data));
    }

    // console.log(userData.data, "user data");
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails, // fetch user details
        }}
      >
        <ToastContainer />
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;

// const getData = async () => {
//   const res = await fetch("http://localhost:8080/api/user-details");
//   const data = await res.json();
//   console.log(data, "reskadswj");
// };
