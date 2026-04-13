'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { House, Moon, Phone, Plus, Sun } from 'lucide-react'

import { useTheme } from './theme-provider'
import { IconCircleButton } from './ui/icon-circle-button'

const navLinks = [
  { href: '#home', label: 'Home', icon: <House strokeWidth={2} className="size-[18px]" /> },
  { href: '#services', label: 'Our Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#case-studies', label: 'Case Studies' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#faqs', label: 'Faqs' },
  { href: '#contact', label: 'Contact' },
]

const Navigation = () => {
  const { theme, toggleTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isStickyActive, setIsStickyActive] = useState(false)
  const isDarkMode = theme === 'dark'
  const logoSrc = isDarkMode ? '/white-logo.svg' : '/black-logo.svg'

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsStickyActive(window.scrollY > 12)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`${isStickyActive ? 'fixed inset-x-0 top-0 z-40' : 'relative'} mb-2 transition-all duration-300 ${
          isStickyActive
            ? 'bg-[var(--header-glass)] py-2 backdrop-blur-xl'
            : 'bg-transparent py-0'
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            isStickyActive
              ? 'h-[64px] translate-y-0 scale-[0.985] md:h-[84px]'
              : 'h-[92px] translate-y-0 scale-100 md:h-[120px]'
          } ${isStickyActive ? 'mx-auto w-11/12' : ''}`}
        >
        <a href="#home" className="shrink-0">
          <Image
            src={logoSrc}
            alt="100XLift logo"
            width={160}
            height={28}
            className="h-auto w-32 md:w-40"
            style={{ height: 'auto' }}
          />
        </a>

        <ul
          className={`hidden list-none items-center gap-6 rounded-full px-8 py-4 transition-colors duration-300 md:flex ${
            isStickyActive ? 'bg-transparent' : 'bg-[var(--nav-pill-bg)]'
          }`}
        >
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="inline-flex items-center gap-2 text-[var(--page-fg)] transition-colors duration-200 hover:text-[#BFEF2E]"
              >
                {link.icon ?? null}
                <span>{link.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden gap-2 md:flex">
          <IconCircleButton
            type="button"
            aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-pressed={true}
            className="bg-[#314100] text-[#BFEF2E]"
            onClick={toggleTheme}
          >
            <span
              key={theme}
              className="inline-flex animate-[theme-toggle-in_220ms_ease-out]"
            >
              {isDarkMode ? (
                <Moon size={20} strokeWidth={2} />
              ) : (
                <Sun size={20} strokeWidth={2} />
              )}
            </span>
          </IconCircleButton>

          <a href="tel:+923111960100" aria-label="Call us">
            <IconCircleButton
              type="button"
              className="bg-[#314100] text-[#BFEF2E]"
            >
              <Phone size={20} strokeWidth={2} />
            </IconCircleButton>
          </a>
        </div>

        <button
          type="button"
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
          className="inline-flex size-12 items-center justify-center rounded-full bg-[var(--surface-2)] text-[#BFEF2E] transition-transform duration-300 md:hidden"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
        >
          <Plus
            size={22}
            strokeWidth={2.2}
            className={`transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45' : 'rotate-0'}`}
          />
        </button>
        </div>
      </header>

      {isStickyActive ? <div aria-hidden="true" className="h-[80px] md:h-[100px]" /> : null}

      {isMobileMenuOpen ? (
        <div className="fixed inset-0 z-50 bg-[var(--mobile-overlay)] p-4 backdrop-blur-sm md:hidden">
          <div className="relative flex min-h-full flex-col rounded-[28px] border border-[var(--outline-soft)] bg-[var(--mobile-panel-bg)] px-7 pb-10 pt-7 text-[var(--page-fg)]">
            <div className="flex items-center justify-between">
              <a href="#home" onClick={closeMobileMenu}>
                <Image
                  src={logoSrc}
                  alt="100XLift logo"
                  width={112}
                  height={20}
                  className="h-auto w-28"
                  style={{ height: 'auto' }}
                />
              </a>

              <button
                type="button"
                aria-label="Close navigation menu"
                className="inline-flex size-11 items-center justify-center rounded-full text-[var(--page-fg)]/90"
                onClick={closeMobileMenu}
              >
                <Plus size={24} strokeWidth={2.2} className="rotate-45" />
              </button>
            </div>

            <nav className="flex min-h-[calc(100vh-160px)] flex-col items-center justify-center">
              <ul className="flex w-full flex-col items-center gap-2 text-center">
                {navLinks.map((link) => (
                  <li key={`mobile-${link.label}`} className="w-full">
                    <a
                      href={link.href}
                      className="block text-[clamp(2rem,8vw,3rem)] font-semibold leading-[1.02] tracking-[-0.05em] text-[var(--page-fg)] transition-colors duration-200 hover:text-[#BFEF2E]"
                      onClick={closeMobileMenu}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Navigation
