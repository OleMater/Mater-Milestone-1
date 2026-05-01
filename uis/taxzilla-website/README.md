# TaxZilla Website (Milestone 1)

Two-page responsive website built for TaxZilla using semantic HTML, Tailwind CSS, and client-side JavaScript validation.

## Pages

- `index.html`: Landing page with hero, value proposition, key capabilities, contact CTA, and structured data markup.
- `application.html`: Application/sign-up form with all required intake fields and validation UX.
- `validation.js`: Form validation logic and submission-state messaging.

## Technical notes

- Tailwind CSS is loaded via CDN and used for all styling.
- SEO includes metadata and Schema.org JSON-LD (`FinancialService`) on the landing page.
- Accessibility includes semantic landmarks, labeled form controls, ARIA attributes for dynamic errors, and keyboard-friendly controls.

## Assets

- Add logo and mascot files in `assets/`.
- Suggested names: `logo.png` and `mascot.png` (or `.svg` versions).

## Run locally

Open `index.html` in your browser, or serve the folder with a static server:

```bash
cd uis/taxzilla-website
python3 -m http.server 5500
```

Then navigate to `http://localhost:5500`.
