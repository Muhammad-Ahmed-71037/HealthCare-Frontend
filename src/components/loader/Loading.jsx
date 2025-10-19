import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const indicator = (
  <LoadingOutlined style={{ fontSize: 14, color: "#fff" }} spin />
);

const Loading = () => {
  return (
    <div className="flex justify-center items-center text-white">
      <Spin indicator={indicator} size="small" />
    </div>
  );
};

export default Loading;
