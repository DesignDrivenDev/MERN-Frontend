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
};

export default SummaryAPI;
