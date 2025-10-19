export const BASE_URL = "http://localhost:5000/api";

export const SignupUser = `${BASE_URL}/auth/signup`;

export const SigninUser = `${BASE_URL}/auth/login`;

export const SendOtp = `${BASE_URL}/security/sendOtp`;

export const otpVerify = `${BASE_URL}/security/verifyOtp`;

export const sendOtpForgetPassword = `${BASE_URL}/auth/forgetPassword`;

export const ResetPassword = `${BASE_URL}/auth/resetPassword`;
