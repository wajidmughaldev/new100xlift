'use client'

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, X } from 'lucide-react'
import { submitLeadForm } from '@/lib/lead-form'

type ProposalRequestModalProps = {
  isOpen: boolean
  onClose: () => void
}

const inputClassName =
  'h-11 rounded-md border border-[var(--outline-soft)] bg-white px-3 text-sm text-[#101408] outline-none transition focus:border-[#9bd200] focus:ring-2 focus:ring-[#b8ea18]/30 dark:bg-[#101207] dark:text-white dark:placeholder:text-white/42'

const labelClassName = 'text-sm font-semibold text-[#101408] dark:text-white'

const ProposalRequestModal = ({ isOpen, onClose }: ProposalRequestModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  useEffect(() => {
    if (!isOpen) return

    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    document.documentElement.classList.add('popup-page-locked')
    document.body.classList.add('popup-page-locked')
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
      document.documentElement.classList.remove('popup-page-locked')
      document.body.classList.remove('popup-page-locked')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const portalTarget = typeof document === 'undefined' ? null : document.body

  if (!portalTarget || !isOpen) return null

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setFeedback(null)

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      await submitLeadForm({
        source: 'proposal-modal',
        name: String(formData.get('name') || ''),
        email: String(formData.get('email') || ''),
        phone: String(formData.get('phone') || ''),
        company: String(formData.get('company') || ''),
        website: String(formData.get('website') || ''),
        projectType: String(formData.get('projectType') || ''),
        budget: String(formData.get('budget') || ''),
        timeline: String(formData.get('timeline') || ''),
        details: String(formData.get('details') || ''),
      })

      form.reset()
      setFeedback({
        type: 'success',
        message: 'Request sent. Check your inbox for the confirmation email.',
      })
    } catch (error) {
      setFeedback({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Unable to send your request right now.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-black/58 px-4 py-5 backdrop-blur-xl"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Request a proposal"
        onMouseDown={(event) => event.stopPropagation()}
        className="popup-scrollbar-hidden relative max-h-[calc(100dvh-2.5rem)] w-full max-w-[760px] overflow-y-auto rounded-lg border border-[var(--outline-soft)] bg-[#f8faf2] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.38)] dark:bg-[#080906] sm:p-7"
      >
        <button
          type="button"
          aria-label="Close request proposal form"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full text-[#101408]/70 transition hover:bg-black/5 hover:text-[#101408] dark:text-white/70 dark:hover:bg-white/8 dark:hover:text-white"
        >
          <X size={18} strokeWidth={2.2} />
        </button>

        <div className="pr-10">
          <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#101408] dark:text-white">
            Request a Proposal
          </h2>
          <p className="mt-2 text-sm font-medium text-[var(--muted-fg)]">
            Share a few details. We will reply with a clear plan, timeline, and estimate.
          </p>
        </div>

        <form className="mt-10 space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className={labelClassName}>Full name</span>
              <input className={inputClassName} name="name" placeholder="Your name" />
            </label>

            <label className="grid gap-2">
              <span className={labelClassName}>Email</span>
              <input className={inputClassName} name="email" type="email" placeholder="you@email.com" />
            </label>

            <label className="grid gap-2">
              <span className={labelClassName}>Phone / WhatsApp <span className="font-normal">(optional)</span></span>
              <input className={inputClassName} name="phone" placeholder="+92..." />
            </label>

            <label className="grid gap-2">
              <span className={labelClassName}>Company <span className="font-normal">(optional)</span></span>
              <input className={inputClassName} name="company" placeholder="Company name" />
            </label>
          </div>

          <label className="grid gap-2">
            <span className={labelClassName}>Website / Link <span className="font-normal">(optional)</span></span>
            <input className={inputClassName} name="website" placeholder="https://..." />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className={labelClassName}>Project type</span>
              <select className={inputClassName} name="projectType" defaultValue="Web App">
                <option>Web App</option>
                <option>Website</option>
                <option>UI/UX Design</option>
                <option>SEO</option>
                <option>Branding</option>
              </select>
            </label>

            <label className="grid gap-2">
              <span className={labelClassName}>Budget</span>
              <select className={inputClassName} name="budget" defaultValue="">
                <option value="" disabled>Select budget</option>
                <option>Less than $1,000</option>
                <option>$1,000 - $3,000</option>
                <option>$3,000 - $7,500</option>
                <option>$7,500+</option>
              </select>
            </label>
          </div>

          <label className="grid gap-2">
            <span className={labelClassName}>Timeline</span>
            <select className={inputClassName} name="timeline" defaultValue="ASAP">
              <option>ASAP</option>
              <option>2 - 4 weeks</option>
              <option>1 - 2 months</option>
              <option>Flexible</option>
            </select>
          </label>

          <label className="grid gap-2">
            <span className={labelClassName}>Project details</span>
            <textarea
              className="min-h-[130px] rounded-md border border-[var(--outline-soft)] bg-white px-3 py-3 text-sm text-[#101408] outline-none transition focus:border-[#9bd200] focus:ring-2 focus:ring-[#b8ea18]/30 dark:bg-[#101207] dark:text-white dark:placeholder:text-white/42"
              name="details"
              placeholder="What are you building, what's the goal, and what's the main challenge?"
            />
          </label>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--muted-fg)]">
                No spam. Your details stay private.
              </p>
              {feedback ? (
                <p
                  className={`mt-2 text-xs font-semibold ${
                    feedback.type === 'success' ? 'text-[#5b7b00]' : 'text-red-500'
                  }`}
                >
                  {feedback.message}
                </p>
              ) : null}
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="h-10 rounded-full border border-[#b8ea18]/40 px-5 text-sm font-semibold text-[#101408] transition hover:bg-[#b8ea18]/12 dark:text-white"
              >
                Close
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-10 items-center gap-2 rounded-full bg-[#b8ea18] px-5 text-sm font-bold text-[#101408] transition hover:bg-[#cdfb45]"
              >
                {isSubmitting ? 'Sending...' : 'Request Proposal'}
                <ArrowUpRight size={16} strokeWidth={2.4} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>,
    portalTarget
  )
}

export default ProposalRequestModal
