"use client"; // 👈 required for state, effects, and browser APIs

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Link from "next/link";
import { User, Lock, ArrowRight, EyeOff, Eye } from "lucide-react";
import Input from "@/ui/Input/Input";
import Button from "@/ui/Button/Button";
import { GoogleLogin } from "@react-oauth/google";
import OtpForm from "@/components/OtpForm";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/login", form);
      const token = res.data.token;

      if (res.data.verficationNeeded) {
        setToken(token);
        alert(res.data.msg);
        setShowOtpForm(true);
      } else {
        localStorage.setItem("token", token);
        localStorage.setItem("username", res.data.username);
    
        router.push("/user");
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    } finally {
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
      
      if (res.data.setpassword) {
        router.push("/user/setpassword");
      } else {
        router.push("/user");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center p-4 text-gray-800">
      {!showOtpForm ? (
        <div className="md:w-1/3 w-full">
          <div className="lg:flex-1 w-full lg:p-8 p-4 flex flex-col items-center rounded-2xl md:border border-gray-100">
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
              className="space-y-6 text-gray-700 w-full"
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

              <div className="space-y-2 relative">
                <label className="flex items-center gap-2 font-medium text-sm">
                  <Lock className="w-4 h-4 text-chart-2" />
                  Password
                </label>
                <Input
                  type={showPasswordInput ? "text" : "password"}
                  placeholder="Password"
                  required
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordInput(!showPasswordInput)}
                  className="absolute right-3 top-0 text-gray-500 hover:text-gray-700"
                >
                  {showPasswordInput ? (
                    <div className="flex items-center gap-2">
                      Hide <EyeOff size={18} />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Show <Eye size={18} />
                    </div>
                  )}
                </button>
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
                      Sign In <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  href="/user/register"
                  className="text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  Sign up
                </Link>
              </p>
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
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
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
