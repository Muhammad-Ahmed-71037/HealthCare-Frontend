import { useEffect, useState } from "react";
import { Card, Table, Button, message, Spin, Tag } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  FaFileMedical, 
  FaHeartbeat, 
  FaPlus, 
  FaChartLine, 
  FaUpload,
  FaArrowRight,
  FaCalendarAlt,
  FaWeight,
  FaTint,
  FaHeart
} from "react-icons/fa";

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [vitals, setVitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.ok) {
          setReports(res.data.reports || []);
          setVitals(res.data.vitals || []);
        } else {
          message.warning("Failed to load dashboard data!");
        }
      } catch (err) {
        console.error(err);
        message.error("Error loading dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-content">
          <Spin size="large" />
          <p className="loading-text">Loading your health dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        {/* Header Section */}
        <div className="dashboard-header">
          <div className="header-content">
            <div className="header-text">
              <h1 className="dashboard-title">
                <FaChartLine className="title-icon" />
                My Health Dashboard
              </h1>
              <p className="dashboard-subtitle">
                Welcome back! Here's your health overview
              </p>
            </div>
            <div className="header-stats">
              <div className="stat-card">
                <div className="stat-icon reports">
                  <FaFileMedical />
                </div>
                <div className="stat-info">
                  <span className="stat-number">{reports.length}</span>
                  <span className="stat-label">Reports</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon vitals">
                  <FaHeartbeat />
                </div>
                <div className="stat-info">
                  <span className="stat-number">{vitals.length}</span>
                  <span className="stat-label">Vitals</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="dashboard-grid">
          {/* Recent Reports Card */}
          <Card className="dashboard-card reports-card">
            <div className="card-header">
              <div className="card-title-section">
                <div className="card-icon">
                  <FaFileMedical />
                </div>
                <div>
                  <h3 className="card-title">Recent Reports</h3>
                  <p className="card-subtitle">Your latest medical documents</p>
                </div>
              </div>
              <Button 
                type="primary" 
                onClick={() => navigate("/uploadReports")}
                className="action-button"
                icon={<FaUpload />}
              >
                Upload New
              </Button>
            </div>

            <div className="card-content">
              <Table
                dataSource={reports}
                pagination={false}
                rowKey="_id"
                className="custom-table"
                columns={[
                  { 
                    title: "Type", 
                    dataIndex: "type", 
                    key: "type",
                    render: (type) => (
                      <Tag className="type-tag" color="blue">
                        {type}
                      </Tag>
                    )
                  },
                  {
                    title: "Date",
                    dataIndex: "date",
                    key: "date",
                    render: (d) => (
                      <div className="date-cell">
                        <FaCalendarAlt className="date-icon" />
                        {new Date(d).toLocaleDateString()}
                      </div>
                    ),
                  },
                  {
                    title: "Action",
                    key: "action",
                    render: (_, record) => (
                      <Button
                        type="link"
                        onClick={() => navigate(`/report/${record._id}`)}
                        className="view-button"
                      >
                        View <FaArrowRight />
                      </Button>
                    ),
                  },
                ]}
              />
              {reports.length === 0 && (
                <div className="empty-state">
                  <FaFileMedical className="empty-icon" />
                  <p className="empty-text">No reports uploaded yet</p>
                  <Button 
                    type="primary" 
                    onClick={() => navigate("/uploadReports")}
                    className="empty-action"
                  >
                    Upload Your First Report
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* Recent Vitals Card */}
          <Card className="dashboard-card vitals-card">
            <div className="card-header">
              <div className="card-title-section">
                <div className="card-icon">
                  <FaHeartbeat />
                </div>
                <div>
                  <h3 className="card-title">Recent Vitals</h3>
                  <p className="card-subtitle">Your health measurements</p>
                </div>
              </div>
              <Button 
                onClick={() => navigate("/add-vitals")}
                className="action-button secondary"
                icon={<FaPlus />}
              >
                Add Vitals
              </Button>
            </div>

            <div className="card-content">
              <Table
                dataSource={vitals}
                pagination={false}
                rowKey="_id"
                className="custom-table"
                columns={[
                  {
                    title: "Date",
                    dataIndex: "date",
                    key: "date",
                    render: (d) => (
                      <div className="date-cell">
                        <FaCalendarAlt className="date-icon" />
                        {new Date(d).toLocaleDateString()}
                      </div>
                    ),
                  },
                  { 
                    title: "BP", 
                    dataIndex: "bp", 
                    key: "bp",
                    render: (bp) => (
                      <div className="vital-cell bp">
                        <FaHeart className="vital-icon" />
                        {bp || '--'}
                      </div>
                    )
                  },
                  { 
                    title: "Sugar", 
                    dataIndex: "sugar", 
                    key: "sugar",
                    render: (sugar) => (
                      <div className="vital-cell sugar">
                        <FaTint className="vital-icon" />
                        {sugar || '--'} mg/dL
                      </div>
                    )
                  },
                  { 
                    title: "Weight", 
                    dataIndex: "weight", 
                    key: "weight",
                    render: (weight) => (
                      <div className="vital-cell weight">
                        <FaWeight className="vital-icon" />
                        {weight || '--'} kg
                      </div>
                    )
                  },
                ]}
              />
              {vitals.length === 0 && (
                <div className="empty-state">
                  <FaHeartbeat className="empty-icon" />
                  <p className="empty-text">No vitals added yet</p>
                  <Button 
                    onClick={() => navigate("/add-vitals")}
                    className="empty-action secondary"
                  >
                    Add Your First Vitals
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      <style jsx>{`
        .dashboard-container {
          width: 100vw;
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          padding: 0;
          margin: 0;
          left: 0;
          right: 0;
        }

        .dashboard-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
        }

        .dashboard-loading {
          width: 100vw;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }

        .loading-content {
          text-align: center;
        }

        .loading-text {
          margin-top: 1rem;
          color: #667eea;
          font-weight: 500;
        }

        .dashboard-header {
          margin-bottom: 2rem;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 2rem;
        }

        .header-text {
          flex: 1;
        }

        .dashboard-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #2d3748;
          margin: 0 0 0.5rem 0;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .title-icon {
          color: #667eea;
        }

        .dashboard-subtitle {
          font-size: 1.1rem;
          color: #718096;
          margin: 0;
        }

        .header-stats {
          display: flex;
          gap: 1rem;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          min-width: 180px;
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: white;
        }

        .stat-icon.reports {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .stat-icon.vitals {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: #2d3748;
          line-height: 1;
        }

        .stat-label {
          font-size: 0.9rem;
          color: #718096;
          font-weight: 500;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        .dashboard-card {
          border-radius: 20px;
          border: none;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.95);
          overflow: hidden;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 1.5rem 2rem 0;
          margin-bottom: 1rem;
        }

        .card-title-section {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .card-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          color: white;
        }

        .reports-card .card-icon {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .vitals-card .card-icon {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }

        .card-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #2d3748;
          margin: 0;
        }

        .card-subtitle {
          font-size: 0.9rem;
          color: #718096;
          margin: 0.25rem 0 0 0;
        }

        .action-button {
          border-radius: 12px;
          padding: 0.75rem 1.5rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border: none;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .action-button.secondary {
          background: transparent;
          border: 2px solid #667eea;
          color: #667eea;
        }

        .action-button.secondary:hover {
          background: #667eea;
          color: white;
        }

        .card-content {
          padding: 0 2rem 2rem;
        }

        :global(.custom-table .ant-table) {
          border-radius: 12px;
          overflow: hidden;
        }

        :global(.custom-table .ant-table-thead > tr > th) {
          background: #f7fafc;
          color: #4a5568;
          font-weight: 600;
          border-bottom: 2px solid #e2e8f0;
        }

        :global(.custom-table .ant-table-tbody > tr > td) {
          border-bottom: 1px solid #edf2f7;
          padding: 1rem 0.75rem;
        }

        :global(.custom-table .ant-table-tbody > tr:hover > td) {
          background: #f7fafc;
        }

        .type-tag {
          border: none;
          border-radius: 8px;
          font-weight: 500;
          padding: 0.25rem 0.75rem;
        }

        .date-cell {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #718096;
          font-weight: 500;
        }

        .date-icon {
          color: #a0aec0;
        }

        .vital-cell {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
        }

        .vital-cell.bp {
          color: #e53e3e;
        }

        .vital-cell.sugar {
          color: #3182ce;
        }

        .vital-cell.weight {
          color: #38a169;
        }

        .vital-icon {
          font-size: 0.8rem;
          opacity: 0.7;
        }

        .view-button {
          color: #667eea;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0;
        }

        .empty-state {
          text-align: center;
          padding: 3rem 2rem;
          color: #a0aec0;
        }

        .empty-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        .empty-text {
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
          color: #718096;
        }

        .empty-action {
          border-radius: 12px;
          padding: 0.75rem 1.5rem;
          font-weight: 600;
        }

        @media (min-width: 1024px) {
          .dashboard-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 768px) {
          .dashboard-content {
            padding: 1rem;
          }

          .header-content {
            flex-direction: column;
          }

          .header-stats {
            width: 100%;
            justify-content: center;
          }

          .dashboard-title {
            font-size: 2rem;
          }

          .card-header {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }

          .card-content {
            padding: 0 1rem 1rem;
          }

          .stat-card {
            flex: 1;
            min-width: auto;
          }
        }

        @media (max-width: 480px) {
          .dashboard-title {
            font-size: 1.75rem;
          }

          .stat-card {
            padding: 1rem;
          }

          .stat-icon {
            width: 50px;
            height: 50px;
            font-size: 1.25rem;
          }

          .stat-number {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;