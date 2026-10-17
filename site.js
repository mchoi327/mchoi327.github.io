(function () {
  function bindHeaderMenu(container) {
    const button = container.querySelector('.menu-toggle');
    const nav = container.querySelector('nav');
    if (!button || !nav) return;

    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      button.setAttribute('aria-expanded', String(isOpen));
    });
  }

  async function loadHeader() {
    const container = document.getElementById('site-header');
    if (!container) return;

    try {
      const response = await fetch('header.html', { cache: 'no-store' });
      if (!response.ok) throw new Error('Header request failed');

      container.innerHTML = await response.text();
      bindHeaderMenu(container);
    } catch (error) {
      console.error('Header load failed:', error);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
  } else {
    loadHeader();
  }
})();

// Native buttons supply Enter/Space activation; hidden keeps collapsed text out of navigation.
document.querySelectorAll('.badge-abstract').forEach(button => {
  const abstract = document.getElementById(button.getAttribute('aria-controls'));
  if (!abstract) return;
  button.addEventListener('click', () => {
    abstract.hidden = !abstract.hidden;
    button.setAttribute('aria-expanded', String(!abstract.hidden));
  });
});
