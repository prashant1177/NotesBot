import React, { useState, useContext } from "react";
import api, { setAuthToken } from "../../api";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock, Sparkles, Brain, ArrowRight } from "lucide-react";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";
import { GoogleLogin } from "@react-oauth/google";
function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/login", form);
      const token = res.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("username", res.data.username);

      setAuthToken(token);

      localStorage.getItem("token");
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleOAuth = async (response) => {
    try {
      const res = await api.post("/auth/google", {
        tokenId: response.credential,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      setAuthToken(res.data.token);
      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="w-full flex justify-center  p-4   text-gray-800">
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
                <User className="w-4 h-4 text-chart-1" />
                Email
              </label>
              <Input
                type="text"
                placeholder="Enter your email"
                required
                onChange={(e) => setForm({ ...form, email: e.target.value })}
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

            <div className="w-full flex justify-center mb-4">
              <Button type="submit" disabled={loading}>
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
