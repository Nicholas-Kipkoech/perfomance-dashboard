import React from "react";

interface ICustomInput {
  placeholder: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  className: string;
  type: string;
}

const CustomInput = ({
  placeholder,
  name,
  onChange,
  value,
  className,
  type,
}: ICustomInput) => {
  return (
    <div className="flex flex-col">
      <label>{name}</label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={`outline-[#cb7529] ${className}`}
      />
    </div>
  );
};

export default CustomInput;
