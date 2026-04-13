import React from 'react'
import Image from 'next/image'
import { Handshake,MoveUpRight } from 'lucide-react'

import FeatureStrip from './FeatureStrip'
import SectionIntro from './SectionIntro'
import { CTAButton } from './ui/cta-button'

type IntroCard = {
  id: number
  title: string
  image: string
  imageClassName?: string
}

const introCards: IntroCard[] = [
  {
    id: 1,
    title: 'Custom websites built for business goals',
    image: '/showcase-images/1.webp',
  },
  {
    id: 2,
    title: 'E-commerce websites that support sales',
    image: '/showcase-images/2.webp',
  },
  {
    id: 3,
    title: 'WordPress, Shopify, Webflow, and CMS builds',
    image: '/showcase-images/3.webp',
  },
  {
    id: 4,
    title: 'Custom portals and web-based systems',
    image: '/showcase-images/4.webp',
  },
  {
    id: 5,
    title: 'Landing pages designed to generate leads',
    image: '/showcase-images/5.webp',
  },
  {
    id: 6,
    title: 'Website redesigns and platform migrations',
    image: '/showcase-images/6.webp',
  },
  {
    id: 7,
    title: 'UI/UX that improves clarity and flow',
    image: '/showcase-images/7.webp',
  },
  {
    id: 8,
    title: 'Better structure for user journeys',
    image: '/showcase-images/8.webp',
  },
  {
    id: 9,
    title: 'SEO that improves visibility',
    image: '/showcase-images/9.png',
  },
  {
    id: 10,
    title: 'Ongoing support, updates, and growth',
    image: '/showcase-images/10.webp',
  },
  {
    id: 11,
    title: 'Brand-consistent digital presentation',
    image: '/showcase-images/11.webp',
  },
  {
    id: 12,
    title: 'Content layouts that support action',
    image: '/showcase-images/12.webp',
  },
]

type IntroCardItemProps = IntroCard & {
  tall?: boolean
}

const IntroCardItem = ({ title, image, imageClassName, tall = false }: IntroCardItemProps) => {
  return (
    <article
      className={`flex flex-col justify-between overflow-hidden rounded-[18px] border border-[#c6fb36]/16 bg-[linear-gradient(180deg,#1b1f10_0%,#111406_52%,#0a0a08_100%)] pt-4 px-4 text-white ${
        tall ? 'min-h-[480px]' : 'min-h-[232px]'
      }`}
    >
      <h3 className="max-w-[260px] text-[17px] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[18px]">
        {title}
      </h3>

      <div className="relative mt-4 min-h-[140px] flex-1 overflow-hidden rounded-tl-[18px] rounded-tr-[18px]">
        <Image
          src={image}
          alt={title}
          fill
          className={`object-cover object-top ${imageClassName ?? ''}`}
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
        />
      </div>
    </article>
  )
}

const NowIntroducing = () => {
  const topLeftCards = [introCards[0], introCards[1], introCards[4], introCards[5]]
  const topRightCards = [introCards[2], introCards[3]]
  const bottomLeftCards = [introCards[6], introCards[7]]
  const bottomRightCards = [introCards[8], introCards[9], introCards[10], introCards[11]]

  return (
    <section className="space-y-10">
      <SectionIntro
        topContent={
          <FeatureStrip
            text="Now introduce 100xlift."
            icon={<Handshake size={16} strokeWidth={2} />}
          />
        }
        title="We fix the parts of your digital presence that quietly kill growth"
        description={
          <>
            100xlift helps businesses improve how they show up online and how well that
            presence supports lead generation.
          </>
        }
      />

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.15fr_1.45fr]">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {topLeftCards.map((card) => (
              <IntroCardItem key={card.id} {...card} />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {topRightCards.map((card) => (
              <IntroCardItem key={card.id} {...card} tall />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.45fr_1.15fr]">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {bottomLeftCards.map((card) => (
              <IntroCardItem key={card.id} {...card} tall />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {bottomRightCards.map((card) => (
              <IntroCardItem key={card.id} {...card} />
            ))}
          </div>
        </div>
      </div>

            <div className='flex justify-center'>
            <CTAButton variant="secondary" text='Talk About Your Project' icon={<MoveUpRight size={18} strokeWidth={2} />}/>

            </div>


    </section>
  )
}

export default NowIntroducing
export { introCards }
