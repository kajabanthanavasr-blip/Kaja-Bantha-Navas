/* =========================================================
   ACADEMIC PORTFOLIO JAVASCRIPT
   ========================================================= */


/* ================= MOBILE MENU ================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        const icon = menuToggle.querySelector("i");

        if (navMenu.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    /* Close menu when clicking a link */

    document.querySelectorAll(".nav-menu a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            const icon = menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });

}


/* ================= HEADER SCROLL ================= */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* ================= DARK MODE ================= */

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    themeToggle.innerHTML =
        '<i class="fas fa-sun"></i>';

}


if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        const isDark =
            document.body.classList.contains("dark-mode");

        localStorage.setItem(
            "portfolio-theme",
            isDark ? "dark" : "light"
        );

        themeToggle.innerHTML = isDark
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';

    });

}


/* ================= SCROLL REVEAL ================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* ================= STATISTICS COUNTER ================= */

const statNumbers =
    document.querySelectorAll(".stat-number");

let statsStarted = false;


function animateCounter(element) {

    const target =
        Number(element.dataset.target);

    let current = 0;

    const duration = 1500;

    const startTime = performance.now();


    function updateCounter(currentTime) {

        const elapsed =
            currentTime - startTime;

        const progress =
            Math.min(elapsed / duration, 1);

        const easedProgress =
            1 - Math.pow(1 - progress, 3);

        current =
            Math.floor(target * easedProgress);

        element.textContent = current;

        if (progress < 1) {

            requestAnimationFrame(updateCounter);

        } else {

            element.textContent = target + "+";

        }

    }


    requestAnimationFrame(updateCounter);

}


const statsSection =
    document.querySelector(".stats-section");


if (statsSection) {

    const statsObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting &&
                        !statsStarted
                    ) {

                        statsStarted = true;

                        statNumbers.forEach(number => {

                            animateCounter(number);

                        });

                    }

                });

            },
            {
                threshold: 0.3
            }
        );

    statsObserver.observe(statsSection);

}


/* ================= PUBLICATION FILTER ================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const publications =
    document.querySelectorAll(".publication-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter =
            button.dataset.filter;


        /* Active button */

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");


        /* Filter publications */

        publications.forEach(publication => {

            const category =
                publication.dataset.category;


            if (
                filter === "all" ||
                category === filter
            ) {

                publication.style.display = "grid";

                setTimeout(() => {

                    publication.style.opacity = "1";

                }, 50);

            } else {

                publication.style.opacity = "0";

                setTimeout(() => {

                    publication.style.display = "none";

                }, 200);

            }

        });

    });

});


/* ================= BACK TO TOP ================= */

const backToTop =
    document.getElementById("backToTop");


window.addEventListener("scroll", () => {

    if (window.scrollY > 600) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}


/* ================= CURRENT YEAR ================= */

const currentYear =
    document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* ================= ACTIVE NAVIGATION ================= */

const sections =
    document.querySelectorAll("main section[id]");

const navLinks =
    document.querySelectorAll(".nav-menu a");


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            current = section.id;

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add("active");

        }

    });

});