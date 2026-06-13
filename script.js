const reduceMotion = typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : { matches: false };

const navToggle = document.getElementById("navToggle");
const mobileNav = document.getElementById("mobileNav");
const commandPalette = document.getElementById("commandPalette");
const commandTrigger = document.getElementById("commandTrigger");
const commandInput = document.getElementById("commandInput");
const commandItems = Array.from(document.querySelectorAll(".command-item"));
const liveTime = document.getElementById("liveTime");
const scrollProgress = document.getElementById("scrollProgress");
const toast = document.getElementById("toast");
const copyEmailButton = document.getElementById("copyEmailButton");
const noticeModal = document.getElementById("noticeModal");
const noticeTitle = document.getElementById("noticeTitle");
const noticeBody = document.getElementById("noticeBody");

const inspectorTitle = document.getElementById("inspectorTitle");
const inspectorText = document.getElementById("inspectorText");
const inspectorEnergy = document.getElementById("inspectorEnergy");
const inspectorMode = document.getElementById("inspectorMode");
const inspectorPriority = document.getElementById("inspectorPriority");

const projectDetails = {
    portfolio: {
        title: "Personal site as an immersive product",
        text: "This direction treats the site like a real product surface with layered structure, better pacing, and interaction quality that rewards exploration.",
        energy: "Focused",
        mode: "Interactive storytelling",
        priority: "Feel and structure"
    },
    security: {
        title: "Identity, security, and recovery thinking",
        text: "A research direction around trust, account recovery, and how product design can reduce panic and confusion in high-stakes moments.",
        energy: "Analytical",
        mode: "Research systems",
        priority: "Trust and resilience"
    },
    social: {
        title: "How social systems shape attention",
        text: "A continuing study of reach, recommendations, creator behavior, and how platform mechanics influence what people see and do.",
        energy: "Curious",
        mode: "Platform analysis",
        priority: "Behavior and feedback loops"
    }
};

const noticeContent = {
    "privacy-policy": {
        title: "Privacy Policy",
        body: [
            "<p><strong>Privacy-first handling:</strong> Case details are handled carefully and shared only when needed to understand or support a request.</p>",
            "<p><strong>Data use:</strong> Information you provide is used only for communication, case review, and service coordination related to your request.</p>",
            "<p><strong>Access awareness:</strong> Sensitive screenshots, account details, and platform evidence should be shared only when necessary for analysis.</p>",
            "<p><strong>Confidentiality:</strong> Private client information is not intentionally disclosed, resold, or reused outside the original support context.</p>"
        ]
    },
    "terms-service": {
        title: "Terms of Service",
        body: [
            "<p><strong>Scope:</strong> Services focus on consultation, case review, workflow guidance, and platform-related support assistance.</p>",
            "<p><strong>No platform ownership:</strong> Final decisions remain with the platforms themselves, including moderation, recovery, and appeal outcomes.</p>",
            "<p><strong>Client responsibility:</strong> Clients are responsible for providing accurate context, maintaining lawful use, and following platform requirements.</p>",
            "<p><strong>Professional conduct:</strong> Abusive, deceptive, or policy-violating requests may be declined without further engagement.</p>"
        ]
    },
    "platform-rules": {
        title: "Platform Rules Notice",
        body: [
            "<p><strong>Compliance first:</strong> Support is intended for legitimate, policy-aware use across creator, brand, and business accounts.</p>",
            "<p><strong>No harmful misuse:</strong> Requests involving impersonation, unauthorized access, fraud, spam, or deceptive behavior are not supported.</p>",
            "<p><strong>Case review lens:</strong> Recommendations are shaped around platform policies, trust signals, and safer long-term account practices.</p>",
            "<p><strong>Appeal realism:</strong> Guidance can improve clarity and preparation, but it does not guarantee platform approval.</p>"
        ]
    },
    "refund-policy": {
        title: "Refund Policy",
        body: [
            "<p><strong>Consultation-based work:</strong> Refund decisions depend on the nature of the request, work already performed, and communication stage reached.</p>",
            "<p><strong>Digital service note:</strong> Time spent on case analysis, planning, and response preparation may be non-refundable once delivered.</p>",
            "<p><strong>Outcome limits:</strong> Refunds are not automatically based on platform decisions, since external platforms control final results.</p>",
            "<p><strong>Resolution first:</strong> If there is a concern, the preferred path is direct Telegram communication to review the issue fairly and clearly.</p>"
        ]
    }
};

function showToast(message) {
    if (!toast) {
        return;
    }

    toast.textContent = message;
    toast.classList.add("is-visible");

    window.clearTimeout(showToast.timeoutId);
    showToast.timeoutId = window.setTimeout(() => {
        toast.classList.remove("is-visible");
    }, 2200);
}

function setLiveTime() {
    if (!liveTime) {
        return;
    }

    const formatter = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Kolkata",
        hour12: false
    });

    liveTime.textContent = `${formatter.format(new Date())} IST`;
}

function toggleMobileNav(forceOpen) {
    if (!mobileNav || !navToggle) {
        return;
    }

    const shouldOpen = typeof forceOpen === "boolean"
        ? forceOpen
        : !mobileNav.classList.contains("is-open");

    mobileNav.classList.toggle("is-open", shouldOpen);
    mobileNav.setAttribute("aria-hidden", String(!shouldOpen));
    navToggle.setAttribute("aria-expanded", String(shouldOpen));
}

function openCommandPalette() {
    if (!commandPalette || !commandTrigger) {
        return;
    }

    commandPalette.classList.add("is-open");
    commandPalette.setAttribute("aria-hidden", "false");
    commandTrigger.setAttribute("aria-expanded", "true");

    if (commandInput) {
        commandInput.value = "";
        filterCommandItems("");
        commandInput.focus();
    }
}

function closeCommandPalette() {
    if (!commandPalette || !commandTrigger) {
        return;
    }

    commandPalette.classList.remove("is-open");
    commandPalette.setAttribute("aria-hidden", "true");
    commandTrigger.setAttribute("aria-expanded", "false");
}

function openNotice(noticeKey) {
    const notice = noticeContent[noticeKey];

    if (!notice || !noticeModal || !noticeTitle || !noticeBody) {
        return;
    }

    noticeTitle.textContent = notice.title;
    noticeBody.innerHTML = notice.body.join("");
    noticeModal.classList.add("is-open");
    noticeModal.setAttribute("aria-hidden", "false");
}

function closeNotice() {
    if (!noticeModal) {
        return;
    }

    noticeModal.classList.remove("is-open");
    noticeModal.setAttribute("aria-hidden", "true");
}

function filterCommandItems(query) {
    const normalized = query.trim().toLowerCase();

    commandItems.forEach((item) => {
        const text = item.textContent.toLowerCase();
        const matches = !normalized || text.includes(normalized);
        item.hidden = !matches;
    });
}

function smoothScrollTo(target) {
    const element = document.querySelector(target);

    if (!element) {
        return;
    }

    element.scrollIntoView({
        behavior: reduceMotion.matches ? "auto" : "smooth",
        block: "start"
    });
}

async function copyEmail() {
    const email = copyEmailButton?.dataset.email || "umerbinabdulaziz88@gmail.com";

    try {
        if (navigator.clipboard?.writeText && window.isSecureContext) {
            await navigator.clipboard.writeText(email);
        } else {
            const helper = document.createElement("textarea");
            helper.value = email;
            helper.setAttribute("readonly", "");
            helper.style.position = "absolute";
            helper.style.left = "-9999px";
            document.body.appendChild(helper);
            helper.select();

            const copied = document.execCommand("copy");
            document.body.removeChild(helper);

            if (!copied) {
                throw new Error("Copy command was rejected");
            }
        }

        showToast("Email copied");
    } catch (error) {
        showToast("Could not copy email");
    }
}

function updateScrollProgress() {
    if (!scrollProgress) {
        return;
    }

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll <= 0 ? 0 : (window.scrollY / maxScroll) * 100;
    scrollProgress.style.width = `${progress}%`;
}

function setupCursorGlow() {
    if (reduceMotion.matches) {
        return;
    }

    window.addEventListener("pointermove", (event) => {
        document.documentElement.style.setProperty("--glow-x", `${event.clientX}px`);
        document.documentElement.style.setProperty("--glow-y", `${event.clientY}px`);
    });
}

function setupMagneticButtons() {
    if (reduceMotion.matches) {
        return;
    }

    document.querySelectorAll(".magnetic").forEach((button) => {
        button.addEventListener("mousemove", (event) => {
            const rect = button.getBoundingClientRect();
            const offsetX = event.clientX - rect.left - rect.width / 2;
            const offsetY = event.clientY - rect.top - rect.height / 2;
            button.style.transform = `translate(${offsetX * 0.12}px, ${offsetY * 0.12}px)`;
        });

        button.addEventListener("mouseleave", () => {
            button.style.transform = "";
        });
    });
}

function setupSpotlights() {
    document.querySelectorAll(".panel").forEach((panel) => {
        panel.addEventListener("pointermove", (event) => {
            const rect = panel.getBoundingClientRect();
            panel.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
            panel.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
        });
    });
}

function animateCounters() {
    const counters = document.querySelectorAll("[data-count]");

    if (!counters.length) {
        return;
    }

    if (typeof window.IntersectionObserver !== "function") {
        counters.forEach((counter) => {
            const target = Number(counter.dataset.count || 0);
            const suffix = counter.dataset.suffix || "";
            counter.textContent = `${target}${suffix}`;
        });
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            const element = entry.target;
            const target = Number(element.dataset.count || 0);
            const suffix = element.dataset.suffix || "";
            const start = performance.now();
            const duration = reduceMotion.matches ? 0 : 1100;

            function frame(time) {
                if (!duration) {
                    element.textContent = `${target}${suffix}`;
                    return;
                }

                const progress = Math.min((time - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                element.textContent = `${Math.round(target * eased)}${suffix}`;

                if (progress < 1) {
                    window.requestAnimationFrame(frame);
                }
            }

            window.requestAnimationFrame(frame);
            observer.unobserve(element);
        });
    }, { threshold: 0.6 });

    counters.forEach((counter) => observer.observe(counter));
}

function setupProjectInspector() {
    document.querySelectorAll("[data-project]").forEach((card) => {
        const updateInspector = () => {
            const detail = projectDetails[card.dataset.project];

            if (!detail || !inspectorTitle || !inspectorText || !inspectorEnergy || !inspectorMode || !inspectorPriority) {
                return;
            }

            inspectorTitle.textContent = detail.title;
            inspectorText.textContent = detail.text;
            inspectorEnergy.textContent = detail.energy;
            inspectorMode.textContent = detail.mode;
            inspectorPriority.textContent = detail.priority;
        };

        card.addEventListener("mouseenter", updateInspector);
        card.addEventListener("focusin", updateInspector);
    });
}

function setupRevealAnimations() {
    const revealItems = document.querySelectorAll(".reveal");

    if (!revealItems.length) {
        return;
    }

    if (window.gsap && window.ScrollTrigger && !reduceMotion.matches) {
        window.gsap.registerPlugin(window.ScrollTrigger);

        revealItems.forEach((item) => {
            window.gsap.fromTo(item, {
                autoAlpha: 0,
                y: 30
            }, {
                autoAlpha: 1,
                y: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 86%"
                }
            });
        });

        window.gsap.from(".hero-panel .panel", {
            y: 24,
            autoAlpha: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.2
        });

        return;
    }

    if (typeof window.IntersectionObserver !== "function") {
        revealItems.forEach((item) => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
        });
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.16 });

    revealItems.forEach((item) => observer.observe(item));
}

function handleCommandAction(actionTarget) {
    const action = actionTarget.dataset.action;

    if (action === "scroll") {
        closeCommandPalette();
        smoothScrollTo(actionTarget.dataset.target);
        return;
    }

    if (action === "copy-email") {
        closeCommandPalette();
        copyEmail();
    }
}

function handleKeydown(event) {
    const activeElement = document.activeElement;
    const isInputFocused = activeElement && activeElement.matches("input, textarea");

    if (event.key === "/" && !isInputFocused) {
        event.preventDefault();
        openCommandPalette();
        return;
    }

    if (event.key === "Escape") {
        closeCommandPalette();
        closeNotice();
        toggleMobileNav(false);
    }
}

document.querySelectorAll("[data-open-command='true']").forEach((trigger) => {
    trigger.addEventListener("click", () => {
        openCommandPalette();
        toggleMobileNav(false);
    });
});

document.querySelectorAll("[data-close-command='true']").forEach((trigger) => {
    trigger.addEventListener("click", closeCommandPalette);
});

document.querySelectorAll("[data-notice]").forEach((trigger) => {
    trigger.addEventListener("click", () => openNotice(trigger.dataset.notice));
});

document.querySelectorAll("[data-close-notice='true']").forEach((trigger) => {
    trigger.addEventListener("click", closeNotice);
});

commandItems.forEach((item) => {
    if (item.matches("button")) {
        item.addEventListener("click", () => handleCommandAction(item));
        return;
    }

    item.addEventListener("click", closeCommandPalette);
});

if (commandInput) {
    commandInput.addEventListener("input", (event) => {
        filterCommandItems(event.target.value);
    });
}

if (copyEmailButton) {
    copyEmailButton.addEventListener("click", copyEmail);
}

if (commandTrigger) {
    commandTrigger.addEventListener("click", openCommandPalette);
}

if (navToggle) {
    navToggle.addEventListener("click", () => toggleMobileNav());
}

if (mobileNav) {
    mobileNav.addEventListener("click", (event) => {
        if (event.target.matches("a")) {
            toggleMobileNav(false);
        }
    });
}

window.addEventListener("keydown", handleKeydown);
window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);

setLiveTime();
window.setInterval(setLiveTime, 30000);
updateScrollProgress();
setupCursorGlow();
setupMagneticButtons();
setupSpotlights();
animateCounters();
setupProjectInspector();
setupRevealAnimations();
