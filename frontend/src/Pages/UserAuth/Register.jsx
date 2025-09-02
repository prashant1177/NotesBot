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

  return (
    <div className="min-h-screen flex  justify-center px-4 py-4">
      {!showOtpForm ? (
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-medium mb-2">Create your account </h1>
          </div>

          <div className="bg-card/50 border border-border/20 rounded-lg p-8 backdrop-blur-md">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  type="text"
                  placeholder="Enter your email"
                  required
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                />
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
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>
              <div className="flex w-full justify-center">
                <Button type="submit" disabled={loading} className="">
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
            <div className="mt-6 text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  Sign in
                </Link>
              </p>
              <Link
                to="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <OtpForm token={token} />
      )}
    </div>
  );
}

export default Register;
