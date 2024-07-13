import React, { useState } from "react";
import AdminEditProduct from "./AdminEditProduct";
import displayINRCurrency from "../helpers/displayCurrency";

const AdminProductCard = ({ data, fetchUpdatedData }) => {
  const [editProduct, setEditProduct] = useState(false);
  return (
    <div className="bg-white shadow-lg p-3 rounded-md ">
      <div className="group block relative">
        <img
          src={data.image[0]}
          alt=""
          className="w-full object-contain h-40"
        />

        <div className="mt-3 text-sm">
          <div>
            <h3 className="line-clamp-2 text-gray-900 group-hover:underline group-hover:underline-offset-4">
              {data.productName}
            </h3>

            {/* <p className="mt-1.5 text-pretty text-xs text-gray-500">
              {data.description}
            </p> */}
          </div>
          <div className="font-semibold pt-2">
            <strike className="text-gray-400">
              {displayINRCurrency(data?.price)}
            </strike>
            <span className="pl-2">
              {displayINRCurrency(data?.sellingPrice)}
            </span>
          </div>
        </div>
        <div
          onClick={() => setEditProduct(true)}
          className="hidden group-hover:block absolute top-2 right-2 bg-red-600 p-2 rounded-full shadow-lg cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 group-hover:fill-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
        </div>
      </div>
      {editProduct && (
        <AdminEditProduct
          onClose={() => setEditProduct(false)}
          ProductData={data}
          fetchUpdatedData={fetchUpdatedData}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
