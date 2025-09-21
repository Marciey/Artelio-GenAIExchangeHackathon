import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Progress } from '../components/ui/progress'
import * as d3 from 'd3'
import { 
  Play, 
  RotateCcw, 
  Brain, 
  Mic, 
  ShoppingCart, 
  TrendingUp,
  BookOpen,
  CheckCircle,
  Clock,
  AlertCircle,
  Activity
} from 'lucide-react'

interface AgentNode {
  id: string
  name: string
  type: string
  status: 'pending' | 'active' | 'completed' | 'error'
  x?: number
  y?: number
  icon: any
  color: string
}

interface WorkflowStep {
  id: string
  agent: string
  status: 'pending' | 'active' | 'completed' | 'error'
  timestamp: string
  details: string
  duration?: number
}

const AgentWorkflow = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [, setCurrentStep] = useState(0)
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([
    {
      id: '1',
      agent: 'Voice Agent',
      status: 'completed',
      timestamp: '2024-01-15 10:00:00',
      details: 'Captured product details from user voice input',
      duration: 2.3
    },
    {
      id: '2',
      agent: 'Inventory Agent',
      status: 'completed',
      timestamp: '2024-01-15 10:00:02',
      details: 'Checked product availability and pricing',
      duration: 1.8
    },
    {
      id: '3',
      agent: 'Marketing Agent',
      status: 'active',
      timestamp: '2024-01-15 10:00:04',
      details: 'Generating personalized marketing content',
      duration: 0
    },
    {
      id: '4',
      agent: 'Learning Agent',
      status: 'pending',
      timestamp: '',
      details: 'Will analyze user preferences and update recommendations',
      duration: 0
    }
  ])

  const agents: AgentNode[] = [
    {
      id: 'voice',
      name: 'Voice Agent',
      type: 'input',
      status: 'completed',
      icon: Mic,
      color: '#8B5CF6'
    },
    {
      id: 'inventory',
      name: 'Inventory Agent',
      type: 'processing',
      status: 'completed',
      icon: ShoppingCart,
      color: '#F59E0B'
    },
    {
      id: 'marketing',
      name: 'Marketing Agent',
      type: 'processing',
      status: 'active',
      icon: TrendingUp,
      color: '#10B981'
    },
    {
      id: 'learning',
      name: 'Learning Agent',
      type: 'output',
      status: 'pending',
      icon: BookOpen,
      color: '#EF4444'
    }
  ]

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const width = 800
    const height = 400
    const margin = { top: 50, right: 50, bottom: 50, left: 50 }

    svg.attr('width', width).attr('height', height)

    // Create nodes
    const nodes = agents.map((agent, index) => ({
      ...agent,
      x: margin.left + (index * (width - margin.left - margin.right) / (agents.length - 1)),
      y: height / 2
    }))

    // Create links
    const links = nodes.slice(0, -1).map((node, index) => ({
      source: node,
      target: nodes[index + 1]
    }))

    // Draw links
    svg.selectAll('.link')
      .data(links)
      .enter()
      .append('line')
      .attr('class', 'link')
      .attr('x1', d => d.source.x!)
      .attr('y1', d => d.source.y!)
      .attr('x2', d => d.target.x!)
      .attr('y2', d => d.target.y!)
      .attr('stroke', '#374151')
      .attr('stroke-width', 3)
      .attr('stroke-dasharray', '5,5')

    // Draw nodes
    const nodeGroups = svg.selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x}, ${d.y})`)

    // Add circles
    nodeGroups.append('circle')
      .attr('r', 40)
      .attr('fill', d => {
        switch (d.status) {
          case 'completed': return d.color
          case 'active': return d.color
          case 'pending': return '#374151'
          case 'error': return '#EF4444'
          default: return '#374151'
        }
      })
      .attr('stroke', '#FFFFFF')
      .attr('stroke-width', 3)
      .attr('opacity', d => d.status === 'pending' ? 0.5 : 1)

    // Add icons
    nodeGroups.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('fill', 'white')
      .attr('font-size', '20px')
      .html(d => {
        const iconMap: { [key: string]: string } = {
          'Mic': '🎤',
          'ShoppingCart': '🛒',
          'TrendingUp': '📈',
          'BookOpen': '📚'
        }
        return iconMap[d.icon.name] || '🤖'
      })

    // Add labels
    nodeGroups.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '60px')
      .attr('fill', 'white')
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .text(d => d.name)

    // Add status indicators
    nodeGroups.append('circle')
      .attr('r', 8)
      .attr('cx', 30)
      .attr('cy', -30)
      .attr('fill', d => {
        switch (d.status) {
          case 'completed': return '#10B981'
          case 'active': return '#F59E0B'
          case 'pending': return '#6B7280'
          case 'error': return '#EF4444'
          default: return '#6B7280'
        }
      })

  }, [agents])

  const handleStartWorkflow = () => {
    setIsRunning(true)
    // Simulate workflow progression
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= workflowSteps.length - 1) {
          setIsRunning(false)
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 2000)
  }

  const handleResetWorkflow = () => {
    setIsRunning(false)
    setCurrentStep(0)
    setWorkflowSteps(prev => prev.map(step => ({ ...step, status: 'pending' as const })))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-400" />
      case 'active': return <Clock className="h-5 w-5 text-yellow-400 animate-spin" />
      case 'error': return <AlertCircle className="h-5 w-5 text-red-400" />
      default: return <Clock className="h-5 w-5 text-gray-400" />
    }
  }

  return (
    <div className="min-h-screen p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-4xl font-bold gradient-text">Agent Workflow</h1>
          <p className="text-white/70 mt-2">Monitor and control your AI agents in real-time</p>
        </div>
        <div className="flex space-x-4">
          <Button
            onClick={handleStartWorkflow}
            disabled={isRunning}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            <Play className="mr-2 h-4 w-4" />
            {isRunning ? 'Running...' : 'Start Workflow'}
          </Button>
          <Button
            onClick={handleResetWorkflow}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </motion.div>

      {/* Workflow Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Brain className="mr-2 h-5 w-5" />
              AI Agent Flow Visualization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <svg ref={svgRef} className="w-full max-w-4xl" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Workflow Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              Workflow Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workflowSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`p-4 rounded-lg border transition-all duration-300 ${
                    step.status === 'completed' 
                      ? 'bg-green-500/10 border-green-500/30' 
                      : step.status === 'active'
                      ? 'bg-yellow-500/10 border-yellow-500/30'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(step.status)}
                      <div>
                        <h3 className="text-white font-semibold">{step.agent}</h3>
                        <p className="text-white/70 text-sm">{step.details}</p>
                        {step.timestamp && (
                          <p className="text-white/50 text-xs mt-1">{step.timestamp}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      {step.duration ? (
                        <p className="text-white/70 text-sm">{step.duration}s</p>
                      ) : step.status === 'active' ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                          <span className="text-yellow-400 text-sm">Processing...</span>
                        </div>
                      ) : (
                        <p className="text-white/50 text-sm">Pending</p>
                      )}
                    </div>
                  </div>
                  {step.status === 'active' && (
                    <div className="mt-3">
                      <Progress value={33} className="h-2" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Agent Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {agents.map((agent) => (
          <Card key={agent.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                agent.status === 'completed' 
                  ? 'bg-green-500/20' 
                  : agent.status === 'active'
                  ? 'bg-yellow-500/20'
                  : 'bg-gray-500/20'
              }`}>
                <agent.icon className={`h-8 w-8 ${
                  agent.status === 'completed' 
                    ? 'text-green-400' 
                    : agent.status === 'active'
                    ? 'text-yellow-400'
                    : 'text-gray-400'
                }`} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{agent.name}</h3>
              <p className="text-white/70 text-sm mb-4 capitalize">{agent.type} Agent</p>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                agent.status === 'completed' 
                  ? 'bg-green-500/20 text-green-400' 
                  : agent.status === 'active'
                  ? 'bg-yellow-500/20 text-yellow-400'
                  : 'bg-gray-500/20 text-gray-400'
              }`}>
                {agent.status}
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </div>
  )
}

export default AgentWorkflow
