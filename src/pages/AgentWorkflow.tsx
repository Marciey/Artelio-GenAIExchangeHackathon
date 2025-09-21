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
    { id: 'voice', name: 'Voice Agent', type: 'input', status: 'completed', icon: Mic, color: '#8B5CF6' },
    { id: 'inventory', name: 'Inventory Agent', type: 'processing', status: 'completed', icon: ShoppingCart, color: '#F59E0B' },
    { id: 'marketing', name: 'Marketing Agent', type: 'processing', status: 'active', icon: TrendingUp, color: '#10B981' },
    { id: 'learning', name: 'Learning Agent', type: 'output', status: 'pending', icon: BookOpen, color: '#EF4444' }
  ]

  useEffect(() => {
    if (!svgRef.current) return
    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const width = 800
    const height = 400
    const margin = { top: 50, right: 50, bottom: 50, left: 50 }

    svg.attr('width', width).attr('height', height)

    const nodes = agents.map((agent, index) => ({
      ...agent,
      x: margin.left + (index * (width - margin.left - margin.right) / (agents.length - 1)),
      y: height / 2
    }))

    const links = nodes.slice(0, -1).map((node, index) => ({
      source: node,
      target: nodes[index + 1]
    }))

    svg.selectAll('.link')
      .data(links)
      .enter()
      .append('line')
      .attr('class', 'link')
      .attr('x1', d => d.source.x!)
      .attr('y1', d => d.source.y!)
      .attr('x2', d => d.target.x!)
      .attr('y2', d => d.target.y!)
      .attr('stroke', '#CBD5E1')
      .attr('stroke-width', 3)
      .attr('stroke-dasharray', '5,5')

    const nodeGroups = svg.selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x}, ${d.y})`)

    nodeGroups.append('circle')
      .attr('r', 40)
      .attr('fill', d => d.status === 'pending' ? '#E2E8F0' : d.color)
      .attr('stroke', '#fff')
      .attr('stroke-width', 3)
      .attr('opacity', d => d.status === 'pending' ? 0.5 : 1)

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

    nodeGroups.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '60px')
      .attr('fill', '#1E293B')
      .attr('font-size', '14px')
      .attr('font-weight', '600')
      .text(d => d.name)

    nodeGroups.append('circle')
      .attr('r', 8)
      .attr('cx', 30)
      .attr('cy', -30)
      .attr('fill', d => {
        switch (d.status) {
          case 'completed': return '#10B981'
          case 'active': return '#F59E0B'
          case 'pending': return '#94A3B8'
          case 'error': return '#EF4444'
          default: return '#94A3B8'
        }
      })
  }, [agents])

  const handleStartWorkflow = () => {
    setIsRunning(true)
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
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'active': return <Clock className="h-5 w-5 text-yellow-500 animate-spin" />
      case 'error': return <AlertCircle className="h-5 w-5 text-red-500" />
      default: return <Clock className="h-5 w-5 text-slate-400" />
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
          <h1 className="hero-title gradient-text">Agent Workflow</h1>
          <p className="text-muted-strong mt-2">Monitor and control your AI agents in real-time</p>
        </div>
        <div className="flex space-x-4">
          <Button onClick={handleStartWorkflow} disabled={isRunning} className="btn-primary">
            <Play className="mr-2 h-4 w-4" />
            {isRunning ? 'Running...' : 'Start Workflow'}
          </Button>
          <Button onClick={handleResetWorkflow} variant="outline" className="btn-secondary">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </motion.div>

      {/* Workflow Visualization */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
        <Card className="card-elev">
          <CardHeader>
            <CardTitle className="text-slate-900 flex items-center">
              <Brain className="mr-2 h-5 w-5 text-slate-700" />
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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
        <Card className="card-elev">
          <CardHeader>
            <CardTitle className="text-slate-900 flex items-center">
              <Activity className="mr-2 h-5 w-5 text-slate-700" />
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
                      ? 'bg-green-100 border-green-300'
                      : step.status === 'active'
                      ? 'bg-yellow-100 border-yellow-300'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(step.status)}
                      <div>
                        <h3 className="text-slate-900 font-semibold">{step.agent}</h3>
                        <p className="text-slate-600 text-sm">{step.details}</p>
                        {step.timestamp && <p className="text-slate-400 text-xs mt-1">{step.timestamp}</p>}
                      </div>
                    </div>
                    <div className="text-right">
                      {step.duration ? (
                        <p className="text-slate-600 text-sm">{step.duration}s</p>
                      ) : step.status === 'active' ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                          <span className="text-yellow-600 text-sm">Processing...</span>
                        </div>
                      ) : (
                        <p className="text-slate-400 text-sm">Pending</p>
                      )}
                    </div>
                  </div>
                  {step.status === 'active' && <div className="mt-3"><Progress value={33} className="h-2" /></div>}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Agent Details */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {agents.map((agent) => (
          <Card key={agent.id} className="card-elev hover:scale-102 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                agent.status === 'completed'
                  ? 'bg-green-100'
                  : agent.status === 'active'
                  ? 'bg-yellow-100'
                  : 'bg-slate-100'
              }`}>
                <agent.icon className={`h-8 w-8 ${
                  agent.status === 'completed'
                    ? 'text-green-600'
                    : agent.status === 'active'
                    ? 'text-yellow-600'
                    : 'text-slate-400'
                }`} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{agent.name}</h3>
              <p className="text-slate-500 text-sm mb-4 capitalize">{agent.type} Agent</p>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                agent.status === 'completed'
                  ? 'bg-green-100 text-green-700'
                  : agent.status === 'active'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-slate-100 text-slate-500'
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
