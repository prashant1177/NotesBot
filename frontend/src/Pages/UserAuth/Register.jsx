import React, { useState } from "react";
import api, { setAuthToken } from "../../api";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Lock,
  UserPlus,
  Sparkles,
  Brain,
  ArrowRight,
  Mail,
} from "lucide-react";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";
import OtpForm from "./OtpForm";
import { GoogleLogin } from "@react-oauth/google";

function Register() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [token, setToken] = useState(null); // JWT token from backend

  const [errors, setErrors] = useState({ password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(form);
      const res = await api.post("/register", form);
      alert(res.data.msg);
      setToken(res.data.token);
      setShowOtpForm(true); // show OTP input
    } catch (err) {
      alert(err.response?.data?.msg || "Error registering");
    }finally {
      setLoading(false);
    }
  };

  const handleGoogleOAuth = async (response) => {
    try {
      setLoading(true);
      const res = await api.post("/auth/google", {
        tokenId: response.credential,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      setAuthToken(res.data.token);
      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }finally {
      setLoading(false);
    }
  };
  const validatePassword = (value) => {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!strongRegex.test(value))
      return "Password must be at least 8 chars, include upper, lower, number & special char";
    return "";
  };

  return (
    <div className="w-full  p-4  flex  justify-center ">
      {!showOtpForm ? (
        <div className="md:w-1/3  w-full">
          <div className=" lg:flex-1 w-full lg:p-8 p-4  flex flex-col items-center rounded-2xl md:border-1 border-gray-100">
            <GoogleLogin
              onSuccess={handleGoogleOAuth}
              onError={() => console.log("Login Failed")}
            />
            <div className="flex items-center my-4 w-full">
              <hr className="flex-grow border-b border-gray-100" />
              <span className="mx-2 text-gray-500">or</span>
              <hr className="flex-grow border-b border-gray-100" />
            </div>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 text-gray-700  w-full"
            >
              <div className="space-y-2">
                <label className="flex items-center gap-2 font-medium text-sm">
                  <UserPlus className="w-4 h-4 text-chart-1" />
                  Full Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  required
                  onChange={(e) =>
                    setForm({ ...form, fullname: e.target.value })
                  }
                />
              </div>{" "}
              <div className="space-y-2">
                <label className="flex items-center gap-2 font-medium text-sm">
                  <Mail className="w-4 h-4 text-chart-1" />
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  required
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>{" "}
              <div className="space-y-2">
                <label className="flex items-center gap-2 font-medium text-sm">
                  <Lock className="w-4 h-4 text-chart-3" />
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(e) => {
                    const val = e.target.value;
                    setForm({ ...form, password: val });
                    setErrors({ ...errors, password: validatePassword(val) });
                  }}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>
              <div className="flex w-full justify-center mb-4">
                <Button type="submit" disabled={loading || errors.password}>
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Creating Account...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Create Account
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>
              </div>
            </form>
            <div className="mt-6 text-center space-y-3 text-gray-700">
              <p className="text-sm ">
                Already have an account?{" "}
                <Link to="/login" className="transition-colors font-medium">
                  Sign in
                </Link>
              </p>
              <Link to="/" className="text-sm  transition-colors">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <OtpForm
          token={token}
          setToken={setToken}
          setShowOtpForm={setShowOtpForm}
        />
      )}
    </div>
  );
}

export default Register;
