import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../../../components/input/Input";
import PasswordInput from "../../../components/input/PasswordInput";
import { Form, message } from "antd";
import { CustomButton } from "../../../components/button/Button";
import { UserSignin } from "../../../utils/helpers/helpers";
import { useState } from "react";
import Loading from "../../../components/loader/Loading";
import { LoginIcon } from "../../../components/icons/Icons";
import { FaStethoscope, FaUserMd, FaShieldAlt, FaHeartbeat } from "react-icons/fa";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [apiMessage, contextHolder] = message.useMessage();

  const onLoginSuccessFully = async (payload) => {
    try {
      setIsLoading(true);
      const response = await UserSignin(payload);
      form.resetFields();
      navigate("/dashboard");
      return response;
    } catch (err) {
      console.log(err);
      apiMessage.error("Invalid Credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      {contextHolder}
      
      {/* Background Elements */}
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="floating-icon icon-1">
          <FaHeartbeat />
        </div>
        <div className="floating-icon icon-2">
          <FaStethoscope />
        </div>
        <div className="floating-icon icon-3">
          <FaUserMd />
        </div>
      </div>

      <div className="login-card">
        {/* Header Section */}
        <div className="login-header">
          <div className="header-icon">
            <FaShieldAlt />
          </div>
          <div className="header-text">
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Sign in to your HealthCare account</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="login-form-container">
          <Form form={form} onFinish={onLoginSuccessFully} className="login-form">
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Email is required" },
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <CustomInput 
                label="Email" 
                type="email"
                className="custom-input"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <PasswordInput 
                label="Password" 
                type="password"
                className="custom-input"
              />
            </Form.Item>

            <Form.Item className="submit-item">
              <CustomButton
                className="login-button"
                icon={isLoading ? "" : <LoginIcon />}
                value={isLoading ? <Loading /> : "Sign In"}
                htmlType="submit"
                disabled={isLoading}
              />
            </Form.Item>
          </Form>

          {/* Links Section */}
          <div className="login-links">
            <Link
              to={"/forgottenPassword"}
              className="forgot-password-link"
            >
              Forgot Your Password?
            </Link>
            
            <div className="signup-section">
              <span className="signup-text">Don't have an account?</span>
              <Link
                to="/signup"
                className="signup-link"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>

        {/* Security Footer */}
        <div className="security-footer">
          <FaShieldAlt className="security-icon" />
          <span>Your health data is securely encrypted</span>
        </div>
      </div>

      <style jsx>{`
        .login-container {
          width: 100vw;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          position: relative;
          overflow: hidden;
        }

        .background-shapes {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .shape {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          animation: float 6s ease-in-out infinite;
        }

        .shape-1 {
          width: 120px;
          height: 120px;
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 80px;
          height: 80px;
          bottom: 20%;
          right: 15%;
          animation-delay: 2s;
        }

        .shape-3 {
          width: 60px;
          height: 60px;
          top: 50%;
          left: 5%;
          animation-delay: 4s;
        }

        .floating-icon {
          position: absolute;
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.2);
          animation: float 8s ease-in-out infinite;
        }

        .icon-1 {
          top: 20%;
          right: 20%;
          animation-delay: 1s;
        }

        .icon-2 {
          bottom: 30%;
          left: 20%;
          animation-delay: 3s;
        }

        .icon-3 {
          top: 60%;
          right: 10%;
          animation-delay: 5s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }

        .login-card {
          width: 100%;
          max-width: 440px;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          overflow: hidden;
          position: relative;
          z-index: 1;
        }

        .login-header {
          text-align: center;
          padding: 2.5rem 2rem 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          position: relative;
        }

        .header-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          opacity: 0.9;
        }

        .login-title {
          font-size: 2rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
          color: white;
        }

        .login-subtitle {
          font-size: 1rem;
          opacity: 0.9;
          margin: 0;
          font-weight: 400;
        }

        .login-form-container {
          padding: 2rem 2rem 1.5rem;
        }

        .login-form {
          margin-bottom: 2rem;
        }

        :global(.custom-input) {
          border-radius: 12px;
          border: 2px solid #e5e7eb;
          transition: all 0.3s ease;
        }

        :global(.custom-input:hover),
        :global(.custom-input:focus) {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .submit-item {
          margin-bottom: 0;
        }

        .login-button {
          width: 100%;
          height: 50px;
          border-radius: 12px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .login-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }

        .login-button:active {
          transform: translateY(0);
        }

        .login-links {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          align-items: center;
        }

        .forgot-password-link {
          color: #667eea;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          padding: 0.5rem;
          border-radius: 8px;
        }

        .forgot-password-link:hover {
          color: #5a67d8;
          background: rgba(102, 126, 234, 0.1);
          text-decoration: none;
        }

        .signup-section {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
        }

        .signup-text {
          color: #6b7280;
        }

        .signup-link {
          color: #667eea;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
        }

        .signup-link:hover {
          color: #5a67d8;
          background: rgba(102, 126, 234, 0.1);
          text-decoration: none;
        }

        .security-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: #f8fafc;
          border-top: 1px solid #e5e7eb;
          color: #6b7280;
          font-size: 0.8rem;
        }

        .security-icon {
          font-size: 0.9rem;
          color: #667eea;
        }

        @media (max-width: 640px) {
          .login-container {
            padding: 1rem;
            align-items: flex-start;
          }

          .login-card {
            margin: 2rem 0;
          }

          .login-header {
            padding: 2rem 1.5rem 1rem;
          }

          .login-title {
            font-size: 1.75rem;
          }

          .login-form-container {
            padding: 1.5rem 1.5rem 1rem;
          }

          .header-icon {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 480px) {
          .login-title {
            font-size: 1.5rem;
          }

          .login-subtitle {
            font-size: 0.9rem;
          }

          .login-form-container {
            padding: 1.25rem 1.25rem 0.75rem;
          }

          .signup-section {
            flex-direction: column;
            gap: 0.25rem;
          }
        }

        @media (max-width: 360px) {
          .login-header {
            padding: 1.5rem 1rem 0.75rem;
          }

          .login-form-container {
            padding: 1rem 1rem 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;