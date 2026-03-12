"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Facebook, Instagram, Linkedin, Moon, Send, Sun, Twitter } from "lucide-react"
import { Link } from "react-router-dom"

const Footer = () => {
  const [isDarkMode] = React.useState(true)

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  return (
    <footer className="relative border-t border-gray-800 bg-[#081C15] text-white transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8 max-w-7xl">
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-5">

          <div className="relative lg:col-span-2">
            <h2 className="mb-4 text-3xl font-[Telegraf_Bold,var(--font-sans)] font-bold tracking-tight">Stay Connected</h2>
            <p className="mb-6 text-gray-400">
              Join our newsletter for the latest updates and exclusive offers.
            </p>
            <form className="relative max-w-sm">
              <Input
                type="email"
                placeholder="Enter your email"
                className="pr-12 backdrop-blur-sm bg-[#0a231a] border-gray-800 text-white placeholder:text-gray-500 rounded-lg focus-visible:ring-[#16a34a]"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-[#16a34a] text-[#081C15] transition-transform hover:scale-105 hover:bg-[#92d02e]"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-[#16a34a]/5 blur-2xl" />
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-300">Quick Links</h3>
            <nav className="space-y-3 text-sm">
              <Link to="/" className="block text-gray-400 transition-colors hover:text-[#16a34a]">
                Home
              </Link>
              <Link to="/about" className="block text-gray-400 transition-colors hover:text-[#16a34a]">
                About Us
              </Link>
              <Link to="/chm-verification" className="block text-gray-400 transition-colors hover:text-[#16a34a]">
                Platform
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-300">Our Methodology</h3>
            <nav className="space-y-3 text-sm">
              <Link to="/methodology/lulc" className="block text-gray-400 transition-colors hover:text-[#16a34a]">
                LULC Classification
              </Link>
              <Link to="/methodology/chm" className="block text-gray-400 transition-colors hover:text-[#16a34a]">
                CHM Model
              </Link>
              <Link to="/methodology/dcab" className="block text-gray-400 transition-colors hover:text-[#16a34a]">
                DCAB Model
              </Link>
              <Link to="/methodology/agb" className="block text-gray-400 transition-colors hover:text-[#16a34a]">
                AGB Calculation
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-300">Contact Us</h3>
            <address className="space-y-3 text-sm not-italic text-gray-400">
              <p>123 Innovation Street</p>
              <p>Tech City, TC 12345</p>
              <p>Phone: (123) 456-7890</p>
              <p className="hover:text-[#16a34a] transition-colors"><a href="mailto:hello@sylithe.com">hello@sylithe.com</a></p>
            </address>
          </div>

          <div className="relative">
            <h3 className="mb-4 text-lg font-bold text-gray-300">Follow Us</h3>
            <div className="mb-6 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full bg-transparent border-gray-700 hover:bg-[#16a34a] hover:text-[#081C15] hover:border-[#16a34a] transition-colors">
                      <Facebook className="h-4 w-4" />
                      <span className="sr-only">Facebook</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#081C15] text-white border-gray-800">
                    <p>Follow us on Facebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full bg-transparent border-gray-700 hover:bg-[#16a34a] hover:text-[#081C15] hover:border-[#16a34a] transition-colors">
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#081C15] text-white border-gray-800">
                    <p>Follow us on Twitter</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full bg-transparent border-gray-700 hover:bg-[#16a34a] hover:text-[#081C15] hover:border-[#16a34a] transition-colors">
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#081C15] text-white border-gray-800">
                    <p>Connect with us on LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            {/* Dark Mode toggle hidden as it's a fixed dark theme */}
          </div>

        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 text-center md:flex-row">
          <p className="text-sm text-gray-500">
            © 2024 Sylithe. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm">
            <Link to="/privacy" className="text-gray-500 transition-colors hover:text-[#16a34a]">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-500 transition-colors hover:text-[#16a34a]">
              Terms of Service
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer