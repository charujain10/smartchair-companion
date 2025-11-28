import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Search, Navigation } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const popularGates = [
  { id: "gate-20", name: "Gate 20", terminal: "Terminal 1" },
  { id: "gate-24", name: "Gate 24", terminal: "Terminal 1" },
  { id: "gate-28", name: "Gate 28", terminal: "Terminal 1" },
  { id: "gate-30a", name: "Gate 30A", terminal: "Terminal 2" },
  { id: "security", name: "Security Check", terminal: "All" },
  { id: "baggage", name: "Baggage Claim", terminal: "All" },
];

const BookRide = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRequestRide = () => {
    if (!pickup || !destination) {
      toast({
        title: "Missing Information",
        description: "Please select both pickup and destination",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Request Sent!",
      description: "Waiting for airport authority confirmation",
    });
    
    setTimeout(() => {
      navigate("/tracking");
    }, 2000);
  };

  const filteredGates = popularGates.filter((gate) =>
    gate.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen gradient-hero">
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
          className="bg-card rounded-3xl shadow-strong p-8 border border-border/50"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Book Your Ride</h1>
              <p className="text-sm text-muted-foreground">
                Select your pickup and destination
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Search */}
            <div className="space-y-2">
              <Label htmlFor="search">Search Destination</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="search"
                  type="text"
                  placeholder="Search gates, terminals, or locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 rounded-xl"
                />
              </div>
            </div>

            {/* Current Location Detection */}
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                setPickup("Current Location");
                toast({
                  title: "Location Detected",
                  description: "Using your current location as pickup point",
                });
              }}
            >
              <Navigation className="w-4 h-4 mr-2" />
              Use My Current Location
            </Button>

            {/* Popular Places */}
            <div>
              <Label className="mb-3 block">Popular Locations</Label>
              <div className="grid gap-3">
                {filteredGates.map((gate, index) => (
                  <motion.button
                    key={gate.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      if (!pickup) {
                        setPickup(gate.name);
                        toast({
                          title: "Pickup Set",
                          description: `Pickup location: ${gate.name}`,
                        });
                      } else if (!destination) {
                        setDestination(gate.name);
                        toast({
                          title: "Destination Set",
                          description: `Destination: ${gate.name}`,
                        });
                      }
                    }}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left hover:border-primary ${
                      pickup === gate.name || destination === gate.name
                        ? "border-primary bg-primary/5"
                        : "border-border bg-background"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{gate.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {gate.terminal}
                        </div>
                      </div>
                      <MapPin className={`w-5 h-5 ${
                        pickup === gate.name || destination === gate.name
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`} />
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Selected Route */}
            {pickup && destination && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-2xl gradient-primary text-white"
              >
                <div className="text-sm font-semibold mb-2">Your Route</div>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="text-xs opacity-80">From</div>
                    <div className="font-semibold">{pickup}</div>
                  </div>
                  <div className="px-3 py-1 bg-white/20 rounded-full text-xs">
                    → 2 min
                  </div>
                  <div className="flex-1">
                    <div className="text-xs opacity-80">To</div>
                    <div className="font-semibold">{destination}</div>
                  </div>
                </div>
              </motion.div>
            )}

            <Button
              variant="glow"
              size="lg"
              className="w-full"
              onClick={handleRequestRide}
              disabled={!pickup || !destination}
            >
              Request SmartChair
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              You can change your destination during the ride
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookRide;
