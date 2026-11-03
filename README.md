# ScaleWise — Startup Sustainability & Scalability Simulation

> **Build Better. Scale Smarter. Grow Sustainably.**

ScaleWise is an interactive startup sustainability and scalability simulation website. The visitor takes the role of a founder of a high-growth climate-tech venture — **Solvanta Energy Systems** (manufacturers of modular solar-powered micro-inverter and energy storage systems) — preparing to scale from an early-stage pilot workshop into an automated, circular, sustainable enterprise.

The website translates the seven laboratory activities from the **"Startup Sustainability & Scalability Lab"** academic curriculum into rich, interactive, educational workspaces.

---

## 📁 Project Architecture & Pages

| File | Page Name | Primary Function & Content |
| :--- | :--- | :--- |
| `index.html` | **Landing / Home Page** | Editorial hero, Triple Bottom Line paradigm, 4-stage founder growth journey, preview of the 7 challenges, dynamic dashboard preview. |
| `founder-brief.html` | **Founder's Brief** | Contextual dossier for *Solvanta Energy Systems*, product architecture (PowerBlock™), operating baseline, growth milestones, and circularity goals. |
| `hub.html` | **Activity Hub** | Interactive responsive grid of all 7 lab activities with category tags, descriptions, icons, and real-time completion status badges. |
| `activity-1.html` | **Exercise 1: Sustainability Audit** | Interactive Triple Bottom Line (Planet, People, Profit) audit scoring tool (1–5 scale), gap analysis calculator, and Annexure A checklist. |
| `activity-2.html` | **Exercise 2: BMC Redesign** | Interactive 9-block Business Model Canvas comparison (Baseline vs. Redesigned Scalable) embedding Automation, Outsourcing, and Platform mechanisms with Annexure B change log. |
| `activity-3.html` | **Exercise 3: Supply Chain Plan** | 6-stage interactive supply chain workflow (Sourcing &rarr; Manufacturing &rarr; QC &rarr; Warehousing &rarr; Distribution &rarr; Customer/Take-back), volume breakpoint diagnosis, and 3-phase roadmap with green interventions (Annexure C). |
| `activity-4.html` | **Exercise 4: Financial Projections** | Real-time unit economics calculator (CAC, LTV, CM), dynamic interactive SVG Break-Even Chart, 5-year multi-year P&L model, and &plusmn;20% sensitivity matrix (Annexure D). |
| `activity-5.html` | **Exercise 5: Risk Roadmap** | Interactive 5&times;5 Probability–Impact Heatmap Matrix, 12-item categorized risk register, and deep-dive resilience plans for top 6 prioritized risks with early-warning triggers (Annexure E). |
| `activity-6.html` | **Exercise 6: ESG Dashboard** | Interactive ESG impact dashboard across Environmental, Social, and Governance pillars, progress vs. Year 1/3 targets, materiality justifications, and a 218-word investor-ready pitch ESG statement with copy button (Annexure F). |
| `activity-7.html` | **Exercise 7: Team & Culture** | Dynamic organizational hierarchy visualizer across 10, 25, 50, and 100+ headcount milestones, Dunbar threshold analysis, generalist-to-specialist hiring roadmap, and 4 culture risks/mitigations (Annexure G). |
| `toolkit.html` | **Sustainability Toolkit** | Pedagogical reference guide with visual cards and formulas for TBL, BMC Decoupling, Circular Logistics, Unit Economics, Break-Even, 5&times;5 Risk Matrix, ESG Standards, and Dunbar's Law. |
| `dashboard.html` | **Growth Dashboard** | Personal progress tracking center, 4 metric KPI cards, overall progress ring/bar, interactive activity checklist, and reset progress modal with `localStorage` persistence. |

---

## ⚡ Interactive Features Implemented

1. **Client-Side Progress Tracker (`localStorage`):**
   - Seamless progress persistence across all pages without requiring any backend, database, API keys, or user logins.
   - Live synchronization across header progress pills, hub status badges, and dashboard checklist rows.
   - Confirmation modal dialog for resetting progress with keyboard accessibility (`Escape` key support).

2. **Exercise 1 (Triple Bottom Line Audit Explorer):**
   - Clickable pillar tabs (Planet, People, Profit).
   - 12 diagnostic parameter scoring widgets (1–5 scale) updating overall TBL average and auto-flagging gaps (scores &le; 2).
   - Annexure A 5-gap analysis and improvement proposal table.

3. **Exercise 2 (Interactive Business Model Canvas):**
   - Dual-mode view toggle: *Baseline Linear Model* vs. *Redesigned Scalable Model*.
   - Clickable 9-block Osterwalder layout displaying specific interventions tagged as `[Automation]`, `[Outsourcing]`, or `[Platform]`.
   - Side-by-side comparison inspector and change log justification table.

4. **Exercise 3 (Supply Chain & Breakpoints Visualizer):**
   - 6-stage clickable supply chain flowchart displaying baseline operations, volume breakpoints (50 to 300 units/mo), and sustainable interventions.
   - Phased roadmap timeline switcher (Pilot: 100 u/mo &rarr; Scale-Up: 2,500 u/mo &rarr; Mass Production: 25,000 u/mo).
   - Dedicated visual component for 3 embedded sustainability interventions (recycled aluminum, returnable cellular dunnage, closed-loop battery passport take-back).

5. **Exercise 4 (Dynamic Financial & Break-Even Simulator):**
   - Six interactive range sliders: Unit Selling Price, Unit Variable Cost, Annual Fixed Overhead, Target Volume, CAC, and LTV.
   - Real-time calculated KPIs: Contribution Margin ($), CM Ratio (%), Break-Even Volume (units), Break-Even Revenue ($), EBITDA ($), and LTV:CAC ratio.
   - **Dynamic SVG Break-Even Chart** plotting Fixed Cost (dashed), Total Cost (amber), Total Revenue (green), and Break-Even cross-over point with live intersection markers.
   - Dynamic Sensitivity Table updating &plusmn;20% Price vs. &plusmn;20% CAC break-even timing in real time.
   - Complete 5-year P&L projection model (Years 1 to 5) with cumulative cash flow and funding structure recommendation.

6. **Exercise 5 (Interactive 5&times;5 Risk Heatmap Matrix):**
   - 25-cell interactive matrix (Probability 1–5 on Y-axis, Impact 1–5 on X-axis).
   - Color-coded severity zones: Extreme (red), High (amber), Medium (yellow), Low (green).
   - Clicking any cell filters and displays mapped risks with scores, severity ratings, and mitigation actions.
   - Filterable 12-risk register with category filter pills (Operational, Financial, Regulatory, Market, Organisational).
   - Detailed response cards for top 6 prioritized risks with early-warning trigger metrics.

7. **Exercise 6 (ESG Impact Measurement Dashboard):**
   - Category switcher: *All*, *Environmental*, *Social*, and *Governance*.
   - 8 realistic clean-tech KPI cards with current values, Year 1 & 3 targets, progress bars, exact calculation formulas, and data sources.
   - Formatted investor-ready ESG pitch statement with one-click clipboard copying.

8. **Exercise 7 (Team Hierarchy & Dunbar Threshold Visualizer):**
   - Milestone switcher: *10 People (Founding)*, *25 People (Series A Initial)*, *50 People (Series A Expansion)*, and *100+ People (Series B Enterprise)*.
   - Dynamically re-renders executive hierarchy, functional departments, specialist scale-up roles, and Dunbar coordination threshold analyses.
   - 4 culture risks and concrete codification mitigations.

---

## 🚀 How to Run Locally

### Option 1: Direct File Access (No Server Required)
Simply double-click `index.html` (or right-click &rarr; "Open With" your preferred browser: Chrome, Safari, Firefox, Edge).
Because all scripts, styles, and SVG graphics are self-contained without cross-origin dependencies, the entire simulation functions immediately off the local filesystem.

### Option 2: Local Python Static Server (Recommended)
Open a terminal in the project directory and run:

```bash
# Python 3
python3 -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000) in your web browser.

---

## 🌐 How to Deploy to Static Hosting

ScaleWise contains **zero backend dependencies**, **zero server-side code**, and **zero external npm build steps**. It can be deployed directly to any static web hosting platform:

### 1. GitHub Pages
1. Push the workspace to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of ScaleWise simulation website"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. Navigate to your repository **Settings** &rarr; **Pages**.
3. Under **Build and deployment**, select **Source: Deploy from a branch**, choose branch `main` and folder `/ (root)`.
4. Click **Save**. Your site will be live at `https://<username>.github.io/<repo-name>/`.

### 2. AWS S3 Static Website Hosting
1. Create an S3 bucket (e.g. `scalewise-simulation`).
2. Enable "Static website hosting" in the bucket properties, setting `index.html` as the index document.
3. Upload all files and folders (`css/`, `js/`, `assets/`, and all `.html` files).
4. Configure public read permissions or connect an AWS CloudFront distribution.

### 3. Vercel or Netlify
- Drag and drop the project folder directly into the [Netlify Drop](https://app.netlify.com/drop) or [Vercel Dashboard](https://vercel.com/new). No build commands or output directories are needed (`build command: none`, `publish directory: .`).

---

## 📋 PDF Curriculum Compliance Checklist

- [x] **Activity 1:** Sustainability Audit of a Startup (Objective, Learning Outcomes, Theory, Materials, 7-step Procedure, Deliverables, Evaluation Criteria, Annexure A).
- [x] **Activity 2:** Scalable Business Model Redesign (Objective, Learning Outcomes, Theory, Materials, 6-step Procedure, Deliverables, Evaluation Criteria, Annexure B).
- [x] **Activity 3:** Supply Chain & Operations Scaling Plan (Objective, Learning Outcomes, Theory, Materials, 6-step Procedure, Deliverables, Evaluation Criteria, Annexure C).
- [x] **Activity 4:** Financial Projections for Scaling (Objective, Learning Outcomes, Theory, Materials, 7-step Procedure, Deliverables, Evaluation Criteria, Annexure D).
- [x] **Activity 5:** Risk Assessment & Mitigation Roadmap (Objective, Learning Outcomes, Theory, Materials, 6-step Procedure, Deliverables, Evaluation Criteria, Annexure E).
- [x] **Activity 6:** ESG Integration & Impact Measurement (Objective, Learning Outcomes, Theory, Materials, 5-step Procedure, Deliverables, Evaluation Criteria, Annexure F).
- [x] **Activity 7:** Team & Culture Scaling Exercise (Objective, Learning Outcomes, Theory, Materials, 6-step Procedure, Deliverables, Evaluation Criteria, Annexure G).
- [x] **Evaluation Scheme:** 10 marks total per exercise across 5 criteria (Conceptual Clarity, Analytical Depth, Feasibility & Practicality, Presentation & Documentation, Timeliness).

---

## ⚠️ Testing Disclosures & Limitations

- **Browser Storage:** The simulation tracks activity completion in browser `localStorage`. If browser cookies/site data are cleared or private browsing (Incognito) is closed, local progress state resets to default (0%).
- **Cross-Device Persistence:** Because no backend database is used, progress is stored locally in the specific browser profile being used.
- **Educational Simulation Scope:** All financial numbers, technical specs for Solvanta PowerBlock™, and operational constraints are designed specifically for academic case study exercises.
