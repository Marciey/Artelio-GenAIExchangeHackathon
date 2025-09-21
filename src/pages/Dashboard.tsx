import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts'
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  DollarSign,
  Activity,
  Brain,
  Palette,
  Star,
  Eye,
  Heart
} from 'lucide-react'

const Dashboard = () => {
  // Sample data for charts
  const salesData = [
    { month: 'Jan', sales: 4000, orders: 24 },
    { month: 'Feb', sales: 3000, orders: 13 },
    { month: 'Mar', sales: 5000, orders: 28 },
    { month: 'Apr', sales: 4500, orders: 22 },
    { month: 'May', sales: 6000, orders: 35 },
    { month: 'Jun', sales: 5500, orders: 31 }
  ]

  const aiUsageData = [
    { name: 'Voice Agent', value: 35, color: '#8B5CF6' },
    { name: 'Marketing Agent', value: 25, color: '#F59E0B' },
    { name: 'Learning Agent', value: 20, color: '#10B981' },
    { name: 'Inventory Agent', value: 20, color: '#EF4444' }
  ]

  const performanceData = [
    { time: '00:00', performance: 65 },
    { time: '04:00', performance: 70 },
    { time: '08:00', performance: 85 },
    { time: '12:00', performance: 90 },
    { time: '16:00', performance: 88 },
    { time: '20:00', performance: 75 }
  ]

  const stats = [
    {
      title: "Total Revenue",
      value: "$24,500",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-400",
      bg: "bg-green-600/10"
    },
    {
      title: "Active Users",
      value: "1,234",
      change: "+8.2%",
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-600/10"
    },
    {
      title: "AI Sessions",
      value: "3,456",
      change: "+15.3%",
      icon: Brain,
      color: "text-purple-400",
      bg: "bg-purple-600/10"
    },
    {
      title: "Products Sold",
      value: "892",
      change: "+6.7%",
      icon: ShoppingCart,
      color: "text-orange-400",
      bg: "bg-orange-600/10"
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: "AI Session",
      description: "Voice agent completed product recommendation",
      time: "2 minutes ago",
      icon: Brain,
      color: "bg-purple-500"
    },
    {
      id: 2,
      type: "Sale",
      description: "Handwoven scarf sold to customer",
      time: "15 minutes ago",
      icon: ShoppingCart,
      color: "bg-green-500"
    },
    {
      id: 3,
      type: "Learning",
      description: "New pattern learned from artisan feedback",
      time: "1 hour ago",
      icon: Palette,
      color: "bg-blue-500"
    },
    {
      id: 4,
      type: "Marketing",
      description: "Social media campaign launched",
      time: "2 hours ago",
      icon: TrendingUp,
      color: "bg-orange-500"
    }
  ]

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
          <h1 className="hero-title font-display gradient-text">Dashboard</h1>
          <p className="text-slate-700 mt-2">Welcome back! Here's what's happening with your art business.</p>
        </div>
        <Button className="btn-primary">
          <Activity className="mr-2 h-4 w-4" />
          View Reports
        </Button>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <Card key={index} className="card-elev hover:scale-101 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-strong text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                  <p className={`text-sm ${stat.color} mt-1`}>{stat.change}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color.replace('text-', 'text-')}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="card-elev">
            <CardHeader>
              <CardTitle className="text-slate-900 flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-slate-700" />
                Sales & Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E6E9EE" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #E6E9EE',
                      borderRadius: '8px',
                      color: '#0f172a'
                    }} 
                  />
                  <Bar dataKey="sales" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Usage Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="card-elev">
            <CardHeader>
              <CardTitle className="text-slate-900 flex items-center">
                <Brain className="mr-2 h-5 w-5 text-slate-700" />
                AI Agent Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={aiUsageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {aiUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #E6E9EE',
                      borderRadius: '8px',
                      color: '#0f172a'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="card-elev">
          <CardHeader>
            <CardTitle className="text-slate-900 flex items-center">
              <Activity className="mr-2 h-5 w-5 text-slate-700" />
              System Performance (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E6E9EE" />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #E6E9EE',
                    borderRadius: '8px',
                    color: '#0f172a'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="performance" 
                  stroke="#8B5CF6" 
                  fill="url(#colorGradient)" 
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.12}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activity & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="card-elev">
            <CardHeader>
              <CardTitle className="text-slate-900 flex items-center">
                <Activity className="mr-2 h-5 w-5 text-slate-700" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${activity.color}`}>
                      <activity.icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-900 font-medium">{activity.description}</p>
                      <p className="text-slate-500 text-sm">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="card-elev">
            <CardHeader>
              <CardTitle className="text-slate-900 flex items-center">
                <Star className="mr-2 h-5 w-5 text-slate-700" />
                Top Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Handwoven Silk Scarf", sales: 45, views: 1200, likes: 89 },
                  { name: "Ceramic Pottery Bowl", sales: 32, views: 980, likes: 67 },
                  { name: "Wooden Carved Mask", sales: 28, views: 850, likes: 54 },
                  { name: "Embroidered Cushion", sales: 25, views: 720, likes: 43 }
                ].map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/3 rounded-lg">
                    <div>
                      <p className="text-slate-900 font-medium">{product.name}</p>
                      <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <span className="flex items-center">
                          <ShoppingCart className="h-3 w-3 mr-1 text-slate-500" />
                          {product.sales}
                        </span>
                        <span className="flex items-center">
                          <Eye className="h-3 w-3 mr-1 text-slate-500" />
                          {product.views}
                        </span>
                        <span className="flex items-center">
                          <Heart className="h-3 w-3 mr-1 text-slate-500" />
                          {product.likes}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-green-600 font-semibold">${product.sales * 25}</p>
                      <p className="text-slate-500 text-sm">revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard