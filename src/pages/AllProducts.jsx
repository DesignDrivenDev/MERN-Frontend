import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import SummaryAPI from "../common";
import AdminProductCard from "../components/AdminProductCard";

const AllProducts = () => {
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const getAllProducts = async () => {
    let response = await fetch(SummaryAPI.allProduct.url);
    const data = await response.json();
    setAllProducts(data?.data || []);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      <div className="bg-white p-3 rounded-md flex justify-between items-center">
        <h1 className="font-bold text-lg">All Product</h1>
        <button
          onClick={() => setOpenUpdateForm(true)}
          className="border px-3 py-2 text-sm rounded-full bg-blue-700 text-white hover:bg-blue-900 transition-all duration-200 transform"
        >
          Upload Product
        </button>
      </div>
      {/* upload product component */}
      {openUpdateForm && (
        <UploadProduct
          onClose={() => setOpenUpdateForm(false)}
          fetchUpdatedData={getAllProducts}
        />
      )}
      {/* product display */}
      <div className="flex flex-row gap-3 py-4 max-w-7xl flex-wrap">
        {allProducts.map((product, index) => (
          <AdminProductCard
            key={index + "allProduct"}
            data={product}
            fetchUpdatedData={getAllProducts}
          />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
