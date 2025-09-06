import React, { useState } from "react";
import api from "../../api";
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

function Register() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [token, setToken] = useState(null); // JWT token from backend

  const [errors, setErrors] = useState({ username: "", password: "" });

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
      setLoading(false);
      alert(err.response?.data?.msg || "Error registering");
    }
  };
  const validateUsername = (value) => {
    const regex = /^[a-zA-Z0-9._]+$/; // Instagram-like (letters, numbers, dot, underscore)
    if (/\s/.test(value)) return "Username must not contain spaces";
    if (!regex.test(value))
      return "Only letters, numbers, underscores and periods are allowed";
    return "";
  };

  const validatePassword = (value) => {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!strongRegex.test(value))
      return "Password must be at least 8 chars, include upper, lower, number & special char";
    return "";
  };

  return (
    <div className="w-full min-h-screen p-4 lg:px-32  flex items-center justify-center bg-gray-100">
      {!showOtpForm ? (
        <div className="sm:w-1/2 w-full">
          <div className="bg-card/50  rounded-lg md:p-8  backdrop-blur-md flex items-center">
            <div className=" lg:flex-1 w-full lg:p-8 p-4  flex flex-col items-center rounded-2xl border-2 border-gray-200 bg-gray-50 shadow-sm">
                <div className="text-center text-gray-800">
                  <h1 className="text-2xl font-medium mb-8">
                    Create your account{" "}
                  </h1>
                </div>
              <form onSubmit={handleSubmit} className="space-y-6 text-gray-700 lg:min-w-2/3 w-full">
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
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                   
                  />
                </div>{" "}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-medium text-sm">
                    <User className="w-4 h-4 text-chart-2" />
                    Username
                  </label>
                  <Input
                    type="text"
                    placeholder="Choose a username"
                    required
                    onChange={(e) => {
                      const val = e.target.value;
                      setForm({ ...form, username: val });
                      setErrors({ ...errors, username: validateUsername(val) });
                    }}
                   
                  />
                  {errors.username && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.username}
                    </p>
                  )}
                </div>
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
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="flex w-full justify-center">
                  <Button
                    type="submit"
                    disabled={loading || errors.username || errors.password}
                  >
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
        </div>
      ) : (
        <OtpForm token={token} setToken={setToken} setShowOtpForm={setShowOtpForm}/>
      )}
    </div>
  );
}

export default Register;
