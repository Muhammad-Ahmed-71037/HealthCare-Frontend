import { useState } from "react";
import { Drawer } from "antd";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { WEBLOGO } from "../../assets/labels/logo.js";
import { CustomButton } from "../button/Button.jsx";
import { LoginIcon } from "../icons/Icons.jsx";
import logoutHandler from "../../functions/LogoutHandler.js";
import { Links } from "../../lib/constants.jsx";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <nav className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-brand">
            <img
              src={WEBLOGO}
              alt="healthMade"
              className="navbar-logo"
            />
            <span className="navbar-brand-text">HealthMade</span>
          </div>

          <div className="navbar-links">
            {Links.map((val, index) => (
              <NavLink 
                to={val.path} 
                key={index}
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'nav-link-active' : ''}`
                }
              >
                {val.name}
              </NavLink>
            ))}
          </div>

          <div className="navbar-actions">
            <CustomButton
              icon={<FaBars />}
              onClick={showDrawer}
              className="navbar-toggle"
            />
          </div>
        </div>
      </nav>

      <Drawer
        width={280}
        onClose={onClose}
        open={open}
        placement="right"
        closable={false}
        title={
          <div className="drawer-header">
            <div className="drawer-brand">
              <img
                src={WEBLOGO}
                alt="healthMade"
                className="drawer-logo"
              />
              <span className="drawer-title">HealthMade</span>
            </div>
            <button 
              onClick={onClose}
              className="drawer-close-btn"
            >
              <FaTimes />
            </button>
          </div>
        }
        className="custom-drawer"
        styles={{
          body: { padding: '0' }
        }}
      >
        <div className="drawer-content">
          <div className="drawer-section">
            <p className="drawer-section-title">Navigation</p>
            <div className="drawer-links">
              {Links.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `drawer-link ${isActive ? 'drawer-link-active' : ''}`
                  }
                >
                  <span className="drawer-link-icon">{item.icon}</span>
                  <span className="drawer-link-text">{item.name}</span>
                </NavLink>
              ))}
            </div>
          </div>

          <div className="drawer-footer">
            <CustomButton
              value={"Logout"}
              icon={<LoginIcon />}
              onClick={() => logoutHandler(navigate)}
              className="logout-btn"
            />
          </div>
        </div>
      </Drawer>

      <style jsx>{`
        .navbar-container {
          width: 100vw;
          height: 80px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 1000;
          backdrop-filter: blur(10px);
          left: 0;
          right: 0;
          margin: 0;
          padding: 0;
        }

        .navbar-content {
          max-width: 100%;
          margin: 0 auto;
          height: 100%;
          padding: 0 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .navbar-logo {
          height: 45px;
          width: auto;
          object-fit: contain;
          filter: brightness(0) invert(1);
        }

        .navbar-brand-text {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          letter-spacing: -0.5px;
        }

        .navbar-links {
          display: none;
          gap: 2rem;
          align-items: center;
        }

        .nav-link {
          color: rgba(255, 255, 255, 0.9);
          text-decoration: none;
          font-weight: 500;
          padding: 0.5rem 0;
          position: relative;
          transition: all 0.3s ease;
        }

        .nav-link:hover {
          color: white;
          transform: translateY(-1px);
        }

        .nav-link-active {
          color: white;
          font-weight: 600;
        }

        .nav-link-active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: white;
          border-radius: 2px;
        }

        .navbar-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          padding: 0.75rem;
          border-radius: 12px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .navbar-toggle:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.05);
        }

        .drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 0;
          border-bottom: 1px solid #e5e7eb;
        }

        .drawer-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .drawer-logo {
          height: 40px;
          width: auto;
          object-fit: contain;
        }

        .drawer-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1f2937;
        }

        .drawer-close-btn {
          background: none;
          border: none;
          font-size: 1.25rem;
          color: #6b7280;
          padding: 0.5rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .drawer-close-btn:hover {
          background: #f3f4f6;
          color: #374151;
        }

        .drawer-content {
          padding: 1rem 0;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .drawer-section {
          margin-bottom: 2rem;
        }

        .drawer-section-title {
          color: #6b7280;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 1rem;
          padding: 0 1.5rem;
        }

        .drawer-links {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .drawer-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1.5rem;
          text-decoration: none;
          color: #374151;
          transition: all 0.3s ease;
          border-radius: 0;
          margin: 0 0.5rem;
        }

        .drawer-link:hover {
          background: #f3f4f6;
          color: #1f2937;
          transform: translateX(4px);
        }

        .drawer-link-active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 12px;
          margin: 0 0.5rem;
        }

        .drawer-link-icon {
          font-size: 1.125rem;
          width: 20px;
          text-align: center;
        }

        .drawer-link-text {
          font-weight: 500;
        }

        .drawer-footer {
          margin-top: auto;
          padding: 1.5rem;
          border-top: 1px solid #e5e7eb;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          padding: 0.875rem 1rem;
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .logout-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(239, 68, 68, 0.3);
        }

        @media (min-width: 768px) {
          .navbar-links {
            display: flex;
          }
          
          .navbar-toggle {
            display: none;
          }

          .navbar-container {
            height: 90px;
          }
        }

        @media (min-width: 1024px) {
          .navbar-container {
            height: 100px;
          }
          
          .navbar-content {
            padding: 0 2rem;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;