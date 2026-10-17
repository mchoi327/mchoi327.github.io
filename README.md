# Mingeun Choi Academic Website

Static HTML, CSS, and JavaScript for the GitHub Pages website. No build step or package installation is required. Serve this directory over HTTP for local review; opening HTML with file:// prevents the shared-header and news fetches from working.

## Content

- `index.html`: introduction, research directions, social links, and document downloads. Recent News is selected automatically from dated articles in `news.html`.
- `about.html`: appointments, education, leadership, academic service, memberships, and awards.
- `publications.html`: citations, author roles, award/news links, and existing abstracts. Entry IDs match the CV source for comparison. Edit this HTML directly; it is not generated during deployment.
- `research.html`: research experience and project descriptions.
- `teaching.html`: teaching, mentoring, and certifications.
- `news.html`: dated announcements and images. Preserve historical dates; use an optional image and an ISO `datetime` on each article.

Add News entries only for events the owner requests; a publication or citation-status update does not itself authorize a news post. Keep badges immediately before the associated citation or award name, within the same text flow.

Use the current CV as the factual reference. Preserve website-only abstracts, news, and images. Do not infer an abstract or an exact news date from a CV summary. First/corresponding author marks apply to papers and presentations, not patents.

## Shared template

- All styling lives in `style.css`; do not add page-specific style blocks.
- Open Sans is the body font; Merriweather is the heading font. H1/H2/H3 use 2.5/1.75/1.25rem, body and abstracts 1rem, and metadata/badges 0.875rem.
- Reading width is 880px. Ordinary entries use the small gap; independent experience blocks use the medium gap; sections use the large gap. Internal lines and bullets have normal line spacing.
- `entry-heading` pairs content with `entry-meta` on the right; mobile displays metadata below. `entry-list` groups experience blocks, `pub-list` citations, and `award-list` awards.
- Keep badge order: award, news, Abstract. Multiple news links share one badge and have individually labeled numbered links. All website badges remain visible, independently of PDF options.
- Abstract buttons need matching `aria-controls` and panel IDs, `aria-expanded="false"`, and a `hidden` panel. `site.js` handles native button activation, navigation, downloads, and Recent News. The existing abstracts remain verbatim.

## Downloads and publishing

Build the CV/resume in the parent workspace with its `build.ps1`. Copy the verified PDFs into `files/` and update both `files/manifest.json` and the fallback links/download names in `index.html`. Older dated PDFs remain available for existing links. The current files are dated 2026-10-17; the CV is six pages and the resume is two pages.

This is a separate Git repository inside the CV workspace. Commit website changes here. A push to `main` can publish through GitHub Pages; local commits alone do not change the public site.

Before publishing, check every page at desktop and narrow mobile widths, keyboard navigation and abstract toggles, news preview and download links, and preserved abstracts. External fonts and icons still use Google Fonts and Font Awesome CDNs.
