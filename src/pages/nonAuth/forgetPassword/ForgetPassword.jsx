import { Form, message } from "antd";
import { ForgetPasswordSteps } from "../../../lib/constants";
import { useState } from "react";
import { CustomButton } from "../../../components/button/Button";
import { Link, useNavigate } from "react-router-dom";
import {
  resetPassword,
  sendForgetPasswordOtp,
  verifyOtp,
} from "../../../utils/helpers/helpers";
import { FaKey, FaEnvelope, FaShieldAlt, FaCheckCircle, FaArrowRight, FaLock } from "react-icons/fa";

const ForgetPassword = () => {
  const [form] = Form.useForm();
  const [steps, setSteps] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [otpVerified, setOtpVerified] = useState(false);
  const [apiMessage, contextHolder] = message.useMessage();
  const currentStep = ForgetPasswordSteps[steps];

  const handleNext = async () => {
    try {
      await form.validateFields([currentStep.name]);
      const values = form.getFieldsValue(true);

      if (currentStep.name === "email") {
        try {
          setIsLoading(true);
          await sendForgetPasswordOtp(values.email);
          setOtpSent(true);
          apiMessage.success("OTP sent successfully!");
          setSteps(steps + 1);
        } catch (err) {
          apiMessage.error(err.response?.data?.msg || "Failed to send OTP");
        } finally {
          setIsLoading(false);
        }
        return;
      }

      if (currentStep.name === "otp") {
        if (!otpSent) {
          apiMessage.warning("Please send OTP first!");
          return;
        }

        try {
          setIsLoading(true);
          const res = await verifyOtp(values.email, values.otp);

          if (res?.data?.msg?.toLowerCase().includes("verified")) {
            apiMessage.success("OTP verified successfully!");
            setOtpVerified(true);
            setSteps(steps + 1);
          } else {
            setOtpVerified(false);
            apiMessage.error("Invalid OTP. Please try again!");
          }
        } catch (err) {
          console.log("OTP verification error:", err);
          setOtpVerified(false);
          apiMessage.error(err.response?.data?.msg || "Invalid or expired OTP");
        } finally {
          setIsLoading(false);
        }
        return;
      }

      if (
        currentStep.name === "password" ||
        currentStep.name === "confirmPassword"
      ) {
        if (!otpVerified) {
          apiMessage.warning("Please verify OTP first!");
          return;
        }

        const { email, password, confirmPassword } = values;

        try {
          setIsLoading(true);
          const res = await resetPassword({ email, password, confirmPassword });
          apiMessage.success(res.data?.msg || "Password reset successfully!");
          form.resetFields();
          navigate("/login");
        } catch (err) {
          apiMessage.error(
            err.response?.data?.msg || "Failed to reset password"
          );
        } finally {
          setIsLoading(false);
        }
        return;
      }
    } catch (err) {
      console.log("Validation error:", err);
    }
  };

  const getStepIcon = (stepName) => {
    switch (stepName) {
      case 'email': return <FaEnvelope />;
      case 'otp': return <FaKey />;
      case 'password': return <FaLock />;
      case 'confirmPassword': return <FaShieldAlt />;
      default: return <FaKey />;
    }
  };

  const getStepTitle = () => {
    switch (currentStep.name) {
      case 'email': return "Verify Your Email";
      case 'otp': return "Enter Verification Code";
      case 'password': return "Create New Password";
      case 'confirmPassword': return "Confirm New Password";
      default: return "Reset Your Password";
    }
  };

  const getStepDescription = () => {
    switch (currentStep.name) {
      case 'email': return "Enter your email address to receive a verification code";
      case 'otp': return "Check your email and enter the 6-digit code we sent you";
      case 'password': return "Create a strong, secure password for your account";
      case 'confirmPassword': return "Re-enter your new password to confirm";
      default: return "Secure your account with a new password";
    }
  };

  const getButtonText = () => {
    if (isLoading) return "Processing...";
    switch (currentStep.name) {
      case 'email': return "Send Verification Code";
      case 'otp': return "Verify Code";
      case 'password': return "Continue";
      case 'confirmPassword': return "Reset Password";
      default: return "Continue";
    }
  };

  return (
    <div className="forget-password-container">
      {contextHolder}
      
      {/* Background Elements */}
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="floating-icon icon-1">
          <FaKey />
        </div>
        <div className="floating-icon icon-2">
          <FaLock />
        </div>
        <div className="floating-icon icon-3">
          <FaShieldAlt />
        </div>
      </div>

      <div className="forget-password-card">
        {/* Header Section */}
        <div className="password-header">
          <div className="header-icon">
            <FaKey />
          </div>
          <div className="header-text">
            <h1 className="password-title">{getStepTitle()}</h1>
            <p className="password-subtitle">{getStepDescription()}</p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="progress-section">
          <div className="step-indicator">
            <span className="step-current">{steps + 1}</span>
            <span className="step-total">/{ForgetPasswordSteps.length}</span>
          </div>
          <div className="step-progress">
            <div 
              className="progress-bar"
              style={{ width: `${((steps + 1) / ForgetPasswordSteps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="status-indicators">
          {otpSent && (
            <div className="status-item success">
              <FaCheckCircle />
              <span>Verification code sent to your email</span>
            </div>
          )}
          {otpVerified && (
            <div className="status-item verified">
              <FaCheckCircle />
              <span>Email verified successfully</span>
            </div>
          )}
        </div>

        {/* Form Section */}
        <div className="form-container">
          <Form form={form} onFinish={handleNext} layout="vertical">
            <Form.Item
              name={currentStep.name}
              label={
                <span className="form-label">
                  {getStepIcon(currentStep.name)}
                  {currentStep.label}
                </span>
              }
              validateFirst
              validateTrigger="onChange"
              rules={currentStep.rules}
              className="form-item"
            >
              <currentStep.component 
                placeholder={`Enter your ${currentStep.label.toLowerCase()}`}
                className="custom-input"
              />
            </Form.Item>
            
            <Form.Item className="submit-item">
              <CustomButton
                htmlType={"button"}
                onClick={handleNext}
                value={getButtonText()}
                className="submit-button"
                icon={!isLoading && <FaArrowRight />}
                loading={isLoading}
              />
            </Form.Item>
          </Form>

          {/* Back to Login */}
          <div className="redirect-section">
            <div className="redirect-divider">
              <span>Remember your password?</span>
            </div>
            <Link to={"/login"} className="login-link">
              <span>Back to Login</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>

        {/* Security Footer */}
        <div className="security-footer">
          <FaShieldAlt className="security-icon" />
          <span>Your account security is our top priority</span>
        </div>
      </div>

      <style jsx>{`
        .forget-password-container {
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
          width: 100px;
          height: 100px;
          top: 10%;
          right: 10%;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 70px;
          height: 70px;
          bottom: 20%;
          left: 15%;
          animation-delay: 2s;
        }

        .shape-3 {
          width: 50px;
          height: 50px;
          top: 50%;
          right: 5%;
          animation-delay: 4s;
        }

        .floating-icon {
          position: absolute;
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.15);
          animation: float 8s ease-in-out infinite;
        }

        .icon-1 {
          top: 20%;
          left: 20%;
          animation-delay: 1s;
        }

        .icon-2 {
          bottom: 30%;
          right: 20%;
          animation-delay: 3s;
        }

        .icon-3 {
          top: 60%;
          left: 10%;
          animation-delay: 5s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }

        .forget-password-card {
          width: 100%;
          max-width: 480px;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          overflow: hidden;
          position: relative;
          z-index: 1;
        }

        .password-header {
          text-align: center;
          padding: 2.5rem 2rem 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .header-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          opacity: 0.9;
        }

        .password-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
          color: white;
        }

        .password-subtitle {
          font-size: 1rem;
          opacity: 0.9;
          margin: 0;
          font-weight: 400;
          line-height: 1.5;
        }

        .progress-section {
          padding: 1.5rem 2rem;
          background: #f8fafc;
          border-bottom: 1px solid #e5e7eb;
        }

        .step-indicator {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 0.25rem;
          margin-bottom: 1rem;
        }

        .step-current {
          font-size: 1.5rem;
          font-weight: 700;
          color: #667eea;
        }

        .step-total {
          font-size: 1rem;
          color: #6b7280;
          font-weight: 500;
        }

        .step-progress {
          width: 100%;
          height: 6px;
          background: #e5e7eb;
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
          border-radius: 3px;
          transition: width 0.5s ease-in-out;
        }

        .status-indicators {
          padding: 1rem 2rem 0;
        }

        .status-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          font-size: 0.85rem;
          font-weight: 500;
          animation: slideIn 0.5s ease-out;
        }

        .status-item.success {
          background: #dcfce7;
          color: #166534;
          border: 1px solid #bbf7d0;
        }

        .status-item.verified {
          background: #dbeafe;
          color: #1e40af;
          border: 1px solid #93c5fd;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .form-container {
          padding: 1.5rem 2rem 1rem;
        }

        .form-item {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: #374151;
          font-size: 0.9rem;
        }

        :global(.custom-input) {
          border-radius: 12px;
          border: 2px solid #e5e7eb;
          transition: all 0.3s ease;
          font-size: 1rem;
          padding: 0.75rem 1rem;
        }

        :global(.custom-input:hover),
        :global(.custom-input:focus) {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          transform: translateY(-1px);
        }

        .submit-item {
          margin-bottom: 0;
        }

        .submit-button {
          width: 100%;
          height: 50px;
          border-radius: 12px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .submit-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }

        .redirect-section {
          text-align: center;
          padding-top: 1.5rem;
          border-top: 1px solid #e5e7eb;
          margin-top: 1.5rem;
        }

        .redirect-divider {
          margin-bottom: 1rem;
          color: #6b7280;
          font-size: 0.9rem;
        }

        .login-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #667eea;
          font-weight: 600;
          text-decoration: none;
          padding: 0.75rem 1.5rem;
          border: 2px solid #667eea;
          border-radius: 12px;
          transition: all 0.3s ease;
          background: transparent;
        }

        .login-link:hover {
          background: #667eea;
          color: white;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
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
          .forget-password-container {
            padding: 1rem;
            align-items: flex-start;
          }

          .forget-password-card {
            margin: 1rem 0;
          }

          .password-header {
            padding: 2rem 1.5rem 1rem;
          }

          .form-container {
            padding: 1rem 1.5rem 0.5rem;
          }

          .progress-section {
            padding: 1rem 1.5rem;
          }

          .password-title {
            font-size: 1.5rem;
          }

          .header-icon {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 480px) {
          .password-title {
            font-size: 1.35rem;
          }

          .password-subtitle {
            font-size: 0.9rem;
          }

          .form-container {
            padding: 1rem 1.25rem 0.5rem;
          }

          .submit-button {
            height: 48px;
            font-size: 0.95rem;
          }
        }

        @media (max-width: 360px) {
          .password-header {
            padding: 1.5rem 1rem 0.75rem;
          }

          .form-container {
            padding: 0.75rem 1rem 0.25rem;
          }

          .progress-section {
            padding: 0.75rem 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ForgetPassword;