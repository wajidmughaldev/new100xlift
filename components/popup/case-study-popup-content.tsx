import type React from 'react'
import ShowcaseDetailsSection from './showcase-details-section'
import ShowcaseFeatureSection from './showcase-feature-section'
import ShowcaseFirstSection from './showcase-first-section'
import SiteFooter from '../SiteFooter'

type CaseStudyPopupContentProps = {
  title: string
  techValue?: string
  description?: string
  heroImage?: string
}

const CaseStudyPopupContent = ({
  title,
  techValue,
  description = '',
  heroImage = '/showcase-images/3.webp',
}: CaseStudyPopupContentProps) => {
  return (
    <section className="rounded-lg w-full bg-[var(--page-bg)] py-4 text-[var(--page-fg)]">
      <ShowcaseFirstSection
        title={`${title}${techValue ? ` - ${techValue}` : ''}`}
        description={description}
        heroImage={heroImage}
      />

      <ShowcaseDetailsSection />
      <ShowcaseFeatureSection />
      {/* <ShowcaseOtherProjectsSlider
        desktopSlidesVisible={3}
        onProjectOpen={onOpenOtherProject}
      /> */}
      <SiteFooter/>
    </section>
  )
}

export default CaseStudyPopupContent
