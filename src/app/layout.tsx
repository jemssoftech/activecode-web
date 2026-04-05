// app/layout.tsx
import { Urbanist } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import ContentProtection from "@/components/ContentProtection";

// Urbanist Font
const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-urbanist",
  display: "swap",
});

const DOMAIN_URL =
  process.env.NEXT_PUBLIC_DOMAIN_NAME || "https://jemssoftech.com";

export const metadata = {
  metadataBase: new URL(DOMAIN_URL),

  title: {
    default: "Jems Softech | Best Software & Web Development Company in Surat",
    template: "%s | Jems Softech - IT Solutions",
  },

  description:
    "Jems Softech is a leading software development company in Surat, Gujarat. We specialize in custom website development, mobile app development, UI/UX design, e-commerce solutions, and digital transformation services. Get innovative IT solutions for your business growth.",

  keywords: [
    // ========== Brand Keywords ==========
    "Jems Softech",
    "JemsSoftech",
    "Jems Software",
    "Jems Softech Surat",
    "Jems Softech IT Company",
    "Jems Softech Software Agency",
    "Jems Softech Services",
    "Jems Softech Reviews",
    "Jems Softech Portfolio",

    // ========== Local SEO - Surat (High Conversion) ==========
    "software company in surat",
    "IT company in surat",
    "best software company in surat",
    "top IT company in surat",
    "website development company in surat",
    "web development company surat",
    "mobile app development company in surat",
    "app development company surat",
    "custom software development surat",
    "web design company in surat",
    "IT services company in surat",
    "software development surat",
    "best website development surat",
    "ecommerce website development surat",
    "ui ux design company surat",
    "digital marketing company surat",
    "seo company in surat",
    "IT company near me",
    "software company near me",
    "web developer in surat",
    "app developer in surat",

    // ========== Gujarat State SEO ==========
    "software company in gujarat",
    "IT company in gujarat",
    "best software company in gujarat",
    "website development company in gujarat",
    "mobile app development gujarat",
    "custom software development gujarat",
    "top IT company in gujarat",
    "web development services gujarat",

    // ========== India-Level SEO (High Volume) ==========
    "software development company india",
    "IT services company india",
    "website development company india",
    "mobile app development company india",
    "best software company in india",
    "top IT company in india",
    "custom software development company india",
    "web development company india",
    "app development company india",
    "ecommerce development company india",
    "software outsourcing company india",
    "IT outsourcing india",

    // ========== Core Services (Evergreen) ==========
    "IT services company",
    "software development company",
    "website development services",
    "web development services",
    "mobile app development",
    "android app development",
    "ios app development",
    "cross platform app development",
    "react native development",
    "flutter app development",
    "custom software development",
    "web design and development",
    "responsive website design",
    "e-commerce website development",
    "online store development",
    "shopify development",
    "woocommerce development",
    "UI UX design services",
    "user interface design",
    "user experience design",
    "business automation software",
    "enterprise software solutions",
    "cloud computing services",
    "aws services",
    "IT consulting company",
    "technology consulting",
    "digital transformation services",
    "software maintenance and support",
    "IT outsourcing services",
    "B2B software solutions",
    "B2C software solutions",
    "technology solutions provider",
    "professional IT services",
    "managed IT services",

    // ========== Website Development Types ==========
    "corporate website development",
    "business website development",
    "portfolio website development",
    "landing page development",
    "static website development",
    "dynamic website development",
    "cms website development",
    "wordpress website development",
    "custom website development",
    "website redesign services",
    "website maintenance services",

    // ========== Modern Tech Keywords (2024-2025) ==========
    "next.js development",
    "react.js development",
    "node.js development",
    "mern stack development",
    "mean stack development",
    "full stack development",
    "frontend development",
    "backend development",
    "SaaS application development",
    "SaaS product development",
    "startup software development",
    "mvp development",
    "web application development",
    "progressive web app development",
    "pwa development",
    "AI powered software solutions",
    "AI integration services",
    "machine learning solutions",
    "chatbot development",
    "fintech software development",
    "healthcare software development",
    "edtech software development",
    "real estate software development",
    "logistics software development",
    "dashboard design and development",
    "admin panel development",
    "CRM software development",
    "custom crm development",
    "ERP software solutions",
    "custom erp development",
    "API development services",
    "REST API development",
    "GraphQL development",
    "microservices development",
    "cloud native development",
    "devops services",
    "ci cd pipeline",

    // ========== E-commerce Keywords ==========
    "ecommerce website development",
    "online store development",
    "ecommerce solutions",
    "multi vendor marketplace development",
    "b2b ecommerce development",
    "b2c ecommerce development",
    "payment gateway integration",
    "shopping cart development",

    // ========== Marketing & Growth Keywords ==========
    "SEO services",
    "search engine optimization",
    "digital marketing services",
    "digital marketing company",
    "social media marketing",
    "performance marketing services",
    "google ads services",
    "facebook ads services",
    "content marketing services",
    "email marketing services",
    "business growth solutions",
    "lead generation services",
    "conversion optimization",

    // ========== Industry Specific ==========
    "healthcare app development",
    "hospital management software",
    "school management software",
    "college management software",
    "hotel management software",
    "restaurant management software",
    "inventory management software",
    "billing software development",
    "accounting software development",
    "hr management software",
    "project management software",
    "gym management software",
    "salon management software",
    "real estate website development",
    "property management software",

    // ========== Authority & Trust Keywords ==========
    "best software company",
    "top IT company",
    "trusted software development partner",
    "reliable IT company",
    "custom IT solutions provider",
    "end to end software development",
    "affordable software development",
    "quality software development",
    "experienced software developers",
    "professional web developers",
    "certified developers",
    "on time project delivery",
    "24/7 support",

    // ========== Question-Based Keywords (Voice Search) ==========
    "how to develop a website",
    "how much does website development cost",
    "how much does app development cost",
    "best company for website development",
    "best company for app development",
    "which company is best for software development",
    "how to create an ecommerce website",
    "how to build a mobile app",

    // ========== Long Tail Keywords ==========
    "affordable website development services in surat",
    "best mobile app development company in surat",
    "custom software development services in surat",
    "professional web design services in surat",
    "top rated IT company in surat",
    "hire web developers in surat",
    "hire app developers in surat",
    "hire dedicated developers in surat",
    "offshore development company in india",
    "white label software development",
    "software development for startups",
    "enterprise application development",
  ],

  authors: [
    { name: "Jems Softech", url: DOMAIN_URL },
    { name: "Jenish Desai", url: DOMAIN_URL },
  ],

  creator: "Jems Softech",
  publisher: "Jems Softech",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: DOMAIN_URL,
    siteName: "Jems Softech",
    title: "Jems Softech | Best Software & Web Development Company in Surat",
    description:
      "Leading software development company in Surat offering custom website development, mobile app development, UI/UX design, and digital transformation services. Transform your business with innovative IT solutions.",
    images: [
      {
        url: `${DOMAIN_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Jems Softech - Software Development Company",
        type: "image/jpeg",
      },
      {
        url: `${DOMAIN_URL}/og-image-square.jpg`,
        width: 600,
        height: 600,
        alt: "Jems Softech Logo",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@jemssoftech",
    creator: "@jemssoftech",
    title: "Jems Softech | Best Software & Web Development Company",
    description:
      "Custom software development, website development, mobile app development & IT solutions. Transform your business with Jems Softech.",
    images: [`${DOMAIN_URL}/twitter-image.jpg`],
  },

  alternates: {
    canonical: DOMAIN_URL,
    languages: {
      "en-IN": DOMAIN_URL,
      "en-US": DOMAIN_URL,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#8B5CF6" },
    ],
  },

  manifest: "/site.webmanifest",

  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    other: {
      "msvalidate.01": "your-bing-verification-code",
    },
  },

  category: "Technology",

  other: {
    "geo.region": "IN-GJ",
    "geo.placename": "Surat",
    "geo.position": "21.1702;72.8311",
    ICBM: "21.1702, 72.8311",
    "msapplication-TileColor": "#0a0a0a",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "format-detection": "telephone=no",
  },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${DOMAIN_URL}/#organization`,
      name: "Jems Softech",
      url: DOMAIN_URL,
      logo: {
        "@type": "ImageObject",
        url: `${DOMAIN_URL}/logo.png`,
        width: 200,
        height: 60,
      },
      description:
        "Leading software development company in Surat, Gujarat specializing in custom software, web development, mobile apps, and IT solutions.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Your Street Address",
        addressLocality: "Surat",
        addressRegion: "Gujarat",
        postalCode: "395007",
        addressCountry: "IN",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91-94094-27142",
          contactType: "sales",
          email: "jemssoftech@gmail.com",
          areaServed: ["IN", "US", "GB", "AE", "AU"],
          availableLanguage: ["English", "Hindi", "Gujarati"],
        },
      ],
      sameAs: [
        "https://www.linkedin.com/company/jemssoftech",
        "https://www.instagram.com/jemssoft",
      ],
      foundingDate: "2020",
      founders: [
        {
          "@type": "Person",
          name: "Jenish Desai",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${DOMAIN_URL}/#website`,
      url: DOMAIN_URL,
      name: "Jems Softech",
      description: "Best Software & Web Development Company in Surat, Gujarat",
      publisher: {
        "@id": `${DOMAIN_URL}/#organization`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: `${DOMAIN_URL}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${DOMAIN_URL}/#localbusiness`,
      name: "Jems Softech",
      image: `${DOMAIN_URL}/office.jpg`,
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Your Street Address",
        addressLocality: "Surat",
        addressRegion: "Gujarat",
        postalCode: "395007",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 21.1702,
        longitude: 72.8311,
      },
      telephone: "+91-94094-27142",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "09:00",
          closes: "14:00",
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "50",
      },
    },
    {
      "@type": "ProfessionalService",
      name: "Jems Softech",
      serviceType: [
        "Software Development",
        "Web Development",
        "Mobile App Development",
        "UI/UX Design",
        "E-commerce Development",
        "Digital Marketing",
        "IT Consulting",
      ],
      areaServed: {
        "@type": "Country",
        name: "India",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={urbanist.variable}>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>

      <body
        className={`${urbanist.className} bg-dark text-white min-h-screen antialiased`}
      >
        <ContentProtection />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
