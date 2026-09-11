/* =========================================================
   IMAGE VIEWER
========================================================= */

const imageViewer =
    document.getElementById("imageViewer");

const viewerStage =
    document.getElementById("viewerStage");

const viewerImage =
    document.getElementById("viewerImage");

const viewerClose =
    document.getElementById("viewerClose");

const zoomOutButton =
    document.getElementById("zoomOut");

const zoomInButton =
    document.getElementById("zoomIn");

const zoomResetButton =
    document.getElementById("zoomReset");

const zoomValue =
    document.getElementById("zoomValue");


/* =========================================================
   STATE
========================================================= */

let imageZoom = 1;

let imagePositionX = 0;
let imagePositionY = 0;

let isDragging = false;

let dragStartX = 0;
let dragStartY = 0;

let dragInitialX = 0;
let dragInitialY = 0;


/* =========================================================
   OPEN
========================================================= */

function openImageViewer(src, alt = "") {

    if (!imageViewer || !viewerImage) {
        return;
    }

    viewerImage.src = src;
    viewerImage.alt = alt;

    imageZoom = 1;

    imagePositionX = 0;
    imagePositionY = 0;

    updateImageTransform();

    imageViewer.classList.add("active");

    document.body.style.overflow = "hidden";
}


/* =========================================================
   CLOSE
========================================================= */

function closeImageViewer() {

    if (!imageViewer) {
        return;
    }

    imageViewer.classList.remove("active");

    document.body.style.overflow = "";

    isDragging = false;
}


/* =========================================================
   TRANSFORM
========================================================= */

function updateImageTransform() {

    if (!viewerImage) {
        return;
    }

    viewerImage.style.transform =
        `translate(${imagePositionX}px, ${imagePositionY}px) scale(${imageZoom})`;


    if (zoomValue) {

        zoomValue.textContent =
            `${Math.round(imageZoom * 100)}%`;

    }
}


/* =========================================================
   ZOOM
========================================================= */

function setZoom(
    newZoom,
    mouseX = null,
    mouseY = null
) {

    if (!viewerImage) {
        return;
    }

    const oldZoom = imageZoom;

    newZoom =
        Math.max(
            1,
            Math.min(5, newZoom)
        );


    if (
        mouseX !== null &&
        mouseY !== null &&
        oldZoom !== newZoom
    ) {

        const rect =
            viewerImage.getBoundingClientRect();


        const imageCenterX =
            rect.left + rect.width / 2;

        const imageCenterY =
            rect.top + rect.height / 2;


        const mouseOffsetX =
            mouseX - imageCenterX;

        const mouseOffsetY =
            mouseY - imageCenterY;


        const zoomRatio =
            newZoom / oldZoom;


        imagePositionX -=
            mouseOffsetX * (zoomRatio - 1);

        imagePositionY -=
            mouseOffsetY * (zoomRatio - 1);

    }


    imageZoom = newZoom;


    if (imageZoom === 1) {

        imagePositionX = 0;
        imagePositionY = 0;

    }


    updateImageTransform();
}


/* =========================================================
   BUTTONS
========================================================= */

if (zoomOutButton) {

    zoomOutButton.addEventListener("click", () => {

        setZoom(imageZoom - 0.25);

    });

}


if (zoomInButton) {

    zoomInButton.addEventListener("click", () => {

        setZoom(imageZoom + 0.25);

    });

}


if (zoomResetButton) {

    zoomResetButton.addEventListener("click", () => {

        setZoom(1);

    });

}


/* =========================================================
   WHEEL ZOOM
========================================================= */

if (viewerStage) {

    viewerStage.addEventListener(
        "wheel",
        event => {

            if (!imageViewer.classList.contains("active")) {
                return;
            }

            event.preventDefault();


            const direction =
                event.deltaY < 0
                    ? 0.15
                    : -0.15;


            setZoom(
                imageZoom + direction,
                event.clientX,
                event.clientY
            );

        },
        { passive: false }
    );

}
/* =========================================================
   DRAG — MOUSE + TOUCH
========================================================= */

if (viewerImage) {

    viewerImage.addEventListener(
        "pointerdown",
        event => {

            if (imageZoom <= 1) {
                return;
            }

            isDragging = true;

            viewerImage.classList.add("dragging");

            dragStartX = event.clientX;
            dragStartY = event.clientY;

            dragInitialX = imagePositionX;
            dragInitialY = imagePositionY;

            viewerImage.setPointerCapture(event.pointerId);

            event.preventDefault();

        }
    );


    viewerImage.addEventListener(
        "pointermove",
        event => {

            if (!isDragging) {
                return;
            }

            imagePositionX =
                dragInitialX +
                (event.clientX - dragStartX);

            imagePositionY =
                dragInitialY +
                (event.clientY - dragStartY);

            updateImageTransform();

        }
    );


    viewerImage.addEventListener(
        "pointerup",
        event => {

            if (!isDragging) {
                return;
            }

            isDragging = false;

            viewerImage.classList.remove("dragging");

            viewerImage.releasePointerCapture(
                event.pointerId
            );

        }
    );


    viewerImage.addEventListener(
        "pointercancel",
        () => {

            isDragging = false;

            viewerImage.classList.remove("dragging");

        }
    );

}
/* =========================================================
   DOUBLE CLICK
========================================================= */

if (viewerImage) {

    viewerImage.addEventListener(
        "dblclick",
        event => {

            event.preventDefault();


            if (imageZoom === 1) {

                setZoom(
                    2,
                    event.clientX,
                    event.clientY
                );

            } else {

                setZoom(1);

            }

        }
    );

}


/* =========================================================
   CLOSE BUTTON
========================================================= */

if (viewerClose) {

    viewerClose.addEventListener(
        "click",
        closeImageViewer
    );

}


/* =========================================================
   CLICK OUTSIDE IMAGE
========================================================= */

if (viewerStage) {

    viewerStage.addEventListener(
        "click",
        event => {

            if (event.target === viewerStage) {

                closeImageViewer();

            }

        }
    );

}


/* =========================================================
   ESCAPE
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (!imageViewer) {
            return;
        }


        if (
            event.key === "Escape" &&
            imageViewer.classList.contains("active")
        ) {

            closeImageViewer();

        }


        if (
            !imageViewer.classList.contains("active")
        ) {
            return;
        }


        if (event.key === "+") {

            setZoom(imageZoom + 0.25);

        }


        if (event.key === "=") {

            setZoom(imageZoom + 0.25);

        }


        if (event.key === "-") {

            setZoom(imageZoom - 0.25);

        }


        if (event.key === "0") {

            setZoom(1);

        }

    }
);


/* =========================================================
   PAGE IMAGES
========================================================= */

const viewerTriggers =
    document.querySelectorAll("[data-viewer-image]");


viewerTriggers.forEach(image => {

    image.addEventListener("click", () => {

        openImageViewer(
            image.dataset.viewerImage,
            image.alt
        );

    });

});
/* =========================================================
   PROJECT NAVIGATION
========================================================= */

const currentProjectUrl =
    window.location.pathname.split("/").pop();

const currentProjectIndex =
    projects.findIndex(
        project => project.url === currentProjectUrl
    );

if (currentProjectIndex !== -1) {

    const totalProjects = projects.length;

    const previousProject =
        projects[
            (currentProjectIndex - 1 + totalProjects) %
            totalProjects
        ];

    const nextProject =
        projects[
            (currentProjectIndex + 1) %
            totalProjects
        ];


    /* COUNTER */

    const projectCounter =
        document.querySelector(".project-counter");

    if (projectCounter) {

        projectCounter.textContent =
            `${String(currentProjectIndex + 1).padStart(2, "0")} / ${String(totalProjects).padStart(2, "0")}`;

    }


    /* PREVIOUS */

    const previousLink =
        document.querySelector(
            ".project-nav-link:not(.next)"
        );

    if (previousLink) {

        previousLink.href =
            previousProject.url;

        const previousTitle =
            previousLink.querySelector(
                ".project-nav-title"
            );

        if (previousTitle) {

            previousTitle.textContent =
                previousProject.title;

        }

    }


    /* NEXT */

    const nextLink =
        document.querySelector(
            ".project-nav-link.next"
        );

    if (nextLink) {

        nextLink.href =
            nextProject.url;

        const nextTitle =
            nextLink.querySelector(
                ".project-nav-title"
            );

        if (nextTitle) {

            nextTitle.textContent =
                nextProject.title;

        }

    }

}