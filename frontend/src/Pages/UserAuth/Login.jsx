import React, { useState, useContext } from "react";
import api, { setAuthToken } from "../../api";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock, Sparkles, Brain, ArrowRight } from "lucide-react";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";
import { jwtDecode } from "jwt-decode";
function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/login", form);
      const token = res.data.token;
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      console.log(decoded);
      localStorage.setItem("username", decoded.username);

      setAuthToken(token);

      localStorage.getItem("token");
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center px-2  lg:px-32 bg-gray-100 text-gray-700">
      
      <div className="md:w-1/2   w-full space-y-8 flex justify-center  md:p-8 ">

        <div className="w-full rounded-2xl border-2 border-gray-200 p-4 md:p-8 backdrop-blur-md bg-gray-50 shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-medium mb-2 text-gray-800">Welcome Back</h1>
        </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 font-medium text-sm">
                <User className="w-4 h-4 text-chart-1" />
                Username
              </label>
              <Input
                type="text"
                placeholder="Enter your username"
                required
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                   
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 font-medium text-sm">
                <Lock className="w-4 h-4 text-chart-2" />
                Password
              </label>
              <Input
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <div className="w-full flex justify-center">
              <Button type="submit" disabled={loading} 
                    >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Signing In...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Sign up
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
    </div>
  );
}

export default Login;
