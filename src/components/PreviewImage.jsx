import React from "react";

const PreviewImage = ({ imgUrl, onClose }) => {
  return (
    <div className="flex justify-center items-center p-4 fixed z-50 inset-0">
      <div className="bg-white shadow-lg rounded max-w-4xl mx-auto p-4">
        <div
          onClick={onClose}
          className="w-fit ml-auto hover:text-red-700 cursor-pointer"
        >
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
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        <img src={imgUrl} alt="" className=" h-96 w-96" />
      </div>
    </div>
  );
};

export default PreviewImage;
