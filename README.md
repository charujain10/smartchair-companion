# SmartChair 🦽✈️

> Autonomous wheelchair assistance for seamless airport mobility

SmartChair is an intelligent airport wheelchair service application that connects passengers with mobility needs to autonomous wheelchair solutions, ensuring comfortable and timely navigation through airport terminals.

---

## 🎯 Purpose

Airports can be overwhelming for passengers with mobility challenges. Long distances between gates, tight layover schedules, and unfamiliar layouts create stress and accessibility barriers. **SmartChair** bridges this gap by providing:

- **On-demand wheelchair booking** for airport navigation
- **Real-time tracking** of wheelchair location and ETA
- **AI-powered support** for instant assistance
- **Seamless integration** with flight schedules and gate information

---

## 👥 Who Is This For?

| User Type | Use Case |
|-----------|----------|
| **Elderly Passengers** | Navigate large terminals comfortably without physical strain |
| **Passengers with Disabilities** | Access reliable mobility assistance throughout their journey |
| **Travelers with Temporary Injuries** | Get support during recovery while traveling |
| **Parents with Young Children** | Manage family travel with additional mobility support |
| **Airport Operations Staff** | Monitor and manage wheelchair fleet efficiently |

---

## ✨ Features

### For Passengers

- **🚀 Quick Booking** - Book a wheelchair in under 30 seconds
- **📍 Location Selection** - Choose from popular gates, terminals, or use current location
- **🗺️ Real-Time Tracking** - Watch your wheelchair arrive on an interactive map
- **💬 AI Chat Support** - Get instant answers to questions about your ride
- **👤 User Profiles** - Save preferences for faster future bookings
- **📱 Mobile-First Design** - Optimized for on-the-go booking

### For Airport Staff (Admin Dashboard)

- **📊 Fleet Overview** - Monitor all active wheelchairs and their status
- **🔔 Live Requests** - View and manage incoming ride requests
- **⚡ Quick Assignment** - Efficiently dispatch wheelchairs to passengers
- **📈 Analytics** - Track usage patterns and optimize operations

---

## 🚶 User Journey

```
┌─────────────────────────────────────────────────────────────────┐
│                        PASSENGER FLOW                           │
└─────────────────────────────────────────────────────────────────┘

   ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
   │  Landing │────▶│   Auth   │────▶│  Book    │────▶│ Tracking │
   │   Page   │     │  (OTP)   │     │  Ride    │     │   Page   │
   └──────────┘     └──────────┘     └──────────┘     └──────────┘
        │                                                   │
        │                                                   ▼
        │                                            ┌──────────┐
        │                                            │  Ride    │
        │                                            │ Complete │
        │                                            └──────────┘
        │
        ▼
   ┌──────────┐
   │  AI Chat │ ◀── Available throughout the journey
   │  Support │
   └──────────┘
```

### Step-by-Step Journey

1. **Discover** - Passenger lands on the homepage and learns about SmartChair
2. **Authenticate** - Quick phone number verification via OTP
3. **Select Locations** - Choose pickup point and destination (gates, terminals, etc.)
4. **Confirm Booking** - Review route and request the wheelchair
5. **Track in Real-Time** - Watch the wheelchair approach on the map
6. **Get Assistance** - Use AI chatbot for any questions during the ride
7. **Complete Journey** - Arrive at destination safely

---

## 🛠️ How It Works

### Architecture Overview

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   React App     │────▶│  Lovable Cloud  │────▶│    Database     │
│   (Frontend)    │     │  (Edge Funcs)   │     │   (Postgres)    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │
        │                       ▼
        │               ┌─────────────────┐
        └──────────────▶│   AI Gateway    │
                        │  (Chat Support) │
                        └─────────────────┘
```

### Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, TypeScript, Vite |
| **Styling** | Tailwind CSS, shadcn/ui |
| **Animations** | Framer Motion |
| **Backend** | Lovable Cloud (Supabase) |
| **Database** | PostgreSQL with Row Level Security |
| **AI Support** | Lovable AI Gateway |
| **Authentication** | Phone OTP / Anonymous Auth |

### Database Schema

- **profiles** - User information and preferences
- **rides** - Booking records with pickup/destination
- **payments** - Transaction history
- **chat_conversations** - Support chat sessions
- **chat_messages** - Individual chat messages

---

## 📱 Screenshots

### Landing Page
Modern, accessible landing page with clear call-to-actions and feature highlights.

### Booking Flow
Intuitive location selection with search, popular locations, and current location detection.

### Real-Time Tracking
Interactive map showing wheelchair location, ETA, and route visualization.

### AI Chat Support
Conversational AI assistant available 24/7 for passenger queries.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd smartchair

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

The application uses Lovable Cloud for backend services. Environment variables are automatically configured:

- `VITE_SUPABASE_URL` - Backend API URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Public API key

---

## 📂 Project Structure

```
smartchair/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── ui/          # shadcn/ui components
│   │   ├── ChatBot.tsx  # AI support chatbot
│   │   └── NavLink.tsx  # Navigation component
│   ├── pages/           # Route pages
│   │   ├── Index.tsx    # Landing page
│   │   ├── Auth.tsx     # Authentication
│   │   ├── BookRide.tsx # Booking flow
│   │   ├── Tracking.tsx # Real-time tracking
│   │   ├── Profile.tsx  # User profile
│   │   └── Admin.tsx    # Staff dashboard
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   └── integrations/    # Backend integration
├── supabase/
│   └── functions/       # Edge functions
│       └── chat-support/# AI chat endpoint
└── public/              # Static assets
```

---

## 🔒 Security

- **Row Level Security (RLS)** - Database policies ensure users only access their own data
- **Secure Authentication** - Phone-based OTP verification
- **Edge Functions** - Server-side logic with proper CORS handling
- **Input Validation** - Client and server-side validation

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is proprietary software developed for airport mobility services.

---

## 🔗 Links

- **Live App**: [SmartChair](https://mobility-mentor-pro.lovable.app)


---

<p align="center">
  <strong>Making airports accessible, one ride at a time.</strong>
</p>
