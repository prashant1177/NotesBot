import { useState } from "react";
import { useEffect } from "react";
import api from "../../api";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/Card/Card";
import Button from "../../ui/Button/Button";
import TextArea from "../../ui/Input/TextArea";
import { Info, Mail, UserPlus, User, User2 } from "lucide-react";
import Input from "../../ui/Input/Input";

export default function UserEdit() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    username: "",
    userabout: "",
  });
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get("/user");
      setForm(res.data.user);
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
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="px-16 w-2/3">
        <Card className="border-0 rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">Edit Profile</CardTitle>
            <p className="text-sm text-muted-foreground">
              Update your public profile information.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={saveChanges} className="grid gap-6 mt-4">
              {/* Full Name & Username */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-medium text-sm">
                    <User2 className="w-4 h-4 text-chart-1" />
                    Full Name
                  </label>{" "}
                  <Input
                    id="fullname"
                    required
                    value={form.fullname}
                    onChange={(e) =>
                      setForm({ ...form, fullname: e.target.value })
                    }
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-medium text-sm">
                    <User className="w-4 h-4 text-chart-2" />
                    Username
                  </label>
                  <Input
                    id="username"
                    value={form.username}
                    onChange={(e) =>
                      setForm({ ...form, username: e.target.value })
                    }
                    placeholder="your_username"
                    required
                  />
                </div>
              </div>

              {/* Email & About */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-medium text-sm">
                    <Mail className="h-4 w-4" /> Email{" "}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                    placeholder="you@example.com"
                  />
                </div>
                <div className="space-y-2 md:col-span-1">
                  <label className="flex items-center gap-2 font-medium text-sm">
                    <Info className="h-4 w-4" /> About{" "}
                  </label>
                  <TextArea
                    id="about"
                    rows={4}
                    value={form.userabout}
                    onChange={(e) =>
                      setForm({ ...form, userabout: e.target.value })
                    }
                    placeholder="A short bio about you"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={fetchData}
                  className="rounded-2xl"
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  className="rounded-2xl"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>{" "}
        </Card>
      </div>
    </div>
  );
}
