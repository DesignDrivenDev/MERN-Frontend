import React from "react";

const InputField = ({ name, value, type, onChange, labelName }) => {
  return (
    <div>
      <label htmlFor={name} className="text-xs">
        {labelName}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="border border-blue-950 p-2 w-full rounded-md outline-none bg-white text-sm text-gray-700 shadow-sm"
      />
    </div>
  );
};

export default InputField;
