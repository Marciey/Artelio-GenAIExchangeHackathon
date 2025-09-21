import { useInView } from "framer-motion"
import { useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import {
  Sparkles,
  Brain,
  Palette,
  Users,
  Zap,
  Heart,
  Globe,
  Shield,
  Lightbulb,
} from "lucide-react"

const AnimatedSections = () => {
  const ref1 = useRef<HTMLDivElement | null>(null)
  const ref2 = useRef<HTMLDivElement | null>(null)
  const ref3 = useRef<HTMLDivElement | null>(null)
  const ref4 = useRef<HTMLDivElement | null>(null)

  const isInView1 = useInView(ref1, { once: true, margin: "-100px" })
  const isInView2 = useInView(ref2, { once: true, margin: "-100px" })
  const isInView3 = useInView(ref3, { once: true, margin: "-100px" })
  const isInView4 = useInView(ref4, { once: true, margin: "-100px" })

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description:
        "Advanced machine learning analyzes patterns and provides actionable recommendations for your craft business.",
      color: "from-blue-500 to-purple-600",
    },
    {
      icon: Palette,
      title: "Creative Collaboration",
      description:
        "Work alongside AI agents that understand artistic intent and help bring ideas to life.",
      color: "from-pink-500 to-red-600",
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "Join a community of artisans and share knowledge while AI helps amplify your voice.",
      color: "from-green-500 to-teal-600",
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description:
        "Lightning-fast AI responses and smooth integration with your workflow — no waiting.",
      color: "from-yellow-500 to-orange-600",
    },
  ]

  const benefits = [
    {
      icon: Globe,
      title: "Global Reach",
      description: "Showcase your art to a worldwide audience with localized content.",
    },
    {
      icon: Shield,
      title: "Secure & Trusted",
      description: "Your work is protected with best-practice security and reliable uptime.",
    },
    {
      icon: Lightbulb,
      title: "Innovation Hub",
      description:
        "Access evolving AI tools and techniques that help you grow creatively and commercially.",
    },
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
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6 hero-title">
            Powerful Features
          </h2>
          <p className="text-lg text-slate-700 max-w-3xl mx-auto">
            Discover the capabilities that make Artelio the future of AI-powered
            artistry.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={
                isInView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
              }
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              <Card className="h-full">
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center icon-circle`}
                    aria-hidden
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600">{feature.description}</p>
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
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6 hero-title">
              Why Choose Artelio?
            </h2>
            <p className="text-lg text-slate-700 mb-8">
              Join artisans who transformed their creative process with AI and
              community support.
            </p>
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={
                    isInView2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
                  }
                  transition={{ duration: 0.6, delay: index * 0.12 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0 icon-circle">
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-600">{benefit.description}</p>
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
            <div className="w-full h-96 bg-gradient-to-br from-purple-100 to-pink-50 rounded-2xl border border-slate-100 flex items-center justify-center">
              <div className="text-center">
                <Sparkles className="h-16 w-16 text-yellow-400 mx-auto mb-4 animate-pulse" />
                <p className="text-slate-700 text-lg">Interactive Demo Coming Soon</p>
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
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6 hero-title">
            Our Impact
          </h2>
          <p className="text-lg text-slate-700 max-w-3xl mx-auto">
            Numbers that show our commitment to helping artisans thrive.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: "10K+", label: "Active Artists", icon: Users },
            { number: "50K+", label: "AI Interactions", icon: Brain },
            { number: "99.9%", label: "Uptime", icon: Shield },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.8, delay: index * 0.12 }}
            >
              <Card className="text-center">
                <CardContent className="p-8">
                  <stat.icon className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                  <div className="text-4xl font-bold gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-slate-700 text-lg">{stat.label}</div>
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
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-12 text-center">
              <Heart className="h-16 w-16 text-pink-400 mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6 hero-title">
                Ready to Transform Your Art?
              </h2>
              <p className="text-lg text-slate-700 mb-8 max-w-2xl mx-auto">
                Join the revolution where AI meets folk artistry — start your
                journey with Artelio today.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" className="btn-touch">
                  Get Started Now
                </Button>

                <Button variant="secondary" className="btn-touch">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  )
}

export default AnimatedSections