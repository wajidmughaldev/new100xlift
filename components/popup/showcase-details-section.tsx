'use client'

import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'

const projectFacts = [
  ['Project type', 'Accessibility platform'],
  ['Industry', 'SaaS / compliance'],
  ['Focus', 'WCAG workflow clarity'],
  ['Scope', 'Product UX and content'],
  ['Deliverables', 'Case study and UI direction'],
  ['Primary audience', 'Modern product teams'],
]

const supportNotes = [
  'The product needed a sharper narrative and a cleaner visual system so teams could quickly understand what the platform solves and why it matters.',
  'We restructured the layout to support faster scanning, stronger hierarchy, and more confidence around the platform value, workflow, and outcomes.',
]

const accordionItems = [
  {
    title: 'Projects',
    body: 'The project scope centered on a case-study experience that could present product value, workflow context, and responsive design proof with much stronger hierarchy.',
  },
  {
    title: 'Challenges',
    body: 'The original content felt fragmented. Product visuals, explanation, and trust-building proof were not working together as a single persuasive story.',
  },
  {
    title: 'Our Approach',
    body: 'We built a more editorial structure with a clear overview, featured visuals, supporting notes, and expandable detail blocks that keep the experience easier to scan.',
  },
  {
    title: 'Final Outcome With 100XLIFT',
    body: 'The final direction makes the case study easier to trust and more aligned with how buyers evaluate software products in real decision-making flows.',
  },
]

const ShowcaseDetailsSection = () => {
  const [openItem, setOpenItem] = useState<string>('Final Outcome With 100XLIFT')

  return (
    <section className="px-5 pb-10 pt-8 text-[var(--page-fg)] sm:px-7 lg:px-8">
      <div className="mx-auto max-w-[1220px]">
        <div className="grid gap-10 border-b border-[var(--outline-soft)] pb-10 lg:grid-cols-[220px_minmax(0,1fr)_280px]">
          <aside className="border-b border-[var(--outline-soft)] pb-6 lg:border-b-0 lg:border-r lg:border-[var(--outline-soft)] lg:pb-0 lg:pr-8">
            <h3 className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-[var(--muted-fg)]">
              Project Details
            </h3>

            <dl className="mt-5 space-y-4">
              {projectFacts.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[var(--muted-fg)]">
                    {label}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold leading-[1.5] text-[var(--page-fg)]">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>

          <div className="min-w-0">
            <h3 className="text-xl font-bold leading-tight tracking-[-0.03em] text-[var(--page-fg)] sm:text-2xl">
              DesignA11Y gives accessibility teams a sharper system to explain the workflow and build trust faster.
            </h3>

            <div className="mt-5 space-y-4 text-[0.95rem] font-medium leading-[1.75] text-[var(--muted-fg)] sm:text-base">
              <p>
                The refreshed case-study structure focuses on clarity first. It
                frames the platform problem, shows the product in action, and
                guides readers through the value without forcing them to decode
                the interface on their own.
              </p>
              <p>
                Instead of stacking disconnected screenshots, the section now
                creates a stronger editorial rhythm: overview, proof, product
                visuals, and supporting detail. That makes the story easier to
                follow and gives the product a more credible, enterprise-ready
                presence.
              </p>
            </div>
          </div>

          <div className="space-y-4 lg:pl-2">
            {supportNotes.map((note) => (
              <div
                key={note}
                className="rounded-[18px] border border-[var(--outline-soft)] bg-[var(--surface-1)] px-5 py-5  dark:shadow-[0_10px_34px_rgba(0,0,0,0.28)]"
              >
                <p className="text-sm font-medium leading-[1.7] text-[var(--muted-fg)]">
                  {note}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 pt-8 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="space-y-2">
            {accordionItems.map((item) => {
              const isOpen = openItem === item.title

              return (
                <div key={item.title} className="border-b border-[var(--outline-soft)]">
                  <button
                    type="button"
                    onClick={() => setOpenItem(isOpen ? '' : item.title)}
                    className="flex w-full items-center justify-between py-4 text-left transition hover:text-[#314100] dark:hover:text-[#b8ea18]"
                  >
                    <span className="text-[0.95rem] font-semibold tracking-[-0.02em] sm:text-base">
                      {item.title}
                    </span>
                    {isOpen ? (
                      <Minus size={16} strokeWidth={2.3} />
                    ) : (
                      <Plus size={16} strokeWidth={2.3} />
                    )}
                  </button>

                  {isOpen ? (
                    <div className="pb-4 pr-8 text-sm font-medium leading-[1.75] text-[var(--muted-fg)]">
                      {item.body}
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>

          <div className="rounded-[20px] border border-[var(--outline-soft)] bg-[var(--surface-1)] px-5 py-6  dark:shadow-[0_14px_40px_rgba(0,0,0,0.24)]">
            <h4 className="text-lg font-bold tracking-[-0.03em] text-[var(--page-fg)]">
              Final Outcome With 100XLIFT
            </h4>
            <p className="mt-4 text-sm font-medium leading-[1.75] text-[var(--muted-fg)]">
              The redesigned presentation makes the case study easier to scan,
              easier to trust, and more aligned with how product buyers actually
              evaluate software. Each block now supports the sales story instead
              of competing with it.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ShowcaseDetailsSection
