const backendDomain = "http://localhost:8080";

const SummaryAPI = {
  signUP: {
    url: `${backendDomain}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomain}/api/signin`,
    method: "post",
  },
  current_user: {
    url: `${backendDomain}/api/user-details`,
    method: "get",
  },
  logout_user: {
    url: `${backendDomain}/api/user-logout`,
    method: "get",
  },
  allUser: {
    url: `${backendDomain}/api/all-user`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomain}/api/update-user`,
    method: "post",
  },
  uploadProduct: {
    url: `${backendDomain}/api/upload-product`,
    method: "POST",
  },
  allProduct: {
    url: `${backendDomain}/api/products`,
    method: "GET",
  },
  updateProduct: {
    url: `${backendDomain}/api/edit-product`,
    method: "PUT",
  },
  productCategory: {
    url: `${backendDomain}/api/product-category`,
    method: "GET",
  },
  categoryWiseProduct: {
    url: `${backendDomain}/api/categories-product`,
    method: "post",
  },
  productDetails: {
    url: `${backendDomain}/api/product-details`,
    method: "post",
  },
  addTocart: {
    url: `${backendDomain}/api/add-to-cart`,
    method: "POST",
  },
  addToCartProductCount: {
    url: `${backendDomain}/api/countAddToCartProduct`,
    method: "get",
  },
  viewCartProduct: {
    url: `${backendDomain}/api/view-cart-product`,
    method: "get",
  },
  updateCartProduct: {
    url: `${backendDomain}/api/update-cart-product`,
    method: "put",
  },
  deleteCartProduct: {
    url: `${backendDomain}/api/delete-cart-product`,
    method: "DELETE",
  },
  searchProduct: {
    url: `${backendDomain}/api/search-product`,
    method: "get",
  },
  filterProduct: {
    url: `${backendDomain}/api/filter-product`,
    method: "post",
  },
};

export default SummaryAPI;
