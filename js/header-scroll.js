(function() {
const navbar = document.getElementById('navbar');
if (!navbar) return;

let scrollTimeout;

function onScroll() {
  // When scrolling, add the scrolled class (make white/opaque)
  navbar.classList.add('scrolled');
  
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
  
  // After user stops scrolling, remove scrolled class (make transparent)
  scrollTimeout = setTimeout(() => {
    navbar.classList.remove('scrolled');
  }, 1500);
}

window.addEventListener('scroll', onScroll, { passive: true });

// Start with transparent navbar (no scrolled class)
navbar.classList.remove('scrolled');
})();
