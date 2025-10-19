import { Button } from "antd";

const baseButtonStyles = `
  bet-shake
  !flex !items-center !justify-center !gap-2
  !px-4 !py-2 !rounded-2xl
  !text-base !font-semibold
  !bg-blue-600 !text-white
  hover:!bg-blue-700
  !transition-all !duration-200 !ease-in-out
  !shadow-md hover:!shadow-lg
`;
export const CustomButton = ({
  className = "",
  icon,
  value,
  onClick,
  htmlType,
}) => {
  return (
    <Button
      type="text"
      htmlType={htmlType}
      onClick={onClick}
      className={`${baseButtonStyles} ${className}`}
    >
      {value}
      {icon}
    </Button>
  );
};

export const CustomButtonTwin = ({
  className = "",
  icon,
  value,
  onClick,
  htmlType,
}) => {
  return (
    <Button
      type="text"
      htmlType={htmlType}
      onClick={onClick}
      className={`${baseButtonStyles} ${className}`}
    >
      {icon}
      {value}
    </Button>
  );
};
