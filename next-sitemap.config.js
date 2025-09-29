const fetch = require("node-fetch");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://scholar2-rdll.onrender.com",
  generateRobotsTxt: true,
  sitemapSize: 7000,

  additionalPaths: async () => {
    const extraPaths = [];

    try {
      const schemesRes = await fetch("https://scholar2-rdll.onrender.com/api/user/getAllSchemes", {
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

      const statesRes = await fetch("https://scholar2-rdll.onrender.com/api/user/getAllStates", {
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

      const categoryRes = await fetch("https://scholar2-rdll.onrender.com/api/user/getSchemesByCategory", {
        headers: { Accept: "application/json" },
      });

      if (categoryRes.ok) {
        const categoryData = await categoryRes.json();
        const categoryList = Array.isArray(categoryData.data) ? categoryData.data : categoryData;

        categoryList.forEach((category) => {
          extraPaths.push({
            loc: `/category/${category.slug}`, // adjust if your route is different
            changefreq: "weekly",
            priority: 0.7,
          });
        });
      } else {
        console.error("API Error (categories):", categoryRes.status, categoryRes.statusText);
      }

      return extraPaths;
    } catch (error) {
      console.error("Error fetching additional paths:", error);
      return extraPaths;
    }
  },
};
