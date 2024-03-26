import React from "react";
import Select from "react-select";

interface ISelect {
  className: string;
  options: any;
  name: string;
  placeholder?: string;
  onChange: any;
  defaultValue: {
    label: string;
    value: string | number;
  };
}
const CustomSelect = ({
  className,
  options,
  name,
  onChange,
  placeholder,
  defaultValue,
}: ISelect) => {
  return (
    <div className="flex flex-col mt-1">
      <label className="flex gap-5 mt-2 ml-3">{name}</label>
      <Select
        defaultValue={defaultValue}
        options={options}
        placeholder={placeholder}
        className={` outline-[#cb7529] ${className}`}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomSelect;
