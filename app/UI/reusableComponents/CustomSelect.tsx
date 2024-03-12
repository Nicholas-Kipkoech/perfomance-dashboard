import React from "react";
import Select from "react-select";

interface ISelect {
  className: string;
  options: any;
}
const CustomSelect = ({ className, options }: ISelect) => {
  return <Select className={className} options={options} />;
};

export default CustomSelect;
