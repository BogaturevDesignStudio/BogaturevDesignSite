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

    /* COMMON TEXT */

    document.querySelectorAll("[data-i18n]").forEach(element => {

        const key = element.dataset.i18n;

        element.textContent = portfolioTranslate(key);

    });


    /* COMMON ARIA */

    document.querySelectorAll("[data-i18n-aria]").forEach(element => {

        const key = element.dataset.i18nAria;

        element.setAttribute("aria-label", portfolioTranslate(key));

    });


    /* COMMON ALT */

    document.querySelectorAll("[data-i18n-alt]").forEach(element => {

        const key = element.dataset.i18nAlt;

        element.setAttribute("alt", portfolioTranslate(key));

    });


    /* COMMON META CONTENT */

    document.querySelectorAll("[data-i18n-content]").forEach(element => {

        const key = element.dataset.i18nContent;

        element.setAttribute("content", portfolioTranslate(key));

    });


    /* INDIVIDUAL PROJECT TRANSLATIONS */

    if (portfolioLang !== "uk") {

        /* PROJECT TEXT */

        document.querySelectorAll(`[data-${portfolioLang}]`).forEach(element => {

            element.textContent = element.getAttribute(`data-${portfolioLang}`);

        });


        /* PROJECT ALT */

        document.querySelectorAll(`[data-alt-${portfolioLang}]`).forEach(element => {

            element.setAttribute(
                "alt",
                element.getAttribute(`data-alt-${portfolioLang}`)
            );

        });


        /* PROJECT META CONTENT */

        document.querySelectorAll(`[data-content-${portfolioLang}]`).forEach(element => {

            element.setAttribute(
                "content",
                element.getAttribute(`data-content-${portfolioLang}`)
            );

        });

    }

}


/* =========================================================
   INITIALIZE
========================================================= */

translatePortfolioPage();
