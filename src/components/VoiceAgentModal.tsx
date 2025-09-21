import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Mic, MicOff, Trash2, Play } from 'lucide-react'

const VoiceAgentModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleVoiceToggle = () => {
    setIsListening(!isListening)
    // integrate with voice recognition API here
  }

  const handleDemoVoice = () => {
    setIsPlaying(!isPlaying)
    // play demo voice response here
  }

  const handleClear = () => {
    // Clear conversation history
  }

  return (
    <>
      {/* Floating Voice Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative"
      >
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-2xl glow-effect"
        >
          <Mic className="h-8 w-8 text-white" />
        </Button>

        {/* Pulse animation (subtle) */}
        <motion.div
          className="absolute inset-0 rounded-full bg-purple-400/20"
          animate={{ scale: [1, 1.15, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Voice Agent Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {/* Keep the dialog visually dark for focus — text inside stays white */}
        <DialogContent className="max-w-md bg-black/90 border-white/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold gradient-text">
              Voice Agent
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Main Voice Button */}
            <div className="flex justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleVoiceToggle}
                  size="lg"
                  className={`w-24 h-24 rounded-full ${
                    isListening
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                  } shadow-2xl`}
                >
                  {isListening ? (
                    <MicOff className="h-10 w-10 text-white" />
                  ) : (
                    <Mic className="h-10 w-10 text-white" />
                  )}
                </Button>
              </motion.div>
            </div>

            {/* Status Text - keep white because the dialog background is dark */}
            <p className="text-center text-white/80">
              {isListening ? 'Listening...' : 'Click to speak with your agents'}
            </p>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <Button
                onClick={handleDemoVoice}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Play className="mr-2 h-4 w-4" />
                Demo Voice
              </Button>

              <Button
                onClick={handleClear}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear
              </Button>
            </div>

            {/* Conversation Preview - card inside dialog is dark, keep white text */}
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2" />
                    <p className="text-sm text-white/80">
                      "Hello! I'm your AI assistant. How can I help you today?"
                    </p>
                  </div>

                  {isListening && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start space-x-2"
                    >
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                      <p className="text-sm text-white/80">Listening for your input...</p>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default VoiceAgentModal