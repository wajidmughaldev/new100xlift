'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, Moon, Plus, Sun } from 'lucide-react'

import CalendarBookingModal from './CalendarBookingModal'
import ProposalRequestModal from './ProposalRequestModal'
import { useTheme } from './theme-provider'
import { IconCircleButton } from './ui/icon-circle-button'

const navLinks = [
  { href: '#services', label: 'Our Services' },
  { href: '#case-studies', label: 'Case Studies' },
  { href: '#process', label: 'Our Process' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#faqs', label: 'Faqs' },
  { href: '#contact', label: 'Contact' },
]

const Navigation = () => {
  const { theme, toggleTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [isProposalOpen, setIsProposalOpen] = useState(false)
  const [isStickyActive, setIsStickyActive] = useState(false)
  const [activeSection, setActiveSection] = useState(navLinks[0].href)
  const isDarkMode = theme === 'dark'
  const logoSrc = isDarkMode ? '/white-logo.svg' : '/black-logo.svg'
  const sectionIds = useMemo(() => navLinks.map((link) => link.href.replace('#', '')), [])

  const closeMobileMenu = () => setIsMobileMenuOpen(false)
  const openProposalModal = () => {
    setIsMobileMenuOpen(false)
    setIsProposalOpen(true)
  }
  const openCalendarModal = () => {
    setIsMobileMenuOpen(false)
    setIsCalendarOpen(true)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsStickyActive(window.scrollY > 12)

      const offset = window.scrollY + 180
      let currentHref = navLinks[0].href

      sectionIds.forEach((id, index) => {
        const section = document.getElementById(id)
        if (!section) return

        if (offset >= section.offsetTop) {
          currentHref = navLinks[index].href
        }
      })

      setActiveSection(currentHref)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds])

  useEffect(() => {
    const handleOpenCalendar = () => setIsCalendarOpen(true)
    const handleOpenProposal = () => setIsProposalOpen(true)

    window.addEventListener('open-calendar-modal', handleOpenCalendar)
    window.addEventListener('open-proposal-modal', handleOpenProposal)

    return () => {
      window.removeEventListener('open-calendar-modal', handleOpenCalendar)
      window.removeEventListener('open-proposal-modal', handleOpenProposal)
    }
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
          <a href="#top" className="shrink-0">
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
            {navLinks.map((link) => {
              const isActive = activeSection === link.href

              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`inline-flex items-center gap-2 transition-colors duration-200 ${
                      isActive
                        ? 'text-[#314100] dark:text-[#BFEF2E]'
                        : 'text-[var(--page-fg)] hover:text-[#314100] dark:hover:text-[#BFEF2E]'
                    }`}
                  >
                    <span>{link.label}</span>
                  </a>
                </li>
              )
            })}
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

            <button
              type="button"
              aria-label="Book a calendar appointment"
              onClick={openCalendarModal}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-[#BFEF2E]/35 bg-[var(--surface-2)] px-5 text-sm font-bold text-[var(--page-fg)] transition hover:border-[#BFEF2E] hover:text-[#BFEF2E]"
            >
              Let&apos;s talk
              <ArrowUpRight size={18} strokeWidth={2.4} />
            </button>

            <button
              type="button"
              aria-label="Request a proposal"
              onClick={openProposalModal}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-[#314100] px-5 text-sm font-bold text-[#BFEF2E] transition hover:bg-[#405600]"
            >
              Request a proposal
              <ArrowUpRight size={18} strokeWidth={2.4} />
            </button>
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
          <div className="relative flex min-h-full flex-col rounded-[28px] border border-[var(--outline-soft)] bg-[var(--mobile-panel-bg)] px-7 pb-10 pt-7 text-white">
            <div className="flex items-center justify-between">
              <a href="#top" onClick={closeMobileMenu}>
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
                className="inline-flex size-11 items-center justify-center rounded-full text-white/90"
                onClick={closeMobileMenu}
              >
                <Plus size={24} strokeWidth={2.2} className="rotate-45" />
              </button>
            </div>

            <nav className="flex min-h-[calc(100vh-160px)] flex-col items-center justify-center">
              <ul className="flex w-full flex-col items-center gap-2 text-center">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href

                  return (
                    <li key={`mobile-${link.label}`} className="w-full">
                      <a
                        href={link.href}
                        className={`block text-[clamp(2rem,8vw,3rem)] font-semibold leading-[1.02] tracking-[-0.05em] transition-colors duration-200 ${
                          isActive ? 'text-[#BFEF2E]' : 'text-white hover:text-[#d8ff71]'
                        }`}
                        onClick={closeMobileMenu}
                      >
                        {link.label}
                      </a>
                    </li>
                  )
                })}
              </ul>

              <button
                type="button"
                onClick={openCalendarModal}
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#BFEF2E]/50 px-5 py-3 text-sm font-bold text-white"
              >
                Let&apos;s talk
                <ArrowUpRight size={17} strokeWidth={2.4} />
              </button>

              <button
                type="button"
                onClick={openProposalModal}
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#BFEF2E] px-5 py-3 text-sm font-bold text-[#101408]"
              >
                Request a proposal
                <ArrowUpRight size={17} strokeWidth={2.4} />
              </button>
            </nav>
          </div>
        </div>
      ) : null}

      <ProposalRequestModal
        isOpen={isProposalOpen}
        onClose={() => setIsProposalOpen(false)}
      />
      <CalendarBookingModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
      />
    </>
  )
}

export default Navigation
