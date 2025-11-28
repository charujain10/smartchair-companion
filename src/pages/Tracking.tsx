import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Navigation, AlertCircle, Clock, MapPin, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

const Tracking = () => {
  const [status, setStatus] = useState<"waiting" | "arriving" | "in-transit" | "arrived">("waiting");
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Simulate ride progress
    const timer1 = setTimeout(() => {
      setStatus("arriving");
      toast({
        title: "Request Confirmed!",
        description: "SmartChair WC-007 is on its way",
      });
    }, 2000);

    const timer2 = setTimeout(() => {
      setStatus("in-transit");
      toast({
        title: "Ride Started",
        description: "Enjoy your comfortable journey",
      });
    }, 8000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(progressInterval);
    };
  }, [toast]);

  const statusConfig = {
    waiting: {
      title: "Request Sent",
      subtitle: "Waiting for confirmation from airport authority",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    arriving: {
      title: "SmartChair Arriving",
      subtitle: "Estimated arrival: 2 minutes",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    "in-transit": {
      title: "Ride in Progress",
      subtitle: "Heading to Gate 30A",
      color: "text-success",
      bgColor: "bg-success/10",
    },
    arrived: {
      title: "Arrived at Destination",
      subtitle: "Have a great flight!",
      color: "text-success",
      bgColor: "bg-success/10",
    },
  };

  const currentStatus = statusConfig[status];

  const handleEmergency = () => {
    toast({
      title: "Emergency Alert Sent",
      description: "Airport staff have been notified and will assist immediately",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen gradient-hero">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Status Card */}
          <div className="bg-card rounded-3xl shadow-strong p-8 border border-border/50">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${currentStatus.bgColor} mb-6`}>
              <div className={`w-2 h-2 rounded-full ${currentStatus.color} animate-pulse`} />
              <span className={`text-sm font-semibold ${currentStatus.color}`}>
                {currentStatus.title}
              </span>
            </div>

            <h1 className="text-3xl font-bold mb-2">{currentStatus.subtitle}</h1>
            
            {status === "in-transit" && (
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            {/* Map Placeholder */}
            <div className="mt-8 aspect-video bg-muted rounded-2xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
              <div className="relative z-10 text-center">
                <Navigation className="w-12 h-12 mx-auto mb-2 text-primary animate-pulse" />
                <p className="text-sm text-muted-foreground">Live tracking active</p>
              </div>
            </div>

            {/* Trip Details */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                <MapPin className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">SmartChair ID</div>
                  <div className="font-semibold">WC-007</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                <Clock className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Estimated Time</div>
                  <div className="font-semibold">5-7 minutes</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="destructive"
              size="lg"
              onClick={handleEmergency}
              className="rounded-2xl"
            >
              <AlertCircle className="w-5 h-5 mr-2" />
              Emergency
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="rounded-2xl"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Support
            </Button>
          </div>

          {/* Change Destination */}
          <Button
            variant="secondary"
            size="lg"
            className="w-full rounded-2xl"
            onClick={() => navigate("/book-ride")}
          >
            <MapPin className="w-5 h-5 mr-2" />
            Change Destination
          </Button>

          {status === "in-transit" && progress > 80 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Button
                variant="glow"
                size="lg"
                className="w-full rounded-2xl"
                onClick={() => {
                  toast({
                    title: "Trip Completed!",
                    description: "Thank you for using SmartChair",
                  });
                  navigate("/profile");
                }}
              >
                Complete Trip
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Tracking;
