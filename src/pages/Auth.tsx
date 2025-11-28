import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length === 10) {
      setStep("otp");
      toast({
        title: "OTP Sent",
        description: `Verification code sent to +91 ${phone}`,
      });
    }
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      toast({
        title: "Welcome to SmartChair!",
        description: "You've successfully signed in.",
      });
      navigate("/book-ride");
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="bg-card rounded-3xl shadow-strong p-8 border border-border/50">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Sign In</h1>
              <p className="text-sm text-muted-foreground">
                Quick & secure verification
              </p>
            </div>
          </div>

          {step === "phone" ? (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex gap-2">
                  <div className="flex items-center px-3 bg-muted rounded-xl text-sm font-medium">
                    +91
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="0000000000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className="flex-1 h-12 text-base rounded-xl"
                    maxLength={10}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  We'll text a code to verify your phone number
                </p>
              </div>

              <Button
                type="submit"
                variant="glow"
                size="lg"
                className="w-full"
                disabled={phone.length !== 10}
              >
                <Phone className="w-4 h-4 mr-2" />
                Send Verification Code
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By continuing, you agree to our Terms & Conditions and Privacy Policy
              </p>
            </form>
          ) : (
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleVerifyOTP}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="otp">Enter Verification Code</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="h-12 text-center text-2xl tracking-widest rounded-xl"
                  maxLength={6}
                />
                <p className="text-xs text-muted-foreground">
                  Code sent to +91 {phone}
                </p>
              </div>

              <Button
                type="submit"
                variant="glow"
                size="lg"
                className="w-full"
                disabled={otp.length !== 6}
              >
                Verify & Continue
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={() => setStep("phone")}
                className="w-full"
              >
                Change Phone Number
              </Button>
            </motion.form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
