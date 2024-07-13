import React, { useState } from "react";
import ROLE from "../common/role";
import SummaryAPI from "../common";
import { toast } from "react-toastify";

const ChangeUserRole = ({
  userId,
  name,
  email,
  role,
  onClose,
  fetchUpdatedUser,
}) => {
  const [userRole, setUserRole] = useState(role);

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
  };

  const updateUserRole = async () => {
    const response = await fetch(SummaryAPI.updateUser.url, {
      method: SummaryAPI.updateUser.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole,
      }),
    });

    const data = await response.json();

    if (data.success) {
      toast.success("User updated successfully");
      onClose();
      fetchUpdatedUser();
    }
  };
  return (
    <>
      <div className="relative">
        <div className="max-w-sm mx-auto bg-white shadow-md p-4 space-y-3 ">
          <button onClick={onClose} className="float-right text-xl ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
          <h2 className="font-semibold">Change User Role</h2>
          <p>Name : {name}</p>
          <p>Email : {email}</p>
          <div className="flex gap-x-3">
            <p>Role:</p>
            <select
              className="w-full outline-none"
              value={userRole}
              onChange={handleOnChangeSelect}
            >
              {Object.values(ROLE).map((role) => (
                <option key={role} value={role} className="text-sm ">
                  {role}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => {
              updateUserRole();
            }}
            className=" block w-full text-center bg-blue-950 text-white py-1 rounded-md"
          >
            Change Role
          </button>
        </div>
      </div>
    </>
  );
};

export default ChangeUserRole;
