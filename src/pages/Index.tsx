import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Accessibility, MapPin, Shield, Zap, Users, Clock } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: MapPin,
      title: "Smart Navigation",
      description: "AI-powered routing through complex airport terminals",
    },
    {
      icon: Zap,
      title: "Instant Booking",
      description: "Book your ride in seconds with real-time availability",
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Emergency alerts and live monitoring for your peace of mind",
    },
    {
      icon: Clock,
      title: "24/7 Service",
      description: "Round-the-clock assistance whenever you need it",
    },
  ];

  return (
    <div className="min-h-screen gradient-hero">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-card/50 backdrop-blur-sm rounded-full shadow-soft"
          >
            <Accessibility className="w-6 h-6 text-primary" />
            <span className="text-sm font-semibold text-muted-foreground">
              Empowering Independence
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              SmartChair
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto text-balance">
            Your autonomous mobility companion for seamless airport navigation. Travel with confidence, comfort, and complete independence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="glow"
              onClick={() => navigate("/book-ride")}
              className="text-base"
            >
              Book Your Ride
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/auth")}
              className="text-base"
            >
              Sign In
            </Button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-24"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-border/50"
            >
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "99.9%", label: "Uptime" },
            { value: "< 2min", label: "Avg. Wait Time" },
            { value: "50K+", label: "Happy Travelers" },
            { value: "24/7", label: "Support" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Admin Access */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <Button
            variant="ghost"
            onClick={() => navigate("/admin")}
            className="text-muted-foreground hover:text-foreground"
          >
            <Users className="w-4 h-4 mr-2" />
            Airport Staff? Access Admin Dashboard
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
