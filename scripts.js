// Function to load HTML assets dynamically
function loadHTMLAsset(placeholderId, assetPath, callback) {
  fetch(assetPath)
    .then(response => {
      if (!response.ok) throw new Error(`Failed to load ${assetPath}: ${response.statusText}`);
      return response.text();
    })
    .then(html => {
      const placeholder = document.getElementById(placeholderId);
      if (placeholder) {
        placeholder.innerHTML = html;
        if (typeof callback === 'function') callback();
      } else {
        console.warn(`Placeholder element with ID "${placeholderId}" not found.`);
      }
    })
    .catch(error => console.error(error));
}

// Navbar code
function setupNavbar() {
  const currentPath = window.location.pathname.replace(/\/+$/, '');

  // Handle normal nav links
  document.querySelectorAll('#navbar-placeholder nav a.nav-link').forEach(link => {
    const url = new URL(link.href, window.location.origin);
    const linkPath = url.pathname.replace(/\/+$/, '');

    link.addEventListener('click', (e) => {
      if (linkPath === currentPath) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  // Handle dropdown toggle links (Bootstrap normally blocks navigation)
  document.querySelectorAll('#navbar-placeholder .nav-item.dropdown > .nav-link').forEach(link => {
    const url = new URL(link.href, window.location.origin);
    const linkPath = url.pathname.replace(/\/+$/, '');

    link.addEventListener('click', (e) => {
      if (linkPath === currentPath) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        e.preventDefault();
        window.location.href = link.href;
      }
    });
  });
}

// Return to top button
function returnToTop() {
  const returnToTopBtn = document.getElementById('returnToTop');
  if (!returnToTopBtn) {
    console.error('Return to Top button not found!');
    return;
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      returnToTopBtn.classList.add('show');
    } else {
      returnToTopBtn.classList.remove('show');
    }
  });

  returnToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
};


// Load navbar and set up handlers on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Nav bar
  loadHTMLAsset('navbar-placeholder', './assets/navbar.html', setupNavbar);

  // Footer
  loadHTMLAsset('footer', './assets/footer.html');

  // Return to top button
  loadHTMLAsset('returnToTop-placeholder', './assets/return-to-top.html', returnToTop);
});