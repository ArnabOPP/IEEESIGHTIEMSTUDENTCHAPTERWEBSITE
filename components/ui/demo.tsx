"use client"

import Image from "next/image"
import Link from "next/link"
import { 
  Home, 
  User, 
  Lightbulb, 
  Users, 
  Award, 
  Image as ImageIcon, 
  HeartHandshake, 
  Share2 
} from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"

export function NavBarDemo() {
  const navItems = [
    { name: 'Home', url: '#home', icon: Home },
    { name: 'About', url: '#about', icon: User },
    { name: 'Initiative', url: '#initiatives', icon: Lightbulb },
    { name: 'Conferences', url: '#conferences', icon: Users },
    { name: 'Benefits', url: '#benefits', icon: Award },
    { name: 'Gallery', url: '#gallery', icon: ImageIcon },
    { name: 'Teams', url: '#teams', icon: HeartHandshake },
    { name: 'Social', url: '#social', icon: Share2 }
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b border-border/40 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between relative h-16">
        
        {/* Left Side: IEM Student Branch Chapter Logo (Sized Up for Visual Balance) */}
        <div className="flex items-center z-50">
          <Image 
            src="/IEM Student Branch Chapter.png" 
            alt="IEM Student Branch Chapter Logo" 
            width={460} // Increased bounds
            height={140}  // Increased bounds
            className="object-contain h-14 w-auto max-w-[180px]" // Controls visual rendering height directly
            priority
          />
        </div>

        {/* Center Side: Floating Tubelight Navigation Bar */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <NavBar items={navItems} className="relative bottom-auto sm:top-auto left-auto -translate-x-0 mb-0 sm:pt-0" />
        </div>

        {/* Right Side: IEEE SIGHT Logo Link */}
        <div className="flex items-center z-50">
          <Link href="https://sight.ieee.org" target="_blank" rel="noopener noreferrer">
            <Image 
              src="/IEM Student Branch Chapter 2.png" 
              alt="IEEE SIGHT Logo" 
              width={140} 
              height={60}
              className="object-contain h-14 w-auto hover:opacity-80 transition-opacity"
              priority
            />
          </Link>
        </div>

      </div>
    </header>
  )
}