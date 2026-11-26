
/* =========================================================
   DOM
========================================================= */

const projectsGrid = document.getElementById("projectsGrid");


/* =========================================================
   RENDER PROJECTS
========================================================= */

function renderProjects(filter = "all") {

    if (!projectsGrid) {
        return;
    }

    const filteredProjects =
        filter === "all"
            ? projects
            : projects.filter(project => project.category === filter);
// EMPTY CATEGORY
if (filteredProjects.length === 0) {

    projectsGrid.innerHTML = `
        <p class="portfolio-empty" role="status">
            ${portfolioTranslate("comingSoon")}
        </p>
    `;

    return;
}

    projectsGrid.innerHTML = filteredProjects
        .map(project => {

    const title = portfolioTranslate(project.titleKey);
    const categoryName = portfolioTranslate(project.category);

    return `
                <a
                    class="project-card"
                    href="${project.url}"
                   aria-label="${portfolioTranslate("openProject")} ${title}"
                >

                    <div class="project-image-wrapper">

                        <img
                            class="project-image"
                            src="${project.hero}"
                            alt="${title} — ${categoryName}"
                            loading="lazy"
                        >

                    </div>

                    <div class="project-info">

                        <div>

                            <div class="project-category">
    ${categoryName}
</div>

                            <h2 class="project-title">
    ${title}
</h2>

                        </div>

                        <div class="project-year">
                            ${project.year}
                        </div>

                    </div>

                </a>
            `;

        })
        .join("");
}


/* =========================================================
   FILTERS
========================================================= */

const filterButtons =
    document.querySelectorAll(".filter-button");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter =
            button.dataset.filter;


        filterButtons.forEach(item => {
            item.classList.remove("active");
        });


        button.classList.add("active");


        renderProjects(filter);

    });

});


/* =========================================================
   INITIALIZE
========================================================= */

renderProjects();
