import React from 'react'
import Image from 'next/image'

import IconStrip from './IconStrip'

const footerLinks = ['Page', 'Page', 'Page', 'Page']

const footerIcons = [
  { href: 'https://facebook.com', label: 'Facebook', iconSrc: '/icons/facebook.png' },
  { href: 'https://linkedin.com', label: 'LinkedIn', iconSrc: '/icons/linkedin.png' },
  { href: 'https://instagram.com', label: 'Instagram', iconSrc: '/icons/instagram.png' },
  { href: 'mailto:project.100xlift.com', label: 'Email', iconSrc: '/icons/email.png' },
  { href: 'tel:+923111960100', label: 'Phone', iconSrc: '/icons/phone-call.png' },
  { href: 'https://wa.me/923111960100', label: 'WhatsApp', iconSrc: '/icons/whatsapp.png' },
]

const SiteFooter = () => {
  return (
    <footer className="relative left-1/2 w-screen -translate-x-1/2 bg-[var(--footer-bg)] px-6 py-10 text-[var(--page-fg)] sm:px-10">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-start">
          <div>
            <p className="text-[16px] font-medium leading-none">Contact us at:</p>
            <a
              href="mailto:project.100xlift.com"
              className="mt-1 inline-block text-[16px] font-base text-[#314100] dark:text-[#BFEF2E]"
            >
              project.100xlift.com
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-[14px] font-base">
            {footerLinks.map((link, index) => (
              <a
                key={`${link}-${index}`}
                href="#"
                className="border-b border-[#8fb109] pb-1"
              >
                {link}
              </a>
            ))}
            <a href="#" className="border-b border-[#8fb109] pb-1">
              We Do OfSure
            </a>
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
  )
}

export default SiteFooter
