import React, { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";
import { LockIcon } from "lucide-react";

const SetPasswordForm = ({ validatePassword, errors, setErrors }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await api.post("/set-password", { password });
      alert("Password set successfully!");
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data || "Failed to set password");
    }
  };

  const handleCancel = async () => {
    if (window.confirm("Are you sure you want to go back?")) {
      navigate(`/login`);
    } else {
      console.log("Cancelled!");
    }
  };

  return (
    <div className="w-full max-w-md text-gray-800">
      <form
        onSubmit={handleSetPassword}
        className="space-y-6 p-4 rounded-2xl md:border-1 border-gray-100"
      >
        <div className="text-center">
          <h1 className="text-2xl font-medium mb-2">Set Your Password</h1>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 font-medium text-sm text-gray-700">
            <LockIcon className="w-4 h-4 text-chart-3" />
            New Password
          </label>
          <Input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => {
              const val = e.target.value;
              setPassword(val);
              setErrors({ ...errors, password: validatePassword(val) });
            }}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 font-medium text-sm text-gray-700">
            <LockIcon className="w-4 h-4 text-chart-3" />
            Confirm Password
          </label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
            placeholder="Confirm password..."
            className="mb-4"
          />
        </div>

        <Button
          type="button"
          onClick={handleCancel}
          varient="muted"
          className="me-4"
        >
          Cancel
        </Button>
        <Button type="submit">Save Password</Button>
      </form>
    </div>
  );
};

export default SetPasswordForm;
