# Case study assets

Drop images for each case study into a subfolder named after its slug:

```
public/case-studies/
├── mrig/
│   ├── tryon.png
│   ├── onboarding-1.png
│   └── ...
└── plivo/
    ├── 10dlc.png
    ├── drafts.png
    └── ...
```

Inside a case study page, reference them with absolute paths:

```tsx
<img src="/case-studies/mrig/tryon.png" alt="..." />
```

The case study React pages live at `src/app/work/<slug>/page.tsx`. They
currently use labeled placeholders — swap them for real `<img>` tags once
files are in place.
