import { Link } from "react-router-dom";
import { WEBLOGO } from "../../assets/labels/logo";
import { Links } from "../../lib/constants";
import { FaEnvelope, FaPhone, FaHeart, FaArrowRight } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="brand-logo-container">
              <img
                src={WEBLOGO}
                alt="healthMade"
                className="brand-logo"
              />
              <span className="brand-text">HealthMade</span>
            </div>
            <p className="brand-tagline">
              Your trusted partner in health and wellness journey
            </p>
            <div className="social-links">
              <div className="social-icon">f</div>
              <div className="social-icon">t</div>
              <div className="social-icon">in</div>
              <div className="social-icon">ig</div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="footer-section">
            <h3 className="section-title">
              <span className="title-decoration">Quick Links</span>
            </h3>
            <ul className="links-list">
              {Links.map((val, index) => (
                <li key={index} className="link-item">
                  <FaArrowRight className="link-arrow" />
                  <Link to={val.path} className="footer-link">
                    {val.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="section-title">
              <span className="title-decoration">Contact Us</span>
            </h3>
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">
                  <FaEnvelope />
                </div>
                <div className="contact-details">
                  <p className="contact-label">Email</p>
                  <p className="contact-value">ahmed319144@gmail.com</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <FaPhone />
                </div>
                <div className="contact-details">
                  <p className="contact-label">Phone</p>
                  <p className="contact-value">03232660270</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="footer-section">
            <h3 className="section-title">
              <span className="title-decoration">Stay Updated</span>
            </h3>
            <p className="newsletter-text">
              Subscribe to our newsletter for health tips and updates
            </p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="newsletter-input"
              />
              <button className="newsletter-button">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="bottom-content">
            <p className="copyright">
              © 2025 Borcelle Health Service. All rights reserved.
            </p>
            <div className="bottom-links">
              <span className="made-with">
                Made with <FaHeart className="heart-icon" /> for your health
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-container {
          width: 100vw;
          background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%);
          color: white;
          position: relative;
          overflow: hidden;
          left: 0;
          right: 0;
          margin: 0;
          padding: 0;
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
          max-width: 100%;
          margin: 0 auto;
          padding: 3rem 1.5rem 1rem;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          margin-bottom: 2rem;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .brand-logo-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .brand-logo {
          height: 50px;
          width: auto;
          object-fit: contain;
          filter: brightness(0) invert(1);
        }

        .brand-text {
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #fff, #a5b4fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .brand-tagline {
          color: #c7d2fe;
          font-size: 0.9rem;
          line-height: 1.5;
          max-width: 300px;
        }

        .social-links {
          display: flex;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }

        .social-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .social-icon:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .footer-section {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .section-title {
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0;
          position: relative;
        }

        .title-decoration {
          padding-bottom: 0.5rem;
          position: relative;
        }

        .title-decoration::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, #6366f1, #a5b4fc);
          border-radius: 2px;
        }

        .links-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .link-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .link-item:hover {
          transform: translateX(5px);
        }

        .link-arrow {
          font-size: 0.7rem;
          color: #a5b4fc;
          transition: all 0.3s ease;
        }

        .link-item:hover .link-arrow {
          color: #6366f1;
          transform: translateX(3px);
        }

        .footer-link {
          color: #c7d2fe;
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .footer-link:hover {
          color: white;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .contact-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          flex-shrink: 0;
          backdrop-filter: blur(10px);
        }

        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .contact-label {
          font-size: 0.8rem;
          color: #a5b4fc;
          font-weight: 500;
          margin: 0;
        }

        .contact-value {
          font-size: 0.9rem;
          color: #e0e7ff;
          margin: 0;
          word-break: break-all;
        }

        .newsletter-text {
          color: #c7d2fe;
          font-size: 0.9rem;
          line-height: 1.5;
          margin: 0 0 1rem 0;
        }

        .newsletter-form {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .newsletter-input {
          padding: 0.75rem 1rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 0.9rem;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .newsletter-input::placeholder {
          color: #a5b4fc;
        }

        .newsletter-input:focus {
          outline: none;
          border-color: #6366f1;
          background: rgba(255, 255, 255, 0.15);
        }

        .newsletter-button {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: none;
          border-radius: 10px;
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .newsletter-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 1.5rem;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }

        .bottom-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          text-align: center;
        }

        .copyright {
          color: #a5b4fc;
          font-size: 0.85rem;
          margin: 0;
        }

        .bottom-links {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .made-with {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #a5b4fc;
          font-size: 0.85rem;
        }

        .heart-icon {
          color: #ef4444;
          font-size: 0.7rem;
          animation: heartbeat 2s ease-in-out infinite;
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @media (min-width: 640px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }

          .newsletter-form {
            flex-direction: row;
          }

          .newsletter-input {
            flex: 1;
          }
        }

        @media (min-width: 768px) {
          .footer-content {
            padding: 4rem 2rem 1.5rem;
          }

          .footer-grid {
            grid-template-columns: 2fr 1fr 1fr 1.5fr;
            gap: 2.5rem;
          }

          .bottom-content {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
          }
        }

        @media (min-width: 1024px) {
          .footer-content {
            padding: 4rem 2rem 2rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;