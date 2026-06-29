// Hamburger menu toggle
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav-menu");

if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        nav.classList.toggle("active");
    });

    // Close menu when a link is clicked
    document.querySelectorAll("#nav-menu a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
            hamburger.classList.remove("active");
        });
    });
}

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
    if (hamburger && !hamburger.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove("active");
        hamburger.classList.remove("active");
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add scroll effect to header
let lastScroll = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 0) {
        header.style.boxShadow = "0 4px 20px rgba(204,52,51,0.2)";
    } else {
        header.style.boxShadow = "0 4px 20px rgba(204,52,51,0.15)";
    }
    
    lastScroll = currentScroll;
});