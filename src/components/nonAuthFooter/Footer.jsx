import { FaHeart, FaShieldAlt, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Logo Section */}
          <div className="logo-section">
            <div className="logo">
              <h2 className="logo-text">HealthCare</h2>
              <div className="logo-subtitle">Your Health, Our Priority</div>
            </div>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <FaTwitter />
              </a>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="copyright-section">
            <div className="copyright-content">
              <span className="copyright-text">
                © 2025 Crafted with <FaHeart className="heart-icon" /> by Muhammad Ahmed
              </span>
              <div className="copyright-subtitle">
                Building better healthcare experiences
              </div>
            </div>
          </div>

          {/* Privacy Section */}
          <div className="privacy-section">
            <div className="privacy-content">
              <FaShieldAlt className="privacy-icon" />
              <div className="privacy-text">
                <span className="privacy-title">Privacy & Security</span>
                <span className="privacy-subtitle">HIPAA Compliant</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="footer-border"></div>
      </div>

      <style jsx>{`
        .footer-container {
          width: 100vw;
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          color: white;
          position: relative;
          overflow: hidden;
          margin: 0;
          padding: 0;
          left: 0;
          right: 0;
        }

        .footer-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1.5rem 1rem;
        }

        .footer-main {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: center;
          text-align: center;
        }

        .logo-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .logo {
          text-align: center;
        }

        .logo-text {
          font-size: 1.75rem;
          font-weight: 800;
          background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
          letter-spacing: -0.5px;
        }

        .logo-subtitle {
          font-size: 0.8rem;
          color: #cbd5e1;
          margin-top: 0.25rem;
          font-weight: 500;
        }

        .social-links {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .social-link {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #cbd5e1;
          text-decoration: none;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .social-link:hover {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .copyright-section {
          display: flex;
          justify-content: center;
        }

        .copyright-content {
          text-align: center;
        }

        .copyright-text {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: #e2e8f0;
          font-weight: 500;
        }

        .heart-icon {
          color: #ef4444;
          font-size: 0.8rem;
          animation: heartbeat 2s ease-in-out infinite;
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        .copyright-subtitle {
          font-size: 0.75rem;
          color: #94a3b8;
          margin-top: 0.25rem;
          font-weight: 400;
        }

        .privacy-section {
          display: flex;
          justify-content: center;
        }

        .privacy-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.25rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .privacy-content:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-1px);
        }

        .privacy-icon {
          font-size: 1rem;
          color: #60a5fa;
        }

        .privacy-text {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }

        .privacy-title {
          font-size: 0.8rem;
          font-weight: 600;
          color: #e2e8f0;
        }

        .privacy-subtitle {
          font-size: 0.7rem;
          color: #94a3b8;
          font-weight: 500;
        }

        .footer-border {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          margin-top: 1.5rem;
        }

        @media (min-width: 640px) {
          .footer-main {
            grid-template-columns: 1fr 1fr 1fr;
            text-align: left;
            gap: 1.5rem;
          }

          .logo-section {
            align-items: flex-start;
          }

          .social-links {
            justify-content: flex-start;
          }

          .copyright-section {
            justify-content: center;
          }

          .copyright-content {
            text-align: center;
          }

          .privacy-section {
            justify-content: flex-end;
          }

          .footer-content {
            padding: 2.5rem 2rem 1.5rem;
          }
        }

        @media (min-width: 768px) {
          .footer-content {
            padding: 3rem 2rem 2rem;
          }

          .logo-text {
            font-size: 2rem;
          }

          .copyright-text {
            font-size: 1rem;
          }

          .privacy-title {
            font-size: 0.85rem;
          }
        }

        @media (min-width: 1024px) {
          .footer-content {
            padding: 3rem 2rem 2rem;
          }

          .footer-main {
            gap: 2rem;
          }
        }

        @media (max-width: 480px) {
          .footer-content {
            padding: 1.5rem 1rem 1rem;
          }

          .logo-text {
            font-size: 1.5rem;
          }

          .copyright-text {
            font-size: 0.8rem;
            flex-direction: column;
            gap: 0.25rem;
          }

          .privacy-content {
            padding: 0.6rem 1rem;
          }

          .social-links {
            gap: 0.75rem;
          }

          .social-link {
            width: 32px;
            height: 32px;
            font-size: 0.8rem;
          }
        }

        @media (max-width: 360px) {
          .footer-main {
            gap: 1.5rem;
          }

          .logo-text {
            font-size: 1.25rem;
          }

          .copyright-text {
            font-size: 0.75rem;
          }

          .privacy-content {
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Footer;