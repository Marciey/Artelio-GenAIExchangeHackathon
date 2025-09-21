import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from './ui/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu'
import { Menu, Crown, Palette } from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation()

  return (
    <div className="min-h-screen starry-bg">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="relative">
                <Crown className="h-6 w-6 text-yellow-400" />
                <Palette className="h-4 w-4 text-orange-500 absolute -bottom-1 -right-1" />
              </div>
              <span className="text-xl font-bold gradient-text">Artelio</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className={`text-sm font-medium transition-colors hover:text-yellow-400 ${
                  location.pathname === '/' ? 'text-yellow-400' : 'text-white/80'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-sm font-medium text-white/80 transition-colors hover:text-yellow-400"
              >
                About Us
              </Link>
              
              {/* More Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white/80 hover:text-yellow-400">
                    More <Menu className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-black/90 border-white/20">
                  <DropdownMenuItem className="text-white hover:bg-white/10">
                    <Link to="/gallery" className="w-full">Gallery</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-white/10">
                    <Link to="/artisans" className="w-full">Artisans</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-white/10">
                    <Link to="/contact" className="w-full">Contact</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-white/10">
                    <Link to="/help" className="w-full">Help & Support</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white">
                    <Menu className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-black/90 border-white/20">
                  <DropdownMenuItem className="text-white hover:bg-white/10">
                    <Link to="/" className="w-full">Home</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-white/10">
                    <Link to="/about" className="w-full">About Us</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-white/10">
                    <Link to="/gallery" className="w-full">Gallery</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-white/10">
                    <Link to="/artisans" className="w-full">Artisans</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-white/10">
                    <Link to="/contact" className="w-full">Contact</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>
    </div>
  )
}

export default Layout
