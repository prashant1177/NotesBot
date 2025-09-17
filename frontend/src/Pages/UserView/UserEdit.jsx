import { useState } from "react";
import { useEffect } from "react";
import api, { setAuthToken } from "../../api";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/Card/Card";
import Button from "../../ui/Button/Button";
import TextArea from "../../ui/Input/TextArea";
import { Info, Mail, User, User2, Calendar } from "lucide-react";
import Input from "../../ui/Input/Input";
import { Link } from "react-router-dom";

export default function UserEdit() {
  const [form, setForm] = useState({
    fullname: "",
    userabout: "",
    username: "",
    email: "",
  });
  const [premium, setPremium] = useState(true);
  const [premiumDetails, setPremiumDetails] = useState({
    startDate: new Date().toISOString(), // today
    endDate: new Date(
      new Date().setMonth(new Date().getMonth() + 1)
    ).toISOString(), // one month later
  });
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get("/user");
      setForm(res.data.user);
      setPremium(res.data.user.isPremium);
      if (res.data.user.isPremium) {
        setPremiumDetails({
          startDate: res.data.user.premiumStart,
          endDate: res.data.user.premiumEnd,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // saveChanges
  const saveChanges = async () => {
    try {
      const res = await api.put("/user", form);
      setForm(res.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    window.location.href = "/";
  };
  return (
    <div className="w-full flex justify-center p-4">
      <div className="w-full max-w-6xl px-4 sm:px-8 lg:px-16">
        <div className="border-0 rounded-2xl">
          <CardHeader className="pb-4 border-b-1 border-gray-300">
            <CardTitle className="text-2xl">Edit Profile</CardTitle>
            <p className="text-sm text-muted-foreground">
              Update your public profile information.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={saveChanges} className="grid gap-6 mt-8">
              {/* Full Name */}
              <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-4">
                <label className="flex items-center gap-2 font-medium text-sm">
                  <User2 className="w-4 h-4 text-chart-1" />
                  Full Name
                </label>
                <div className="md:col-span-2">
                  <Input
                    id="fullname"
                    required
                    value={form.fullname}
                    onChange={(e) =>
                      setForm({ ...form, fullname: e.target.value })
                    }
                    placeholder="Your full name"
                    className="w-full"
                  />
                </div>
              </div>

              {/* Username */}
              <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-4">
                <label className="flex items-center gap-2 font-medium text-sm ">
                  <User className="w-4 h-4 text-chart-2" />
                  Username
                </label>
                <div className="md:col-span-2">
                  <Input
                    id="username"
                    value={form.username}
                    onChange={(e) =>
                      setForm({ ...form, username: e.target.value })
                    }
                    placeholder="your_username"
                    disabled
                    className="w-full"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-4">
                <label className="flex items-center gap-2 font-medium text-sm ">
                  <Mail className="h-4 w-4" />
                  Email
                </label>
                <div className="md:col-span-2">
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                    disabled
                    className="w-full"
                  />
                </div>
              </div>

              {/* About */}
              <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-4">
                <label className="flex items-center gap-2 font-medium text-sm ">
                  <Info className="h-4 w-4" />
                  About
                </label>
                <div className="md:col-span-2">
                  <TextArea
                    id="about"
                    rows={4}
                    value={form.userabout}
                    onChange={(e) =>
                      setForm({ ...form, userabout: e.target.value })
                    }
                    placeholder="A short bio about you"
                    className="w-full"
                  />
                </div>
              </div>

              {/* Premium Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-4">
                <label className="flex items-center gap-2 font-medium text-sm ">
                  <Calendar className="h-4 w-4 " />
                  Premium
                </label>
                <div className="md:col-span-2 flex flex-col gap-1">
                  {premium ? (
                    <>
                      {premiumDetails.startDate && (
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                          Active :
                          <span className="font-medium ">
                            {new Date(
                              premiumDetails.startDate
                            ).toLocaleDateString()}
                          </span>
                          -
                          <span className="font-medium text-gray-950">
                            {new Date(
                              premiumDetails.endDate
                            ).toLocaleDateString()}
                          </span>
                        </p>
                      )}

                      <div className="flex items-center gap-2 mt-4">
                        <span className="bg-gradient-to-br from-blue-500 to-blue-700 text-gray-50 px-4 py-2 rounded-md font-semibold">
                          Premium User
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            alert(`You will be shortly contacted via email.`)
                          }
                          className="text-sm text-gray-500 hover:text-red-500"
                        >
                          Cancel Premium
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col gap-2 ">
                      <p className="text-sm text-gray-500 italic ">
                        Your are Premium has been expired
                      </p>
                      <Link
                        to={`/pricing`}
                        className="w-fit px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-500 text-gray-50 hover:bg-blue-400 focus:ring-blue-300"
                      >
                        Buy Premium for $19/M
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4">
                <Button type="submit" className="rounded-2xl">
                  Save Changes
                </Button>
                <Button
                  type="button"
                  onClick={fetchData}
                  className="rounded-2xl"
                >
                  Reset
                </Button>
                <Button
                  type="button"
                  varient="danger"
                  onClick={logout}
                  className="rounded-2xl"
                >
                  Logout{" "}
                </Button>
              </div>
            </form>
          </CardContent>{" "}
        </div>
      </div>
    </div>
  );
}
