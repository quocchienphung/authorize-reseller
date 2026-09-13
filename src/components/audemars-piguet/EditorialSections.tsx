import Image from "next/image";
import { AutoVideo } from "./AutoVideo";
import { media } from "./homepage-data";
import { SectionHeading } from "./SectionHeading";
import styles from "./AudemarsPiguet.module.css";

type EditorialCopyProps = {
  primary: string;
  secondary: string;
  description: string;
  href?: string;
  compact?: boolean;
};

function EditorialCopy({ primary, secondary, description, href, compact = false }: EditorialCopyProps) {
  return (
    <section className={`${styles.editorialCopy} ${compact ? styles.editorialCopyCompact : ""}`}>
      <div className={styles.editorialCopyInner}>
        <SectionHeading primary={primary} secondary={secondary} />
        <div className={styles.editorialBody}>
          <p>{description}</p>
          {href ? <a className={styles.lineLink} href={href}>Discover more</a> : null}
        </div>
      </div>
    </section>
  );
}

type LookbookGridProps = {
  variant: "a" | "b";
  video: string;
  poster?: string;
  portraitOne: string;
  portraitTwo: string;
  landscapeOne: string;
  landscapeTwo: string;
};

function LookbookGrid({
  variant,
  video,
  poster,
  portraitOne,
  portraitTwo,
  landscapeOne,
  landscapeTwo,
}: LookbookGridProps) {
  return (
    <section className={styles.lookbook} aria-label={variant === "a" ? "AP and Yoon and Verbal lookbook" : "Audemars Piguet craftsmanship lookbook"}>
      <div className={`${styles.lookbookGrid} ${variant === "b" ? styles.lookbookGridB : ""}`}>
        <AutoVideo className={styles.lookbookSquare} src={video} poster={poster} label="Lookbook film" showControl={false} />
        <div className={styles.lookbookPortraitOne}><Image src={portraitOne} alt="Audemars Piguet editorial portrait" fill sizes="25vw" /></div>
        <div className={styles.lookbookLandscapeOne}><Image src={landscapeOne} alt="Audemars Piguet editorial landscape" fill sizes="25vw" /></div>
        <div className={styles.lookbookLandscapeTwo}><Image src={landscapeTwo} alt="Audemars Piguet editorial landscape" fill sizes="25vw" /></div>
        <div className={styles.lookbookPortraitTwo}><Image src={portraitTwo} alt="Audemars Piguet editorial portrait" fill sizes="25vw" /></div>
      </div>
    </section>
  );
}

type FeatureCardProps = {
  primary: string;
  secondary: string;
  description: string;
  href: string;
  image: string;
  alt: string;
};

function FeatureCard({ primary, secondary, description, href, image, alt }: FeatureCardProps) {
  return (
    <article className={styles.featureCard}>
      <a className={styles.featureCardImage} href={href} tabIndex={-1} aria-hidden="true">
        <Image src={image} alt={alt} fill sizes="(min-width: 768px) 50vw, 100vw" />
      </a>
      <div className={styles.featureCardCopy}>
        <SectionHeading primary={primary} secondary={secondary} as="h3" />
        <p>{description}</p>
        <a className={styles.lineLink} href={href}>Discover more</a>
      </div>
    </article>
  );
}

export function EditorialSections() {
  return (
    <>
      <EditorialCopy
        primary="YOON & VERBAL"
        secondary="REVEALING TIME"
        description="Born from collective energy, the limited-edition Royal Oak Concept designed in collaboration with Yoon and Verbal reflects a shared vision to focus on the essential, mirroring and emphasis on purpose and intent."
        href="https://www.audemarspiguet.com/us/en/watch/APxYV"
      />
      <LookbookGrid
        variant="a"
        video={media.yoonVideo}
        portraitOne={media.yoonPortraitOne}
        portraitTwo={media.yoonPortraitTwo}
        landscapeOne={media.yoonLandscapeOne}
        landscapeTwo={media.yoonLandscapeTwo}
      />
      <EditorialCopy
        primary="Crafting time"
        secondary="since 1875"
        description="Our craftsmanship thrives at the crossroads of tradition and innovation. Guided by the collective expertise of artisans across generations, every line, component and gesture brings aesthetic expression and technical mastery forward together."
        compact
      />
      <LookbookGrid
        variant="b"
        video={media.craftVideo}
        poster={media.craftPoster}
        portraitOne={media.craftPortraitOne}
        portraitTwo={media.craftPortraitTwo}
        landscapeOne={media.craftLandscapeOne}
        landscapeTwo={media.craftLandscapeTwo}
      />

      <section className={styles.featurePair} aria-label="Audemars Piguet experiences">
        <FeatureCard
          primary="Musée Atelier"
          secondary="Audemars Piguet"
          description="Experience our heritage, craftsmanship and connection to the world in the Musée Atelier Audemars Piguet which pays tribute to the craftspeople who have made what Audemars Piguet is today, generation after generation."
          href="https://museeatelier.audemarspiguet.com"
          image={media.museum}
          alt="The Musée Atelier Audemars Piguet in Le Brassus, Switzerland."
        />
        <FeatureCard
          primary="Watchmaking"
          secondary="Experiences"
          description="Discover the fascinating universe of Haute Horlogerie through hands‑on experiences that reveal the expertise Audemars Piguet has honed for generations. Register for an upcoming masterclass and enjoy an immersive watchmaking experience."
          href="https://www.audemarspiguet.com/us/en/masterclasses"
          image={media.masterclass}
          alt="A watch movement being assembled by a watchmaker."
        />
      </section>

      <section className={styles.splitFeature} aria-labelledby="chronicles-heading">
        <div className={styles.splitFeatureCopy}>
          <SectionHeading primary="AP" secondary="CHRONICLES" as="h2" />
          <p>Travel back in time and immerse yourself into Audemars Piguet&apos;s universe through enriched articles, technical sheets of models and calibres as well as exclusive anecdotes and archival footages uncovered by our Heritage team.</p>
          <a className={styles.lineLink} href="https://apchronicles.audemarspiguet.com/en">Discover more</a>
        </div>
        <a className={styles.splitFeatureImage} href="https://apchronicles.audemarspiguet.com/en" aria-label="Discover AP Chronicles">
          <Image src={media.chronicles} alt="Publications dedicated to the Royal Oak from 1972 to 2021." fill sizes="(min-width: 1025px) 50vw, 100vw" />
        </a>
      </section>
    </>
  );
}

export function BoutiqueSection() {
  return (
    <section className={`${styles.splitFeature} ${styles.boutiqueFeature}`} aria-labelledby="boutique-heading">
      <a className={styles.splitFeatureImage} href="https://www.audemarspiguet.com/us/en/stores" aria-label="Explore all boutiques">
        <Image src={media.boutique} alt="Inside an Audemars Piguet boutique." fill sizes="(min-width: 1025px) 60vw, 100vw" />
      </a>
      <div className={styles.splitFeatureCopy}>
        <SectionHeading primary="Find a" secondary="boutique" as="h2" />
        <p>We invite you to visit our AP Houses and boutiques to explore a variety of Audemars Piguet timepieces and receive expert watch servicing from our skilled professionals, by appointment or walk-in.</p>
        <a className={styles.lineLink} href="https://www.audemarspiguet.com/us/en/stores">Explore all boutiques</a>
      </div>
    </section>
  );
}
