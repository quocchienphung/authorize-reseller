import { AutoVideo } from "./AutoVideo";
import { SectionHeading } from "./SectionHeading";
import styles from "./Site.module.css";

const heroes = [
  {
    primary: "ALEXANDER FERROS",
    secondary: "OFFICIAL COLLECTION",
    description: "Khám phá trọn bộ đồng hồ Alexander Ferros dành cho nam và nữ.",
    href: "/san-pham",
    video: "/alexander-ferros/videos/official-film.mp4",
  },
  {
    primary: "INSIDE THE",
    secondary: "ATELIER",
    description: "Video chính thức từ Alexander Ferros.",
    href: "/san-pham",
    video: "/alexander-ferros/videos/atelier.mp4",
  },
] as const;

export function HeroStack() {
  return (
    <div>
      {heroes.map((hero, index) => (
        <section className={styles.hero} key={hero.primary} aria-labelledby={`hero-${index}`}>
          <div className={styles.heroMedia}>
            <AutoVideo src={hero.video} label={`${hero.primary} ${hero.secondary}`} />
          </div>
          <div className={styles.heroVeil} />
          <div className={styles.heroContent}>
            <SectionHeading as={index === 0 ? "h1" : "h2"} className={styles.heroHeading} primary={hero.primary} secondary={hero.secondary} />
            <p className={styles.heroDescription}>{hero.description}</p>
            <a className={styles.lineLink} href={hero.href}>Khám phá sản phẩm</a>
          </div>
        </section>
      ))}
    </div>
  );
}
