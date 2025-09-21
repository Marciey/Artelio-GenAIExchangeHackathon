import { motion } from 'framer-motion'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { ShoppingCart, Heart, Star } from 'lucide-react'

const ArtisanProducts = () => {
  // Sample product data - in real app, this would come from API
  const products = [
    {
      id: 1,
      title: "Handwoven Silk Scarf",
      price: 45,
      image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=400&fit=crop",
      artisan: "Priya Sharma",
      rating: 4.8,
      category: "Textiles"
    },
    {
      id: 2,
      title: "Ceramic Pottery Bowl",
      price: 32,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      artisan: "Rajesh Kumar",
      rating: 4.9,
      category: "Pottery"
    },
    {
      id: 3,
      title: "Wooden Carved Mask",
      price: 78,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      artisan: "Maria Santos",
      rating: 4.7,
      category: "Woodwork"
    },
    {
      id: 4,
      title: "Embroidered Cushion",
      price: 28,
      image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=400&fit=crop",
      artisan: "Fatima Al-Zahra",
      rating: 4.6,
      category: "Textiles"
    },
    {
      id: 5,
      title: "Hand-painted Vase",
      price: 55,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      artisan: "Chen Wei",
      rating: 4.9,
      category: "Pottery"
    },
    {
      id: 6,
      title: "Beaded Jewelry Set",
      price: 65,
      image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=400&fit=crop",
      artisan: "Aisha Johnson",
      rating: 4.8,
      category: "Jewelry"
    }
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Artisan Creations
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Discover unique handcrafted pieces from talented artisans around the world, 
            enhanced by AI-powered recommendations and insights.
          </p>
        </motion.div>

        {/* First Row - Moving Right */}
        <div className="mb-12">
          <motion.div
            initial={{ x: -100 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex space-x-6 overflow-hidden"
          >
            <motion.div
              animate={{ x: [0, -100] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="flex space-x-6"
            >
              {[...products, ...products].map((product, index) => (
                <motion.div
                  key={`row1-${index}`}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <Card className="w-80 bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-64 object-cover rounded-t-lg"
                        />
                        <div className="absolute top-4 right-4">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="w-10 h-10 bg-black/50 hover:bg-black/70 text-white"
                          >
                            <Heart className="h-5 w-5" />
                          </Button>
                        </div>
                        <div className="absolute top-4 left-4">
                          <span className="bg-purple-600/80 text-white px-2 py-1 rounded-full text-xs font-medium">
                            {product.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-white">
                            {product.title}
                          </h3>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-white/80 text-sm">{product.rating}</span>
                          </div>
                        </div>
                        
                        <p className="text-white/60 text-sm mb-4">
                          by {product.artisan}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold gradient-text">
                            ${product.price}
                          </span>
                          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Buy
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Second Row - Moving Left */}
        <div>
          <motion.div
            initial={{ x: 100 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex space-x-6 overflow-hidden"
          >
            <motion.div
              animate={{ x: [-100, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="flex space-x-6"
            >
              {[...products.slice().reverse(), ...products.slice().reverse()].map((product, index) => (
                <motion.div
                  key={`row2-${index}`}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <Card className="w-80 bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-64 object-cover rounded-t-lg"
                        />
                        <div className="absolute top-4 right-4">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="w-10 h-10 bg-black/50 hover:bg-black/70 text-white"
                          >
                            <Heart className="h-5 w-5" />
                          </Button>
                        </div>
                        <div className="absolute top-4 left-4">
                          <span className="bg-green-600/80 text-white px-2 py-1 rounded-full text-xs font-medium">
                            {product.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-white">
                            {product.title}
                          </h3>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-white/80 text-sm">{product.rating}</span>
                          </div>
                        </div>
                        
                        <p className="text-white/60 text-sm mb-4">
                          by {product.artisan}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold gradient-text">
                            ${product.price}
                          </span>
                          <Button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700">
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Buy
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button 
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full glow-effect"
          >
            View All Products
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default ArtisanProducts
