export type HeroItem = {
  primary: string;
  secondary: string;
  description: string;
  href: string;
  image?: string;
  mobileImage?: string;
  video?: string;
};

export type CarouselCard = {
  title: string;
  description: string;
  href: string;
  image: string;
  alt: string;
};

export const siteAssetRoot = "/sites/www-audemarspiguet-com-14def314/us--en--home-a310b589";
const mediaRoot = `${siteAssetRoot}/media`;

export const heroes: HeroItem[] = [
  {
    primary: "ROYAL OAK OFFSHORE",
    secondary: "TIME TO GO OFFLINE",
    description: "The Royal Oak Offshore carries its bold, oversized and high‑performance DNA into summer with striking new iterations.",
    href: "https://www.audemarspiguet.com/us/en/watch/royal-oak-offshore-summer-2026",
    image: `${mediaRoot}/91cc16d1-header_desktop_roo_summer_v4.jpg`,
    mobileImage: `${mediaRoot}/10e24199-header_narrow_roo_summer_v4.jpg`,
  },
  {
    primary: "NO ONE SHAPES",
    secondary: "TIME ALONE",
    description: "RAYE returns to the Montreux Jazz Festival with a bespoke live show opening the Festival's 60th edition. Co-created with APxMusic, this rare concert will reflect RAYE’s interpretation of time.",
    href: "https://www.audemarspiguet.com/us/en/news/music/no-one-shapes-time-alone-with-raye",
    video: `${mediaRoot}/53d234af-header_video_raye_hp0626_v3.mp4`,
  },
  {
    primary: "the Neo Frame",
    secondary: "Jumping Hour",
    description: "A daring fusion of Art Deco elegance and modern innovation, the Neo Frame Jumping Hour revives a historic complication dating back to 1650, where numbers leap every 60 minutes in place of traditional hands.",
    href: "https://www.audemarspiguet.com/us/en/collections/neo-frame-collection",
    video: `${mediaRoot}/73e78943-Neo_Frame_0626_v4.mp4`,
  },
];

export const noveltyCards: CarouselCard[] = [
  {
    title: "Neo Frame Jumping Hour",
    description: "Vintage inspiration meets modern ingenuity in the new Neo Frame Jumping Hour.",
    href: "https://www.audemarspiguet.com/us/en/watch-collection/neo-frame/15245OR.OO.A206VE.01",
    image: `${mediaRoot}/80080c81-carnov_02.avif`,
    alt: "Close up of the Neo Frame Jumping Hour watch.",
  },
  {
    title: "Royal Oak Offshore Diver",
    description: "This sporty 42 mm reference pairs a deep teal dial with pink gold accents, showcasing the collection’s commitment to creative expression and technical performance.",
    href: "https://www.audemarspiguet.com/us/en/watch-collection/royal-oak-offshore/15720ST.OO.A403CA.01",
    image: `${mediaRoot}/d441b27d-carnov_12.avif`,
    alt: "Close up of a Royal Oak Offshore watch.",
  },
  {
    title: "Royal Oak Offshore Selfwinding Chronograph",
    description: "This 37 mm titanium Royal Oak Offshore, framed by a diamond‑set bezel, is powered by Calibre 6401, the Manufacture’s latest integrated selfwinding chronograph movement, blending sporty codes with a refined pink aesthetic.",
    href: "https://www.audemarspiguet.com/us/en/watch-collection/royal-oak-offshore/26430IS.ZZ.A514CA.01-B",
    image: `${mediaRoot}/62871581-car_hp_26430IS.ZZ.A514CA.01-B-1.avif`,
    alt: "Close up of a Royal Oak Offshore watch.",
  },
  {
    title: "Royal Oak Offshore Selfwinding Chronograph",
    description: "Presented in stainless steel, this sporty wristwatch brings a vibrant edge to the collection's powerful design through energetic orange accents.",
    href: "https://www.audemarspiguet.com/us/en/watch-collection/royal-oak-offshore/26238ST.OO.A001VE.01",
    image: `${mediaRoot}/14204d8b-car_hp_26238ST-OO-A001VE-01-1.avif`,
    alt: "Close up of a Royal Oak Offshore watch.",
  },
  {
    title: "Royal Oak Concept Flying Tourbillon",
    description: "Created in collaboration with Yoon and Verbal, this Royal Oak Concept Flying Tourbillon brings bold minimalism into a compact 38.5 mm titanium case.",
    href: "https://www.audemarspiguet.com/us/en/watch-collection/royal-oak-concept/26643TI.OO.D002CA.01",
    image: `${mediaRoot}/572c5465-carouselHP_novelties_500x662_apxyv_roc_noir.avif`,
    alt: "Close up of a Royal Oak Concept watch.",
  },
  {
    title: "Établisseurs Galets",
    description: "A sculptural timepiece inspired by the water-polished stones of the Vallée de Joux, shaped around the hand‑finished Calibre 3098.",
    href: "https://www.audemarspiguet.com/us/en/watch-collection/Etablisseurs/75220BA.OO.7522BA.01",
    image: `${mediaRoot}/4a731388-carouselHP_novelties_500x662_galets_V2.avif`,
    alt: "Close-up of an Établisseurs watch.",
  },
  {
    title: "150 Heritage Ultra-complication Universal Calendar",
    description: "This ultra-complicated pocket watch stands as a tribute to rare métiers d’art and the enduring spirit of craftsmanship.",
    href: "https://www.audemarspiguet.com/us/en/watch-collection/150-heritage/75150PT.OO.01",
    image: `${mediaRoot}/25c913ac-carnov_01.avif`,
    alt: "Close up of the 150 Heritage watch.",
  },
  {
    title: "Code 11.59 by Audemars Piguet Selfwinding Flying Tourbillon",
    description: "Showcasing an ethereal flying tourbillon, this complication combines technical sophistication with contemporary contrast.",
    href: "https://www.audemarspiguet.com/us/en/watch-collection/code-1159/26396NB.OO.D002CR.01",
    image: `${mediaRoot}/95db2895-carnov_03.avif`,
    alt: "Close up of a Code 11.59 by Audemars Piguet watch.",
  },
  {
    title: "Royal Oak Selfwinding Perpetual Calendar",
    description: "Combining refined aesthetics with technical mastery, this 41 mm Perpetual Calendar is crafted entirely in “Bleu Nuit, Nuage 50” ceramic and powered by Calibre 7138.",
    href: "https://www.audemarspiguet.com/us/en/watch-collection/royal-oak/26674CD.OO.1225CD.01",
    image: `${mediaRoot}/b3315676-carnov_14.avif`,
    alt: "Close up of a Royal Oak watch.",
  },
  {
    title: "Royal Oak Selfwinding Chronograph",
    description: "Adorned with brilliant-cut diamonds, the bezel of this 38 mm Chronograph adds a dazzling accent to a technical milestone, the new Calibre 6401.",
    href: "https://www.audemarspiguet.com/us/en/watch-collection/royal-oak/26450OR.ZZ.1356OR.01-B",
    image: `${mediaRoot}/6885af5a-carnov_04.avif`,
    alt: "Close up of a Royal Oak watch.",
  },
  {
    title: "Royal Oak Mini Quartz",
    description: "Jewellery artistry and watchmaking savoir-faire converge in this 23 mm Royal Oak Mini adorned with a mother-of-pearl.",
    href: "https://www.audemarspiguet.com/us/en/watch-collection/royal-oak/67630BA.OO.1312BA.03-B",
    image: `${mediaRoot}/43b71234-carnov_05.avif`,
    alt: "Close up of a Royal Oak watch.",
  },
  {
    title: "Code 11.59 by Audemars Piguet Selfwinding Perpetual Calendar Openworked",
    description: "This timepiece welcomes an openworked perpetual calendar, whose sapphire dial reveals the movement’s mechanical heart.",
    href: "https://www.audemarspiguet.com/us/en/watch-collection/code-1159/26443NB.OO.D002CR.01",
    image: `${mediaRoot}/1c8a5547-carnov_06.avif`,
    alt: "Close up of a Code 11.59 by Audemars Piguet watch.",
  },
  {
    title: "Royal Oak Selfwinding Perpetual Calendar Openworked",
    description: "Calibre 7139 takes centre stage in this openworked reference combining ergonomic innovation with a striking blend of titanium and Bulk Metallic Glass.",
    href: "https://www.audemarspiguet.com/us/en/watch-collection/royal-oak/26685XT.OO.1320XT.01",
    image: `${mediaRoot}/8889157f-carnov_07.avif`,
    alt: "Close up of a Royal Oak watch.",
  },
  {
    title: "Royal Oak Selfwinding",
    description: "Blending the radiance of yellow gold with the unique beauty of natural malachite, this model celebrates the artistry of stone dials - making each watch a singular expression of elegance and craftsmanship.",
    href: "https://www.audemarspiguet.com/us/en/watch-collection/royal-oak/15513BA.OO.1320BA.01",
    image: `${mediaRoot}/3be0483b-carnov_10.avif`,
    alt: "Close up of a Royal Oak watch.",
  },
  {
    title: "Royal Oak Offshore Selfwinding Chronograph",
    description: "Blending cutting-edge technology with fine watchmaking, this 43 mm Chronograph features a deep blue “Bleu Nuit, Nuage 50” ceramic case and a beige Méga Tapisserie dial, extending the Offshore line with vibrant contrasts and innovative materials.",
    href: "https://www.audemarspiguet.com/us/en/watch-collection/royal-oak-offshore/26420CD.OO.A029VE.01",
    image: `${mediaRoot}/7cb1fccc-carnov_13.avif`,
    alt: "Close up of a Royal Oak Offshore watch.",
  },
  {
    title: "Code 11.59 by Audemars Piguet Selfwinding",
    description: "Embracing intense dark tones, this model pairs a black embossed dial with a matching alligator strap, creating an elegant and timeless allure.",
    href: "https://www.audemarspiguet.com/us/en/watch-collection/code-1159/77410OR.OO.A127CR.01",
    image: `${mediaRoot}/84a59540-carnov_09.avif`,
    alt: "Close up of a Code 11.59 by Audemars Piguet watch.",
  },
  {
    title: "Royal Oak \"Jumbo\" Extra-Thin Openworked",
    description: "Presented in titanium with BMG accents, the original “Jumbo” model features a refined monochromatic design enhanced by intricate openworking, offering a captivating view of Calibre 7124.",
    href: "https://www.audemarspiguet.com/us/en/watch-collection/royal-oak/16204XT.OO.1240XT.01",
    image: `${mediaRoot}/4533dad0-carnov_11.avif`,
    alt: "Close up of a Royal Oak watch.",
  },
];

export const serviceCards: CarouselCard[] = [
  {
    title: "Find your watch",
    description: "Compare models to find your perfect timepiece.",
    href: "https://www.audemarspiguet.com/us/en/watch-collection?compare=true",
    image: `${mediaRoot}/e70a6a36-car_HP_services_vert_watchbrowser_03.avif`,
    alt: "Lifestyle shoot of a Royal Oak watch.",
  },
  {
    title: "Book an appointment",
    description: "Experience our collections in person and receive expert watch servicing from our skilled professionals.",
    href: "https://www.audemarspiguet.com/us/en/form/appointment",
    image: `${mediaRoot}/9f0679bb-car_HP_services_vert_appointment02.avif`,
    alt: "Inside view of an Audemars Piguet boutique.",
  },
  {
    title: "Online service request",
    description: "Fill in the following form to request a service or an official document. In some countries, you can benefit from a complimentary pick-up service for your watch.",
    href: "https://www.audemarspiguet.com/us/en/secure/form/pick-up-request",
    image: `${mediaRoot}/e77bfd36-car_HP_services_vert_online_service_request.avif`,
    alt: "A Royal Oak watch being serviced.",
  },
  {
    title: "Activate your AP Coverage service",
    description: "2-year complimentary service protecting AP watches from burglary and robbery as well as functional damage.",
    href: "https://www.audemarspiguet.com/us/en/services/ap-coverage",
    image: `${mediaRoot}/ad1d98fa-car_HP_services_vert_APcoverage.avif`,
    alt: "A model wearing a Royal Oak watch.",
  },
  {
    title: "Extend your warranty",
    description: "The extension from 2 to 5 years is available for watches purchased within the last 2 years through our authorized network.",
    href: "https://www.audemarspiguet.com/us/en/secure/form/extend-warranty",
    image: `${mediaRoot}/e2cfc6ae-car_HP_services_vert_warranty.avif`,
    alt: "Lifestyle shoot of a Royal Oak watch.",
  },
];

export const menuGroups = {
  Collections: ["All watches", "2026 novelties", "Code 11.59 by Audemars Piguet", "Royal Oak", "Royal Oak Offshore", "Royal Oak Concept", "Neo Frame", "150 Heritage", "Établisseurs"],
  "Savoir-Faire": ["Expertise & innovation", "Haute Horlogerie", "Complications", "Watch design", "Finishing", "Materials", "Restoration", "Établisseurs"],
  "Our World": ["Latest stories", "Who we are", "Culture", "Experiences", "APxMusic", "Art", "Golf"],
  Services: ["Caring for your watch", "Online services", "Book an appointment", "Find a boutique", "Assistance", "AP Coverage service"],
} as const;

export const footerGroups = [
  {
    title: "Watches",
    links: ["All Watches", "New Releases", "Code 11.59 by Audemars Piguet", "Royal Oak", "Royal Oak Offshore", "Royal Oak Concept"],
  },
  {
    title: "Services",
    links: ["Find a boutique", "Online service request", "Extend your warranty", "AP Coverage service", "Contact us", "FAQ"],
  },
  {
    title: "Legal",
    links: ["Terms of Use", "Privacy Notice", "Cookie Policy", "General Terms of Sale", "Masterclasses Terms of Sale", "Customer Service Terms & Conditions", "International Sales Warranty", "Accessibility"],
  },
  {
    title: "Company",
    links: ["Join Audemars Piguet", "Press", "Audemars Piguet Foundations", "Sustainability"],
  },
];

export const media = {
  yoonVideo: `${mediaRoot}/2c470109-hp_lb_yv_video.mp4`,
  yoonPortraitOne: `${mediaRoot}/d3f36d82-lb_v1_apxyv-1.avif`,
  yoonPortraitTwo: `${mediaRoot}/b00e07fa-lb_v2_apxyv-1.avif`,
  yoonLandscapeOne: `${mediaRoot}/27299f54-lb_h1_apxyv-1.avif`,
  yoonLandscapeTwo: `${mediaRoot}/beac8a9a-lb_h2_apxyv-1.avif`,
  craftVideo: `${mediaRoot}/a1a545dd-CODE_UNIVERSELLE_brandCampaign.mp4`,
  craftPoster: `${mediaRoot}/1056c846-lb_thumbnail.jpg`,
  craftPortraitOne: `${mediaRoot}/5d897bde-lb_v1_wave2.avif`,
  craftPortraitTwo: `${mediaRoot}/33d0137d-lb_v2_wave2.avif`,
  craftLandscapeOne: `${mediaRoot}/34cb2b0e-lb_h1_wave2.avif`,
  craftLandscapeTwo: `${mediaRoot}/9737a961-lb_h2_wave2.avif`,
  museum: `${mediaRoot}/5576a8c7-Musee_HP-2.jpg`,
  masterclass: `${mediaRoot}/8e023f9f-masterclasses_img_HP.jpg`,
  chronicles: `${mediaRoot}/a0799271-header_APChronicles_1920x1129_v2-2.jpg`,
  boutique: `${mediaRoot}/b5eecf83-AP_img_find_boutique_v2.jpg`,
  chroniclesLogo: `${mediaRoot}/6604cc22-ap-20chronicles.svg`,
  museumLogo: `${mediaRoot}/a0e05911-maap.-20logos.svg`,
  foundationsLogo: `${mediaRoot}/961be75f-AP-20Foundations-20White.svg`,
};
