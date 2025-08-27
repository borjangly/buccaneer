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
};

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

// Copy URL links
// function initCopyLinkToClipboard() {
//   const copyLinks = document.querySelectorAll('.copy-link');
//   console.log('Copy links found:', copyLinks.length);

//   copyLinks.forEach(link => {
//     const heading = link.closest('h2, h3, h4, h5, h6');
//     console.log('Found heading for link:', heading);

//     if (!heading || !heading.id) {
//       console.warn('No valid heading with id found for copy link:', link);
//       return;
//     }

//     link.href = `${window.location.origin}${window.location.pathname}#${heading.id}`;
//     console.log('Set link href to:', link.href);

//     link.addEventListener('click', e => {
//       e.preventDefault();
//       navigator.clipboard.writeText(link.href).then(() => {
//         console.log('Copied to clipboard:', link.href);
//         const originalTitle = link.getAttribute('title');
//         link.setAttribute('title', 'Copied!');
//         setTimeout(() => {
//           link.setAttribute('title', originalTitle || '');
//         }, 1500);
//       }).catch(err => {
//         console.error('Failed to copy:', err);
//       });
//     });
//   });
// };

// Load navbar and set up handlers on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Nav bar
  loadHTMLAsset('navbar-placeholder', './assets/navbar.html', setupNavbar);

  // Footer
  loadHTMLAsset('footer', './assets/footer.html');

  // Return to top button
  loadHTMLAsset('returnToTop-placeholder', './assets/return-to-top.html', returnToTop);

  // Copy links
  // loadHTMLAsset('copy-link-placeholder', './assets/copy-link.html');
});

