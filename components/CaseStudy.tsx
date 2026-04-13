'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, FolderKanban } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'

import FeatureStrip from './FeatureStrip'
import SectionIntro from './SectionIntro'

type CaseStudyItem = {
  id: number
  title: string
  image: string
  techLabel: string
  techValue: string
  tags: string[]
  description: string
}

const caseStudies: CaseStudyItem[] = [
  {
    id: 1,
    title: 'Qarora.ai',
    image: '/showcase-images/12.webp',
    techLabel: 'Tech Stack',
    techValue: 'Automation',
    tags: ['AI', 'Landing Page', 'Growth'],
    description:
      "A conversion-focused website system designed to present the product clearly, build trust quickly, and guide users from first impression to action without visual clutter.",
  },
  {
    id: 2,
    title: 'Bold Commerce',
    image: '/showcase-images/3.webp',
    techLabel: 'Tech Stack',
    techValue: 'Shopify',
    tags: ['E-commerce', 'UI/UX', 'SEO'],
    description:
      'A storefront experience structured around product storytelling, cleaner pathways to purchase, and a stronger visual system for premium digital merchandising.',
  },
  {
    id: 3,
    title: 'Portal Flow',
    image: '/showcase-images/4.webp',
    techLabel: 'Tech Stack',
    techValue: 'Custom App',
    tags: ['Portal', 'Dashboard', 'System'],
    description:
      'A web-based internal platform focused on usability, reduced friction, and stronger information hierarchy for repeat daily tasks and team workflows.',
  },
]

const tagClassName =
  'inline-flex items-center rounded-full bg-[#566f0c] px-3 py-1 text-[0.72rem] font-medium text-[#dbff72] sm:text-[0.68rem]'

const truncateTitle = (title: string) =>
  title.length > 50 ? `${title.slice(0, 50)}...` : title

const CaseStudy = () => {
  const swiperRef = useRef<SwiperType | null>(null)

  const handlePrev = () => {
    if (!swiperRef.current) return
    swiperRef.current.slidePrev()
  }

  const handleNext = () => {
    if (!swiperRef.current) return
    swiperRef.current.slideNext()
  }

  return (
    <section className="space-y-10 overflow-x-clip">
      <SectionIntro
        topContent={
          <FeatureStrip
            text="Selected work"
            icon={<FolderKanban size={16} strokeWidth={2} />}
          />
        }
        title="A closer look at how we improve digital presence"
        description={
          <>
            100xlift helps businesses improve how they show up online and how well that
            presence supports lead generation.
          </>
        }
      />

      <div className="relative overflow-visible px-0 pb-6 pt-2 sm:px-6 lg:px-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-24 sm:block"
          style={{ background: 'linear-gradient(90deg, var(--page-bg) 0%, rgba(0,0,0,0) 100%)' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-24 sm:block"
          style={{ background: 'linear-gradient(270deg, var(--page-bg) 0%, rgba(0,0,0,0) 100%)' }}
        />
        <button
          type="button"
          aria-label="Previous case study"
          onClick={handlePrev}
          className="absolute left-4 top-[29%] z-20 flex size-14 -translate-y-1/2 items-center justify-center rounded-full border border-[#8fb109] bg-[#4f6906] text-[#d6ff56] transition hover:bg-[#5a7608] sm:left-6 sm:top-[34%] sm:size-12 lg:left-8 lg:size-10"
        >
          <ChevronLeft size={22} strokeWidth={2} />
        </button>

        <button
          type="button"
          aria-label="Next case study"
          onClick={handleNext}
          className="absolute right-4 top-[29%] z-20 flex size-14 -translate-y-1/2 items-center justify-center rounded-full border border-[#8fb109] bg-[#4f6906] text-[#d6ff56] transition hover:bg-[#5a7608] sm:right-6 sm:top-[34%] sm:size-12 lg:right-8 lg:size-10"
        >
          <ChevronRight size={22} strokeWidth={2} />
        </button>

        <Swiper
          centeredSlides
          initialSlide={1}
          rewind
          grabCursor
          watchSlidesProgress
          speed={700}
          spaceBetween={5}
          slidesPerView="auto"
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
          breakpoints={{
            768: {
              spaceBetween: 2,
            },
            1280: {
              spaceBetween: 10,
            },
          }}
          className="!overflow-visible"
        >
          {caseStudies.map((study) => (
            <SwiperSlide
              key={study.id}
              className="!h-auto !w-[92%] sm:!w-[82%] lg:!w-[70%]"
            >
              {({ isActive, isPrev, isNext }) => (
                  <article
                    className={`transition-all duration-500 ${
                      isActive
                        ? 'scale-100 opacity-100'
                        : isPrev || isNext
                          ? `${isPrev ? '-translate-x-3' : 'translate-x-3'} scale-[0.84] opacity-58`
                          : 'scale-[0.8] opacity-22'
                    }`}
                  >
                  <div className="relative overflow-hidden rounded-lg border border-white/20 bg-[#0d0d0d]">
                    <div className="relative aspect-[16/7.2] overflow-hidden rounded-lg">
                      <Image
                        src={study.image}
                        alt={study.title}
                        fill
                        className="object-cover object-top "
                        sizes="(max-width: 767px) 100vw, (max-width: 1279px) 75vw, 62vw"
                      />

                      {!isActive ? (
                        <>
                          <div className="absolute inset-y-0 left-0 w-[26%] bg-[linear-gradient(90deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0)_100%)]" />
                          <div className="absolute inset-y-0 right-0 w-[26%] bg-[linear-gradient(270deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0)_100%)]" />
                          <div className="absolute inset-0 bg-black/18" />
                        </>
                      ) : (
                        <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.22)_60%,rgba(0,0,0,0.42)_100%)]" />
                      )}
                    </div>
                  </div>

                  <div
                    className={`mx-auto max-w-[92%] pt-5 text-center transition-opacity duration-300 sm:max-w-[82%] ${
                      isActive ? 'opacity-100' : 'opacity-45'
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center gap-3 text-[var(--page-fg)] sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
                      <h3 className="text-[1.35rem] font-medium tracking-[-0.04em] text-[var(--page-fg)] sm:text-base sm:tracking-[-0.03em]">
                        {truncateTitle(study.title)}
                      </h3>
                      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                        <span className="text-[1.35rem] font-medium tracking-[-0.04em] text-[var(--page-fg)] sm:text-base sm:tracking-[-0.03em]">
                          {study.techLabel}
                        </span>
                        <span className={tagClassName}>{study.techValue}</span>
                      </div>
                      <div className="flex flex-wrap justify-center gap-2 sm:gap-1">
                        {study.tags.map((tag) => (
                          <span key={tag} className={tagClassName}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="relative mx-auto mt-5 max-w-[98%] sm:max-w-[94%]">
                      <p className="text-[0.92rem] font-light leading-[1.34] text-[var(--muted-fg)] dark:text-white/72 sm:text-xs sm:leading-[1.3]">
                        {study.description} {study.description}
                      </p>
                      <div
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-14"
                        style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, var(--page-bg) 82%, var(--page-bg) 100%)' }}
                      />
                    </div>

                    <button
                      type="button"
                      className="mt-5 text-[0.9rem] font-medium text-[var(--page-fg)] transition hover:text-[#d6ff56] sm:text-xs"
                    >
                      Read More
                    </button>
                  </div>
                </article>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default CaseStudy
export { caseStudies }
