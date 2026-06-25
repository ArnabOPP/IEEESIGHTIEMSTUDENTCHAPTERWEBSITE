"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import {
  Home,
  User,
  Lightbulb,
  Users,
  Award,
  Image as ImageIcon,
  HeartHandshake,
  Share2,
  Menu,
  X
} from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"

const navItems = [
  { name: 'Home',        url: '#home',        icon: Home },
  { name: 'About',       url: '#about',       icon: User },
  { name: 'Initiative',  url: '#initiatives', icon: Lightbulb },
  { name: 'Conferences', url: '#conferences', icon: Users },
  { name: 'Benefits',    url: '#benefits',    icon: Award },
  { name: 'Gallery',     url: '#gallery',     icon: ImageIcon },
  { name: 'Teams',       url: '#team',        icon: HeartHandshake },
  { name: 'Social',      url: '#social',      icon: Share2 },
]

export function NavBarDemo() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-background/90 backdrop-blur-sm border-b border-border/40 px-4 md:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between relative h-14 md:h-16">

          {/* Left: logo */}
          <div className="flex items-center z-50">
            <Image
              src="/IEM Student Branch Chapter.png"
              alt="IEM Student Branch Chapter Logo"
              width={460}
              height={140}
              className="object-contain h-10 md:h-14 w-auto max-w-[130px] md:max-w-[180px]"
              priority
            />
          </div>

          {/* Center: desktop nav */}
          <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <NavBar items={navItems} className="relative bottom-auto left-auto -translate-x-0 mb-0" />
          </div>

          {/* Right: IEEE SIGHT logo + hamburger */}
          <div className="flex items-center gap-3 z-50">
            <Link href="https://sight.ieee.org" target="_blank" rel="noopener noreferrer">
              <Image
                src="/IEM Student Branch Chapter 2.png"
                alt="IEEE SIGHT Logo"
                width={140}
                height={60}
                className="object-contain h-10 md:h-14 w-auto hover:opacity-80 transition-opacity"
                priority
              />
            </Link>
            {/* Hamburger — mobile only */}
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-border/50 bg-background/60 text-foreground"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile slide-down menu */}
      {menuOpen && (
        <div className="fixed top-[57px] left-0 right-0 z-40 md:hidden bg-background/95 backdrop-blur-md border-b border-border/40 shadow-xl">
          <nav className="flex flex-col py-3">
            {navItems.map(item => {
              const Icon = item.icon
              return (
                <a
                  key={item.name}
                  href={item.url}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-muted/50 transition-colors"
                >
                  <Icon size={16} strokeWidth={2} />
                  {item.name}
                </a>
              )
            })}
          </nav>
        </div>
      )}
    </>
  )
}
