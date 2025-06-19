"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import {
  Instagram,
  Send,
  Phone,
  Mail,
  MapPin,
  Play,
  Pause,
  Star,
  Shield,
  Truck,
  CreditCard,
  Wallet,
} from "lucide-react"
import Image from "next/image"
import dynamic from "next/dynamic"
import { ErrorBoundary } from "@/components/error-boundary"

// Dynamically import Canvas Scene to avoid SSR issues
const CanvasScene = dynamic(() => import("@/components/canvas-scene").then((mod) => ({ default: mod.CanvasScene })), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] flex items-center justify-center bg-gradient-to-br from-amber-100 to-orange-200 rounded-lg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-800 mx-auto mb-4"></div>
        <p className="text-amber-800 font-medium">Loading 3D Model...</p>
      </div>
    </div>
  ),
})

// Product type definition
interface Product {
  id: number
  name: string
  price: string
  image: string
  description: string
  features: string[]
  materials: string
  dimensions: string
  rating: number
  reviews: number
}

// Product Modal Component
function ProductModal({ product, isOpen, onClose }: { product: Product | null; isOpen: boolean; onClose: () => void }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedPayment, setSelectedPayment] = useState("card")

  if (!product) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-amber-900">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
              </div>
              <p className="text-3xl font-bold text-orange-700 mb-4">{product.price}</p>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-amber-900 mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-amber-900">Materials:</span>
                <p className="text-gray-600">{product.materials}</p>
              </div>
              <div>
                <span className="font-medium text-amber-900">Dimensions:</span>
                <p className="text-gray-600">{product.dimensions}</p>
              </div>
            </div>

            <Separator />

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="font-medium text-amber-900">Quantity:</label>
                <div className="flex items-center border border-amber-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 hover:bg-amber-50"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-x border-amber-200">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1 hover:bg-amber-50">
                    +
                  </button>
                </div>
              </div>

              {/* Payment Options */}
              <div className="space-y-3">
                <h3 className="font-medium text-amber-900">Payment Method</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedPayment("card")}
                    className={`flex items-center gap-2 p-3 border rounded-lg transition-colors ${
                      selectedPayment === "card"
                        ? "border-amber-500 bg-amber-50"
                        : "border-gray-200 hover:border-amber-300"
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span className="text-sm font-medium">Credit Card</span>
                  </button>
                  <button
                    onClick={() => setSelectedPayment("paypal")}
                    className={`flex items-center gap-2 p-3 border rounded-lg transition-colors ${
                      selectedPayment === "paypal"
                        ? "border-amber-500 bg-amber-50"
                        : "border-gray-200 hover:border-amber-300"
                    }`}
                  >
                    <Wallet className="w-5 h-5" />
                    <span className="text-sm font-medium">PayPal</span>
                  </button>
                </div>
              </div>

              {/* Payment Form */}
              {selectedPayment === "card" && (
                <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              <Button className="w-full bg-amber-800 hover:bg-amber-900 text-white py-3 text-lg">
                Add to Cart - {product.price}
              </Button>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-6 pt-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-1">
                  <Truck className="w-4 h-4" />
                  <span>Free Shipping</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Hero Section with 3D
function HeroSection({ scrollToCollection }: { scrollToCollection: () => void }) {
  return (
    <section className="relative h-screen bg-gradient-to-br from-amber-50 to-orange-100 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-5"></div>

      <div className="container mx-auto px-4 h-full flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Premium Leather Goods</Badge>

            <h1 className="text-5xl lg:text-7xl font-bold text-amber-900 leading-tight">
              Craftsmanship
              <span className="block text-orange-700">in every</span>
              <span className="block text-amber-800">detail</span>
            </h1>

            <p className="text-xl text-amber-700 max-w-lg leading-relaxed">
              We create unique leather accessories that combine traditional craftsmanship with modern design. Each
              product is a story of quality and style.
            </p>

            <div className="flex gap-4">
              <Button
                size="lg"
                className="bg-amber-800 hover:bg-amber-900 text-white px-8 py-4 text-lg"
                onClick={scrollToCollection}
              >
                View Collection
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-amber-800 text-amber-800 hover:bg-amber-50 px-8 py-4 text-lg"
              >
                Contact Us
              </Button>
            </div>
          </motion.div>

          {/* 3D Model */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-[600px] relative"
          >
            <ErrorBoundary>
              <CanvasScene />
            </ErrorBoundary>
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
              <p className="text-sm text-amber-800 font-medium">Rotate to view</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Video Section
function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <section className="py-20 bg-amber-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Crafting Process</h2>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto">
            Watch how our masterpieces are born - from leather selection to final finishing
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl"
        >
          <div className="relative aspect-video bg-gradient-to-br from-amber-800 to-orange-900">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              poster="/images/crafting-process.jpg"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              controls={false}
            >
              <source src="/videos/crafting-process.mp4" type="video/mp4" />
              Your browser does not support video playback.
            </video>

            {!isPlaying && (
              <div
                className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer"
                onClick={toggleVideo}
              >
                <Button
                  size="lg"
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/50 text-white rounded-full w-20 h-20 pointer-events-none"
                >
                  <Play className="w-8 h-8 ml-1" />
                </Button>
              </div>
            )}

            {isPlaying && (
              <div className="absolute top-4 right-4">
                <Button
                  size="sm"
                  onClick={toggleVideo}
                  className="bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white rounded-full p-2"
                >
                  <Pause className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
            <p className="text-sm text-amber-800 font-medium">Mastery in every movement</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Products Gallery
function ProductsGallery({ collectionRef }: { collectionRef: React.RefObject<HTMLElement> }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const products: Product[] = [
    {
      id: 1,
      name: "Classic Bag",
      price: "$65",
      image: "/images/classic-bag.jpg",
      description:
        "A timeless classic that combines elegance with functionality. Handcrafted from premium full-grain leather, this bag features a sophisticated design perfect for both professional and casual settings.",
      features: [
        "Premium full-grain leather construction",
        "Hand-stitched seams for durability",
        "Multiple interior compartments",
        "Adjustable shoulder strap",
        "Antique brass hardware",
      ],
      materials: "Full-grain leather, cotton lining",
      dimensions: '12" x 8" x 4"',
      rating: 5,
      reviews: 127,
    },
    {
      id: 2,
      name: "Business Briefcase",
      price: "$85",
      image: "/images/business-briefcase.jpg",
      description:
        "Professional briefcase designed for the modern executive. Features a sleek minimalist design with ample storage for laptops, documents, and business essentials.",
      features: [
        'Laptop compartment (fits up to 15")',
        "Document organizer sections",
        "Reinforced corners and edges",
        "Comfortable padded handles",
        "Professional appearance",
      ],
      materials: "Top-grain leather, nylon lining",
      dimensions: '16" x 12" x 3"',
      rating: 5,
      reviews: 89,
    },
    {
      id: 3,
      name: "Compact Wallet",
      price: "$22",
      image: "/images/compact-wallet.jpg",
      description:
        "Sleek and compact wallet with crocodile texture finish. Perfect for those who prefer minimalist carry while maintaining style and functionality.",
      features: [
        "RFID blocking technology",
        "6 card slots",
        "Bill compartment",
        "Coin pocket with snap closure",
        "Crocodile embossed leather",
      ],
      materials: "Embossed leather, RFID blocking material",
      dimensions: '4.5" x 3.5" x 0.5"',
      rating: 4,
      reviews: 203,
    },
    {
      id: 4,
      name: "Travel Bag",
      price: "$110",
      image: "/images/travel-bag.jpg",
      description:
        "Spacious travel companion crafted for the discerning traveler. Features multiple compartments and accessories to keep your belongings organized during any journey.",
      features: [
        "Large main compartment",
        "Separate shoe compartment",
        "Toiletry organizer included",
        "Reinforced handles and straps",
        "Water-resistant treatment",
      ],
      materials: "Vegetable-tanned leather, canvas lining",
      dimensions: '20" x 12" x 8"',
      rating: 5,
      reviews: 156,
    },
    {
      id: 5,
      name: "Premium Clutch",
      price: "$48",
      image: "/images/clutch-premium.jpg",
      description:
        "Sophisticated organizer clutch with multiple compartments for cards, documents, and essentials. Perfect for business meetings or evening events.",
      features: [
        "Multiple card slots",
        "Document compartments",
        "Pen holder",
        "Zippered coin pocket",
        "Premium leather construction",
      ],
      materials: "Italian leather, suede lining",
      dimensions: '8" x 5" x 1"',
      rating: 5,
      reviews: 94,
    },
    {
      id: 6,
      name: "Urban Backpack",
      price: "$78",
      image: "/images/urban-backpack.jpg",
      description:
        "Modern urban backpack with clean lines and practical design. Ideal for daily commute, work, or casual outings with laptop protection and organized storage.",
      features: [
        "Padded laptop compartment",
        "Multiple interior pockets",
        "Adjustable padded straps",
        "Top handle for versatility",
        "Minimalist design",
      ],
      materials: "Saffiano leather, polyester lining",
      dimensions: '15" x 11" x 6"',
      rating: 4,
      reviews: 178,
    },
  ]

  const handleLearnMore = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  return (
    <section ref={collectionRef} className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-amber-900 mb-6">Our Collection</h2>
          <p className="text-xl text-amber-700 max-w-2xl mx-auto">
            Each product is created with attention to detail and using the finest materials
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">({product.reviews})</span>
                  </div>
                  <h3 className="text-xl font-semibold text-amber-900 mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold text-orange-700 mb-4">{product.price}</p>
                  <Button
                    className="w-full bg-amber-800 hover:bg-amber-900 text-white"
                    onClick={() => handleLearnMore(product)}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <ProductModal product={selectedProduct} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}

// About Section
function AboutSection() {
  return (
    <section className="py-20 bg-amber-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-8">About Our Brand</h2>
            <div className="space-y-6 text-lg text-amber-100">
              <p>
                We are a team of craftsmen who have dedicated their lives to creating unique leather goods. Our story
                began with a simple idea: to create items that will serve for years and become part of your style.
              </p>
              <p>
                Each product undergoes careful material selection, hand processing and quality control. We use only the
                highest quality natural leather and traditional manufacturing techniques.
              </p>
              <p>
                Our mission is to preserve the traditions of leather craftsmanship and adapt them to modern needs,
                creating products that combine functionality and beauty.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <Image
                src="/images/about-craftsman-1.jpg"
                alt="Master at work"
                width={300}
                height={300}
                className="rounded-lg shadow-lg"
              />
              <Image
                src="/images/about-craftsman-2.jpg"
                alt="Premium leather"
                width={300}
                height={300}
                className="rounded-lg shadow-lg mt-8"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Contact Section
function ContactSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-amber-900 mb-6">Contact Us</h2>
          <p className="text-xl text-amber-700 max-w-2xl mx-auto">
            Ready to create something special? Write to us and we will bring your ideas to life
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-amber-800 p-3 rounded-full">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-amber-900">Phone</h3>
                <p className="text-amber-700">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-amber-800 p-3 rounded-full">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-amber-900">Email</h3>
                <p className="text-amber-700">info@leatherbrand.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-amber-800 p-3 rounded-full">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-amber-900">Address</h3>
                <p className="text-amber-700">123 Craftsman Street, New York, NY 10001</p>
              </div>
            </div>

            <div className="pt-8">
              <h3 className="text-lg font-semibold text-amber-900 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full p-4"
                >
                  <Instagram className="w-6 h-6" />
                </Button>
                <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4">
                  <Send className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 shadow-xl border-0 bg-white">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-2">Message</label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <Button className="w-full bg-amber-800 hover:bg-amber-900 text-white py-3 text-lg">Send Message</Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Main Page Component
export default function LeatherBrandWebsite() {
  const collectionRef = useRef<HTMLElement>(null)

  const scrollToCollection = () => {
    collectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  return (
    <div className="min-h-screen">
      <HeroSection scrollToCollection={scrollToCollection} />
      <VideoSection />
      <ProductsGallery collectionRef={collectionRef} />
      <AboutSection />
      <ContactSection />
    </div>
  )
}
