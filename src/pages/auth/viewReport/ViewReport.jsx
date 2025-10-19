import { useState, useEffect } from "react";
import { Card, Spin, message, Tag, Divider } from "antd";
import axios from "axios";
import { 
  FaFileMedical, 
  FaCalendarAlt, 
  FaStethoscope, 
  FaUtensils, 
  FaQuestionCircle, 
  FaUserMd,
  FaExclamationTriangle,
  FaFilePdf,
  FaFileImage,
  FaDownload
} from "react-icons/fa";

const ViewReport = ({ reportId }) => {
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/api/reports/${reportId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.ok) {
          setReport(res.data.report);
        } else {
          message.warning("⚠️ Report not found!");
        }
      } catch (err) {
        console.error(err);
        message.error("❌ Failed to load report.");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [reportId]);

  if (loading) {
    return (
      <div className="report-loading">
        <div className="loading-content">
          <Spin size="large" />
          <p className="loading-text">Loading your medical report...</p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="report-not-found">
        <div className="not-found-content">
          <FaFileMedical className="not-found-icon" />
          <h2>Report Not Found</h2>
          <p>Sorry, we couldn't find the report you're looking for.</p>
        </div>
      </div>
    );
  }

  const getFileTypeIcon = () => {
    return report.fileUrl?.endsWith(".pdf") ? <FaFilePdf /> : <FaFileImage />;
  };

  const getFileTypeColor = () => {
    return report.fileUrl?.endsWith(".pdf") ? "#ef4444" : "#3b82f6";
  };

  return (
    <div className="view-report-container">
      <div className="view-report-content">
        {/* Header Section */}
        <div className="report-header">
          <div className="header-content">
            <div className="header-icon">
              <FaFileMedical />
            </div>
            <div className="header-text">
              <h1 className="report-title">Medical Report</h1>
              <p className="report-subtitle">Detailed analysis and AI insights</p>
            </div>
          </div>
          <div className="header-meta">
            <Tag color={getFileTypeColor()} className="file-type-tag">
              {getFileTypeIcon()}
              {report.fileUrl?.endsWith(".pdf") ? "PDF Document" : "Image File"}
            </Tag>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="report-grid">
          {/* Report Preview Section */}
          <Card className="report-preview-card">
            <div className="preview-header">
              <div className="preview-title-section">
                <h2 className="preview-title">
                  {report.type || "Medical Report"}
                </h2>
                <div className="preview-meta">
                  <div className="meta-item">
                    <FaCalendarAlt className="meta-icon" />
                    <span>{new Date(report.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="meta-item">
                    <FaStethoscope className="meta-icon" />
                    <span>{report.type || "General Report"}</span>
                  </div>
                </div>
              </div>
              <button className="download-button">
                <FaDownload />
                Download
              </button>
            </div>

            <div className="preview-content">
              {report.fileUrl?.endsWith(".pdf") ? (
                <iframe
                  src={report.fileUrl}
                  title="Report PDF"
                  className="report-iframe"
                />
              ) : (
                <img
                  src={report.fileUrl}
                  alt="Medical Report"
                  className="report-image"
                />
              )}
            </div>
          </Card>

          {/* AI Summary Section */}
          <Card className="ai-summary-card">
            <div className="summary-header">
              <div className="summary-icon">
                <FaUserMd />
              </div>
              <div>
                <h2 className="summary-title">AI Health Analysis</h2>
                <p className="summary-subtitle">Smart insights powered by AI</p>
              </div>
            </div>

            <div className="summary-content">
              {/* English Summary */}
              <div className="summary-section">
                <h3 className="section-title">
                  <FaUserMd className="section-icon" />
                  Medical Summary
                </h3>
                <div className="section-content">
                  <p className="summary-text">
                    {report.aiSummary?.english ||
                      "AI summary not available for this report. The analysis is being processed or not generated yet."}
                  </p>
                </div>
              </div>

              <Divider className="section-divider" />

              {/* Roman Urdu Explanation */}
              {report.aiSummary?.romanUrdu && (
                <div className="summary-section">
                  <h3 className="section-title">
                    <FaQuestionCircle className="section-icon" />
                    Roman Urdu Explanation
                  </h3>
                  <div className="section-content">
                    <p className="summary-text urdu-text">
                      {report.aiSummary.romanUrdu}
                    </p>
                  </div>
                </div>
              )}

              {/* Doctor Questions */}
              {report.aiSummary?.doctorQuestions && (
                <div className="summary-section">
                  <h3 className="section-title">
                    <FaQuestionCircle className="section-icon" />
                    Questions for Your Doctor
                  </h3>
                  <div className="section-content">
                    <ul className="tips-list">
                      {report.aiSummary.doctorQuestions.map((q, i) => (
                        <li key={i} className="tip-item">
                          <span className="tip-bullet">?</span>
                          {q}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Food Tips */}
              {report.aiSummary?.foodTips && (
                <div className="summary-section">
                  <h3 className="section-title">
                    <FaUtensils className="section-icon" />
                    Dietary Recommendations
                  </h3>
                  <div className="section-content">
                    <ul className="tips-list">
                      {report.aiSummary.foodTips.map((tip, i) => (
                        <li key={i} className="tip-item">
                          <span className="tip-bullet">🥗</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              <div className="disclaimer-section">
                <div className="disclaimer-content">
                  <FaExclamationTriangle className="disclaimer-icon" />
                  <div className="disclaimer-text">
                    <strong>Important Disclaimer:</strong> This AI analysis is for 
                    educational purposes only. Always consult with qualified healthcare 
                    professionals for medical advice and treatment.
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <style jsx>{`
        .view-report-container {
          width: 100vw;
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          padding: 0;
          margin: 0;
          left: 0;
          right: 0;
        }

        .view-report-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
        }

        .report-loading, .report-not-found {
          width: 100vw;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }

        .loading-content, .not-found-content {
          text-align: center;
        }

        .loading-text {
          margin-top: 1rem;
          color: #667eea;
          font-weight: 500;
        }

        .not-found-icon {
          font-size: 4rem;
          color: #9ca3af;
          margin-bottom: 1rem;
        }

        .not-found-content h2 {
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .not-found-content p {
          color: #6b7280;
        }

        .report-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
          background: white;
          padding: 1.5rem 2rem;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .header-icon {
          font-size: 2.5rem;
          color: #667eea;
        }

        .report-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
          margin: 0;
        }

        .report-subtitle {
          font-size: 1rem;
          color: #6b7280;
          margin: 0.25rem 0 0 0;
        }

        .header-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .file-type-tag {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: 600;
          border: none;
        }

        .report-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        .report-preview-card, .ai-summary-card {
          border-radius: 16px;
          border: none;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.95);
          overflow: hidden;
        }

        .preview-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 1.5rem 2rem 1rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .preview-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 1rem 0;
        }

        .preview-meta {
          display: flex;
          gap: 1.5rem;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #6b7280;
          font-size: 0.9rem;
        }

        .meta-icon {
          color: #667eea;
          font-size: 0.8rem;
        }

        .download-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .download-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
        }

        .preview-content {
          padding: 1.5rem 2rem 2rem;
        }

        .report-iframe {
          width: 100%;
          height: 600px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .report-image {
          width: 100%;
          height: 600px;
          object-fit: contain;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          background: #f8fafc;
        }

        .ai-summary-card {
          display: flex;
          flex-direction: column;
        }

        .summary-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid #e5e7eb;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .summary-icon {
          font-size: 2rem;
          opacity: 0.9;
        }

        .summary-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0;
          color: white;
        }

        .summary-subtitle {
          font-size: 0.9rem;
          opacity: 0.9;
          margin: 0.25rem 0 0 0;
        }

        .summary-content {
          padding: 2rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .summary-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.1rem;
          font-weight: 600;
          color: #374151;
          margin: 0;
        }

        .section-icon {
          color: #667eea;
          font-size: 1rem;
        }

        .section-content {
          padding-left: 1.75rem;
        }

        .summary-text {
          color: #4b5563;
          line-height: 1.6;
          margin: 0;
        }

        .urdu-text {
          font-style: italic;
          color: #6b7280;
        }

        .section-divider {
          margin: 1rem 0;
          border-color: #e5e7eb;
        }

        .tips-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .tip-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          color: #4b5563;
          line-height: 1.5;
        }

        .tip-bullet {
          background: #667eea;
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          flex-shrink: 0;
          margin-top: 0.1rem;
        }

        .disclaimer-section {
          margin-top: auto;
          padding-top: 1.5rem;
          border-top: 1px solid #e5e7eb;
        }

        .disclaimer-content {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem;
          background: #fef3cd;
          border: 1px solid #fcd34d;
          border-radius: 10px;
        }

        .disclaimer-icon {
          color: #d97706;
          font-size: 1.2rem;
          margin-top: 0.1rem;
          flex-shrink: 0;
        }

        .disclaimer-text {
          color: #92400e;
          font-size: 0.85rem;
          line-height: 1.5;
          margin: 0;
        }

        @media (min-width: 1024px) {
          .report-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 768px) {
          .view-report-content {
            padding: 1rem;
          }

          .report-header {
            flex-direction: column;
            gap: 1rem;
            padding: 1.5rem;
          }

          .preview-header {
            flex-direction: column;
            gap: 1rem;
            padding: 1.5rem 1.5rem 1rem;
          }

          .preview-meta {
            flex-direction: column;
            gap: 0.75rem;
          }

          .summary-content {
            padding: 1.5rem;
          }

          .report-title {
            font-size: 1.75rem;
          }

          .header-icon {
            font-size: 2rem;
          }

          .report-iframe,
          .report-image {
            height: 400px;
          }
        }

        @media (max-width: 480px) {
          .report-title {
            font-size: 1.5rem;
          }

          .preview-title,
          .summary-title {
            font-size: 1.25rem;
          }

          .summary-header {
            padding: 1.25rem 1.5rem;
          }

          .preview-content {
            padding: 1rem 1.5rem 1.5rem;
          }

          .report-iframe,
          .report-image {
            height: 300px;
          }

          .disclaimer-content {
            flex-direction: column;
            text-align: center;
            gap: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ViewReport;