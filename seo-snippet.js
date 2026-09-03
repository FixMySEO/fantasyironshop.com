// Single-file SEO snippet (CONFIG + META_DATA + LD_DATA + runtime)

(function () {
  "use strict";


  const CONFIG = {
    baseUrlFallback: "https://www.fantasyironshop.com",
    googleSiteVerification: ""
  };

  // === DATA (from your previous meta-tags.js) ===
  const META_DATA = {"meta_tags_list":[{"page_url":"https://www.fantasyironshop.com/","title_tag":"Metal Sculptures Loveland & Fine Art | Fantasy Iron Shop","meta_description":"Welded steel sculptures and fine art by sculptor Jay Tamlin in Loveland, Colorado. Visit our Loveland art studio for custom metal art and unique gifts Colorado."},{"page_url":"https://www.fantasyironshop.com/shop","title_tag":"Custom Metal Art & Metal Art Coasters | Fantasy Iron Shop","meta_description":"Shop welded steel art, metal art coasters, decorative steel roses, and unique gifts Colorado. Discover custom metal art from sculptor Jay Tamlin at Fantasy Iron Shop."},{"page_url":"https://www.fantasyironshop.com/s-projects-basic","title_tag":"Fine Art Colorado Awards & Publications | Fantasy Iron Shop","meta_description":"Explore awards and publications featuring welded steel art and fine art Colorado by sculptor Jay Tamlin of Fantasy Iron Shop, a Loveland art studio."},{"page_url":"https://www.fantasyironshop.com/team-3","title_tag":"Loveland Art Studio Events & Fine Art | Fantasy Iron Shop","meta_description":"Find Loveland art studio events and Fine Art Colorado shows featuring metal sculptures Loveland and welded steel art by sculptor Jay Tamlin."},{"page_url":"https://www.fantasyironshop.com/copy-of-octopus","title_tag":"Metal Sculptures Loveland “Come To Me” | Fantasy Iron Shop","meta_description":"View “Come To Me,” a powerful welded steel art sculpture by Loveland, Colorado sculptor Jay Tamlin. Fine Art Colorado from Fantasy Iron Shop."},{"page_url":"https://www.fantasyironshop.com/projects-8","title_tag":"Welded Steel Art Project Progressions | Fantasy Iron Shop","meta_description":"See project progressions of welded steel art and metal sculptures Loveland by sculptor Jay Tamlin at Fantasy Iron Shop, a Fine Art Colorado studio."}],"keywords":["Metal Sculptures Loveland","Fine Art Colorado","Sculptor Jay Tamlin","Fantasy Iron Shop","Welded Steel Art","Custom Metal Art","Loveland Art Studio","Unique Gifts Colorado","Metal Art Coasters","Decorative Steel Roses"]};

  // === DATA (from your previous LD.js) ===
  const LD_DATA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.fantasyironshop.com/#localbusiness",
  "name": "Fantasy Iron Shop",
  "url": "https://www.fantasyironshop.com/",
  "description": "Fantasy Iron Shop is a sculpture shop and fine art studio in Loveland, Colorado, featuring welded steel sculptures and mixed-medium metal artwork by metalsmith and artist Jay Tamlin.",
  "image": [
    "https://static.wixstatic.com/media/c0dcf1_313800b00b9641e28210323e86be30ac%7Emv2.jpg/v1/fill/w_192%2Ch_192%2Clg_1%2Cusm_0.66_1.00_0.01/c0dcf1_313800b00b9641e28210323e86be30ac%7Emv2.jpg",
    "https://static.wixstatic.com/media/c0dcf1_b962a34989bd4789b8c547614c5830bc~mv2.jpg/v1/crop/x_0,y_115,w_1422,h_914/fill/w_550,h_350,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/LR2B4935-2_edited_edited_edited.jpg"
  ],
  "logo": "https://static.wixstatic.com/media/c0dcf1_313800b00b9641e28210323e86be30ac%7Emv2.jpg/v1/fill/w_192%2Ch_192%2Clg_1%2Cusm_0.66_1.00_0.01/c0dcf1_313800b00b9641e28210323e86be30ac%7Emv2.jpg",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Loveland",
    "addressRegion": "Colorado",
    "addressCountry": "US"
  },
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "Loveland, Colorado"
  },
  "priceRange": "$$",
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": "en"
    }
  ],
  "founder": {
    "@type": "Person",
    "name": "Jay Tamlin",
    "jobTitle": "Metalsmith and mixed-medium artist"
  },
  "sameAs": [],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Welded steel sculptures and fine art",
    "url": "https://www.fantasyironshop.com/shop"
  }
};

  /* ===== Helpers ===== */
  function clamp(str, max) {
    if (typeof str !== "string") str = String(str ?? "");
    return str.length <= max ? str : str.slice(0, Math.max(0, max - 1)) + "…";
  }

  function stripTrailingSlash(p) {
    if (!p) return "/";
    return p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
  }

  function normalizePathFromUrl(url) {
    try {
      const u = new URL(url);
      return stripTrailingSlash(u.pathname || "/");
    } catch {
      const m = String(url || "").match(/^https?:\/\/[^/]+(\/[^?#]*)?/i);
      return stripTrailingSlash((m && m[1]) || "/");
    }
  }

  function removeLangPrefix(pathname) {
    const m = String(pathname || "/").match(
      /^\/([a-z]{2}(?:-[A-Z]{2})?)(?=\/|$)(.*)$/
    );
    if (!m) return pathname || "/";
    const rest = stripTrailingSlash(m[2] || "/");
    return rest || "/";
  }

  function currentPagePath() {
    const path = window.location.pathname || "/";
    return stripTrailingSlash(path || "/");
  }

  function currentKeyCandidates() {
    const path = currentPagePath();
    const origin = (window.location.origin || "").replace(/\/$/, "");
    const full = origin + path;

    if (path === "/") {
      return [full, "/"];
    }

    const noLang = removeLangPrefix(path);
    return [full, path, stripTrailingSlash(path), noLang, stripTrailingSlash(noLang)];
  }

  function buildIndex(metaJson) {
    const list = (metaJson && metaJson.meta_tags_list) || [];
    const index = {};
    for (const item of list) {
      const path = normalizePathFromUrl(item.page_url);
      let origin = "";
      try {
        origin = new URL(item.page_url).origin;
      } catch {
        origin = "";
      }
      const full = origin ? origin.replace(/\/$/, "") + path : "";

      const entry = {
        title: item.title_tag || "",
        description: item.meta_description || "",
      };

      index[path] = entry;
      index[stripTrailingSlash(path)] = entry;
      if (full) index[full] = entry;
    }
    return index;
  }

  function _stripQuotes(s) {
    return String(s ?? "")
      .replace(/["'“”‘’„«»]/g, "")
      .replace(/\s+/g, " ")
      .replace(/^[\s\-–—·,;:]+|[\s\-–—·,;:]+$/g, "")
      .trim();
  }

  function normalizeKeywordsList(input, opts) {
    const { maxKeywords = 20 } = opts || {};
    if (input == null) return [];
    let items = Array.isArray(input)
      ? input.slice()
      : typeof input === "string"
      ? input.split(",")
      : [];
    const seen = new Set();
    return items
      .map(_stripQuotes)
      .filter((s) => s && s.length >= 2)
      .filter((s) => {
        const k = s.toLowerCase();
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      })
      .slice(0, maxKeywords);
  }

  function normalizeKeywords(input, opts) {
    const { maxKeywords = 20, maxLength = 280 } = opts || {};
    const list = normalizeKeywordsList(input, { maxKeywords });
    const content = list.join(", ");
    return content.length > maxLength ? content.slice(0, maxLength) : content;
  }

  function applyAltFallbacks(keywordsPool) {
    if (!Array.isArray(keywordsPool) || keywordsPool.length === 0) return;
    try {
      const images = Array.from(document.querySelectorAll("img"));
      let i = 0;
      images.forEach((img) => {
        const curAlt = (img.getAttribute("alt") || "").trim().toLowerCase();
        const shouldReplace =
          !curAlt ||
          curAlt.endsWith(".jpg") ||
          curAlt.endsWith(".png") ||
          curAlt === "image" ||
          curAlt === "img";
        if (shouldReplace) {
          img.setAttribute("alt", keywordsPool[i % keywordsPool.length]);
          i++;
        }
      });
    } catch {
      /* ignore */
    }
  }

  function optimizeImages() {
    try {
      const images = Array.from(document.querySelectorAll("img"));
      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              io.unobserve(img);
              // hook for tracking / lazy work if needed
            }
          });
        });
        images.forEach((img, index) => {
          if (index > 0) io.observe(img);
        });
      }
    } catch (err) {
      console.error("Image optimization error:", err);
    }
  }

  function upsertMeta(nameOrProperty, content, useProperty) {
    const selector = useProperty
      ? `meta[property="${nameOrProperty}"]`
      : `meta[name="${nameOrProperty}"]`;
    let el = document.head.querySelector(selector);
    if (!el) {
      el = document.createElement("meta");
      if (useProperty) el.setAttribute("property", nameOrProperty);
      else el.setAttribute("name", nameOrProperty);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  }

  function upsertLink(rel, href) {
    let link = document.head.querySelector(`link[rel="${rel}"]`);
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", rel);
      document.head.appendChild(link);
    }
    link.setAttribute("href", href);
  }

  function injectJsonLd(ldObject) {
    if (!ldObject) return;
    try {
      const existing = Array.from(
        document.head.querySelectorAll('script[type="application/ld+json"]')
      );
      existing.forEach((el) => {
        el.parentNode.removeChild(el);
      });

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(ldObject);
      document.head.appendChild(script);
    } catch (err) {
      console.error("Error injecting JSON-LD:", err);
    }
  }

  function applyJsonLd() {
    injectJsonLd(LD_DATA);
  }

  function applySeoFromJson() {
    try {
      const metaJson = META_DATA;
      const index = buildIndex(metaJson);

      const path = currentPagePath();
      const isHome = path === "/";

      const fallbackBase =
        (CONFIG && CONFIG.baseUrlFallback) ? CONFIG.baseUrlFallback : "";
      const baseUrl = (window.location.origin || fallbackBase).replace(/\/$/, "");
      const canonicalUrl = baseUrl + path;

      const keys = currentKeyCandidates();
      let entry = null;
      for (const k of keys) {
        if (index[k]) {
          entry = index[k];
          break;
        }
      }

      if (!entry) {
        return normalizeKeywordsList(metaJson.keywords, { maxKeywords: 25 });
      }

      const title = clamp(entry.title, 60);
      const desc = clamp(entry.description, 185);

      document.title = title;

      const metaList = [
        { type: "name", key: "description", content: desc },
        { type: "property", key: "og:url", content: canonicalUrl },
        { type: "name", key: "resource-hints", content: "preload" },
        { type: "name", key: "format-detection", content: "telephone=yes" },
        { type: "name", key: "mobile-web-app-capable", content: "yes" },
        { type: "name", key: "apple-mobile-web-app-capable", content: "yes" },
      ];

      // opcjonalnie dodaj google-site-verification, jeśli jest w CONFIG
      if (CONFIG && CONFIG.googleSiteVerification) {
        metaList.push({
          type: "name",
          key: "google-site-verification",
          content: CONFIG.googleSiteVerification
        });
      }

      if (isHome && metaJson && metaJson.keywords) {
        const kwContent = normalizeKeywords(metaJson.keywords, {
          maxKeywords: 25,
          maxLength: 512,
        });
        if (kwContent) {
          metaList.push({ type: "name", key: "keywords", content: kwContent });
        }
      }

      metaList.forEach((m) => {
        upsertMeta(m.key, m.content, m.type === "property");
      });

      upsertLink("canonical", canonicalUrl);

      return normalizeKeywordsList(metaJson.keywords, { maxKeywords: 25 });
    } catch (err) {
      console.error("Error meta settings:", err);
      return [];
    }
  }

  function initSnippetSEO() {
    const keywordsPool = applySeoFromJson();
    const path = currentPagePath();
    if (path === "/") {
      applyJsonLd();
    }
    optimizeImages();
    applyAltFallbacks(keywordsPool);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSnippetSEO);
  } else {
    initSnippetSEO();
  }
})();
