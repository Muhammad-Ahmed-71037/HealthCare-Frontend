import { useState } from "react";
import { Form, Input, Button, DatePicker, message, Card } from "antd";
import axios from "axios";
import { FaHeartbeat, FaWeight, FaNotesMedical, FaCalendarAlt, FaPlus } from "react-icons/fa";

const AddVitals = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      console.log(token);

      const data = {
        date: values.date.format("YYYY-MM-DD"),
        bp: values.bp,
        sugar: values.sugar,
        weight: values.weight,
        notes: values.notes || "",
      };

      const res = await axios.post("/api/vitals", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.ok) {
        message.success("✅ Vitals added successfully!");
      } else {
        message.warning("⚠️ Failed to add vitals. Try again!");
      }
    } catch (err) {
      console.error(err);
      message.error("❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-vitals-container">
      <div className="add-vitals-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        
        <Card className="add-vitals-card">
          <div className="card-header">
            <div className="header-icon">
              <FaHeartbeat />
            </div>
            <h1 className="card-title">Add Manual Vitals</h1>
            <p className="card-subtitle">Track your health measurements</p>
          </div>

          <Form layout="vertical" onFinish={handleSubmit} className="vitals-form">
            <Form.Item
              label={
                <span className="form-label">
                  <FaCalendarAlt className="label-icon" />
                  Date
                </span>
              }
              name="date"
              rules={[{ required: true, message: "Please select a date!" }]}
            >
              <DatePicker 
                className="custom-datepicker"
                suffixIcon={<FaCalendarAlt className="date-icon" />}
              />
            </Form.Item>

            <Form.Item 
              label={
                <span className="form-label">
                  <FaHeartbeat className="label-icon" />
                  Blood Pressure (BP)
                </span>
              } 
              name="bp"
            >
              <Input 
                placeholder="e.g. 120/80 mmHg" 
                className="custom-input"
                prefix={<span className="input-prefix">💓</span>}
              />
            </Form.Item>

            <Form.Item 
              label={
                <span className="form-label">
                  <FaHeartbeat className="label-icon" />
                  Blood Sugar (mg/dL)
                </span>
              } 
              name="sugar"
            >
              <Input 
                placeholder="e.g. 95" 
                className="custom-input"
                prefix={<span className="input-prefix">🩸</span>}
              />
            </Form.Item>

            <Form.Item 
              label={
                <span className="form-label">
                  <FaWeight className="label-icon" />
                  Weight (kg)
                </span>
              } 
              name="weight"
            >
              <Input 
                placeholder="e.g. 70" 
                className="custom-input"
                prefix={<span className="input-prefix">⚖️</span>}
              />
            </Form.Item>

            <Form.Item 
              label={
                <span className="form-label">
                  <FaNotesMedical className="label-icon" />
                  Notes (Optional)
                </span>
              } 
              name="notes"
            >
              <Input.TextArea
                rows={3}
                placeholder="e.g. Fasting sugar reading, after breakfast, etc."
                className="custom-textarea"
              />
            </Form.Item>

            <Form.Item className="submit-item">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="submit-button"
                icon={<FaPlus />}
              >
                {loading ? "Saving Vitals..." : "Add Vitals"}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>

      <style jsx>{`
        .add-vitals-container {
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

        .add-vitals-background {
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

        .add-vitals-card {
          width: 100%;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border: none;
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.95);
          overflow: hidden;
        }

        .card-header {
          text-align: center;
          padding: 1.5rem 1rem 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          margin: -1px -1px 2rem;
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

        .vitals-form {
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

        :global(.custom-input) {
          height: 44px;
          border-radius: 12px;
          border: 2px solid #e5e7eb;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        :global(.custom-input:hover),
        :global(.custom-input:focus) {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .input-prefix {
          margin-right: 0.5rem;
          opacity: 0.7;
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

        :global(.ant-picker-suffix) {
          color: #667eea;
        }

        :global(.date-icon) {
          color: #667eea;
        }

        @media (max-width: 640px) {
          .add-vitals-container {
            padding: 0.5rem;
            align-items: flex-start;
            min-height: 100vh;
          }

          .add-vitals-card {
            margin: 1rem 0;
          }

          .card-header {
            padding: 1rem 1rem 0.75rem;
          }

          .card-title {
            font-size: 1.5rem;
          }

          .vitals-form {
            padding: 0 1rem 1rem;
          }

          .header-icon {
            font-size: 2rem;
          }

          .submit-button {
            height: 48px;
            font-size: 0.95rem;
          }
        }

        @media (max-width: 480px) {
          .card-title {
            font-size: 1.35rem;
          }

          .card-subtitle {
            font-size: 0.85rem;
          }

          :global(.custom-input),
          :global(.custom-datepicker) {
            height: 42px;
          }

          .submit-button {
            height: 46px;
          }
        }

        @media (max-width: 360px) {
          .vitals-form {
            padding: 0 0.75rem 0.75rem;
          }

          .card-header {
            padding: 0.75rem 0.75rem 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AddVitals;