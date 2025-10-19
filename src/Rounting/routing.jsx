import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "../pages/auth/authLayout/AuthLayout.jsx";
import NonAuthLayout from "../pages/nonAuth/nonAuthLayout/NonAuthLayout.jsx";
import Dashboard from "../pages/auth/dashboard/Dashborad.jsx";
import Login from "../pages/nonAuth/login/Login.jsx";
import Signup from "../pages/nonAuth/signup/Signup.jsx";
import ForgetPassword from "../pages/nonAuth/forgetPassword/ForgetPassword.jsx";
import NotFound from "../NotFound.jsx";
import UploadReport from "../pages/auth/uploadReport/UploadReport.jsx";
import ViewReport from "../pages/auth/viewReport/ViewReport.jsx";
import AddMinalVitals from "../pages/auth/addMinalVitals/AddMinalVitals.jsx";
import TimeLineView from "../pages/auth/timeLineView/TimeLineView.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NonAuthLayout />,
    children: [
      { index: true, element: <Navigate to={"login"} replace /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "forgottenPassword", element: <ForgetPassword /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      { path: "uploadReports", element: <UploadReport /> },
      { path: "viewReports", element: <ViewReport /> },
      { path: "addMinalVitals", element: <AddMinalVitals /> },
      { path: "timeLineView", element: <TimeLineView /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default router;
