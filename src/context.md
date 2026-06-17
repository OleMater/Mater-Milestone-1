Project: TaxZilla — Zilla-Engine (Milestone 2)

Purpose
-------
This folder contains the core TypeScript data models and utility functions for the Zilla-Engine.
They provide strict typing, validation, transformation and collection utilities used to
prepare receipts and mileage logs for automated entry into Google Sheets.

Repository structure (relevant subset)

```
src/
├── types/
│   └── models.ts          # Interfaces and types
├── utils/
│   ├── collections.ts     # Array functions
│   ├── search.ts          # Linear and binary searches
│   ├── transformations.ts # Aggregations and reports
│   └── validations.ts     # Business validations
└── index.html             # Test page (optional)
```

Notes
-----
- All date fields are stored as ISO date strings (e.g. 2023-04-01T12:00:00Z). Validators ensure
  the strings parse to valid dates.
- Mileage entries include `startOdometer` and `endOdometer` to guard against "backwards" mileage.
- Expense categories are strictly typed and validated at runtime.
- Interactive test pages should be served from the repository root so shared assets can be referenced
  consistently via root-relative paths such as `/assets/logo.png` and `/assets/mascot.png`.
