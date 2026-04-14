import type React from 'react'
import ShowcaseDetailsSection from './showcase-details-section'
import ShowcaseFeatureSection from './showcase-feature-section'
import ShowcaseFirstSection from './showcase-first-section'
import ShowcaseOtherProjectsSlider, { type OtherProjectItem } from './showcase-other-projects-slider'
import SiteFooter from '../SiteFooter'

type CaseStudyPopupContentProps = {
  title: string
  techValue?: string
  onOpenOtherProject?: (project: OtherProjectItem) => void
  description?: string
  heroImage?: string
}

const CaseStudyPopupContent = ({
  title,
  techValue,
  onOpenOtherProject,
  description = '',
  heroImage = '/showcase-images/3.webp',
}: CaseStudyPopupContentProps) => {
  return (
    <section className="w-full bg-black py-4 text-white">
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
