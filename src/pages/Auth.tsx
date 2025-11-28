import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Lock, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/book-ride");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/book-ride");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          full_name: fullName,
        },
      },
    });

    setLoading(false);

    if (error) {
      toast({
        title: "Sign Up Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Welcome to SmartChair!",
        description: "Your account has been created successfully.",
      });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Welcome Back!",
        description: "You've successfully signed in.",
      });
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
              <h1 className="text-2xl font-bold">
                {isLogin ? "Sign In" : "Create Account"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isLogin
                  ? "Welcome back! Sign in to continue"
                  : "Join SmartChair for accessible airport mobility"}
              </p>
            </div>
          </div>

          {isLogin && step === "email" ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) {
                  setStep("password");
                }
              }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 text-base rounded-xl"
                    required
                    autoFocus
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="glow"
                size="lg"
                className="w-full"
                disabled={!email}
              >
                Continue
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="text-sm text-primary hover:underline"
                >
                  Don't have an account? Sign up
                </button>
              </div>
            </form>
          ) : isLogin && step === "password" ? (
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleLogin}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="email-display" className="text-sm text-muted-foreground">
                  Signing in as
                </Label>
                <div className="text-base font-medium">{email}</div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-12 text-base rounded-xl"
                    required
                    minLength={6}
                    autoFocus
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="glow"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Please wait..." : "Sign In"}
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setStep("email");
                  setPassword("");
                }}
                className="w-full"
              >
                Change Email
              </Button>
            </motion.form>
          ) : (
            <form onSubmit={handleSignUp} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-12 text-base rounded-xl"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 text-base rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-12 text-base rounded-xl"
                    required
                    minLength={6}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Password must be at least 6 characters
                </p>
              </div>

              <Button
                type="submit"
                variant="glow"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Please wait..." : "Create Account"}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(true);
                    setStep("email");
                    setEmail("");
                    setPassword("");
                    setFullName("");
                  }}
                  className="text-sm text-primary hover:underline"
                >
                  Already have an account? Sign in
                </button>
              </div>

              <p className="text-xs text-center text-muted-foreground">
                By continuing, you agree to our Terms & Conditions and Privacy Policy
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
