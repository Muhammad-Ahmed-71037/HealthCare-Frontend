import { useState } from "react";
import { Form, Input, Button, DatePicker, Select, Upload, message } from "antd";
import { UploadOutlined, FileTextOutlined, CalendarOutlined, FileImageOutlined, InboxOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadReport = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("date", values.date.format("YYYY-MM-DD"));
    formData.append("type", values.type);
    formData.append("notes", values.notes || "");

    if (values.file && values.file[0]?.originFileObj) {
      formData.append("file", values.file[0].originFileObj);
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.ok) {
        message.success("✅ Report uploaded successfully!");
      } else {
        message.warning("⚠️ Upload failed, please try again.");
      }
    } catch (err) {
      console.error(err);
      message.error("❌ Error while uploading report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-report-container">
      <div className="upload-report-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        
        <div className="upload-report-card">
          <div className="card-header">
            <div className="header-icon">
              <FileTextOutlined />
            </div>
            <h1 className="card-title">Upload Medical Report</h1>
            <p className="card-subtitle">Share your medical documents securely</p>
          </div>

          <Form layout="vertical" onFinish={handleSubmit} className="upload-form">
            <Form.Item
              label={
                <span className="form-label">
                  <InboxOutlined className="label-icon" />
                  Upload File (PDF / Image)
                </span>
              }
              name="file"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              rules={[{ required: true, message: "Please upload your file!" }]}
            >
              <Upload.Dragger
                name="file"
                accept=".pdf,.jpg,.jpeg,.png,image/*"
                beforeUpload={() => false}
                maxCount={1}
                className="custom-upload-dragger"
                showUploadList={true}
              >
                <div className="upload-area-content">
                  <p className="upload-icon">
                    <UploadOutlined />
                  </p>
                  <p className="upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="upload-hint">
                    Support for PDF, JPG, JPEG, PNG files
                  </p>
                </div>
              </Upload.Dragger>
            </Form.Item>

            <Form.Item
              label={
                <span className="form-label">
                  <CalendarOutlined className="label-icon" />
                  Report Date
                </span>
              }
              name="date"
              rules={[{ required: true, message: "Please select a date!" }]}
            >
              <DatePicker 
                className="custom-datepicker"
                suffixIcon={<CalendarOutlined className="date-icon" />}
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="form-label">
                  <FileImageOutlined className="label-icon" />
                  Report Type
                </span>
              }
              name="type"
              rules={[
                { required: true, message: "Please select a report type!" },
              ]}
            >
              <Select 
                placeholder="Select Report Type"
                className="custom-select"
                suffixIcon={<FileImageOutlined className="select-icon" />}
              >
                <Select.Option value="Blood Test" className="select-option">🩸 Blood Test</Select.Option>
                <Select.Option value="Urine Test" className="select-option">💧 Urine Test</Select.Option>
                <Select.Option value="X-ray" className="select-option">📷 X-ray</Select.Option>
                <Select.Option value="Ultrasound" className="select-option">🔍 Ultrasound</Select.Option>
                <Select.Option value="MRI" className="select-option">🧲 MRI Scan</Select.Option>
                <Select.Option value="CT Scan" className="select-option">🖥️ CT Scan</Select.Option>
                <Select.Option value="Other" className="select-option">📄 Other</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item 
              label={
                <span className="form-label">
                  <FileTextOutlined className="label-icon" />
                  Notes (Optional)
                </span>
              } 
              name="notes"
            >
              <Input.TextArea
                rows={3}
                placeholder="Any extra details (e.g. fasting test, morning sample, specific concerns)..."
                className="custom-textarea"
              />
            </Form.Item>

            <Form.Item className="submit-item">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="submit-button"
                icon={<UploadOutlined />}
              >
                {loading ? "Uploading Report..." : "Upload Report"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      <style jsx>{`
        .upload-report-container {
          width: 100vw;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          position: relative;
          overflow: hidden;
          left: 0;
          right: 0;
          margin: 0;
        }

        .upload-report-background {
          position: relative;
          width: 100%;
          max-width: 500px;
        }

        .floating-shapes {
          position: absolute;
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
          width: 80px;
          height: 80px;
          top: -20px;
          right: -20px;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 60px;
          height: 60px;
          bottom: 30px;
          left: -30px;
          animation-delay: 2s;
        }

        .shape-3 {
          width: 40px;
          height: 40px;
          top: 50%;
          right: 10%;
          animation-delay: 4s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        .upload-report-card {
          width: 100%;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border: none;
          backdrop-filter: blur(10px);
          overflow: hidden;
        }

        .card-header {
          text-align: center;
          padding: 2rem 1rem 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          margin: -1px -1px 1.5rem;
          color: white;
          position: relative;
        }

        .header-icon {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          opacity: 0.9;
        }

        .card-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0;
          color: white;
        }

        .card-subtitle {
          font-size: 0.9rem;
          opacity: 0.9;
          margin: 0.25rem 0 0;
          font-weight: 400;
        }

        .upload-form {
          padding: 0 1.5rem 1.5rem;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: #374151;
          font-size: 0.9rem;
        }

        .label-icon {
          color: #667eea;
          font-size: 0.8rem;
        }

        :global(.custom-upload-dragger) {
          border: 2px dashed #d1d5db;
          border-radius: 12px;
          background: #f8fafc;
          transition: all 0.3s ease;
          padding: 2rem 1rem;
        }

        :global(.custom-upload-dragger:hover) {
          border-color: #667eea;
          background: #f0f4ff;
        }

        :global(.custom-upload-dragger.ant-upload-drag-hover) {
          border-color: #667eea;
          background: #e0e7ff;
        }

        .upload-area-content {
          text-align: center;
        }

        .upload-icon {
          font-size: 2.5rem;
          color: #667eea;
          margin-bottom: 1rem;
        }

        .upload-text {
          color: #374151;
          font-weight: 500;
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
        }

        .upload-hint {
          color: #6b7280;
          font-size: 0.8rem;
        }

        :global(.custom-datepicker) {
          width: 100%;
          height: 44px;
          border-radius: 12px;
          border: 2px solid #e5e7eb;
          transition: all 0.3s ease;
        }

        :global(.custom-datepicker:hover),
        :global(.custom-datepicker:focus) {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        :global(.custom-select) {
          height: 44px;
          border-radius: 12px;
          border: 2px solid #e5e7eb;
          transition: all 0.3s ease;
        }

        :global(.custom-select .ant-select-selector) {
          border: none !important;
          height: 40px !important;
          border-radius: 10px !important;
        }

        :global(.custom-select:hover),
        :global(.custom-select:focus) {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        :global(.select-option) {
          padding: 8px 12px;
        }

        :global(.custom-textarea) {
          border-radius: 12px;
          border: 2px solid #e5e7eb;
          transition: all 0.3s ease;
          font-size: 0.9rem;
          resize: vertical;
        }

        :global(.custom-textarea:hover),
        :global(.custom-textarea:focus) {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .submit-item {
          margin-top: 2rem;
          margin-bottom: 0;
        }

        .submit-button {
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

        .submit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }

        .submit-button:active {
          transform: translateY(0);
        }

        :global(.ant-form-item-label > label) {
          height: auto !important;
        }

        :global(.ant-picker-suffix),
        :global(.date-icon) {
          color: #667eea;
        }

        :global(.select-icon) {
          color: #667eea;
        }

        @media (max-width: 640px) {
          .upload-report-container {
            padding: 0.5rem;
            align-items: flex-start;
            min-height: 100vh;
          }

          .upload-report-card {
            margin: 1rem 0;
          }

          .card-header {
            padding: 1.5rem 1rem 0.75rem;
          }

          .card-title {
            font-size: 1.5rem;
          }

          .upload-form {
            padding: 0 1rem 1rem;
          }

          .header-icon {
            font-size: 2rem;
          }

          .submit-button {
            height: 48px;
            font-size: 0.95rem;
          }

          :global(.custom-upload-dragger) {
            padding: 1.5rem 0.75rem;
          }

          .upload-icon {
            font-size: 2rem;
          }
        }

        @media (max-width: 480px) {
          .card-title {
            font-size: 1.35rem;
          }

          .card-subtitle {
            font-size: 0.85rem;
          }

          :global(.custom-datepicker),
          :global(.custom-select) {
            height: 42px;
          }

          .submit-button {
            height: 46px;
          }
        }

        @media (max-width: 360px) {
          .upload-form {
            padding: 0 0.75rem 0.75rem;
          }

          .card-header {
            padding: 1.25rem 0.75rem 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default UploadReport;