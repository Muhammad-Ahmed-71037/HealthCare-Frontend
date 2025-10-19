import { Outlet } from "react-router-dom";
import Navbar from "../../../components/nonAuthNavbar/Navbar";
import Footer from "../../../components/nonAuthFooter/Footer.jsx";

import useNonAuthRedirect from "../../../hooks/NonAuth.jsx";

const NonAuthLayout = () => {
  useNonAuthRedirect();
  return (
    <div className="min-h-screen w-screen flex flex-col">
      <div className="w-full fixed h-[82px] flex items-center justify-between px-4 shadow-md">
        <Navbar />
      </div>
      <div className="flex flex-1 items-center">
        <div className="w-screen">
          <Outlet />
        </div>
      </div>
      <div className="w-screen border-t border-gray-300 h-[82px] flex items-center justify-between px-4 shadow-md">
        <Footer />
      </div>
    </div>
  );
};
export default NonAuthLayout;
