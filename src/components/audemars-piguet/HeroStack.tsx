import Image from "next/image";
import { AutoVideo } from "./AutoVideo";
import { heroes } from "./homepage-data";
import { SectionHeading } from "./SectionHeading";
import styles from "./AudemarsPiguet.module.css";

export function HeroStack() {
  return (
    <div>
      {heroes.map((hero, index) => (
        <section className={styles.hero} key={hero.primary} aria-labelledby={`hero-${index}`}>
          <div className={styles.heroMedia}>
            {hero.video ? (
              <AutoVideo src={hero.video} label={`${hero.primary} ${hero.secondary}`} />
            ) : (
              <>
                <Image
                  className={`${styles.heroImage} ${styles.heroImageDesktop}`}
                  src={hero.image ?? ""}
                  alt=""
                  fill
                  preload={index === 0}
                  sizes="(max-width: 767px) 1px, 100vw"
                />
                <Image
                  className={`${styles.heroImage} ${styles.heroImageMobile}`}
                  src={hero.mobileImage ?? hero.image ?? ""}
                  alt=""
                  fill
                  sizes="(max-width: 767px) 100vw, 1px"
                />
              </>
            )}
          </div>
          <div className={styles.heroVeil} />
          <div className={styles.heroContent}>
            <SectionHeading
              as={index === 0 ? "h1" : "h2"}
              className={styles.heroHeading}
              primary={hero.primary}
              secondary={hero.secondary}
            />
            <p className={styles.heroDescription}>{hero.description}</p>
            <a className={styles.lineLink} href={hero.href}>
              Discover
            </a>
          </div>
        </section>
      ))}
    </div>
  );
}
