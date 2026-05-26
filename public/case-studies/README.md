# Case study HTML files

Drop each case study's HTML file here. The filename should match the `slug`
field in `src/content/case-studies.ts` (or set `htmlFile` explicitly).

Example:

```
public/case-studies/
├── acme-redesign.html
├── acme-redesign/         # optional asset folder (images, etc.)
│   ├── hero.png
│   └── flow.svg
└── another-study.html
```

Inside the HTML, reference assets with absolute paths from `/case-studies/...`
(e.g. `<img src="/case-studies/acme-redesign/hero.png">`).
