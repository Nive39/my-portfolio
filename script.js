
/* =========================
   1. HOME PAGE TYPING EFFECT
========================= */

const typingText = document.getElementById("typing-text");

if (typingText) {
    const roles = [
        "Java Developer",
        "Software Developer",
        "Problem Solver"
    ];

    let role = 0;
    let char = 0;
    let deleting = false;

    function typeRole() {
        const current = roles[role];
        typingText.textContent = current.slice(0, char);

        if (!deleting && char < current.length) {
            char++;
        } else if (deleting && char > 0) {
            char--;
        } else if (!deleting) {
            deleting = true;
            setTimeout(typeRole, 950);
            return;
        } else {
            deleting = false;
            role = (role + 1) % roles.length;
        }

        setTimeout(typeRole, deleting ? 55 : 95);
    }

    typeRole();
}


/* =========================
   2. PROJECT TECHNOLOGY BUTTONS
========================= */

document.querySelectorAll(".tech-btn").forEach(button => {
    button.addEventListener("click", () => {
        const card = button.closest(".card");
        if (!card) return;

        const box = card.querySelector(".tech-description");
        if (!box) return;

        box.textContent = button.dataset.info || button.textContent;
        box.hidden = false;
    });
});


/* =========================
   3. EMAILJS CONTACT FORM
========================= */

const contactForm = document.getElementById("contactForm");

if (contactForm && window.emailjs) {
    emailjs.init({
        publicKey: "HT1nSTs6qBvhRehpI"
    });

    contactForm.addEventListener("submit", async event => {
        event.preventDefault();

        const status = document.getElementById("contactStatus");
        const button = contactForm.querySelector('button[type="submit"]');

        if (!status || !button) return;

        button.disabled = true;
        status.textContent = "Sending message…";

        try {
            const name = contactForm.contactName.value.trim();
            const email = contactForm.contactEmail.value.trim();
            const subject = contactForm.contactSubject.value.trim();
            const message = contactForm.contactMessage.value.trim();

            if (!name || !email || !subject || !message) {
                status.textContent = "Please fill in all fields.";
                return;
            }

            await emailjs.send(
                "service_pp626xh",
                "template_t56u5pp",
                {
                    name: name,
                    email: email,
                    from_name: name,
                    reply_to: email,
                    subject: subject,
                    title: subject,
                    message: message,
                    to_email: "knivetha822008@gmail.com"
                }
            );

            status.textContent = "Message sent successfully!";
            // Form fields are preserved after sending.

        } catch (error) {
            console.error("EmailJS error:", error);
            status.textContent =
                "Message could not be sent. Please try again.";
        } finally {
            button.disabled = false;
        }
    });
}


/* =========================
   4. INTERACTIVE PORTFOLIO
========================= */

document.addEventListener("DOMContentLoaded", function () {

    /* 4A. LIGHT / DARK MODE */

    const themeToggle = document.getElementById("theme-toggle");

    if (themeToggle) {
        const savedTheme = localStorage.getItem("portfolio-theme");

        if (savedTheme === "dark") {
            document.body.classList.add("dark-mode");
        }

        function updateThemeButton() {
            const isDark = document.body.classList.contains("dark-mode");

            themeToggle.textContent = isDark
                ? "☀️ Light Mode"
                : "🌙 Dark Mode";

            themeToggle.setAttribute(
                "aria-label",
                isDark ? "Switch to light mode" : "Switch to dark mode"
            );
        }

        updateThemeButton();

        themeToggle.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");

            const theme = document.body.classList.contains("dark-mode")
                ? "dark"
                : "light";

            localStorage.setItem("portfolio-theme", theme);
            updateThemeButton();
        });
    }


    /* 4B. SCROLL PROGRESS BAR */

    let progress = document.getElementById("scroll-progress");

    if (!progress) {
        progress = document.createElement("div");
        progress.id = "scroll-progress";
        document.body.appendChild(progress);
    }

    /* 4C. BACK TO TOP BUTTON */

    let topButton = document.getElementById("back-to-top");

    if (!topButton) {
        topButton = document.createElement("button");
        topButton.id = "back-to-top";
        topButton.type = "button";
        topButton.textContent = "↑";
        topButton.setAttribute("aria-label", "Back to top");
        document.body.appendChild(topButton);
    }

    function updateScrollEffects() {
        const scrollable =
            document.documentElement.scrollHeight - window.innerHeight;

        const percent = scrollable > 0
            ? (window.scrollY / scrollable) * 100
            : 0;

        progress.style.width = percent + "%";
        topButton.classList.toggle("visible", window.scrollY > 300);
    }

    window.addEventListener("scroll", updateScrollEffects, {
        passive: true
    });

    updateScrollEffects();

    topButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    /* 4D. SCROLL REVEAL */

    const revealElements = document.querySelectorAll(
        ".section, .card, .project-card, .skill-card, " +
        ".about-panel, .contact-box, .contact-form, .list-item"
    );

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        revealElements.forEach(element => {
            element.classList.add("reveal-item");
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(element => {
            element.classList.add("revealed");
        });
    }


    /* 4E. PROJECT CARD 3D TILT */

    const projectCards = document.querySelectorAll(
        ".project-card, .projects-page .card"
    );

    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        projectCards.forEach(card => {
            card.addEventListener("mousemove", event => {
                const rect = card.getBoundingClientRect();

                const x = (event.clientX - rect.left) / rect.width;
                const y = (event.clientY - rect.top) / rect.height;

                const rotateY = (x - 0.5) * 6;
                const rotateX = (0.5 - y) * 6;

                card.style.transform =
                    `perspective(800px) rotateX(${rotateX}deg) ` +
                    `rotateY(${rotateY}deg) translateY(-4px)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "";
            });
        });
    }


    /* 4F. ANIMATED SKILL BARS */

    const skillBars = document.querySelectorAll(
        ".skill-bar, .progress-bar"
    );

    if ("IntersectionObserver" in window) {
        const skillObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate");
                    skillObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });

        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    } else {
        skillBars.forEach(bar => {
            bar.classList.add("animate");
        });
    }

});

/* ===== CONTACT MESSAGE COUNTER ===== */

document.addEventListener("DOMContentLoaded", function () {
    const messageBox = document.getElementById("contactMessage");
    const messageCount = document.getElementById("message-count");

    if (!messageBox || !messageCount) return;

    function updateMessageCount() {
        messageCount.textContent = messageBox.value.length;
    }

    messageBox.addEventListener("input", updateMessageCount);
    updateMessageCount();
});

document.addEventListener("DOMContentLoaded", function () {
    const revealElements = document.querySelectorAll(
        ".project-card, .skill-card, .about-panel"
    );

    if (!("IntersectionObserver" in window)) {
        revealElements.forEach(element => element.classList.add("show"));
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(element => {
        element.classList.add("reveal");
        observer.observe(element);
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".bloom-card");

    cards.forEach(function (card) {
        card.addEventListener("click", function () {
            const flipped = card.classList.toggle("is-flipped");

            card.setAttribute("aria-pressed", String(flipped));
        });

        // 3D mouse movement on desktop
        card.addEventListener("pointermove", function (event) {
            if (event.pointerType !== "mouse") return;
            if (card.classList.contains("is-flipped")) return;

            const rect = card.getBoundingClientRect();

            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;

            const rotateY = (x - 0.5) * 14;
            const rotateX = (0.5 - y) * 14;

            card.style.transform =
                `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener("pointerleave", function () {
            card.style.transform = "";
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("projectCarousel");
    if (!carousel) return;

    const cards = Array.from(
        carousel.querySelectorAll(".carousel-card")
    );

    const previous = document.getElementById("carouselPrev");
    const next = document.getElementById("carouselNext");
    const counter = document.getElementById("carouselCounter");
    const scene = document.getElementById("carouselScene");

    let current = 0;
    let startX = 0;
    let dragging = false;

    function showProject(index) {
        current = (index + cards.length) % cards.length;

        cards.forEach(function (card, i) {
            const active = i === current;
            card.classList.toggle("active", active);
            card.setAttribute("aria-hidden", String(!active));
            card.inert = !active;
        });

        counter.textContent =
            `${String(current + 1).padStart(2, "0")} / ${String(cards.length).padStart(2, "0")}`;
    }

    previous.addEventListener("click", function () {
        showProject(current - 1);
    });

    next.addEventListener("click", function () {
        showProject(current + 1);
    });

    scene.addEventListener("pointerdown", function (event) {
        if (event.pointerType === "mouse" && event.button !== 0) return;
        startX = event.clientX;
        dragging = true;
    });

    scene.addEventListener("pointerup", function (event) {
        if (!dragging) return;
        dragging = false;

        const distance = event.clientX - startX;

        if (Math.abs(distance) > 45) {
            showProject(current + (distance < 0 ? 1 : -1));
        }
    });

    scene.addEventListener("pointercancel", function () {
        dragging = false;
    });

    const projectLinks = {
        visitor: "https://github.com/Nive39/Visitor-App",
        c: "https://github.com/Nive39/C-Programming"
    };

    carousel.querySelectorAll(".carousel-details").forEach(function (button) {
        button.addEventListener("click", function () {
            const url = projectLinks[button.dataset.project];
            if (url) window.open(url, "_blank", "noopener,noreferrer");
        });
    });

    showProject(0);
});
