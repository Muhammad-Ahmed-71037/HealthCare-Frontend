import { Steps } from "antd";
import { stepIcons, STEPS } from "../../lib/constants";
import { SiTicktick } from "react-icons/si";

const { Step } = Steps;

const Steper = ({ step }) => {
  return (
    <div
      className="
      h-[102px] p-8 bg-white rounded-xl shadow-sm
      flex justify-center items-center
    "
    >
      <Steps
        className="w-full flex-row justify-center items-center"
        step={step}
        labelPlacement="vertical"
      >
        {STEPS.map((value, index) => (
          <Step
            key={index}
            title={
              <div className="flex justify-center mt-[-8px] ml-2">
                <span
                  className={`block font-semibold text-[14px] 
                  ${
                    index === step
                      ? "text-blue-600"
                      : index < step
                      ? "text-green-500"
                      : "text-gray-400"
                  } 
                `}
                >
                  {value.label}
                </span>
              </div>
            }
            icon={
              <div
                className={`
                flex justify-center items-center 
                w-12 h-12 rounded-xl text-[24px] transition-all duration-300 cursor-pointer
                sm:w-[30px] sm:h-[30px] sm:text-[14px] sm:rounded-md
                ${
                  index < step
                    ? "bg-green-500 text-white shadow-[0_3px_8px_rgba(0,128,0,0.3)]"
                    : index === step
                    ? "bg-blue-600 text-white shadow-[0_3px_8px_rgba(128,0,128,0.3)]"
                    : "bg-gray-200 text-gray-400 shadow-[0_3px_8px_rgba(0,0,0,0.1)]"
                }
              `}
              >
                {index < step ? (
                  <span className="text-[18px] sm:text-[10px]">
                    <SiTicktick />
                  </span>
                ) : (
                  stepIcons[index]
                )}
              </div>
            }
          />
        ))}
      </Steps>
    </div>
  );
};

export default Steper;
