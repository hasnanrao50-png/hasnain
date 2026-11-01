// Theme Toggle Logic
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".tech-card-grid").forEach(cardGrid => {
        const cards = Array.from(cardGrid.children);
        const duplicateCards = document.createDocumentFragment();

        cards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.setAttribute("aria-hidden", "true");
            duplicateCards.appendChild(clone);
        });

        cardGrid.appendChild(duplicateCards);
    });

    const contactForm = document.querySelector("#contact-form");
    const contactNotification = document.querySelector("#contact-notification");

    if (contactForm && contactNotification) {
        let notificationTimeout;

        contactForm.addEventListener("submit", async event => {
            event.preventDefault();

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonContent = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";

            try {
                const response = await fetch(contactForm.action, {
                    method: "POST",
                    body: new FormData(contactForm),
                    headers: { Accept: "application/json" }
                });

                if (!response.ok) {
                    throw new Error(`Contact form request failed with status ${response.status}`);
                }

                contactForm.reset();
                contactNotification.textContent = "Message sent successfully!";
                contactNotification.className = "alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3 w-100 shadow";
            } catch (error) {
                console.error("Could not send contact form:", error);
                contactNotification.textContent = "Message could not be sent. Please try again.";
                contactNotification.className = "alert alert-danger position-fixed top-0 start-50 translate-middle-x mt-3 w-100 shadow";
            } finally {
                contactNotification.style.maxWidth = "520px";
                contactNotification.style.zIndex = "1090";
                contactNotification.setAttribute("role", "alert");
                contactNotification.setAttribute("aria-live", "assertive");
                window.clearTimeout(notificationTimeout);
                notificationTimeout = window.setTimeout(() => {
                    contactNotification.classList.add("d-none");
                }, 5000);
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonContent;
            }
        });
    }

    const typewriter = document.querySelector(".typewriter-text");
    const roles = [
        "MERN Stack Developer",
        "Web Developer",
        "Creative Designer",
        "Digital Creator"
    ];

    if (typewriter) {
        let roleIndex = 0;
        let characterIndex = 0;
        let isDeleting = false;

        const typeRole = () => {
            const currentRole = roles[roleIndex];
            typewriter.textContent = isDeleting
                ? currentRole.slice(0, characterIndex--)
                : currentRole.slice(0, characterIndex++);

            let delay = isDeleting ? 55 : 95;

            if (!isDeleting && characterIndex > currentRole.length) {
                isDeleting = true;
                delay = 1400;
            } else if (isDeleting && characterIndex < 0) {
                isDeleting = false;
                characterIndex = 0;
                roleIndex = (roleIndex + 1) % roles.length;
                delay = 350;
            }

            window.setTimeout(typeRole, delay);
        };

        typeRole();
    }

    const themeToggleBtns = document.querySelectorAll(".theme-toggle");
    const body = document.body;
    
    // Check local storage for theme
    const currentTheme = localStorage.getItem("theme");
    body.classList.remove("dark-theme", "light-theme");
    body.classList.add(currentTheme === "light-theme" ? "light-theme" : "dark-theme");

    // Update button text/icon initially
    updateIcons(body.classList.contains("dark-theme"));

    themeToggleBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            if (body.classList.contains("dark-theme")) {
                body.classList.replace("dark-theme", "light-theme");
                localStorage.setItem("theme", "light-theme");
                updateIcons(false);
            } else {
                if (body.classList.contains("light-theme")) {
                    body.classList.replace("light-theme", "dark-theme");
                } else {
                    body.classList.add("dark-theme");
                }
                localStorage.setItem("theme", "dark-theme");
                updateIcons(true);
            }
        });
    });

    function updateIcons(isDark) {
        themeToggleBtns.forEach(btn => {
            btn.classList.remove("btn-dark", "btn-light");
            if (isDark) {
                btn.innerHTML = '<i class="bi bi-sun-fill" aria-hidden="true"></i>';
                btn.classList.add("btn-dark");
                btn.title = "Switch to light theme";
                btn.setAttribute("aria-label", "Switch to light theme");
            } else {
                btn.innerHTML = '<i class="bi bi-moon-fill" aria-hidden="true"></i>';
                btn.classList.add("btn-light");
                btn.title = "Switch to dark theme";
                btn.setAttribute("aria-label", "Switch to dark theme");
            }
        });
    }
});

// Button hover effects
let btnArr = document.querySelectorAll(".btn1, .nav2");
btnArr.forEach(btn => {
    btn.addEventListener("mouseover", () => {
        btn.style.transform = "scale(1.05)";
        btn.style.transition = "all 0.3s ease";
    });
    btn.addEventListener("mouseout", () => {
        btn.style.transform = "scale(1)";
    });
});

// Card hover effects
let cards = document.querySelectorAll(".card");
cards.forEach(card => {
    card.addEventListener("mouseover", () => {
        card.style.transform = "translateY(-10px)";
        card.style.transition = "transform 0.4s ease";
        card.style.boxShadow = "0 10px 30px rgba(0, 123, 255, 0.4)";
    });
    card.addEventListener("mouseout", () => {
        card.style.transform = "translateY(0)";
        card.style.boxShadow = "none";
    });
});
