document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector("nav");
    const year = document.getElementById("year");
    const hero = document.querySelector(".hero");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    if (hero) {
        const heroObserver = new IntersectionObserver(([entry]) => {
            hero.classList.toggle("is-visible", entry.isIntersecting);
            if (entry.isIntersecting) {
                hero.classList.remove("is-reversing");
            }
        }, { threshold: 0.1 });

        heroObserver.observe(hero);
    }

    let lastScrollY = window.scrollY;
    let lastScrollDirection = 0;

    const replayNameAnimationOnDirectionChange = () => {
        const currentScrollY = window.scrollY;
        const direction = Math.sign(currentScrollY - lastScrollY);
        lastScrollY = currentScrollY;

        if (!direction || direction === lastScrollDirection) return;
        lastScrollDirection = direction;
        if (!hero || !hero.classList.contains("is-visible")) return;

        hero.classList.remove("is-visible");
        void hero.offsetWidth;
        hero.classList.toggle("is-reversing", direction > 0);
        hero.classList.add("is-visible");
    };

    const updateNav = () => {
        if (!nav) return;
        nav.classList.toggle("scrolled", window.scrollY > 24);
    };

    updateNav();
    window.addEventListener("scroll", () => {
        updateNav();
        replayNameAnimationOnDirectionChange();
    }, { passive: true });
});