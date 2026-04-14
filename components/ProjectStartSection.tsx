'use client'

import React, { useState } from 'react'
import { Send } from 'lucide-react'

import IconStrip from './IconStrip'
import { submitLeadForm } from '@/lib/lead-form'

const iconItems = [
  { href: 'https://facebook.com', label: 'Facebook', iconSrc: '/icons/facebook.png' },
  { href: 'https://linkedin.com', label: 'LinkedIn', iconSrc: '/icons/linkedin.png' },
  { href: 'https://instagram.com', label: 'Instagram', iconSrc: '/icons/instagram.png' },
  { href: 'mailto:project@100xlift.com', label: 'Email', iconSrc: '/icons/email.png' },
  { href: 'tel:+923111960100', label: 'Phone', iconSrc: '/icons/phone-call.png' },
  { href: 'https://wa.me/923111960100', label: 'WhatsApp', iconSrc: '/icons/whatsapp.png' },
]

const serviceTags = ['Website Development', 'UI/UX Designing', 'SEO/AEO']

const ProjectStartSection = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const toggleService = (service: string) => {
    setSelectedServices((current) =>
      current.includes(service)
        ? current.filter((item) => item !== service)
        : [...current, service]
    )
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setFeedback(null)

    const form = event.currentTarget
    const formData = new FormData(form)
    const phoneCode = String(formData.get('phoneCode') || '')
    const phoneNumber = String(formData.get('phoneNumber') || '')

    try {
      await submitLeadForm({
        source: 'project-start',
        name: String(formData.get('name') || ''),
        email: String(formData.get('email') || ''),
        phone: `${phoneCode} ${phoneNumber}`.trim(),
        budget: String(formData.get('budget') || ''),
        details: String(formData.get('details') || ''),
        services: selectedServices,
      })

      form.reset()
      setSelectedServices([])
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

  return (
    <section className="mx-auto w-full max-w-[1120px] px-0 py-10 text-[var(--page-fg)] sm:px-4">
      <div className="overflow-hidden rounded-[24px] border border-[var(--outline-soft)] bg-[var(--panel-bg)] lg:grid lg:grid-cols-[55%_45%]">
        <div
          className="relative flex flex-col px-4 py-6 sm:min-h-[620px] sm:px-8 sm:py-8 lg:min-h-[720px] lg:justify-between lg:px-10 lg:py-10"
          style={{
            backgroundColor: '#000',
            backgroundImage: "url('/banner-bg-gradient.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="grid gap-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex size-[72px] shrink-0 items-center justify-center rounded-full border border-white/30 bg-[linear-gradient(180deg,#f1f1f1_0%,#cfcfcf_100%)] text-[24px] font-semibold text-black sm:size-[90px] sm:text-[28px]">
                  AW
                </div>
                <div className="max-w-[240px] pt-1 sm:max-w-[280px] sm:pt-2">
                  <h3 className="text-[1rem] font-semibold leading-[1.08] text-white sm:text-[18px]">
                    Abdul Wajid Khan -
                  </h3>
                  <p className="mt-1 text-[0.82rem] leading-[1.15] text-white/90 sm:text-[14px]">
                    Project Coordinator
                  </p>
                  <p className="mt-1 text-[0.82rem] leading-[1.15] text-white/90 sm:text-[14px]">
                    Can guide your project
                    <br />
                    initial steps.
                  </p>
                </div>
              </div>

              <a
                href="mailto:project@100xlift.com"
                className="text-[0.78rem] font-semibold text-white sm:pt-6 sm:text-[16px]"
              >
                project@100xlift.com
              </a>
            </div>

            <h2 className="max-w-[520px] pt-2 text-[2.3rem] font-thin leading-[0.98] tracking-[-0.05em] text-white sm:pt-6 sm:text-[4rem] lg:pt-10 lg:text-[58px] lg:leading-20">
              Every Project Start
              <br />
              With A Plan
            </h2>
          </div>

          <IconStrip items={iconItems} className="mt-5 gap-3 sm:gap-4 lg:mt-0" openInNewTab={false} />
        </div>

        <div className="flex min-h-[520px] min-w-0 flex-col justify-between bg-[var(--panel-bg)] px-4 py-6 sm:min-h-[620px] sm:px-8 sm:py-8 lg:min-h-[720px] lg:px-10 lg:py-10">
          <div className="min-w-0">
            <h2 className="text-[2rem] font-base leading-[1.02] tracking-[-0.05em] sm:text-[2.35rem] lg:text-[3.1rem]">
              <span className="text-[#BFEF2E]">What Service</span>
              <br />
              <span className="text-[var(--page-fg)]">We Can Support You With?</span>
            </h2>

            <form className="mt-8 space-y-5 sm:mt-10 sm:space-y-6 lg:mt-12" onSubmit={handleSubmit}>
              <div>
                <p className="mb-3 text-[12px] font-medium text-[var(--muted-fg)]">Select Service</p>
                <div className="flex flex-wrap gap-3">
                  {serviceTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleService(tag)}
                      aria-pressed={selectedServices.includes(tag)}
                      className={`rounded-full border px-4 py-2 text-[12px] font-medium transition ${
                        selectedServices.includes(tag)
                          ? 'border-[#cfff19] bg-[#cfff19] text-black'
                          : 'border-[#9bc100] text-[var(--page-fg)] hover:bg-[#263300] hover:text-white dark:hover:text-white'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                <label className="grid min-w-0 gap-2">
                  <span className="text-[12px] font-medium text-[var(--muted-fg)]">Full Name</span>
                  <input
                    type="text"
                    name="name"
                    defaultValue="Abdul Wajid khan"
                    className="h-10 w-full min-w-0 rounded-[8px] border border-[var(--outline-soft)] bg-[var(--panel-strong)] px-4 text-[13px] text-[var(--page-fg)] outline-none placeholder:text-[var(--muted-fg)]"
                  />
                </label>
                <label className="grid min-w-0 gap-2">
                  <span className="text-[12px] font-medium text-[var(--muted-fg)]">Email</span>
                  <input
                    type="email"
                    name="email"
                    defaultValue="wajid@gmail.com"
                    className="h-10 w-full min-w-0 rounded-[8px] border border-[var(--outline-soft)] bg-[var(--panel-strong)] px-4 text-[13px] text-[var(--page-fg)] outline-none placeholder:text-[var(--muted-fg)]"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                <div className="grid min-w-0 gap-2">
                  <span className="text-[12px] font-medium text-[var(--muted-fg)]">Phone</span>
                  <div className="grid min-w-0 grid-cols-[84px_minmax(0,1fr)] gap-2 sm:grid-cols-[88px_minmax(0,1fr)]">
                    <select name="phoneCode" className="h-10 w-full rounded-[8px] border border-[var(--outline-soft)] bg-[var(--panel-strong)] px-3 text-[13px] text-[var(--page-fg)] outline-none">
                      <option>+92</option>
                    </select>
                    <input
                      type="text"
                      name="phoneNumber"
                      defaultValue="311-1960 100"
                      className="h-10 w-full min-w-0 rounded-[8px] border border-[var(--outline-soft)] bg-[var(--panel-strong)] px-4 text-[13px] text-[var(--page-fg)] outline-none"
                    />
                  </div>
                </div>
                <label className="grid min-w-0 gap-2">
                  <span className="text-[12px] font-medium text-[var(--muted-fg)]">Select Budget</span>
                  <select
                    name="budget"
                    defaultValue="Less Than 100"
                    className="h-10 w-full min-w-0 rounded-[8px] border border-[var(--outline-soft)] bg-[var(--panel-strong)] px-4 text-[13px] text-[var(--page-fg)] outline-none"
                  >
                    <option>Less Than 100</option>
                    <option>100 - 300</option>
                    <option>300 - 500</option>
                    <option>500 - 1,000</option>
                    <option>1,000 - 2,500</option>
                    <option>2,500+</option>
                  </select>
                </label>
              </div>

              <label className="grid min-w-0 gap-2">
                <span className="text-[12px] font-medium text-[var(--muted-fg)]">Brief Overview</span>
                <textarea
                  rows={5}
                  name="details"
                  defaultValue="I need a 5 pages Construction website..."
                  className="min-h-[118px] w-full min-w-0 rounded-[8px] border border-[var(--outline-soft)] bg-[var(--panel-strong)] px-4 py-4 text-[13px] text-[var(--page-fg)] outline-none"
                />
              </label>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  {feedback ? (
                    <p
                      className={`text-xs font-semibold ${
                        feedback.type === 'success' ? 'text-[#5b7b00]' : 'text-red-500'
                      }`}
                    >
                      {feedback.message}
                    </p>
                  ) : (
                    <p className="text-xs font-medium text-[var(--muted-fg)]">
                      We will send a confirmation email after submission.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex h-11 items-center justify-center rounded-full bg-[#BFEF2E] px-5 text-sm font-bold text-[#101408] transition hover:bg-[#cdfb45]"
                >
                  {isSubmitting ? 'Sending...' : 'Request Proposal'}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-4 flex items-center gap-3 pt-3">
            <span className="flex size-[42px] items-center justify-center rounded-full bg-[#607907] text-[#d8ff71]">
              <Send size={18} strokeWidth={2.5} />
            </span>
            <p className="text-[13px] font-medium text-[var(--muted-fg)]">
              Response time is under 1hr
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectStartSection
