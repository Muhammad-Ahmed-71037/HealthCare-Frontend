import { Link, useNavigate } from "react-router-dom";
import {
  CustomButton,
  CustomButtonTwin,
} from "../../../components/button/Button";
import { Form, message } from "antd";
import { useState } from "react";
import { STEPS } from "../../../lib/constants";
import { sendOtp, UserSignup, verifyOtp } from "../../../utils/helpers/helpers";
import {
  LeftArrow,
  LoginIcon,
  RightArrow,
} from "../../../components/icons/Icons";
import Steper from "../../../components/steps/Steps";
import Loading from "../../../components/loader/Loading";
import { FaUserPlus, FaShieldAlt, FaCheckCircle, FaEnvelope, FaKey, FaUser, FaPhone, FaLock } from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [step, setStep] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [apiMessage, contextHolder] = message.useMessage();

  const currentStep = STEPS[step];

  const handleNext = async () => {
    try {
      await form.validateFields([currentStep.name]);
      const values = form.getFieldsValue(true);

      if (currentStep.name === "email") {
        try {
          setIsLoading(true);
          await sendOtp(values.email);
          setOtpSent(true);
          apiMessage.success("OTP Sent");
          setStep(step + 1);
          return;
        } catch (err) {
          apiMessage.error(err.response?.data?.msg || "Failed to send OTP");
          return;
        } finally {
          setIsLoading(false);
        }
      }

      if (currentStep.name === "otp") {
        if (!otpSent) {
          apiMessage.warning("Please send OTP first!");
          return;
        }
        try {
          setIsLoading(true);
          const res = await verifyOtp(values.email, values.otp);
          apiMessage.success("OTP Verified");
          setOtpVerified(true);
          setStep(step + 1);
          return res;
        } catch (err) {
          console.log(err);
          setOtpVerified(false);
          apiMessage.error("Invalid or expired OTP");
          return;
        } finally {
          setIsLoading(false);
        }
      }
      if (step === STEPS.length - 1) {
        if (!otpVerified) {
          apiMessage.warning("Please verify OTP first!");
          return;
        }
        const { otp, ...data } = values;
        try {
          setIsLoading(true);
          const res = await UserSignup(data);
          localStorage.setItem("token", res.data.token);
          navigate("/dashboard");
        } catch (err) {
          apiMessage.error(err.response?.data?.msg || "Signup failed");
        } finally {
          setIsLoading(false);
        }
        return;
      }

      setStep(step + 1);
    } catch (err) {
      console.log("Validation error:", err);
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const getStepIcon = (stepName) => {
    switch (stepName) {
      case 'email': return <FaEnvelope />;
      case 'otp': return <FaKey />;
      case 'name': return <FaUser />;
      case 'phone': return <FaPhone />;
      case 'password': return <FaLock />;
      default: return <FaUser />;
    }
  };

  return (
    <div className="signup-container">
      {contextHolder}
      
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="floating-icon icon-1">
          <FaUserPlus />
        </div>
        <div className="floating-icon icon-2">
          <FaShieldAlt />
        </div>
        <div className="floating-icon icon-3">
          <FaCheckCircle />
        </div>
      </div>

      <div className="signup-content">
        <div className="signup-card">
          <div className="signup-header">
            <div className="header-icon">
              <FaUserPlus />
            </div>
            <div className="header-text">
              <h1 className="signup-title">Create Account</h1>
              <p className="signup-subtitle">Join HealthCare in {STEPS.length - step} simple steps</p>
            </div>
          </div>

          <div className="progress-section">
            <div className="step-indicator">
              <span className="step-current">{step + 1}</span>
              <span className="step-total">/{STEPS.length}</span>
            </div>
            <div className="step-info">
              <div className="step-icon">
                {getStepIcon(currentStep.name)}
              </div>
              <div>
                <h3 className="step-title">{currentStep.label}</h3>
                <p className="step-description">Please provide your {currentStep.label.toLowerCase()}</p>
              </div>
            </div>
          </div>

          <div className="stepper-container">
            <Steper step={step} />
          </div>

          <div className="form-container">
            <Form form={form} onFinish={handleNext} layout="vertical">
              <div className="form-content">
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

                <div className="status-indicators">
                  {otpSent && (
                    <div className="status-item success">
                      <FaCheckCircle />
                      <span>OTP sent to your email</span>
                    </div>
                  )}
                  {otpVerified && (
                    <div className="status-item success">
                      <FaCheckCircle />
                      <span>Email verified successfully</span>
                    </div>
                  )}
                </div>

                <div className={`navigation-buttons ${step > 0 ? 'two-buttons' : 'single-button'}`}>
                  {step > 0 && (
                    <CustomButtonTwin
                      icon={<LeftArrow />}
                      value="Back"
                      onClick={handlePrev}
                      className="back-button"
                    />
                  )}
                  <CustomButton
                    htmlType="button"
                    icon={
                      isLoading ? (
                        ""
                      ) : step < STEPS.length - 1 ? (
                        <RightArrow />
                      ) : (
                        <LoginIcon />
                      )
                    }
                    value={
                      isLoading ? (
                        <Loading />
                      ) : step < STEPS.length - 1 ? (
                        "Continue"
                      ) : (
                        "Create Account"
                      )
                    }
                    onClick={handleNext}
                    className="next-button"
                  />
                </div>
              </div>
            </Form>

            <div className="login-section">
              <p className="login-text">
                Already have an account?{" "}
                <Link to="/login" className="login-link">
                  Sign In
                </Link>
              </p>
            </div>
          </div>

          <div className="security-footer">
            <FaShieldAlt className="security-icon" />
            <span>Your personal information is securely protected</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .signup-container {
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
          right: 10%;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 80px;
          height: 80px;
          bottom: 20%;
          left: 15%;
          animation-delay: 2s;
        }

        .shape-3 {
          width: 60px;
          height: 60px;
          top: 50%;
          right: 5%;
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

        .signup-content {
          width: 100%;
          max-width: 500px;
        }

        .signup-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          overflow: hidden;
          position: relative;
          z-index: 1;
        }

        .signup-header {
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

        .signup-title {
          font-size: 2rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
          color: white;
        }

        .signup-subtitle {
          font-size: 1rem;
          opacity: 0.9;
          margin: 0;
          font-weight: 400;
        }

        .progress-section {
          padding: 1.5rem 2rem;
          background: #f8fafc;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .step-indicator {
          display: flex;
          align-items: baseline;
          background: white;
          padding: 0.5rem 1rem;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .step-current {
          font-size: 1.5rem;
          font-weight: 700;
          color: #667eea;
        }

        .step-total {
          font-size: 1rem;
          color: #6b7280;
        }

        .step-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .step-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1rem;
        }

        .step-title {
          font-size: 1rem;
          font-weight: 600;
          color: #374151;
          margin: 0;
        }

        .step-description {
          font-size: 0.8rem;
          color: #6b7280;
          margin: 0.25rem 0 0 0;
        }

        .stepper-container {
          padding: 1rem 2rem 0;
        }

        .form-container {
          padding: 1.5rem 2rem 1rem;
        }

        .form-content {
          margin-bottom: 1.5rem;
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
        }

        :global(.custom-input:hover),
        :global(.custom-input:focus) {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .status-indicators {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .status-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .status-item.success {
          background: #dcfce7;
          color: #166534;
          border: 1px solid #bbf7d0;
        }

        .navigation-buttons {
          display: flex;
          gap: 1rem;
        }

        .navigation-buttons.two-buttons {
          justify-content: space-between;
        }

        .navigation-buttons.single-button {
          justify-content: flex-end;
        }

        .back-button {
          border-radius: 12px;
          padding: 0.75rem 1.5rem;
          border: 2px solid #667eea;
          color: #667eea;
          background: transparent;
        }

        .back-button:hover {
          background: #667eea;
          color: white;
        }

        .next-button {
          border-radius: 12px;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .next-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }

        .login-section {
          text-align: center;
          padding-top: 1.5rem;
          border-top: 1px solid #e5e7eb;
        }

        .login-text {
          color: #6b7280;
          margin: 0;
        }

        .login-link {
          color: #667eea;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .login-link:hover {
          color: #5a67d8;
          text-decoration: underline;
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
          .signup-container {
            padding: 1rem;
            align-items: flex-start;
          }

          .signup-card {
            margin: 1rem 0;
          }

          .signup-header {
            padding: 2rem 1.5rem 1rem;
          }

          .progress-section {
            padding: 1rem 1.5rem;
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }

          .step-info {
            justify-content: center;
            text-align: center;
          }

          .form-container {
            padding: 1rem 1.5rem 0.5rem;
          }

          .stepper-container {
            padding: 0.5rem 1.5rem 0;
          }

          .signup-title {
            font-size: 1.75rem;
          }

          .header-icon {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 480px) {
          .signup-title {
            font-size: 1.5rem;
          }

          .signup-subtitle {
            font-size: 0.9rem;
          }

          .navigation-buttons {
            flex-direction: column;
          }

          .navigation-buttons.two-buttons {
            flex-direction: column-reverse;
          }
        }
      `}</style>
    </div>
  );
};

export default Signup;