export interface HeroBadge {
  text: string;
  showPulse: boolean;
}

export interface HeroHeading {
  line1: string;
  line2: string;
  highlight: string;
}

export interface HeroDescription {
  text: string;
  highlightedWord: string;
}

export interface CTAButton {
  text: string;
  path: string;
}

export interface HeroCTA {
  primary: CTAButton;
  secondary: CTAButton;
}

export interface HeroStat {
  number: string;
  label: string;
}

export interface FloatingElement {
  emoji: string;
  position: "right-top" | "left-bottom";
  size: "large" | "medium";
}

export interface ScrollIndicator {
  text: string;
  show: boolean;
}

export interface BackgroundImages {
  bg1: string;
  bg2: string;
}

export interface HeroData {
  badge: HeroBadge;
  heading: HeroHeading;
  description: HeroDescription;
  cta: HeroCTA;
  stats: HeroStat[];
  floatingElements: FloatingElement[];
  scrollIndicator: ScrollIndicator;
  backgroundImages: BackgroundImages;
}

export interface HeroJson {
  hero: HeroData;
}