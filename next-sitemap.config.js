const fetch = require("node-fetch");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://govtschemeguide.com/",
  generateRobotsTxt: true,
  sitemapSize: 7000,

  additionalPaths: async () => {
    const extraPaths = [];

    try {
      const schemesRes = await fetch("https://govt-scheme-guide-api.onrender.com/api/user/getAllSchemes", {
        headers: { Accept: "application/json" },
      });

      if (schemesRes.ok) {
        const schemesData = await schemesRes.json();
        const schemesList = Array.isArray(schemesData.data) ? schemesData.data : schemesData;

        schemesList.forEach((scheme) => {
          extraPaths.push({
            loc: `/schemes/${scheme.slug}`, // or scheme.slug
            changefreq: "weekly",
            priority: 0.7,
          });
        });
      } else {
        console.error("API Error (schemes):", schemesRes.status, schemesRes.statusText);
      }

      const statesRes = await fetch("https://govt-scheme-guide-api.onrender.com/api/user/getAllStates", {
        headers: { Accept: "application/json" },
      });

      if (statesRes.ok) {
        const statesData = await statesRes.json();
        const statesList = Array.isArray(statesData.data) ? statesData.data : statesData;

        statesList.forEach((state) => {
          extraPaths.push({
            loc: `/state/${state.slug}`,
            changefreq: "weekly",
            priority: 0.7,
          });
        });
      } else {
        console.error("API Error (states):", statesRes.status, statesRes.statusText);
      }

      return extraPaths;
    } catch (error) {
      console.error("Error fetching additional paths:", error);
      return extraPaths;
    }
  },
};
