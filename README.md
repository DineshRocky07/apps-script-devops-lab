# Google Apps Script Enterprise CI/CD Workflow 🚀

This project implements a professional DevOps pipeline for Google Apps Script. It replaces manual local deployments with an automated, secure, and auditable GitHub Actions CI/CD workflow.

## 🏗️ System Architecture

1. **Local Development:** Code is written locally (`Code.js`, `index.html`).
2. **Version Control:** Code is pushed to GitHub using strict branching strategies.
3. **Continuous Deployment:** GitHub Actions detects changes to the `develop` branch, provisions a cloud server, authenticates securely, and deploys directly to Google Apps Script via `clasp`.

---

## 🌿 Branching Strategy

We follow a structured Git flow to protect production code:

*   **`main`**: Production code. Locked. Never pushed to directly.
*   **`develop`**: Integration and staging. Locked. Pushing here automatically triggers the CI/CD deployment pipeline.
*   **`feature/*`**: (e.g., `feature/alert-box`) Branched from `develop`. Used for building new features.
*   **`hotfix/*`**: Branched from `main`. Used strictly for critical production bug fixes.

---

## 📝 Conventional Commits

We use standard commit prefixes to keep the Git history readable and automated:

*   `feat:` - A new feature (e.g., `feat: add email notification`)
*   `fix:` - A bug fix (e.g., `fix: resolve typo in index.html`)
*   `build:` - Changes to the CI/CD pipeline (e.g., `build: update GitHub Actions YAML`)
*   `docs:` - Changes to documentation (e.g., `docs: update README`)

---

## 🔐 Authentication & Secrets Setup

To allow GitHub Actions to deploy on your behalf without exposing your Google account, you must configure GitHub Secrets.

1. **Login Locally:**
   Run `clasp login` in your local terminal.
2. **Extract the Token:**
   Open the generated hidden file in a text editor to avoid terminal encoding issues:
   ```powershell
   notepad $HOME\.clasprc.json