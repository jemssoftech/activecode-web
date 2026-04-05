/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_DOMAIN_NAME ,
    generateRobotsTxt: true, // (optional)
    sitemapSize: 7000,
    changefreq: "weekly",
  priority: 0.7,
   robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};
