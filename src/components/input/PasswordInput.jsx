import { Input } from "antd";

const { Password } = Input;

const CustomPasswordInput = ({ className, onChange, placeholder, value }) => {
  return (
    <Password
      placeholder={placeholder || "Enter password"}
      value={value}
      onChange={onChange}
      className={className || "customInput"}
    />
  );
};

export default CustomPasswordInput;
