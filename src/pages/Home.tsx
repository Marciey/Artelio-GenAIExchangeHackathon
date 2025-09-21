import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { 
  Mic, 
  Users, 
  Heart, 
  Crown, 
  Palette, 
  Zap, 
  BookOpen,
  ArrowRight
} from 'lucide-react'
import VoiceAgentModal from '../components/VoiceAgentModal'
import AnimatedSections from '../components/AnimatedSections'
import ArtisanProducts from '../components/ArtisanProducts'

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-200/40 via-blue-200/30 to-indigo-200/40" />

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          {/* Logo and Brand Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center mb-4">
              <Crown className="h-12 w-12 text-yellow-500 mr-3" />
              <h1 className="hero-title font-display gradient-text">
                Artelio
              </h1>
              <Palette className="h-10 w-10 text-orange-500 ml-3" />
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl text-slate-700 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Where{' '}
            <span className="text-yellow-600 font-semibold">Artificial Intelligence</span>
            {' '}meets{' '}
            <span className="text-orange-600 font-semibold">Folk Artistry</span>
            {' '}in a constellation of intelligent agents.
          </motion.p>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16"
          >
            <Card className="card-elev hover:scale-105 transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 flex items-center space-x-3">
                <Mic className="h-6 w-6 text-purple-600" />
                <span className="text-slate-800 font-medium">Voice-First Interface</span>
              </CardContent>
            </Card>

            <Card className="card-elev hover:scale-105 transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 flex items-center space-x-3">
                <Users className="h-6 w-6 text-orange-600" />
                <span className="text-slate-800 font-medium">Multi-Agent Collaboration</span>
              </CardContent>
            </Card>

            <Card className="card-elev hover:scale-105 transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 flex items-center space-x-3">
                <Heart className="h-6 w-6 text-green-600" />
                <span className="text-slate-800 font-medium">Folk Art Inspired</span>
              </CardContent>
            </Card>
          </motion.div>

          {/* Dashboard and Agent Workflow Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16"
          >
            <Link to="/dashboard">
              <Button size="lg" className="btn-primary">
                <Zap className="mr-2 h-5 w-5" />
                Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link to="/agent-workflow">
              <Button size="lg" className="btn-secondary">
                <BookOpen className="mr-2 h-5 w-5" />
                Agent Workflow
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>

          {/* Voice Agent Floating Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="fab-voice"
          >
            <VoiceAgentModal />
          </motion.div>
        </div>
      </section>

      {/* Animated Sections */}
      <AnimatedSections />

      {/* Artisan Products Section */}
      <ArtisanProducts />
    </div>
  )
}

export default Home