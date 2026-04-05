import { Metadata } from "next";
import dynamic from "next/dynamic";

// Loading Skeletons
const LoadingSkeleton = () => (
  <div className="w-full h-screen animate-pulse bg-gray-900/50" />
);

const SectionSkeleton = () => (
  <div className="w-full h-96 animate-pulse bg-gray-900/30" />
);

// ✅ Hero - SSR true for SEO (important for first fold)
const Hero = dynamic(() => import("@/components/Hero"), {
  loading: () => <LoadingSkeleton />,
  ssr: true, // SEO ke liye important
});

// ✅ Below the fold components - lazy load with ssr: false
const Works = dynamic(() => import("@/components/Works"), {
  loading: () => <SectionSkeleton />,
  ssr: false,
});

const Services = dynamic(() => import("@/components/Services"), {
  loading: () => <SectionSkeleton />,
  ssr: false,
});

const OurWork = dynamic(() => import("@/components/OurWork"), {
  loading: () => <SectionSkeleton />,
  ssr: false,
});

const Industries = dynamic(() => import("@/components/Industries"), {
  loading: () => <SectionSkeleton />,
  ssr: false,
});

const TechMarquee = dynamic(() => import("@/components/TechMarquee"), {
  loading: () => <SectionSkeleton />,
  ssr: false,
});

const CustomerStats = dynamic(() => import("@/components/CustomerStats"), {
  loading: () => <SectionSkeleton />,
  ssr: false,
});

const CTA = dynamic(() => import("@/components/CTA"), {
  loading: () => <SectionSkeleton />,
  ssr: false,
});

export const metadata: Metadata = {
  title:
    "Cod Active | Best Software & Web Development Company in Surat, Gujarat",
  description:
    "Cod Active is the best software development company in Surat. We offer custom website development, mobile app development, UI/UX design, e-commerce solutions, and IT consulting. Get a free quote today!",
  keywords: [
    "software company in surat",
    "web development company surat",
    "best IT company surat",
    "mobile app development surat",
    "custom software development surat",
  ],
  openGraph: {
    title: "Cod Active | Best Software Development Company in Surat",
    description:
      "Transform your business with custom software solutions, web development, and mobile apps.",
    url: "https://codactive.com",
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Works />

      <Services />
      <OurWork />
      <Industries />
      <TechMarquee />
      <CustomerStats />

      <CTA />
    </main>
  );
}
