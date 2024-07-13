import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import SummaryAPI from "./common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
function App() {
  const [cartCount, setCartCount] = useState(0);
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
  };
  const fetchUserAddToCart = async () => {
    const response = await fetch(SummaryAPI.addToCartProductCount.url, {
      method: SummaryAPI.addToCartProductCount.method,
      credentials: "include",
    });
    const userCartData = await response.json();
    setCartCount(userCartData?.data?.count);
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, []);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails, // fetch user details
          cartCount, // product count in the cart
          fetchUserAddToCart,
        }}
      >
        <ToastContainer position="top-center" />
        <Header />
        <main className="pt-20">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
