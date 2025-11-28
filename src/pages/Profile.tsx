import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  History,
  Shield,
  Gift,
  Share2,
  HelpCircle,
  FileText,
  Info,
  LogOut,
  Star,
  MapPin,
  Clock,
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();

  const recentRides = [
    {
      id: 1,
      from: "Security Check",
      to: "Gate 30A",
      date: "Today, 2:30 PM",
      duration: "7 min",
      rating: 5,
    },
    {
      id: 2,
      from: "Baggage Claim",
      to: "Gate 24",
      date: "Yesterday, 10:15 AM",
      duration: "5 min",
      rating: 5,
    },
  ];

  const menuItems = [
    { icon: History, label: "My Rides", path: "/rides" },
    { icon: Shield, label: "Safety", path: "/safety" },
    { icon: Gift, label: "My Rewards", path: "/rewards" },
    { icon: Share2, label: "Refer & Earn", path: "/refer" },
    { icon: HelpCircle, label: "Help", path: "/help" },
    { icon: FileText, label: "Terms & Conditions", path: "/terms" },
    { icon: Info, label: "About", path: "/about" },
  ];

  return (
    <div className="min-h-screen gradient-hero pb-20">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Profile Header */}
          <div className="bg-card rounded-3xl shadow-strong p-8 border border-border/50">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">Aditya Gupta</h1>
                <p className="text-muted-foreground">+91 98765-43210</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-accent text-accent"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">5.0</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24</div>
                <div className="text-xs text-muted-foreground">Total Rides</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">120</div>
                <div className="text-xs text-muted-foreground">Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">₹300</div>
                <div className="text-xs text-muted-foreground">Saved</div>
              </div>
            </div>
          </div>

          {/* Recent Rides */}
          <div className="bg-card rounded-3xl shadow-strong p-8 border border-border/50">
            <h2 className="text-xl font-bold mb-4">Recent Rides</h2>
            <div className="space-y-4">
              {recentRides.map((ride, index) => (
                <motion.div
                  key={ride.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-muted/50 rounded-xl"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold truncate">
                        {ride.from} → {ride.to}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                        <span>{ride.date}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {ride.duration}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="text-sm font-semibold">{ride.rating}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 rounded-xl">
              View All Rides
            </Button>
          </div>

          {/* Menu Items */}
          <div className="bg-card rounded-3xl shadow-strong p-6 border border-border/50">
            <div className="space-y-2">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  onClick={() => navigate(item.path)}
                  className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                  <span className="flex-1 text-left font-medium">
                    {item.label}
                  </span>
                  <ArrowLeft className="w-4 h-4 text-muted-foreground rotate-180" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Sign Out */}
          <Button
            variant="destructive"
            size="lg"
            className="w-full rounded-2xl"
            onClick={() => {
              navigate("/");
            }}
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
