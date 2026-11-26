/* =========================================================
   LANGUAGE
========================================================= */

const savedPortfolioLang = localStorage.getItem("lang");

const portfolioLang = ["uk", "en", "ru"].includes(savedPortfolioLang)
    ? savedPortfolioLang
    : "uk";

document.documentElement.lang = portfolioLang;


/* =========================================================
   TRANSLATION
========================================================= */

function portfolioTranslate(key) {

    return portfolioTranslations[portfolioLang]?.[key]
        ?? portfolioTranslations.uk[key]
        ?? key;

}


/* =========================================================
   TRANSLATE PAGE
========================================================= */

function translatePortfolioPage() {

    document.querySelectorAll("[data-i18n]").forEach(element => {

        const key = element.dataset.i18n;

        element.textContent = portfolioTranslate(key);

    });


    document.querySelectorAll("[data-i18n-aria]").forEach(element => {

        const key = element.dataset.i18nAria;

        element.setAttribute("aria-label", portfolioTranslate(key));

    });


    document.querySelectorAll("[data-i18n-alt]").forEach(element => {

        const key = element.dataset.i18nAlt;

        element.setAttribute("alt", portfolioTranslate(key));

    });


    document.querySelectorAll("[data-i18n-content]").forEach(element => {

        const key = element.dataset.i18nContent;

        element.setAttribute("content", portfolioTranslate(key));

    });

}


/* =========================================================
   INITIALIZE
========================================================= */

translatePortfolioPage();