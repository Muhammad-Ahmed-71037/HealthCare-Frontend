import { useEffect, useState } from "react";
import { CustomButton } from "../src/components/button/Button.jsx";

const Network = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-black to-neutral-700 text-white text-center p-6 z-[9999999999]">
      <div className="mb-6">
        <div className="relative w-20 h-20 rounded-full border-[6px] border-white animate-pulseCustom">
          <div className="absolute top-1/2 left-1/2 w-5 h-5 -mt-2.5 -ml-2.5 bg-red-500 rounded-full"></div>
        </div>
      </div>

      <h1 className="text-[6vw] font-bold animate-fadeInDown">
        You’re Offline
      </h1>

      <p className="max-w-xl text-lg mt-2 mb-8 animate-fadeInUp">
        Looks like you lost your internet connection. Please check and try
        again.
      </p>

      <CustomButton
        onClick={() => window.location.reload()}
        className="px-7 py-3 bg-gradient-to-br from-black to-neutral-700 text-white font-semibold rounded-md transition-all duration-300 animate-fadeIn hover:from-blue-600 hover:to-blue-400"
        value={"Retry Connection"}
      />

      <style>{`
        @keyframes pulseCustom {
          0% { box-shadow: 0 0 0 0 rgba(255, 68, 68, 0.6); }
          70% { box-shadow: 0 0 0 20px rgba(255, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 68, 68, 0); }
        }
        .animate-pulseCustom {
          animation: pulseCustom 2s infinite;
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInDown {
          animation: fadeInDown 1.5s ease;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1.5s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 2s ease;
        }
      `}</style>
    </div>
  );
};

export default Network;
