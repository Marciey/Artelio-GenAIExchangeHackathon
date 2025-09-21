import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import AgentWorkflow from './pages/AgentWorkflow'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/agent-workflow" element={<AgentWorkflow />} />
      </Routes>
    </Layout>
  )
}

export default App
