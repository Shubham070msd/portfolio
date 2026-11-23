# Manjunath Huddar — DevOps portfolio

React + Vite portfolio featuring infrastructure work, production lessons, and an interactive AI operations walkthrough.

## Develop

```sh
npm ci
npm run dev
```

## Validate and build

```sh
npm run build
npm run lint
python3 -m unittest discover -s tools/incident-triage -p 'test_*.py' -v
```

Deploy `dist/` as a static site after `npm run build`. No backend or secrets are needed for the portfolio. Google Fonts is the only external font request; system fallbacks are defined.

## AI project

[Incident Brief](tools/incident-triage/README.md) is a local Python + Ollama prototype. The site includes three labeled, synthetic walkthroughs. The CLI can either display the same examples offline or request real structured output from a locally running model. No commands are executed.

## Content maintenance

- Portfolio content: `src/App.jsx`.
- Shared synthetic scenarios: `src/data/incident-scenarios.json`.
- Interactive walkthrough: `src/components/IncidentLab.jsx`.
- Styles: `src/App.css` and `src/index.css`.
- Page title, description, and social metadata: `index.html`.
- The résumé button opens an email request because no résumé PDF is in the repository. Add a verified PDF before enabling a download.
- Internal projects are labeled as such; they do not link to nonexistent source repositories.
- The CLI source link currently points to the `codex/portfolio-refresh` review branch. After merge, change `SOURCE` in `src/App.jsx` to `/tree/main` before deleting that branch.

## Editorial decisions

Repeated metrics and unsubstantiated percentages were removed rather than replaced with invented numbers. The NIDEC incident with a date preceding the stated employment period was omitted pending correction. Employment and project descriptions retain the original portfolio's information; review them when updating your résumé. The new AI prototype is separate from professional experience and carries no production-use claim.
