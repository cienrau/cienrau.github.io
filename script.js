document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector("nav");
    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    const updateNav = () => {
        if (!nav) return;
        nav.classList.toggle("scrolled", window.scrollY > 24);
    };

    updateNav();
    window.addEventListener("scroll", updateNav, { passive: true });
});