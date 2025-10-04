const fetch = require("node-fetch");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://govtschemeguide.com/",
  generateRobotsTxt: true,
  sitemapSize: 7000,

  additionalPaths: async () => {
    const extraPaths = [];

    try {
      // Existing fetch for all schemes (non-category based)
      const schemesRes = await fetch("https://scholar2-rdll.onrender.com/api/user/getAllSchemes", {
        headers: { Accept: "application/json" },
      });

      if (schemesRes.ok) {
        const schemesData = await schemesRes.json();
        const schemesList = Array.isArray(schemesData.data) ? schemesData.data : schemesData;

        schemesList.forEach((scheme) => {
          extraPaths.push({
            loc: `/schemes/${scheme.slug}`,
            changefreq: "weekly",
            priority: 0.7,
          });
        });
      } else {
        console.error("API Error (schemes):", schemesRes.status, schemesRes.statusText);
      }

      // Existing fetch for all states
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

      // Existing fetch for categories
      const categoryRes = await fetch("https://scholar2-rdll.onrender.com/api/user/getSchemesByCategory", {
        headers: { Accept: "application/json" },
      });

      let categoryList = [];
      if (categoryRes.ok) {
        const categoryData = await categoryRes.json();
        categoryList = Array.isArray(categoryData.data) ? categoryData.data : categoryData;

        categoryList.forEach((category) => {
          extraPaths.push({
            loc: `/category/${category.slug}`,
            changefreq: "weekly",
            priority: 0.7,
          });
        });
      } else {
        console.error("API Error (categories):", categoryRes.status, categoryRes.statusText);
      }

      // New: Pagination to fetch ALL schemes for each category
      const schemesPerPage = 100;

      for (const category of categoryList) {
        let skip = 0;
        let totalSchemes = Infinity;

        while (skip < totalSchemes) {
          const res = await fetch(
            `https://scholar2-rdll.onrender.com/api/user/getAllSchemes?categorySlug=${category.slug}&limit=${schemesPerPage}&skip=${skip}`,
            {
              headers: { Accept: "application/json" },
            }
          );

          if (!res.ok) {
            console.error(`Failed to fetch schemes for category ${category.slug}, ${res.status}`);
            break;
          }

          const data = await res.json();
          const schemes = Array.isArray(data.data) ? data.data : data;

          // totalSchemes might be in data.totalCount or data.total
          if (data.totalCount !== undefined) {
            totalSchemes = data.totalCount;
          } else if (data.total !== undefined) {
            totalSchemes = data.total;
          } else {
            if (schemes.length < schemesPerPage) {
              break;
            }
          }

          schemes.forEach((scheme) => {
            extraPaths.push({
              loc: `/schemes/${scheme.slug}`,
              changefreq: "weekly",
              priority: 0.7,
            });
          });

          skip += schemesPerPage;
        }
      }

      return extraPaths;
    } catch (error) {
      console.error("Error fetching additional paths:", error);
      return extraPaths;
    }
  },
};
