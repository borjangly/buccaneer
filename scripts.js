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
loadHTMLAsset('footer', '/buccaneer.github.io/assets/footer.html');

// Navigation bar
loadHTMLAsset('navbar-placeholder', '/buccaneer.github.io/assets/navbar.html', () => {
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const currentPath = window.location.pathname.replace(/\/+$/, '');  // Current page path
      const targetPath = link.getAttribute('href').replace(/\/+$/, '');  // Target path of the clicked link

      // If the link is an anchor (e.g., #section1), allow the default behavior (scroll)
      if (targetPath.startsWith("#")) {
        return;
      }

      // Prevent default behavior and smoothly scroll if on the same page
      if (currentPath === targetPath) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        return;
      }
    });
  });

  // Handle dropdown button clicks (to ensure navigation happens)
  const dropdownButtons = document.querySelectorAll('.navbar-nav .nav-item.dropdown > .nav-link');

  dropdownButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const currentPath = window.location.pathname.replace(/\/+$/, '');
      const targetPath = button.getAttribute('href').replace(/\/+$/, '');

      // Prevent the default dropdown toggle behavior and navigate if necessary
      if (currentPath !== targetPath) {
        window.location.href = targetPath; // Manually navigate to the link
        e.preventDefault();
      }
    });
  });

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
loadHTMLAsset('returnToTop-placeholder', '/buccaneer.github.io/assets/return-to-top.html', () => {
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
