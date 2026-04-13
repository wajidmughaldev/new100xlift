import React from 'react'
import { ArrowUpRight, Phone } from 'lucide-react'

import { CTAButton } from './ui/cta-button'

const highlightClassName = 'bg-[#a8d400] px-2 py-0.5 text-black sm:px-3 sm:py-1'

const FinalStatementCTA = () => {
  return (
    <section className="mx-auto w-full max-w-[1120px] px-4 py-10 text-center text-[var(--page-fg)]">
      <div className="space-y-6">
        <div className="text-[1.95rem] font-normal leading-[1.18] tracking-[-0.05em] sm:text-[2.6rem] md:text-[3.2rem]">
          <div>
            Your business should not look{' '}
            <span className={highlightClassName}>smaller, weaker, or</span>
          </div>
          <div className="mt-3">
            <span className={highlightClassName}>less credible than it is.</span>
          </div>
        </div>

        <div className="pt-4 text-[1.95rem] font-normal leading-[1.18] tracking-[-0.05em] sm:pt-6 sm:text-[2.6rem] md:text-[3.2rem]">
          <div>
            If your{' '}
            <span className={highlightClassName}>website, branding, or digital presence</span>{' '}
            is
          </div>
          <div className="mt-3">
            <span className={highlightClassName}>slowing growth,</span>{' '}
            let&apos;s fix the parts that matter first.
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 pt-6 sm:flex-row sm:flex-wrap sm:gap-8 sm:pt-8">
          <CTAButton
            variant="discovery"
            text="Book a Discovery Call"
            icon={<Phone size={22} strokeWidth={2.6} />}
            className="text-[15px] font-semibold sm:text-[18px]"
          />

          <CTAButton
            variant="primary"
            text="Request a Digital Audit"
            icon={<ArrowUpRight size={22} strokeWidth={2.6} />}
            className="min-h-[48px] px-5 text-[15px] font-semibold sm:min-h-[56px] sm:px-7 sm:text-[18px]"
          />
        </div>
      </div>
    </section>
  )
}

export default FinalStatementCTA
