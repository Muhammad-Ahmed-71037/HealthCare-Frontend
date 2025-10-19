import { Input } from "antd";

const CustomInput = ({
  className,
  onChange,
  label,
  placeholder,
  type = "text",
  value,
}) => {
  return (
    <Input
      type={type}
      placeholder={placeholder || label}
      value={value}
      onChange={onChange}
      className={className || "customInput"}
    />
  );
};

export default CustomInput;
