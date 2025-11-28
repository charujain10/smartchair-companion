import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Accessibility,
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin,
  Activity,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [requests] = useState([
    {
      id: 1,
      name: "Soumya Prakash",
      phone: "+91 98765-43210",
      pickup: "Security Check",
      destination: "Gate A5",
      status: "assigned",
      wheelchair: "WC-003",
      time: "2 min ago",
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      phone: "+91 87654-32109",
      pickup: "Baggage Claim",
      destination: "Gate B3",
      status: "pending",
      time: "Just now",
    },
    {
      id: 3,
      name: "Priya Sharma",
      phone: "+91 76543-21098",
      pickup: "Terminal 2 Entrance",
      destination: "Gate C10",
      status: "in-progress",
      wheelchair: "WC-007",
      time: "5 min ago",
    },
  ]);

  const stats = [
    { icon: Users, label: "Active Requests", value: "12", color: "text-primary" },
    { icon: Accessibility, label: "Available Chairs", value: "8", color: "text-success" },
    { icon: Activity, label: "In Service", value: "15", color: "text-accent" },
    { icon: TrendingUp, label: "Today's Trips", value: "47", color: "text-secondary" },
  ];

  const wheelchairs = [
    { id: "WC-001", status: "available", battery: 95, location: "Terminal 1" },
    { id: "WC-002", status: "available", battery: 88, location: "Terminal 2" },
    { id: "WC-003", status: "in-use", battery: 72, location: "En route to Gate A5" },
    { id: "WC-007", status: "in-use", battery: 65, location: "En route to Gate C10" },
    { id: "WC-010", status: "charging", battery: 45, location: "Docking Station" },
  ];

  const handleAssign = (requestId: number) => {
    toast({
      title: "Wheelchair Assigned",
      description: "WC-005 has been assigned to this request",
    });
  };

  const getStatusBadge = (status: string) => {
    const config = {
      pending: { label: "Pending", variant: "secondary" as const },
      assigned: { label: "Assigned", variant: "default" as const },
      "in-progress": { label: "In Progress", variant: "default" as const },
    };
    return config[status as keyof typeof config] || config.pending;
  };

  const getWheelchairStatus = (status: string) => {
    const config = {
      available: { label: "Available", color: "text-success bg-success/10" },
      "in-use": { label: "In Use", color: "text-primary bg-primary/10" },
      charging: { label: "Charging", color: "text-accent bg-accent/10" },
    };
    return config[status as keyof typeof config] || config.available;
  };

  return (
    <div className="min-h-screen gradient-hero pb-20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="bg-card rounded-3xl shadow-strong p-8 border border-border/50">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">
                  Welcome, Nandita • GMR Innovex
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-muted/50 rounded-2xl"
                >
                  <stat.icon className={`w-8 h-8 ${stat.color} mb-2`} />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* New Requests */}
          <div className="bg-card rounded-3xl shadow-strong p-8 border border-border/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">New Requests</h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {requests.map((request, index) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 border-2 border-border rounded-2xl hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg">{request.name}</h3>
                        <Badge {...getStatusBadge(request.status)}>
                          {getStatusBadge(request.status).label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{request.phone}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {request.time}
                      </p>
                    </div>
                    {request.wheelchair && (
                      <div className="px-3 py-1 bg-primary/10 text-primary rounded-lg font-semibold text-sm">
                        {request.wheelchair}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-4 p-3 bg-muted/50 rounded-xl">
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                    <div className="text-sm flex-1">
                      <span className="font-medium">{request.pickup}</span>
                      <span className="text-muted-foreground"> → </span>
                      <span className="font-medium">{request.destination}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {request.status === "pending" ? (
                      <Button
                        variant="glow"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleAssign(request.id)}
                      >
                        Assign Wheelchair
                      </Button>
                    ) : request.status === "assigned" ? (
                      <Button variant="success" size="sm" className="flex-1">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Track Live
                      </Button>
                    ) : (
                      <Button variant="default" size="sm" className="flex-1">
                        <Activity className="w-4 h-4 mr-2" />
                        View Live Tracking
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Wheelchair Fleet */}
          <div className="bg-card rounded-3xl shadow-strong p-8 border border-border/50">
            <h2 className="text-2xl font-bold mb-6">Wheelchair Fleet</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {wheelchairs.map((chair, index) => (
                <motion.div
                  key={chair.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 border-2 border-border rounded-xl hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Accessibility className="w-5 h-5 text-primary" />
                      <span className="font-bold">{chair.id}</span>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                        getWheelchairStatus(chair.status).color
                      }`}
                    >
                      {getWheelchairStatus(chair.status).label}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    <MapPin className="w-3 h-3 inline mr-1" />
                    {chair.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-success transition-all duration-300"
                        style={{ width: `${chair.battery}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold">{chair.battery}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-card rounded-3xl shadow-strong p-8 border border-border/50">
            <h2 className="text-2xl font-bold mb-4">System Alerts</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 bg-accent/10 border border-accent/20 rounded-xl">
                <AlertCircle className="w-5 h-5 text-accent flex-shrink-0" />
                <div className="flex-1">
                  <div className="font-semibold text-sm">Low Battery Alert</div>
                  <div className="text-xs text-muted-foreground">
                    WC-010 needs charging - 45% remaining
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-success/10 border border-success/20 rounded-xl">
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                <div className="flex-1">
                  <div className="font-semibold text-sm">All Systems Operational</div>
                  <div className="text-xs text-muted-foreground">
                    15 wheelchairs active, 8 available
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;
