// This function loads HTML assets
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
        if (typeof callback === 'function') {
          callback();
        }
      } else {
        console.warn(`Placeholder element with ID "${placeholderId}" not found.`);
      }
    })
    .catch(error => console.error(error));
}

// Footer
loadHTMLAsset('footer', '/assets/footer.html');

// Navigation bar
loadHTMLAsset('navbar-placeholder', '/assets/navbar.html', () => {
  // Scroll to top if clicking "Overview" while already on the Overview page
  const overviewLink = document.getElementById('navbarDropdownOverview');
  if (overviewLink) {
    overviewLink.addEventListener('click', (e) => {
      const currentPath = window.location.pathname.replace(/\/+$/, '');
      const overviewPath = '/overview/overview.html';
      if (currentPath === overviewPath) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // Dark mode toggle logic
  const themeToggleCheckbox = document.getElementById('themeToggleCheckbox');

  // Apply stored dark mode preference
  const prefersDark = localStorage.getItem('darkMode') === 'true';
  if (prefersDark) {
    document.body.classList.add('dark-mode');
    if (themeToggleCheckbox) themeToggleCheckbox.checked = true;
  }

  // Handle toggle change
  themeToggleCheckbox?.addEventListener('change', () => {
    const isDark = themeToggleCheckbox.checked;
    document.body.classList.toggle('dark-mode', isDark);
    localStorage.setItem('darkMode', isDark);
  });
});


// Return to top button
loadHTMLAsset('returnToTop-placeholder', '/assets/return-to-top.html', () => {
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
});
