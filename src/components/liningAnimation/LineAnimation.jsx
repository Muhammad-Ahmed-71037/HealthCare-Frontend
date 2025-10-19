import { useEffect, useState } from "react";

const CustomTopProgressBar = ({
  color = "#3b82f6",
  speed = 500,
  height = "5px",
}) => {
  const [progress, setProgrees] = useState(0);

  useEffect(() => {
    let intervalTime = setInterval(() => {
      setProgrees((prev) => {
        if (prev >= 90) return prev;
        const previousTime = prev + Math.random() * 10;
        return previousTime;
      });
    }, speed);
    return () => clearInterval(intervalTime);
  }, [speed]);

  return (
    <div className="fixed top-0 left-0 w-screen z-[9999]">
      <div
        className="h-[3px]  rounded shadow-md transition-all duration-200 ease-out"
        style={{
          width: `${progress}%`,
          backgroundColor: color,
          height,
          boxShadow: "box-shadow: hsla(205, 100%, 46%, 1.00) 0px 5px 15px;",
        }}
      ></div>
    </div>
  );
};

export default CustomTopProgressBar;
