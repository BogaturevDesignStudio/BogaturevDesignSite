
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


    projectsGrid.innerHTML = filteredProjects
        .map(project => {

            return `
                <a
                    class="project-card"
                    href="${project.url}"
                    aria-label="Open project ${project.title}"
                >

                    <div class="project-image-wrapper">

                        <img
                            class="project-image"
                            src="${project.hero}"
                            alt="${project.title} — ${project.categoryName}"
                            loading="lazy"
                        >

                    </div>

                    <div class="project-info">

                        <div>

                            <div class="project-category">
                                ${project.categoryName}
                            </div>

                            <h2 class="project-title">
                                ${project.title}
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