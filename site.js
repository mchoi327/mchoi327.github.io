(function () {
  async function loadHeader() {
    const container = document.getElementById('site-header');
    if (!container) return;
    try {
      const response = await fetch('header.html', { cache: 'no-store' });
      if (!response.ok) throw new Error('Header request failed');
      container.innerHTML = await response.text();
      const nav = container.querySelector('nav');
      const current = location.pathname.split('/').pop() || 'index.html';
      nav.querySelectorAll('a').forEach(link => {
        if (link.getAttribute('href') === current) link.setAttribute('aria-current', 'page');
      });
    } catch (error) {
      console.error('Header load failed:', error);
    }
  }

  async function loadDocumentLinks() {
    const cv = document.getElementById('cv-link');
    if (!cv) return;
    try {
      const response = await fetch('files/manifest.json', { cache: 'no-store' });
      if (!response.ok) throw new Error('Could not load files manifest');
      const manifest = await response.json();
      const file = manifest.cv;
      const match = typeof file === 'string' && file.match(/^(\d{4})(\d{2})(\d{2})_CV_Mingeun_Choi\.pdf$/);
      if (!match) throw new Error('Invalid document filename');
      cv.href = `files/${file}`;
      cv.download = `Mingeun_Choi_CV_${match[1]}-${match[2]}-${match[3]}.pdf`;
    } catch (error) {
      // Static links remain usable if the manifest cannot be loaded.
      console.error('Document link manifest load failed:', error);
    }
  }

  async function loadRecentNews() {
    const mount = document.getElementById('recent-news');
    if (!mount) return;
    try {
      const response = await fetch('news.html', { cache: 'no-store' });
      if (!response.ok) throw new Error('Could not load news');
      const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
      const latest = Array.from(doc.querySelectorAll('article.news-card'))
        .map(article => ({ article, date: Date.parse(article.querySelector('time')?.getAttribute('datetime')) }))
        .filter(item => Number.isFinite(item.date))
        .sort((a, b) => b.date - a.date)
        .slice(0, 3);
      if (!latest.length) throw new Error('No dated news found');

      const list = document.createElement('ul');
      list.className = 'recent-news-list';
      for (const { article } of latest) {
        const item = document.createElement('li');
        const link = document.createElement('a');
        link.href = article.id ? `news.html#${article.id}` : 'news.html';
        link.textContent = article.querySelector('h3').textContent.trim();
        item.append(article.querySelector('time').cloneNode(true), link);
        list.append(item);
      }
      mount.replaceChildren(list);
    } catch (error) {
      // The archive link remains available when fetching or parsing fails.
      console.error('Recent news load failed:', error);
    }
  }

  function initialize() {
    loadHeader();
    loadDocumentLinks();
    loadRecentNews();
    document.querySelectorAll('.badge-abstract').forEach(button => {
      const abstract = document.getElementById(button.getAttribute('aria-controls'));
      if (!abstract) return;
      button.addEventListener('click', () => {
        abstract.hidden = !abstract.hidden;
        button.setAttribute('aria-expanded', String(!abstract.hidden));
      });
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();
