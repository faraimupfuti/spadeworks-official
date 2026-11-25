# Spadeworks Automation - Enterprise Corporate Finance Website

A modern, high-converting, visually stunning corporate website for **Spadeworks Automation** — an enterprise AI automation company that streamlines accounting and corporate finance operations (AP 3-way matching, continuous month-end close, intercompany balance eliminations, and SOC 2 / SOX 404 audit-ready controls across SAP, NetSuite, and Workday).

Designed for lightning-fast edge delivery on **Cloudflare Pages via GitHub**.

---

## 🚀 Features & Modules Included

1. **Enterprise Hero with Autonomous Ledger Simulator**: Live simulated transaction pipeline highlighting 99.98% match rates, ERP connectors, and continuous close speedups.
2. **Interactive Live Sandbox / Product Simulator**:
   - **Bank & ERP Reconciler**: Interactive "Run Batch Auto-Reconcile" demo button that validates simulated ERP transactions in real-time.
   - **Month-End Close Board**: Interactive checklist with dynamic percentage progress gauge and time estimation.
   - **Fraud & Anomaly Guard**: Real-time quarantine mechanism for duplicate invoices and unauthorized vendor changes.
3. **Interactive Financial ROI Calculator**:
   - Sliders for transaction volume, finance team size, close duration, and compensation.
   - Instant calculation of monthly hours saved, annual dollar savings, close cycle compression, and Year-1 ROI %.
4. **Dedicated Deep-Dive Pages**:
   - `index.html` - Flagship homepage with ROI calculator, sandbox, ERP integrations, testimonials, and booking modal.
   - `solutions.html` - In-depth breakdown of Accounts Payable, Close Orchestration, Multi-Entity Consolidation, and Treasury.
   - `security.html` - Bank-grade security architecture, SOC 1 & 2 Type II compliance, CMEK AES-256 encryption, and private VPC deployment.
   - `case-studies.html` - Quantifiable enterprise customer success stories.
5. **Lead Capture & Demo Scheduling Modal**:
   - Multi-step interactive modal with qualification fields (ERP selection, automation goals) and instant confirmation state.
6. **Cloudflare Pages Optimized**:
   - Pre-configured HTTP security headers in `_headers` (HSTS, CSP, X-Frame-Options, X-Content-Type-Options).
   - Clean URLs routing via `_redirects`.
   - SEO XML Sitemap (`sitemap.xml`) and search crawler directives (`robots.txt`).
   - GitHub Actions automated deployment workflow (`.github/workflows/deploy.yml`).

---

## 🌐 Deploy to Cloudflare Pages via GitHub (Quick 2-Minute Guide)

Cloudflare Pages natively supports static sites directly connected to your GitHub repository with **zero build commands** needed.

### Method A: Cloudflare Pages Direct Git Integration (Recommended & Easiest)

1. **Push this repository to GitHub**:
   ```bash
   cd /home/boujie/spadeworks-automation
   git add .
   git commit -m "Initial commit: Spadeworks Automation enterprise website"
   # Create a new repository on your GitHub account (e.g. spadeworks-automation)
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/spadeworks-automation.git
   git branch -M main
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages**:
   - Log into your [Cloudflare Dashboard](https://dash.cloudflare.com/).
   - In the left sidebar, click **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
   - Select your GitHub account and choose the `spadeworks-automation` repository.
   - Configure the deployment settings:
     - **Project Name**: `spadeworks-automation`
     - **Production branch**: `main`
     - **Framework preset**: `None`
     - **Build command**: *(leave empty)*
     - **Build output directory**: `.` *(or root)*
   - Click **Save and Deploy**.

3. **Your Site is Live!**:
   - Cloudflare will deploy your site across 300+ global data centers in under 30 seconds at `https://spadeworks-automation.pages.dev`.
   - Every time you push a commit to the `main` branch on GitHub, Cloudflare will automatically build and deploy the update with instant previews for Pull Requests.

---

### Method B: GitHub Actions (Alternative)

If you prefer deploying via GitHub Actions workflow:
1. Add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in your GitHub repository's **Settings > Secrets and variables > Actions**.
2. Push to `main`. The `.github/workflows/deploy.yml` workflow will automatically deploy the site.

---

## 💻 Local Testing & Preview

To preview the website locally before deploying:

```bash
cd /home/boujie/spadeworks-automation
python3 -m http.server 8080
```
Open your browser at `http://localhost:8080`.

---

## 📁 Repository Structure

```
spadeworks-automation/
├── index.html                   # Main flagship landing page & interactive apps
├── solutions.html               # Enterprise finance solutions breakdown
├── security.html                # SOC 2, compliance, and VPC architecture
├── case-studies.html            # Verified customer case studies
├── _headers                     # Cloudflare Pages security & caching headers
├── _redirects                   # Clean URL routes & redirects
├── wrangler.toml                # Cloudflare Pages / Workers configuration
├── sitemap.xml                  # Search engine sitemap
├── robots.txt                   # Crawler directives
├── README.md                    # Documentation & deployment guide
├── .gitignore                   # Ignored files
├── .github/
│   └── workflows/
│       └── deploy.yml           # Automated GitHub Actions workflow
└── assets/
    ├── css/
    │   └── styles.css           # Custom fintech styling & animations
    └── js/
        ├── calculator.js        # Dynamic financial ROI calculation engine
        └── main.js              # Sandbox simulator, modal, navigation & logic
```
