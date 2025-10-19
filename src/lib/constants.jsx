import { AiOutlineIdcard, AiOutlineLock } from "react-icons/ai";
import CustomInput from "../components/input/Input.jsx";
import PasswordInput from "../components/input/PasswordInput.jsx";
import { OTPPattern, PasswordPattern, UserName } from "./pattern.js";
import { MdEmail, MdPersonOutline, MdSecurity } from "react-icons/md";
// import {
//   FaTachometerAlt,
//   FaUpload,
//   FaFileAlt,
//   FaHeartbeat,
//   FaClock,
// } from "react-icons/fa";

export const STEPS = [
  {
    name: "firstName",
    label: "FirstName",
    component: CustomInput,
    rules: [
      { required: true, message: "First Name is required" },
      { min: 3, message: "First Name must be at least 3 characters" },
      { max: 18, message: "First Name cannot be more than 18 characters" },
    ],
  },
  {
    name: "lastName",
    label: "LastName",
    component: CustomInput,
    rules: [
      { required: true, message: "Last Name is required" },
      { min: 3, message: "Last Name must be at least 3 characters" },
      { max: 18, message: "Last Name cannot be more than 18 characters" },
    ],
  },
  {
    name: "userName",
    label: "UserName",
    component: CustomInput,
    rules: [
      { required: true, message: "User Name is required" },
      { min: 3, message: "User Name must be at least 3 characters" },
      {
        pattern: UserName,
        message:
          "Username must be ≥3 characters, include a number, no spaces or special characters.",
      },
      { max: 18, message: "User Name cannot be more than 18 characters" },
    ],
  },
  {
    name: "email",
    label: "Email",
    component: CustomInput,
    rules: [
      { required: true, message: "Email is required" },
      { type: "email", message: "Please enter a valid email address" },
    ],
  },
  {
    name: "otp",
    label: "OTPCode",
    component: CustomInput,
    rules: [
      { required: true, message: "OTP is required" },
      { pattern: OTPPattern, message: "OTP must contain numbers only" },
      { min: 4, message: "OTP must be at least 4 digits" },
    ],
  },
  {
    name: "password",
    label: "Password",
    component: PasswordInput,
    rules: [
      { required: true, message: "Password is required" },
      {
        pattern: PasswordPattern,
        message:
          "Password must be at least 8 characters, include 1 uppercase & 1 number",
      },
    ],
  },
];

export const Links = [
  {
    path: "/dashboard",
    name: "Dashboard",
    // icon: <FaTachometerAlt />,
  },
  {
    path: "/uploadReports",
    name: "Upload Reports",
    // icon: <FaUpload />,
  },
  {
    path: "/viewReports",
    name: "View Reports",
    // icon: <FaFileAlt />,
  },
  {
    path: "/addMinalVitals",
    name: "Add Minal Vitals",
    // icon: <FaHeartbeat />,
  },
  {
    path: "/timeLineView",
    name: "Time Line View",
    // icon: <FaClock />,
  },
];

export const timelineData = [
  {
    year: "2021",
    title: "Project Started",
    description: "Initial planning and team formation for the new platform.",
  },
  {
    year: "2022",
    title: "Design Phase",
    description: "UI/UX design completed and core components were built.",
  },
  {
    year: "2023",
    title: "Development",
    description:
      "Main features implemented with continuous testing and feedback.",
  },
  {
    year: "2024",
    title: "Launch",
    description: "Official product release and onboarding of first 1000 users.",
  },
  {
    year: "2025",
    title: "Expansion",
    description: "Scaling infrastructure and adding AI-powered features.",
  },
];

export const stepIcons = [
  <MdPersonOutline />,
  <MdPersonOutline />,
  <AiOutlineIdcard />,
  <MdEmail />,
  <MdSecurity />,
  <AiOutlineLock />,
];

export const ForgetPasswordSteps = [
  {
    name: "email",
    label: "Email",
    component: CustomInput,
    rules: [
      { required: true, message: "Email is required" },
      { type: "email", message: "Please enter a valid email address" },
    ],
  },
  {
    name: "otp",
    label: "OTPCode",
    component: CustomInput,
    rules: [
      { required: true, message: "OTP is required" },
      { pattern: OTPPattern, message: "OTP must contain numbers only" },
      { min: 4, message: "OTP must be at least 4 digits" },
    ],
  },
  {
    name: "password",
    label: "Password",
    component: PasswordInput,
    rules: [
      { required: true, message: "Password is required" },
      {
        pattern: PasswordPattern,
        message:
          "Password must be at least 8 characters, include 1 uppercase & 1 number",
      },
    ],
  },
  {
    name: "confirmPassword",
    label: "ConfirmPassword",
    component: PasswordInput,
    rules: [
      { required: true, message: "Password is required" },
      {
        pattern: PasswordPattern,
        message:
          "Password must be at least 8 characters, include 1 uppercase & 1 number",
      },
    ],
  },
];
