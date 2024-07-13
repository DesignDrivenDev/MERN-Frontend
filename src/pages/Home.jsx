import React from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalProductCard from "../components/VerticalProductCard";

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <HorizontalCardProduct category={"airpodes"} heading={"Top Airpodes"} />
      <HorizontalCardProduct category={"watches"} heading={"Top Watches"} />
      <VerticalProductCard category={"mobiles"} heading={"Top mobiles"} />
      <VerticalProductCard category={"earphones"} heading={"Top Earphones"} />
      <VerticalProductCard category={"televisions"} heading={"Top Tvs"} />
    </div>
  );
};

export default Home;
