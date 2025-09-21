# Artelio Frontend

A modern React frontend for Artelio - where Artificial Intelligence meets Folk Artistry in a constellation of intelligent agents.

## Features

- 🎨 **Beautiful UI** - Modern design with dark theme and starry background
- 🎤 **Voice-First Interface** - Interactive voice agent with real-time processing
- 🤖 **Multi-Agent Collaboration** - Visual workflow management with D3.js
- 📊 **Analytics Dashboard** - Comprehensive charts and metrics
- 🛍️ **Artisan Products** - Horizontal scrolling product showcase
- ✨ **Smooth Animations** - Framer Motion powered interactions
- 📱 **Responsive Design** - Works on all devices

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Beautiful component library
- **Framer Motion** - Smooth animations and transitions
- **D3.js** - Data visualization for agent workflows
- **Recharts** - Chart components for dashboard
- **React Router** - Client-side routing

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd artelio-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui components
│   ├── Layout.tsx      # Main layout with navigation
│   ├── VoiceAgentModal.tsx
│   ├── AnimatedSections.tsx
│   └── ArtisanProducts.tsx
├── pages/              # Page components
│   ├── Home.tsx        # Landing page
│   ├── Dashboard.tsx   # Analytics dashboard
│   └── AgentWorkflow.tsx # Agent workflow visualization
├── hooks/              # Custom React hooks
│   └── useApi.ts       # API integration hooks
├── lib/                # Utility libraries
│   ├── utils.ts        # Utility functions
│   └── api.ts          # API client and types
└── main.tsx           # App entry point
```

## Key Components

### Home Page
- Hero section with Artelio branding
- Three feature buttons (Voice-First, Multi-Agent, Folk Art)
- Dashboard and Agent Workflow navigation
- Floating voice agent button
- Animated sections with scroll triggers
- Horizontal scrolling artisan products

### Dashboard
- Real-time metrics and KPIs
- Interactive charts (Bar, Pie, Area)
- Recent activity feed
- Top products showcase
- Performance monitoring

### Agent Workflow
- D3.js powered flow visualization
- Real-time agent status updates
- Interactive workflow controls
- Step-by-step progress tracking
- Agent performance metrics

## API Integration

The frontend is designed to work with the Artelio backend API:

- `/api/products` - Product catalog
- `/api/session/start` - Start AI session
- `/api/session/:id/progress` - Session progress
- `/api/dashboard/:artisanId` - Dashboard data
- `/api/fact/today` - Daily facts
- `/api/voice/process` - Voice processing

## Customization

### Styling
- Modify `src/index.css` for global styles
- Update `tailwind.config.js` for theme customization
- Use CSS variables for consistent theming

### Components
- All components are in `src/components/`
- Use Shadcn/ui components as base
- Extend with custom functionality

### API
- Update `src/lib/api.ts` for API endpoints
- Modify `src/hooks/useApi.ts` for data fetching logic

## Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:8000
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.
