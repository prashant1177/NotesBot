import React, { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";
import { LockIcon } from "lucide-react";

const OtpForm = ({ token, setToken, setShowOtpForm }) => {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/verify-otp", { token, otp });
      alert(res.data);
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data || "OTP verification failed");
    }
  };

  const handleCancel = async () => {
    if (window.confirm("Are you sure you want to go back?")) {
      navigate(`/register`);
      setToken(null);
      setShowOtpForm(false);
    } else {
      console.log("Cancelled!");
    }
  };
  return (
    <div className="w-full max-w-md text-gray-800">
      <form
        onSubmit={handleVerifyOtp}
        className="space-y-6  p-4 rounded-2xl md:border-1 border-gray-100 "
      >
        <div className="text-center">
          <h1 className="text-2xl font-medium mb-2">Enter OTP</h1>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 font-medium text-sm text-gray-700">
            <LockIcon className="w-4 h-4 text-chart-3 " />
            OTP
          </label>
          <Input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            maxLength={6}
            placeholder="Enter OTP..."
            className="mb-4"
          />
        </div>
        <Button
          type="button"
          onClick={handleCancel}
          varient="muted"
          className=" me-4"
        >
          Cancel
        </Button>
        <Button type="submit">Verify OTP</Button>
      </form>
    </div>
  );
};

export default OtpForm;
