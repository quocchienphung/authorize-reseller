import { BoutiqueSection, EditorialSections } from "./EditorialSections";
import { CarouselSection } from "./CarouselSection";
import { HeaderNavigation } from "./HeaderNavigation";
import { HeroStack } from "./HeroStack";
import { noveltyCards, serviceCards } from "./homepage-data";
import { NewsletterFooter } from "./NewsletterFooter";
import styles from "./AudemarsPiguet.module.css";

export function AudemarsPiguetHomepage() {
  return (
    <main className={styles.site}>
      <HeaderNavigation />
      <HeroStack />
      <CarouselSection
        primary="Our 2026"
        secondary="novelties"
        cards={noveltyCards}
        variant="novelties"
        href="https://www.audemarspiguet.com/us/en/watch/2026-novelties"
      />
      <EditorialSections />
      <CarouselSection primary="Our" secondary="Services" cards={serviceCards} variant="services" />
      <BoutiqueSection />
      <NewsletterFooter />
    </main>
  );
}

