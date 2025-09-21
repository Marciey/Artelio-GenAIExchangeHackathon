import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from './ui/card'
import { 
  Sparkles, 
  Brain, 
  Palette, 
  Users, 
  Zap, 
  Heart,
  Globe,
  Shield,
  Lightbulb
} from 'lucide-react'

const AnimatedSections = () => {
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const ref3 = useRef(null)
  const ref4 = useRef(null)

  const isInView1 = useInView(ref1, { once: true, margin: "-100px" })
  const isInView2 = useInView(ref2, { once: true, margin: "-100px" })
  const isInView3 = useInView(ref3, { once: true, margin: "-100px" })
  const isInView4 = useInView(ref4, { once: true, margin: "-100px" })

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Advanced machine learning algorithms analyze patterns and provide intelligent recommendations for your artistic journey.",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Palette,
      title: "Creative Collaboration",
      description: "Work alongside AI agents that understand artistic vision and help bring your creative ideas to life.",
      color: "from-pink-500 to-red-600"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Connect with fellow artisans and AI agents in a collaborative ecosystem that celebrates creativity.",
      color: "from-green-500 to-teal-600"
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Experience lightning-fast AI responses and seamless integration with your creative workflow.",
      color: "from-yellow-500 to-orange-600"
    }
  ]

  const benefits = [
    {
      icon: Globe,
      title: "Global Reach",
      description: "Showcase your art to a worldwide audience through our intelligent platform."
    },
    {
      icon: Shield,
      title: "Secure & Trusted",
      description: "Your creative work is protected with enterprise-grade security and blockchain verification."
    },
    {
      icon: Lightbulb,
      title: "Innovation Hub",
      description: "Stay ahead with cutting-edge AI tools and techniques that evolve with your creativity."
    }
  ]

  return (
    <div className="py-20 space-y-32">
      {/* Features Section */}
      <section ref={ref1} className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Powerful Features
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Discover the cutting-edge capabilities that make Artelio the future of AI-powered artistry
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-white/70">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={ref2} className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Why Choose Artelio?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Join thousands of artists who have transformed their creative process with AI-powered tools and intelligent collaboration.
            </p>
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-white/70">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView2 ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="w-full h-96 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl border border-white/10 flex items-center justify-center">
              <div className="text-center">
                <Sparkles className="h-16 w-16 text-yellow-400 mx-auto mb-4 animate-pulse" />
                <p className="text-white/80 text-lg">Interactive Demo Coming Soon</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section ref={ref3} className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Our Impact
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Numbers that speak to our commitment to revolutionizing the art world
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: "10K+", label: "Active Artists", icon: Users },
            { number: "50K+", label: "AI Interactions", icon: Brain },
            { number: "99.9%", label: "Uptime", icon: Shield }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 text-center">
                <CardContent className="p-8">
                  <stat.icon className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                  <div className="text-4xl font-bold gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-white/70 text-lg">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ref4} className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-white/20 max-w-4xl mx-auto">
            <CardContent className="p-12">
              <Heart className="h-16 w-16 text-pink-400 mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
                Ready to Transform Your Art?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Join the revolution where artificial intelligence meets folk artistry. 
                Start your journey with Artelio today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-full transition-all duration-300 glow-effect"
                >
                  Get Started Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border border-white/30 text-white hover:bg-white/10 font-semibold rounded-full transition-all duration-300"
                >
                  Learn More
                </motion.button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  )
}

export default AnimatedSections
