import React, { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Lock,
  UserPlus,
  Sparkles,
  Brain,
  ArrowRight,
} from "lucide-react";

// Inline Components
const Input = ({
  className = "",
  type = "text",
  placeholder = "",
  value,
  onChange,
  ...props
}) => {
  return (
    <input
      type={type}
      className={`flex h-12 w-full rounded-md border border-input bg-background px-4 py-3 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  disabled = false,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  };

  const sizes = {
    default: "h-12 px-6 py-3",
    lg: "h-14 px-8 py-4",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

function Register() {
  const [form, setForm] = useState({ name: "", username: "", password: "" });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/register", form);
      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      setLoading(false);
      alert(err.response?.data?.msg || "Error registering");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Brain className="w-12 h-12 text-primary" />
              <Sparkles className="w-6 h-6 text-chart-1 absolute -top-1 -right-1 animate-pulse" />
            </div>
          </div>
          <h1 className="text-2xl font-medium mb-2 bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">
            Join NeuralNote
          </h1>
          <p className="text-muted-foreground">
            Create your account and start generating AI-powered notes
          </p>
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
                className="bg-muted/30 border-border/20"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 font-medium text-sm">
                <User className="w-4 h-4 text-chart-2" />
                Username
              </label>
              <Input
                type="text"
                placeholder="Choose a username"
                required
                className="bg-muted/30 border-border/20"
                onChange={(e) => setForm({ ...form, username: e.target.value })}
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
                className="bg-muted/30 border-border/20"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-chart-1 hover:from-primary/90 hover:to-chart-1/90"
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

        <div className="text-center space-y-4">
          <div className="inline-flex items-center px-3 py-2 rounded-full bg-muted/30 border border-border/20">
            <Sparkles className="w-4 h-4 text-chart-1 mr-2" />
            <span className="text-sm text-muted-foreground">
              Free to start, AI-powered from day one
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2 text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2">
              <div className="w-1 h-1 rounded-full bg-chart-2"></div>
              <span>Unlimited AI note generation</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-1 h-1 rounded-full bg-chart-3"></div>
              <span>Smart organization & search</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-1 h-1 rounded-full bg-chart-4"></div>
              <span>Document & link analysis</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
