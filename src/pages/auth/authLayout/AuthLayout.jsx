import { Outlet } from "react-router-dom";
import Navbar from "../../../components/authNavbar/Navbar.jsx";
import Footer from "../../../components/authFooter/Footer.jsx";
import useAuthRedirection from "../../../hooks/Auth.jsx";

const AuthLayout = () => {
  useAuthRedirection();
  return (
    <div className="container">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="outlet ">
        <Outlet />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default AuthLayout;
