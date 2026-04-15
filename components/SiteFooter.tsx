'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'

import IconStrip from './IconStrip'
import PopupShell from './popup/popup-shell'
import OffshorePopupContent from './popup/offshore-popup-content'

const footerLinks = [
  { href: '#case-studies', label: 'Works' },
  { href: '#process', label: 'Process' },
  { href: '#contact', label: 'Contact' },
]

const footerIcons = [
  { href: 'https://www.facebook.com/profile.php?id=61586106101272', label: 'Facebook', iconSrc: '/icons/facebook.png' },
  { href: 'https://www.linkedin.com/company/110819732', label: 'LinkedIn', iconSrc: '/icons/linkedin.png' },
  { href: 'https://instagram.com', label: 'Instagram', iconSrc: '/icons/instagram.png' },
  { href: 'mailto:100xlift@gmail.com', label: 'Email', iconSrc: '/icons/email.png' },
  { href: 'tel:+923361815141', label: 'Phone', iconSrc: '/icons/phone-call.png' },
  { href: 'https://wa.me/923361815141', label: 'WhatsApp', iconSrc: '/icons/whatsapp.png' },
]

const SiteFooter = () => {
  const [isOffshoreOpen, setIsOffshoreOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(footerLinks[0].href)
  const sectionIds = useMemo(() => footerLinks.map((link) => link.href.replace('#', '')), [])

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY + 180
      let currentHref = footerLinks[0].href

      sectionIds.forEach((id, index) => {
        const section = document.getElementById(id)
        if (!section) return

        if (offset >= section.offsetTop) {
          currentHref = footerLinks[index].href
        }
      })

      setActiveSection(currentHref)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds])

  return (
    <>
      <footer className="relative left-1/2 w-screen -translate-x-1/2 bg-[var(--footer-bg)] px-6 py-10 text-[var(--page-fg)] sm:px-10">
        <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-8">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-start">
            <div>
              <p className="text-[16px] font-medium leading-none">Contact us at:</p>
              <a
                href="mailto:100xlift@gmail.com"
                className="mt-1 inline-block text-[16px] font-base text-[#314100] dark:text-[#BFEF2E]"
              >
                100xlift@gmail.com
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-[14px] font-base">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`border-b pb-1 transition-colors ${
                    activeSection === link.href
                      ? 'border-[#BFEF2E] text-[#314100] dark:text-[#BFEF2E]'
                      : 'border-[#8fb109] text-[var(--page-fg)] hover:text-[#314100] dark:hover:text-[#BFEF2E]'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => setIsOffshoreOpen(true)}
                className="border-b border-[#8fb109] pb-1 text-[var(--page-fg)] transition-colors hover:text-[#314100] dark:hover:text-[#BFEF2E]"
              >
                Offshore
              </button>
            </div>
          </div>

          <div className="relative h-[160px] w-full sm:h-[200px] lg:h-[240px]">
            <Image
              src="/white-logo.svg"
              alt="100XLift"
              fill
              className="hidden object-contain object-left dark:block"
              priority={false}
            />
            <Image
              src="/black-logo.svg"
              alt="100XLift"
              fill
              className="object-contain object-left dark:hidden"
              priority={false}
            />
          </div>

          <div className="flex flex-col justify-between gap-6 pt-2 lg:flex-row lg:items-center">
            <p className="text-[14px] font-medium">
              @Copywrite Alright Reserved <span className="text-[#314100] dark:text-[#BFEF2E]">2026</span>
            </p>

            <IconStrip items={footerIcons} className="gap-2" openInNewTab={false} />
          </div>
        </div>
      </footer>

      <PopupShell
        isOpen={isOffshoreOpen}
        onClose={() => setIsOffshoreOpen(false)}
        title="100XLift offshore teams"
      >
        <OffshorePopupContent />
      </PopupShell>
    </>
  )
}

export default SiteFooter
