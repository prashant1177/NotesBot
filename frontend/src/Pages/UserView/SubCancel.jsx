import { useState, useEffect } from "react";
import api from "../../api";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/Card/Card";
import Button from "../../ui/Button/Button";
import { Calendar, AlertCircle, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TextArea from "../../ui/Input/TextArea";

export default function SubCancel() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reason, setReason] = useState("");
  const navigate = useNavigate();

  const cancelSubscription = async () => {
    try {
      setLoading(true);
      const res = await api.post("/api/cancel-subscription", { reason });
      alert(res.data.response || "Your subscription has been cancelled.");
      navigate("/user");
    } catch (err) {
      console.error(err);
      setError("Failed to cancel subscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center p-4">
      <div className="w-full max-w-3xl px-4 sm:px-8 lg:px-16">
        <Card className="border-0 rounded-2xl shadow-md">
          <CardHeader className="pb-4 border-b border-gray-300">
            <CardTitle className="text-2xl">Cancel Subscription</CardTitle>
            <p className="text-sm text-muted-foreground">
              Manage your premium subscription status.
            </p>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="flex items-center gap-2 text-red-500 my-4">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex flex-col gap-4 mt-4">
              <div className="flex flex-col gap-4">
                <div className="md:col-span-2">
                  <TextArea
                    id="about"
                    rows={4}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder=" Before you go, could you share your reason for cancelling?"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex gap-4" >
              <Button
                onClick={()=> navigate(`/user`) }
                disabled={loading}
              >
                Go Back
              </Button>

              <Button
                onClick={cancelSubscription}
                disabled={loading}
                varient="danger"
              >
                {loading ? "Cancelling..." : "Cancel Subscription"}
              </Button>
</div>
              <div className="rounded-lg p-4 text-sm">
                <p className="mb-2">
                  By cancelling, you will no longer have access to premium
                  features after the current billing cycle ends.
                </p>
                <p className="text-gray-500 italic">
                  You can always re-subscribe later from the pricing page.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
