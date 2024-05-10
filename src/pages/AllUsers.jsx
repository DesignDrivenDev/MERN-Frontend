import React, { useEffect, useState } from "react";
import SummaryAPI from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import ChangeUserRole from "../components/ChangeUserRole";

const AllUsers = () => {
  const [allUser, setAllUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openUpdateUser, setOpenUpdateUser] = useState(false);

  const [updateUserDetails, setUpdateUserDetails] = useState({
    _id: "",
    name: "",
    email: "",
    role: "",
  });

  const fetchAllUsers = async () => {
    setLoading(true);
    const response = await fetch(SummaryAPI.allUser.url, {
      method: SummaryAPI.allUser.method,
      credentials: "include",
    });

    const data = await response.json();

    if (data.success) {
      setAllUser(data);
      setLoading(false);
    }
    if (data.error) {
      toast.error(data.error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div>
      <table className="w-full table-auto border-separate border border-slate-500">
        <thead>
          <tr className="text-left">
            <th className="border border-slate-600">UserId</th>
            <th className="border border-slate-600">Name</th>
            <th className="border border-slate-600">Email</th>
            <th className="border border-slate-600">Role</th>
            <th className="border border-slate-600">Created Date</th>
            <th className="border border-slate-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td>loading..</td>
            </tr>
          ) : (
            <>
              {allUser?.data?.map((user, index) => (
                <tr className="text-wrap" key={index + 1}>
                  <td className="border border-slate-700">{index + 1}</td>
                  <td className="border border-slate-700">{user?.name}</td>
                  <td className="border border-slate-700">{user?.email}</td>
                  <td className="border border-slate-700">{user?.role}</td>
                  <td className="border border-slate-700">
                    {moment(user?.createdAt).format("ll")}
                  </td>
                  <td className="border border-slate-700 text-center ">
                    <button
                      className=""
                      onClick={() => {
                        setUpdateUserDetails(user);
                        setOpenUpdateUser(true);
                      }}
                    >
                      <span className="underline text-blue-700">edit</span>
                    </button>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
      {openUpdateUser && (
        <ChangeUserRole
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          onClose={() => setOpenUpdateUser(false)}
          fetchUpdatedUser={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
