(function() {
const navbar = document.getElementById('navbar');
if (!navbar) return;

let scrollTimeout;

function onScroll() {
  // When scrolling, remove the scrolled class (make transparent)
  navbar.classList.remove('scrolled');
  
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
  
  // After user stops scrolling, add scrolled class back (make white/opaque)
  scrollTimeout = setTimeout(() => {
    navbar.classList.add('scrolled');
  }, 1500);
}

window.addEventListener('scroll', onScroll, { passive: true });

// Start with scrolled class (white/opaque navbar)
navbar.classList.add('scrolled');
})();
