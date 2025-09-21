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
  {/* Voice-First Interface */}
  <Card className="card-elev bg-gradient-to-r from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
    <CardContent className="p-6 flex items-center space-x-3">
      <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center shadow-md">
        <Mic className="h-5 w-5 text-white" />
      </div>
      <span className="text-purple-900 font-semibold">Voice-First Interface</span>
    </CardContent>
  </Card>

  {/* Multi-Agent Collaboration */}
  <Card className="card-elev bg-gradient-to-r from-orange-100 to-orange-200 hover:from-orange-200 hover:to-orange-300 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
    <CardContent className="p-6 flex items-center space-x-3">
      <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center shadow-md">
        <Users className="h-5 w-5 text-white" />
      </div>
      <span className="text-orange-900 font-semibold">Multi-Agent Collaboration</span>
    </CardContent>
  </Card>

  {/* Folk Art Inspired */}
  <Card className="card-elev bg-gradient-to-r from-green-100 to-green-200 hover:from-green-200 hover:to-green-300 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
    <CardContent className="p-6 flex items-center space-x-3">
      <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shadow-md">
        <Heart className="h-5 w-5 text-white" />
      </div>
      <span className="text-green-900 font-semibold">Folk Art Inspired</span>
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