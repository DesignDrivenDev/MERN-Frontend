import React, { useRef, useState } from "react";
import productCategory from "../helpers/productCategory";
import uploadImage from "../helpers/uploadImage";
import PreviewImage from "./PreviewImage";
import SummaryAPI from "../common";
import { toast } from "react-toastify";
// import InputField from "./InputField";

const UploadProduct = ({ onClose, fetchUpdatedData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    image: [],
    description: "",
    price: "",
    sellingPrice: "",
    quantity: "",
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const form = useRef(null);

  // const handleOnChange = (e) => {
  //   const { name, value } = e.target;
  //   setData((prev) => {
  //     return {
  //       ...prev,
  //       [name]: value,
  //     };
  //   });
  // };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);

    setData((prev) => {
      return {
        ...prev,
        image: [...prev.image, uploadImageCloudinary?.url],
      };
    });
  };

  const handleDeleteProductImage = async (index) => {
    const newProductImage = [...data.image];
    newProductImage.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
        image: [...newProductImage],
      };
    });
  };
  // upload product
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(SummaryAPI.uploadProduct.url, {
      method: SummaryAPI.uploadProduct.method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const daatResponse = await response.json();
    if (daatResponse.success) {
      toast.success(daatResponse?.message);
      onClose();
      fetchUpdatedData();
    } else {
      toast.error(daatResponse?.error);
    }
  };

  return (
    <div className="!z-50 bg-white/10 backdrop-blur-sm fixed w-full h-full inset-0 grid place-items-center overflow-y-scroll overflow-x-hidden py-8">
      <div className="bg-white shadow-md p-4 rounded-md max-w-2xl mx-auto w-11/12 ">
        <div className="flex justify-between">
          <h1 className="text-lg font-semibold">Upload Product</h1>
          <button onClick={onClose}>
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
          </button>
        </div>

        <>
          <form
            ref={form}
            encType="multipart/form-data"
            className="space-y-2"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="productName" className="text-xs">
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={data.productName}
                onChange={(e) =>
                  setData({ ...data, productName: e.target.value })
                }
                className="border border-blue-950 p-2 w-full rounded-md outline-none bg-white text-sm text-gray-700 shadow-sm"
                required
              />
            </div>

            {/* <InputField
              labelName="Product Name"
              name="productName"
              type="file"
              value={data.productName}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            /> */}

            <div>
              <label htmlFor="brandName" className="text-xs">
                Brand Name
              </label>
              <input
                type="text"
                id="brandName"
                name="brandName"
                value={data.brandName}
                onChange={(e) =>
                  setData({ ...data, brandName: e.target.value })
                }
                className="border border-blue-950 p-2 w-full rounded-md outline-none bg-white text-sm text-gray-700 shadow-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="category" className="text-xs">
                Category
              </label>

              <select
                name="category"
                id="category"
                value={data.category}
                onChange={(e) => setData({ ...data, category: e.target.value })}
                className="border border-blue-950 p-2 w-full rounded-md outline-none bg-white text-sm text-gray-700 shadow-sm"
                required
              >
                <option value="">Select category</option>
                {productCategory.map((el, index) => (
                  <option key={el.value + index} value={el.value}>
                    {el.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="image">Product Image</label>
              <label htmlFor="uploadImageIput">
                <div className="border border-blue-950 p-2 w-full rounded-md outline-none bg-white text-sm text-gray-700 shadow-sm h-32 grid place-items-center cursor-pointer">
                  <div>
                    <input
                      type="file"
                      className="hidden"
                      name="image"
                      id="uploadImageIput"
                      // value={}
                      onChange={handleUploadProduct}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="h-9 fill-gray-400 w-fit mx-auto"
                    >
                      <path d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
                    </svg>
                    <p className="text-xs text-center pt-2">
                      Upload Product Image
                    </p>
                  </div>
                </div>
              </label>
              <div className="flex flex-row gap-3 py-3">
                {data?.image.length > 0 ? (
                  data.image.map((img, index) => (
                    <div className="relative group" key={index}>
                      <div
                        onClick={() => handleDeleteProductImage(index)}
                        className="absolute bottom-2 right-2 group bg-white hover:bg-red-600 p-2 rounded-full cursor-pointer hidden group-hover:block"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 group-hover:fill-white"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </div>
                      <img
                        src={img}
                        alt={img + index}
                        className="w-28 h-28 rounded-xl object-contain cursor-pointer"
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(img);
                        }}
                      />
                    </div>
                  ))
                ) : (
                  <>
                    <p className="pb-2 text-xs text-red-600">
                      *Upload product image
                    </p>
                  </>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="price" className="text-xs">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={data.price}
                onChange={(e) => setData({ ...data, price: e.target.value })}
                className="border border-blue-950 p-2 w-full rounded-md outline-none bg-white text-sm text-gray-700 shadow-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="sellingPrice" className="text-xs">
                Selling Price
              </label>
              <input
                type="number"
                name="sellingPrice"
                value={data.sellingPrice}
                onChange={(e) =>
                  setData({ ...data, sellingPrice: e.target.value })
                }
                className="border border-blue-950 p-2 w-full rounded-md outline-none bg-white text-sm text-gray-700 shadow-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="quantity" className="text-xs">
                Quantity
              </label>
              <input
                type="text"
                name="quantity"
                value={data.quantity}
                onChange={(e) => setData({ ...data, quantity: e.target.value })}
                className="border border-blue-950 p-2 w-full rounded-md outline-none bg-white text-sm text-gray-700 shadow-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="text-xs">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={data.description}
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
                className="border border-blue-950 p-2 w-full rounded-md outline-none bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>
            <div className="py-2">
              <button className="w-full px-3 py-2 bg-blue-950 text-white text-sm rounded-md">
                Upload Product
              </button>
            </div>
          </form>
        </>
      </div>
      {/* display image preview */}
      {openFullScreenImage && (
        <PreviewImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default UploadProduct;
