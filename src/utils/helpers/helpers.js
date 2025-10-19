import axios from "axios";
import {
  otpVerify,
  ResetPassword,
  SendOtp,
  sendOtpForgetPassword,
  SigninUser,
  SignupUser,
} from "../../lib/API";

export const UserSignup = async (payload) => {
  try {
    const res = await axios.post(SignupUser, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data?.token) {
      localStorage.setItem("token", res.data.token);
    }
    return res;
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    throw err;
  }
};

export const UserSignin = async (payload) => {
  try {
    const res = await axios.post(SigninUser, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data?.token) {
      localStorage.setItem("token", res.data.token);
    }

    return res;
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    throw err;
  }
};

export const sendOtp = async (email) => {
  try {
    return await axios.post(
      SendOtp,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const verifyOtp = async (email, otp) => {
  try {
    const res = await axios.post(
      otpVerify,
      { email, otp },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res.data);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const sendForgetPasswordOtp = (email) => {
  try {
    const res = axios.post(
      sendOtpForgetPassword,
      {
        email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const resetPassword = (data) => {
  try {
    const res = axios.post(
      ResetPassword,
      { data },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};
