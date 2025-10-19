import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { BiLogIn } from "react-icons/bi";

const LoginIcon = () => {
  return (
    <div>
      <BiLogIn size={18} />
    </div>
  );
};
const LeftArrow = () => {
  return (
    <div>
      <ArrowLeftOutlined />
    </div>
  );
};
const RightArrow = () => {
  return (
    <div>
      <ArrowRightOutlined />
    </div>
  );
};

export { LoginIcon, LeftArrow, RightArrow };
