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
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20" />
        
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          {/* Logo and Brand Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center mb-4">
              <Crown className="h-12 w-12 text-yellow-400 mr-2" />
              <h1 className="text-6xl md:text-8xl font-bold gradient-text">
                Artelio
              </h1>
              <Palette className="h-8 w-8 text-orange-500 ml-2" />
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Where{' '}
            <span className="text-yellow-400 font-semibold">Artificial Intelligence</span>
            {' '}meets{' '}
            <span className="text-orange-400 font-semibold">Folk Artistry</span>
            {' '}in a constellation of intelligent agents.
          </motion.p>

          {/* Feature Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16"
          >
            <Card className="bg-purple-600/20 border-purple-400/30 hover:bg-purple-600/30 transition-all duration-300 cursor-pointer group">
              <CardContent className="p-6 flex items-center space-x-3">
                <Mic className="h-6 w-6 text-white" />
                <span className="text-white font-medium">Voice-First Interface</span>
              </CardContent>
            </Card>

            <Card className="bg-orange-600/20 border-orange-400/30 hover:bg-orange-600/30 transition-all duration-300 cursor-pointer group">
              <CardContent className="p-6 flex items-center space-x-3">
                <Users className="h-6 w-6 text-white" />
                <span className="text-white font-medium">Multi-Agent Collaboration</span>
              </CardContent>
            </Card>

            <Card className="bg-green-600/20 border-green-400/30 hover:bg-green-600/30 transition-all duration-300 cursor-pointer group">
              <CardContent className="p-6 flex items-center space-x-3">
                <Heart className="h-6 w-6 text-white" />
                <span className="text-white font-medium">Folk Art Inspired</span>
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
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full glow-effect"
              >
                <Zap className="mr-2 h-5 w-5" />
                Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link to="/agent-workflow">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 text-lg font-semibold rounded-full glow-effect"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Agent Workflow
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>

          {/* Voice Agent Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="fixed bottom-8 right-8 z-50"
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
