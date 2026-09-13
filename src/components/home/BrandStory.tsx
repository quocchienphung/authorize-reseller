import Image from "next/image";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { SectionHeading } from "@/components/typography/SectionHeading";
import { LineLink } from "@/components/ui/LineLink";
import { routes } from "@/config/site";
import { cn } from "@/lib/utils";

export type StoryChapter = {
  eyebrow: string;
  primary: string;
  secondary: string;
  paragraphs: readonly string[];
  image: { src: string; alt: string };
  link?: { label: string; href: string };
};

export const brandChapters = {
  origin: {
    eyebrow: "Sự ra đời của một thương hiệu",
    primary: "KHI BẢN LĨNH",
    secondary: "trở thành biểu tượng",
    paragraphs: [
      "“Alexander” gợi nhắc di sản của những nhà chinh phục vĩ đại — mạnh mẽ và can trường. “Ferros” bắt nguồn từ tiếng Latin, nghĩa là sắt thép — biểu tượng của sức mạnh và sự bền bỉ.",
      "Cái tên không chỉ là một thương hiệu, mà là một tuyên ngôn sống: “Bạn không đeo một chiếc đồng hồ — bạn mang bản lĩnh của mình trên cổ tay.”",
    ],
    image: { src: "/alexander-ferros/editorial/brand-origin.webp", alt: "Đồng hồ Alexander Ferros trên nền tối" },
  },
  founder: {
    eyebrow: "Đam mê gặp gỡ tay nghề",
    primary: "CHẾ TÁC",
    secondary: "bằng cả đam mê",
    paragraphs: [
      "Alexander Ferros được sáng lập bởi ông Alain Cao — chuyên gia với hơn 30 năm kinh nghiệm hợp tác cùng các thương hiệu danh tiếng toàn cầu.",
      "Thương hiệu ra đời từ khát vọng mang đến những cỗ máy thời gian tinh xảo về kỹ thuật lẫn thiết kế, phản chiếu phong cách sống hiện đại của người yêu đồng hồ trên khắp thế giới.",
    ],
    image: { src: "/alexander-ferros/editorial/founder.webp", alt: "Nhà sáng lập Alexander Ferros" },
  },
  quality: {
    eyebrow: "Chất lượng được kiểm chứng",
    primary: "NIỀM TIN",
    secondary: "được bảo chứng",
    paragraphs: [
      "Trước khi đến tay khách hàng, mỗi chiếc Alexander Ferros đều được kiểm tra và căn chỉnh bởi đội ngũ chuyên gia tại Trường Omega — trung tâm kỹ thuật đồng hồ hàng đầu Việt Nam.",
      "100% sản phẩm được kiểm định tại Việt Nam, đi kèm chứng nhận và thẻ bảo hành chính thức, hỗ trợ kỹ thuật trên toàn quốc.",
    ],
    image: { src: "/alexander-ferros/editorial/quality-control.webp", alt: "Kiểm định đồng hồ tại Trường Omega" },
    link: { label: "Tìm hiểu về bảo hành", href: routes.warranty },
  },
} as const satisfies Record<string, StoryChapter>;

type BrandStoryProps = {
  chapter: StoryChapter;
  /** Put the image on the right instead of the left. */
  reverse?: boolean;
};

/** Editorial split section: still image on one side, copy on the other. */
export function BrandStory({ chapter, reverse = false }: BrandStoryProps) {
  return (
    <section className="rail py-16 md:py-24" aria-label={chapter.primary}>
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div className={cn("relative aspect-square overflow-hidden", reverse && "md:order-2")} data-reveal="media">
          <Image src={chapter.image.src} alt={chapter.image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className={cn("flex flex-col", reverse && "md:order-1")} data-reveal>
          <Eyebrow>{chapter.eyebrow}</Eyebrow>
          <SectionHeading primary={chapter.primary} secondary={chapter.secondary} className="mt-5" />
          <div className="prose-brand type-body mt-8 max-w-[520px] text-paper/80">
            {chapter.paragraphs.map((paragraph) => (
              <p key={paragraph} className="m-0">
                {paragraph}
              </p>
            ))}
          </div>
          {chapter.link ? (
            <LineLink href={chapter.link.href} className="mt-8">
              {chapter.link.label}
            </LineLink>
          ) : null}
        </div>
      </div>
    </section>
  );
}
