import React, { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";
import { LockIcon } from "lucide-react";

const OtpForm = ({ token }) => {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/verify-otp", { token, otp });
      alert(res.data);

      navigate(`/login`);
    } catch (err) {
      alert(err.response?.data || "OTP verification failed");
    }
  };

  const handleCancel = async () => {
    if (window.confirm("Are you sure you want to go back?")) {
      navigate(`/register`);
    } else {
      console.log("Cancelled!");
    }
  };
  return (
    <div className="w-full max-w-md space-y-8">
      <form onSubmit={handleVerifyOtp} className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-medium mb-2">Enter OTP</h1>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 font-medium text-sm">
            <LockIcon className="w-4 h-4 text-chart-3" />
            OTP
          </label>
          <Input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            maxLength={6}
            placeholder="Enter OTP..."
          />
        </div>
        <Button className="bg-red-500 mr-4" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="submit">Verify OTP</Button>
      </form>
    </div>
  );
};

export default OtpForm;
