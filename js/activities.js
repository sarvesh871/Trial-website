/**
 * ScaleWise - Activity Interactive Experiences & Simulations
 * Implements interactive modules for Exercises 1 through 7.
 */

(function () {
  'use strict';

  // ==========================================================================
  // EXERCISE 1: Sustainability Audit of a Startup
  // ==========================================================================
  function initActivity1() {
    const selector = document.querySelector('.tbl-interactive-selector');
    if (!selector) return;

    // Pillar switching
    const tabBtns = selector.querySelectorAll('.tbl-tab-btn');
    const panels = document.querySelectorAll('.audit-dimension-panel');

    tabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target-panel');
        tabBtns.forEach((b) => b.classList.remove('active'));
        panels.forEach((p) => p.classList.remove('active'));
        btn.classList.add('active');
        const activePanel = document.getElementById(target);
        if (activePanel) activePanel.classList.add('active');
      });
    });

    // Score calculations
    const scoreButtons = document.querySelectorAll('.rating-score-btn');
    scoreButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const group = btn.closest('.rating-scale-group');
        group.querySelectorAll('.rating-score-btn').forEach((b) => b.classList.remove('selected'));
        btn.classList.add('selected');
        group.setAttribute('data-current-score', btn.getAttribute('data-score'));
        recalculateAuditScores();
      });
    });

    function recalculateAuditScores() {
      const allGroups = document.querySelectorAll('.rating-scale-group');
      let totalScores = 0;
      let count = 0;
      let gapsCount = 0;

      let envScores = 0, envCount = 0;
      let socScores = 0, socCount = 0;
      let econScores = 0, econCount = 0;

      allGroups.forEach((group) => {
        const score = parseInt(group.getAttribute('data-current-score'), 10) || 3;
        totalScores += score;
        count++;

        if (score <= 2) gapsCount++;

        const pillar = group.getAttribute('data-pillar');
        if (pillar === 'planet') { envScores += score; envCount++; }
        if (pillar === 'people') { socScores += score; socCount++; }
        if (pillar === 'profit') { econScores += score; econCount++; }
      });

      const overallAvg = (totalScores / count).toFixed(1);
      const envAvg = (envScores / envCount).toFixed(1);
      const socAvg = (socScores / socCount).toFixed(1);
      const econAvg = (econScores / econCount).toFixed(1);

      const overallEl = document.getElementById('audit-overall-score');
      const gapsEl = document.getElementById('audit-gaps-count');
      const envEl = document.getElementById('audit-env-score');
      const socEl = document.getElementById('audit-soc-score');
      const econEl = document.getElementById('audit-econ-score');

      if (overallEl) overallEl.textContent = `${overallAvg} / 5.0`;
      if (gapsEl) gapsEl.textContent = gapsCount;
      if (envEl) envEl.textContent = envAvg;
      if (socEl) socEl.textContent = socAvg;
      if (econEl) econEl.textContent = econAvg;
    }
  }

  // ==========================================================================
  // EXERCISE 2: Scalable Business Model Redesign
  // ==========================================================================
  const BMC_DATA = {
    partners: {
      title: 'Key Partnerships',
      baseline: 'Single regional sheet metal vendor, local battery cell importer, direct manual transport providers.',
      scalable: 'Tier-1 Contract Manufacturer with ISO14001, global certified LFP battery cell agreements, 3PL logistics provider with reverse logistics capabilities.',
      type: 'Outsourcing',
      impact: 'Reduces fixed equipment capital requirement by 65%; increases max capacity ceiling from 35 to 2,000 units/month.'
    },
    activities: {
      title: 'Key Activities',
      baseline: 'Manual unit assembly, custom wiring harnesses, on-site manual diagnostic testing, direct customer installation trips.',
      scalable: 'Automated Optical Inspection (AOI), automated robotic cell welding, cloud firmware deployment, platform partner training.',
      type: 'Automation',
      impact: 'Reduces labor assembly hours per unit from 14.5 hours to 1.8 hours; eliminates assembly defect variance.'
    },
    resources: {
      title: 'Key Resources',
      baseline: 'Central assembly workshop, specialized wiring technicians, on-premise inventory stockpiles.',
      scalable: 'Proprietary Solvanta OS telemetry IP, modular mechanical assembly patents, ISO-certified contract manufacturing capacity, digital twin cloud platform.',
      type: 'Platform',
      impact: 'Transitions core value into high-margin software & IP; lowers carrying cost of physical assets.'
    },
    value: {
      title: 'Value Propositions',
      baseline: 'Custom solar battery backup units with manual switchover for light commercial users.',
      scalable: 'Plug-and-play modular clean energy systems with autonomous AI load balancing, zero upfront capex (via Energy-as-a-Service), and real-time carbon telemetry.',
      type: 'Platform',
      impact: 'Expands addressable market to multi-site operators; enables enterprise carbon reporting compatibility.'
    },
    relationships: {
      title: 'Customer Relationships',
      baseline: 'Ad-hoc phone support, manual dispatch technicians for troubleshooting, high-touch founder sales.',
      scalable: 'Self-service installer portal, proactive remote IoT diagnostics, 24/7 automated alert escalation, community knowledge base.',
      type: 'Automation',
      impact: 'Reduces customer support cost per deployed MWh by 78%; achieves 99.4% uptime with predictive maintenance.'
    },
    channels: {
      title: 'Channels',
      baseline: 'Direct founder outreach, local trade fairs, individual referral word-of-mouth.',
      scalable: 'Certified clean-tech installer network, regional solar distributor API marketplace, direct enterprise partner accounts.',
      type: 'Outsourcing & Platform',
      impact: 'Decouples revenue growth from internal sales headcount; scales across 12 countries via certified channel partners.'
    },
    segments: {
      title: 'Customer Segments',
      baseline: 'Individual local shops and small eco-lodges requiring custom solar backup.',
      scalable: 'Distributed light industrial facilities, regional agro-processing hubs, healthcare cold-chain networks, and clean-energy infrastructure funds.',
      type: 'Scaling',
      impact: 'Increases Average Deal Size from $4,500 to $48,000; enables enterprise master service agreements (MSAs).'
    },
    costs: {
      title: 'Cost Structure',
      baseline: 'High fixed workshop lease, high direct manual labor costs, unoptimized small-batch raw material purchasing.',
      scalable: 'Predominantly variable contract manufacturing fees, volume-discounted BOM procurement, cloud server infrastructure, R&D engineering overheads.',
      type: 'Outsourcing & Automation',
      impact: 'Converts 60% of fixed manufacturing overheads into variable unit costs; unit cost drops 42% at scale.'
    },
    revenue: {
      title: 'Revenue Streams',
      baseline: 'One-off hardware sales ($4,500/unit) with unpredictable cash cycle and zero recurring revenue.',
      scalable: 'Hardware sales + recurring Solvanta OS IoT subscription ($35/unit/month) + EaaS power purchasing contracts + certified battery recycling take-back credit.',
      type: 'Platform',
      impact: 'Shifts revenue mix to 34% high-margin recurring ARR; increases customer lifetime value (LTV) from $4,500 to $9,800.'
    }
  };

  function initActivity2() {
    const bmcWrapper = document.querySelector('.bmc-grid-wrapper');
    if (!bmcWrapper) return;

    // View toggles: Baseline vs Redesigned
    const viewBtns = document.querySelectorAll('.bmc-view-btn');
    let currentMode = 'redesigned'; // default

    viewBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        viewBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        currentMode = btn.getAttribute('data-view');
        renderBMCView(currentMode);
      });
    });

    // Inspector cell clicks
    const cells = document.querySelectorAll('.bmc-cell');
    cells.forEach((cell) => {
      cell.addEventListener('click', () => {
        const key = cell.getAttribute('data-block-key');
        cells.forEach((c) => c.classList.remove('active-cell'));
        cell.classList.add('active-cell');
        showBMCInspector(key);
      });
    });

    function renderBMCView(mode) {
      document.querySelectorAll('.bmc-content-baseline').forEach((el) => {
        el.style.display = mode === 'baseline' ? 'block' : 'none';
      });
      document.querySelectorAll('.bmc-content-scalable').forEach((el) => {
        el.style.display = mode === 'scalable' ? 'block' : 'none';
      });
      document.querySelectorAll('.bmc-content-redesigned').forEach((el) => {
        el.style.display = mode === 'redesigned' ? 'block' : 'none';
      });
    }

    function showBMCInspector(key) {
      const data = BMC_DATA[key];
      if (!data) return;

      const inspectorTitle = document.getElementById('bmc-inspector-title');
      const baselineText = document.getElementById('bmc-inspector-baseline');
      const scalableText = document.getElementById('bmc-inspector-scalable');
      const impactText = document.getElementById('bmc-inspector-impact');
      const mechanismBadge = document.getElementById('bmc-inspector-mechanism');

      if (inspectorTitle) inspectorTitle.textContent = data.title;
      if (baselineText) baselineText.textContent = data.baseline;
      if (scalableText) scalableText.textContent = data.scalable;
      if (impactText) impactText.textContent = data.impact;
      if (mechanismBadge) {
        mechanismBadge.textContent = data.type;
        mechanismBadge.className = 'badge ' + (data.type.includes('Automation') ? 'badge-blue' : (data.type.includes('Outsourcing') ? 'badge-amber' : 'badge-mint'));
      }
    }
  }

  // ==========================================================================
  // EXERCISE 3: Supply Chain and Operations Scaling Plan
  // ==========================================================================
  const SUPPLY_STAGES = {
    supplier: {
      name: 'Tier-1 & Tier-2 Sourcing',
      current: 'Single-source imported LFP battery cells (16-week lead time), local recycled aluminum extrusions, commercial micro-inverter microchips.',
      bottleneck: 'Breakdown at >300 units/mo: cell supplier quota allocation fails; single-source shipping delays cascade into total assembly shutdown.',
      sustainable: 'Dual-sourced certified recycled aluminum; long-term off-take contract with domestic closed-loop LFP battery cell refabricator.'
    },
    manufacturing: {
      name: 'Sub-Assembly & Integration',
      current: '11-person in-house manual batch workshop. 3 manual assembly benches; max 35 units per month capacity.',
      bottleneck: 'Breakpoint at 50 units/mo: workshop floor space maxed out; overtime fatigue increases assembly soldering errors to 4.8%.',
      sustainable: 'ISO 14001 Contract Manufacturing with automated cell soldering & modular assembly cells powered by 100% on-site solar PV.'
    },
    qc: {
      name: 'Quality Control & Testing',
      current: 'Manual 12-hour charge-discharge cycle testing with voltmeter probes by lead electrical engineer.',
      bottleneck: 'Breakpoint at 80 units/mo: testing benches become critical bottleneck, delaying order delivery by up to 3 weeks.',
      sustainable: 'Automated computerized burn-in test rigs with regenerative power recovery (92% of test energy cycled back into plant grid).'
    },
    warehousing: {
      name: 'Warehousing & Buffer Inventory',
      current: 'Rented 1,200 sq ft industrial garage with manual pallet jacks and unpalletized battery storage.',
      bottleneck: 'Breakpoint at 150 units/mo: fire safety hazard thresholds exceeded for lithium storage; insurance premia surge.',
      sustainable: 'Certified hazardous-materials green 3PL warehousing hub with climate control and fire-suppression dry-sprinkler tech.'
    },
    distribution: {
      name: 'Logistics & Distribution',
      current: 'Direct road freight delivery via ad-hoc local diesel courier trucks with excessive single-use bubble wrap and foam packing.',
      bottleneck: 'Breakpoint at 200 units/mo: freight logistics costs exceed 14% of gross margin; high in-transit vibration damages inverter pins.',
      sustainable: 'Consolidated rail/EV road freight; returnable circular dunnage crates (zero single-use foam); route optimization software.'
    },
    customer: {
      name: 'Customer Deployment & Take-Back',
      current: 'Direct founder or technician on-site commissioning; zero end-of-life battery collection mechanism.',
      bottleneck: 'Breakpoint at 100 units/mo: field travel consumes 60% of technical team time; environmental risk of discarded battery packs.',
      sustainable: 'Certified local installer certification program; QR-code digital battery passport; guaranteed circular take-back credit scheme.'
    }
  };

  const PHASE_DATA = {
    pilot: {
      badge: 'Pilot Stage',
      volume: '100 units / month',
      sourcing: 'Single-source raw materials, spot purchasing, localized vendors.',
      production: 'Hybrid in-house pilot cell; manual wiring with semi-automated screw torque.',
      logistics: 'Direct LTL freight, centralized single regional warehouse.',
      inventory: 'High buffer stock (45 days) to mitigate supplier lead time spikes.',
      sustainability: 'Initial material scrap tracking, manual sorting of packaging waste.'
    },
    scaleup: {
      badge: 'Scale-Up Stage',
      volume: '2,500 units / month',
      sourcing: 'Dual-sourcing for all critical BOM components (LFP cells, micro-inverters, BMS microcontrollers).',
      production: 'Contract Manufacturing (CM) partnership with automated optical inspection and automated cell laser welding.',
      logistics: 'Regional 3PL fulfillment hubs; transition to standardized returnable crates.',
      inventory: 'Just-in-Time (JIT) delivery for enclosures; 20-day safety stock for imported cells.',
      sustainability: '100% recycled aluminum enclosures; packaging volume reduced by 55%.'
    },
    mass: {
      badge: 'Mass Production',
      volume: '25,000 units / month',
      sourcing: 'Multi-regional procurement with tier-2 ESG audits and closed-loop material reclamation contracts.',
      production: 'Fully automated lights-out robotic integration line with ISO 9001 / ISO 14001 / ISO 45001 certification.',
      logistics: 'Intermodal freight (rail + electric truck drayage); localized assembly hubs in key markets.',
      inventory: 'Vendor-Managed Inventory (VMI) with automated IoT replenishment signals.',
      sustainability: 'Certified 95% circular take-back program; Net-Zero manufacturing facility emissions.'
    }
  };

  function initActivity3() {
    const stagesContainer = document.querySelector('.supply-stages-flow');
    if (!stagesContainer) return;

    // Stage cards click
    const stageNodes = stagesContainer.querySelectorAll('.supply-node-card');
    stageNodes.forEach((node) => {
      node.addEventListener('click', () => {
        stageNodes.forEach((n) => n.classList.remove('active'));
        node.classList.add('active');
        const key = node.getAttribute('data-stage-key');
        renderStageDetails(key);
      });
    });

    // Phase step cards click
    const phaseCards = document.querySelectorAll('.phase-step-card');
    phaseCards.forEach((card) => {
      card.addEventListener('click', () => {
        phaseCards.forEach((c) => c.classList.remove('active'));
        card.classList.add('active');
        const phaseKey = card.getAttribute('data-phase-key');
        renderPhaseDetails(phaseKey);
      });
    });

    function renderStageDetails(key) {
      const data = SUPPLY_STAGES[key];
      if (!data) return;

      const titleEl = document.getElementById('stage-detail-title');
      const currentEl = document.getElementById('stage-detail-current');
      const bottleneckEl = document.getElementById('stage-detail-bottleneck');
      const sustainableEl = document.getElementById('stage-detail-sustainable');

      if (titleEl) titleEl.textContent = data.name;
      if (currentEl) currentEl.textContent = data.current;
      if (bottleneckEl) bottleneckEl.textContent = data.bottleneck;
      if (sustainableEl) sustainableEl.textContent = data.sustainable;
    }

    function renderPhaseDetails(phaseKey) {
      const p = PHASE_DATA[phaseKey];
      if (!p) return;

      const badgeEl = document.getElementById('phase-detail-badge');
      const volumeEl = document.getElementById('phase-detail-volume');
      const sourcingEl = document.getElementById('phase-detail-sourcing');
      const prodEl = document.getElementById('phase-detail-production');
      const logEl = document.getElementById('phase-detail-logistics');
      const invEl = document.getElementById('phase-detail-inventory');
      const sustEl = document.getElementById('phase-detail-sustainability');

      if (badgeEl) badgeEl.textContent = p.badge;
      if (volumeEl) volumeEl.textContent = p.volume;
      if (sourcingEl) sourcingEl.textContent = p.sourcing;
      if (prodEl) prodEl.textContent = p.production;
      if (logEl) logEl.textContent = p.logistics;
      if (invEl) invEl.textContent = p.inventory;
      if (sustEl) sustEl.textContent = p.sustainability;
    }
  }

  // ==========================================================================
  // EXERCISE 4: Financial Projections & Break-Even Chart
  // ==========================================================================
  function initActivity4() {
    const calcPanel = document.querySelector('.calc-inputs-panel');
    if (!calcPanel) return;

    // Sliders
    const sliderPrice = document.getElementById('input-price');
    const sliderVarCost = document.getElementById('input-varcost');
    const sliderFixedCost = document.getElementById('input-fixedcost');
    const sliderVolume = document.getElementById('input-volume');
    const sliderCAC = document.getElementById('input-cac');
    const sliderLTV = document.getElementById('input-ltv');

    const inputs = [sliderPrice, sliderVarCost, sliderFixedCost, sliderVolume, sliderCAC, sliderLTV];

    inputs.forEach((input) => {
      if (!input) return;
      input.addEventListener('input', () => {
        updateFinancialCalculations();
      });
    });

    function formatCurrency(val) {
      return '$' + Math.round(val).toLocaleString();
    }

    function updateFinancialCalculations() {
      const price = parseFloat(sliderPrice.value) || 4500;
      const varCost = parseFloat(sliderVarCost.value) || 2600;
      const fixedCost = parseFloat(sliderFixedCost.value) || 1200000;
      const targetVolume = parseFloat(sliderVolume.value) || 1200;
      const cac = parseFloat(sliderCAC.value) || 1200;
      const ltv = parseFloat(sliderLTV.value) || 9800;

      // Update badge displays
      document.getElementById('val-price').textContent = formatCurrency(price);
      document.getElementById('val-varcost').textContent = formatCurrency(varCost);
      document.getElementById('val-fixedcost').textContent = formatCurrency(fixedCost);
      document.getElementById('val-volume').textContent = targetVolume.toLocaleString() + ' units';
      document.getElementById('val-cac').textContent = formatCurrency(cac);
      document.getElementById('val-ltv').textContent = formatCurrency(ltv);

      // Calculations
      const cmPerUnit = Math.max(price - varCost, 1);
      const cmRatio = (cmPerUnit / price) * 100;
      const breakEvenUnits = Math.ceil(fixedCost / cmPerUnit);
      const breakEvenRevenue = breakEvenUnits * price;
      const totalRevenue = targetVolume * price;
      const totalVariableCost = targetVolume * varCost;
      const totalCost = fixedCost + totalVariableCost;
      const ebitda = totalRevenue - totalCost;
      const ltvCacRatio = (ltv / Math.max(cac, 1)).toFixed(1);

      // Update KPIs
      const cmEl = document.getElementById('kpi-cm');
      const cmRatioEl = document.getElementById('kpi-cm-ratio');
      const beUnitsEl = document.getElementById('kpi-be-units');
      const beRevEl = document.getElementById('kpi-be-revenue');
      const ebitdaEl = document.getElementById('kpi-ebitda');
      const ltvCacEl = document.getElementById('kpi-ltv-cac');

      if (cmEl) cmEl.textContent = formatCurrency(cmPerUnit);
      if (cmRatioEl) cmRatioEl.textContent = cmRatio.toFixed(1) + '%';
      if (beUnitsEl) beUnitsEl.textContent = breakEvenUnits.toLocaleString() + ' units';
      if (beRevEl) beRevEl.textContent = formatCurrency(breakEvenRevenue);
      if (ebitdaEl) {
        ebitdaEl.textContent = (ebitda >= 0 ? '+' : '') + formatCurrency(ebitda);
        ebitdaEl.style.color = ebitda >= 0 ? 'var(--color-mint)' : 'var(--color-red)';
      }
      if (ltvCacEl) {
        ltvCacEl.textContent = `${ltvCacRatio}x`;
        ltvCacEl.style.color = parseFloat(ltvCacRatio) >= 3 ? 'var(--color-mint)' : 'var(--color-amber)';
      }

      // Draw SVG Break-Even Chart
      drawBreakEvenChart(price, varCost, fixedCost, breakEvenUnits, targetVolume);

      // Update Sensitivity Analysis Table
      updateSensitivityTable(price, varCost, fixedCost, cac);
    }

    function drawBreakEvenChart(price, varCost, fixedCost, breakEvenUnits, targetVolume) {
      const svg = document.getElementById('breakeven-chart-svg');
      if (!svg) return;

      const maxUnits = Math.max(breakEvenUnits * 1.8, targetVolume * 1.3, 1000);
      const maxDollars = maxUnits * price;

      const width = 640;
      const height = 300;
      const padLeft = 70;
      const padBottom = 40;
      const padRight = 30;
      const padTop = 20;

      const chartW = width - padLeft - padRight;
      const chartH = height - padTop - padBottom;

      const scaleX = (units) => padLeft + (units / maxUnits) * chartW;
      const scaleY = (dollars) => padTop + chartH - (dollars / maxDollars) * chartH;

      // Points for lines
      const fcY = scaleY(fixedCost);
      const tcEndY = scaleY(fixedCost + maxUnits * varCost);
      const revEndY = scaleY(maxUnits * price);

      const beX = scaleX(breakEvenUnits);
      const beY = scaleY(breakEvenUnits * price);

      svg.innerHTML = `
        <!-- Chart Grid Lines -->
        <line x1="${padLeft}" y1="${padTop}" x2="${padLeft}" y2="${padTop + chartH}" stroke="#E6E8E2" stroke-width="1.5" />
        <line x1="${padLeft}" y1="${padTop + chartH}" x2="${padLeft + chartW}" y2="${padTop + chartH}" stroke="#E6E8E2" stroke-width="1.5" />
        
        <!-- Fixed Cost Line (Dashed Slate) -->
        <line x1="${padLeft}" y1="${fcY}" x2="${padLeft + chartW}" y2="${fcY}" stroke="#718096" stroke-width="2" stroke-dasharray="4 4" />
        <text x="${padLeft + chartW - 5}" y="${fcY - 6}" font-size="10" fill="#718096" text-anchor="end" font-weight="600">Fixed Costs ($${(fixedCost/1e6).toFixed(1)}M)</text>

        <!-- Total Cost Line (Amber) -->
        <line x1="${padLeft}" y1="${fcY}" x2="${padLeft + chartW}" y2="${tcEndY}" stroke="#D97706" stroke-width="2.5" />
        <text x="${padLeft + chartW - 5}" y="${tcEndY - 6}" font-size="10" fill="#D97706" text-anchor="end" font-weight="600">Total Costs</text>

        <!-- Total Revenue Line (Forest/Mint) -->
        <line x1="${padLeft}" y1="${scaleY(0)}" x2="${padLeft + chartW}" y2="${revEndY}" stroke="#10B981" stroke-width="3" />
        <text x="${padLeft + chartW - 5}" y="${revEndY - 6}" font-size="10" fill="#10B981" text-anchor="end" font-weight="700">Total Revenue</text>

        <!-- Break-Even Vertical Drop Line -->
        <line x1="${beX}" y1="${padTop + chartH}" x2="${beX}" y2="${beY}" stroke="#113328" stroke-width="1.5" stroke-dasharray="3 3" />
        
        <!-- Break-Even Intersect Circle -->
        <circle cx="${beX}" cy="${beY}" r="6" fill="#113328" stroke="#FFFFFF" stroke-width="2" />
        <circle cx="${beX}" cy="${beY}" r="12" fill="rgba(16, 185, 129, 0.2)" />

        <!-- Break-Even Label Box -->
        <rect x="${Math.min(beX + 8, chartW - 80)}" y="${Math.max(beY - 32, 10)}" width="115" height="28" rx="4" fill="#113328" />
        <text x="${Math.min(beX + 14, chartW - 74)}" y="${Math.max(beY - 14, 28)}" font-size="10" fill="#FFFFFF" font-weight="700">Break-Even: ${breakEvenUnits} units</text>

        <!-- X Axis Label -->
        <text x="${padLeft + chartW / 2}" y="${height - 8}" font-size="11" fill="#4A5568" text-anchor="middle" font-weight="600">Production Volume (Units / Year)</text>

        <!-- Y Axis Label -->
        <text transform="rotate(-90)" x="${-(padTop + chartH / 2)}" y="20" font-size="11" fill="#4A5568" text-anchor="middle" font-weight="600">Financial Value ($ USD)</text>
      `;
    }

    function updateSensitivityTable(price, varCost, fixedCost, cac) {
      const priceVariants = [price * 0.8, price, price * 1.2];
      const cacVariants = [cac * 0.8, cac, cac * 1.2];

      const tbody = document.getElementById('sensitivity-tbody');
      if (!tbody) return;

      let html = '';
      const rowLabels = ['-20% Price ($' + Math.round(priceVariants[0]) + ')', 'Base Price ($' + Math.round(priceVariants[1]) + ')', '+20% Price ($' + Math.round(priceVariants[2]) + ')'];

      priceVariants.forEach((p, rIdx) => {
        html += `<tr><td><strong>${rowLabels[rIdx]}</strong></td>`;
        cacVariants.forEach((c) => {
          const cm = Math.max(p - varCost, 1);
          const beUnits = Math.ceil(fixedCost / cm);
          const beMonths = ((beUnits / 1200) * 12).toFixed(1);
          html += `<td><strong>${beUnits.toLocaleString()} units</strong> <br><small class="text-muted">(${beMonths} mos to BE)</small></td>`;
        });
        html += `</tr>`;
      });

      tbody.innerHTML = html;
    }

    // Initial run
    updateFinancialCalculations();
  }

  // ==========================================================================
  // EXERCISE 5: Risk Assessment and Mitigation Roadmap
  // ==========================================================================
  const RISKS_DATA = [
    { id: 'R1', cat: 'Operational', name: 'Critical LFP Battery Cell Supply Delay', prob: 4, impact: 5, score: 20, owner: 'Head of Operations', freq: 'Bi-Weekly', mit: 'Dual-source agreements with certified secondary cell vendor; establish 45-day local inventory buffer.', cont: 'Authorize emergency air freight allocation; trigger pre-negotiated secondary vendor production slot.', trigger: 'Supplier lead time notification exceeding 12 weeks.' },
    { id: 'R2', cat: 'Financial', name: 'Working Capital Cash Flow Crunch During Scale-Up', prob: 4, impact: 4, score: 16, owner: 'VP Finance / CFO', freq: 'Weekly', mit: 'Secure $2.5M working capital credit facility; structure 50% upfront deposits on commercial contracts.', cont: 'Draw down revolving bank debt facility; defer non-critical capital expenditures.', trigger: 'Cash runway dropping below 4.5 months of operational burn.' },
    { id: 'R3', cat: 'Regulatory', name: 'Delays in Regional Grid Interconnection Certification', prob: 3, impact: 5, score: 15, owner: 'Regulatory & Compliance Lead', freq: 'Monthly', mit: 'Pre-compliance testing at accredited laboratories; engage utility standards working group.', cont: 'Offer islanded/off-grid mode firmware configuration while grid-tie certification is processed.', trigger: 'Standards body review cycle exceeding 90 days without formal audit schedule.' },
    { id: 'R4', cat: 'Market', name: 'Aggressive Price Competition from Incumbent Diesel/Solar OEMs', prob: 4, impact: 3, score: 12, owner: 'Chief Commercial Officer', freq: 'Monthly', mit: 'Differentiate with Solvanta OS smart telemetry, 99.4% uptime SLA, and circular battery buyback guarantee.', cont: 'Launch zero-capex Energy-as-a-Service (EaaS) leasing model to eliminate customer purchase resistance.', trigger: 'Competitor discount margin exceeding 20% on tier-1 commercial bids.' },
    { id: 'R5', cat: 'Organisational', name: 'Shortage of Specialized Battery Management Firmware Engineers', prob: 3, impact: 4, score: 12, owner: 'Head of People & Culture', freq: 'Monthly', mit: 'Competitive equity packages; university clean-tech partnerships; structured onboarding accelerator.', cont: 'Engage pre-vetted specialized firmware engineering consultancy for surge capacity.', trigger: 'Key technical engineering vacancies open for greater than 60 days.' },
    { id: 'R6', cat: 'Operational', name: 'Quality Defect in First Contract-Manufactured Batch', prob: 3, impact: 4, score: 12, owner: 'Lead Quality Engineer', freq: 'Weekly', mit: 'Full-time Solvanta QA engineer deployed on-site at contract manufacturing facility; automated optical inspection.', cont: 'Halt batch dispatch; isolate affected lot numbers via digital component serial tracking.', trigger: 'First-pass manufacturing yield falling below 96.5%.' },
    { id: 'R7', cat: 'Market', name: 'Customer Adoption Slowdown in Commercial Agro-Processing', prob: 3, impact: 3, score: 9, owner: 'Head of Business Development', freq: 'Monthly', mit: 'Case studies demonstrating 18-month payback; pilot demonstration sites in agricultural clusters.', cont: 'Pivot sales resources toward healthcare cold chain and peri-urban telecom tower backup.', trigger: 'Qualified sales pipeline conversion rate dropping below 12%.' },
    { id: 'R8', cat: 'Regulatory', name: 'Stricter Lithium Battery End-of-Life Disposal Mandates', prob: 3, impact: 3, score: 9, owner: 'Sustainability Lead', freq: 'Quarterly', mit: 'Design for disassembly; integrate QR-code digital battery passport from day one.', cont: 'Partner with certified regional hydrometallurgical recycling facility for contracted collection.', trigger: 'Publication of draft regional extended producer responsibility (EPR) regulations.' },
    { id: 'R9', cat: 'Financial', name: 'Raw Material Lithium & Copper Price Volatility', prob: 4, impact: 2, score: 8, owner: 'Head of Procurement', freq: 'Monthly', mit: 'Include index-linked pricing adjustment clauses in customer agreements; forward hedging.', cont: 'Absorb short-term fluctuations via contingency buffer; prioritize alternative sub-components.', trigger: 'Global benchmark LFP carbonate price moving more than +25% in a quarter.' },
    { id: 'R10', cat: 'Organisational', name: 'Dilution of Mission & Culture During Rapid Headcount Expansion', prob: 3, impact: 2, score: 6, owner: 'CEO / Founder', freq: 'Bi-Monthly', mit: 'Codified Solvanta Culture Playbook; quarterly all-hands alignment; values-based hiring criteria.', cont: 'Execute culture audit survey; conduct targeted leadership workshops on decentralized values.', trigger: 'Employee Net Promoter Score (eNPS) dropping below +40.' },
    { id: 'R11', cat: 'Financial', name: 'Delayed Grant Disbursements or Subsidies', prob: 2, impact: 3, score: 6, owner: 'Finance Lead', freq: 'Monthly', mit: 'Model base financial projections strictly on commercial operating revenue without subsidy reliance.', cont: 'Bridge funding bridge via existing seed investors.', trigger: 'Grant milestone review delayed by >45 days.' },
    { id: 'R12', cat: 'Operational', name: 'In-Transit Freight Vibration Damage to Solar Micro-Inverters', prob: 2, impact: 3, score: 6, owner: 'Logistics Manager', freq: 'Monthly', mit: 'Engineered reusable shock-absorbing dunnage casing; vibration dataloggers on pilot freight shipments.', cont: 'Rapid warranty component replacement policy; claim compensation under transit insurance.', trigger: 'In-transit damage rate exceeding 0.5% of shipped units.' }
  ];

  function initActivity5() {
    const matrixGrid = document.querySelector('.matrix-table');
    if (!matrixGrid) return;

    // Build the 5x5 Matrix cells
    // Probability (Y-axis: 5 down to 1), Impact (X-axis: 1 up to 5)
    for (let prob = 5; prob >= 1; prob--) {
      for (let imp = 1; imp <= 5; imp++) {
        const score = prob * imp;
        const cell = document.querySelector(`[data-cell-prob="${prob}"][data-cell-imp="${imp}"]`);
        if (cell) {
          // Find risks matching this cell
          const matching = RISKS_DATA.filter((r) => r.prob === prob && r.impact === imp);
          let riskClass = 'cell-risk-low';
          if (score >= 20) riskClass = 'cell-risk-extreme';
          else if (score >= 12) riskClass = 'cell-risk-high';
          else if (score >= 6) riskClass = 'cell-risk-medium';

          cell.className = `matrix-cell ${riskClass}`;
          cell.innerHTML = `
            <span>${score}</span>
            ${matching.length > 0 ? `<span class="matrix-risk-count">${matching.length} risk${matching.length > 1 ? 's' : ''}</span>` : ''}
          `;

          cell.addEventListener('click', () => {
            document.querySelectorAll('.matrix-cell').forEach((c) => c.classList.remove('selected'));
            cell.classList.add('selected');
            displayCellRisks(prob, imp, score, matching);
          });
        }
      }
    }

    // Category filter buttons
    const filterBtns = document.querySelectorAll('.risk-filter-btn');
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-risk-cat');
        filterRiskTable(cat);
      });
    });

    function displayCellRisks(prob, imp, score, risks) {
      const inspectorBox = document.getElementById('matrix-cell-inspector');
      if (!inspectorBox) return;

      let severity = 'Low Priority';
      if (score >= 20) severity = 'Extreme Critical Priority';
      else if (score >= 12) severity = 'High Priority';
      else if (score >= 6) severity = 'Moderate Priority';

      let risksHtml = risks.length === 0
        ? '<p class="text-muted">No illustrative risks currently mapped to this coordinate.</p>'
        : risks.map((r) => `
            <div style="background:#FBFBFA; border:1px solid #E6E8E2; border-radius:6px; padding:10px; margin-bottom:8px;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <strong>${r.id}: ${r.name}</strong>
                <span class="badge badge-sage">${r.cat}</span>
              </div>
              <p style="font-size:0.8125rem; margin:6px 0 2px;"><strong>Mitigation:</strong> ${r.mit}</p>
              <div style="font-size:0.75rem; color:#718096;">Owner: ${r.owner} | Review: ${r.freq}</div>
            </div>
          `).join('');

      inspectorBox.innerHTML = `
        <div style="border-bottom:1px solid #E6E8E2; padding-bottom:8px; margin-bottom:10px;">
          <h4 style="margin:0;">Score ${score} (Probability: ${prob}/5, Impact: ${imp}/5)</h4>
          <span style="font-size:0.8125rem; font-weight:700; color:var(--color-forest);">${severity}</span>
        </div>
        ${risksHtml}
      `;
    }

    function filterRiskTable(category) {
      const rows = document.querySelectorAll('.risk-register-row');
      rows.forEach((row) => {
        const rowCat = row.getAttribute('data-risk-cat');
        if (category === 'all' || rowCat === category) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    }
  }

  // ==========================================================================
  // EXERCISE 6: ESG Integration and Impact Measurement
  // ==========================================================================
  function initActivity6() {
    const tabsContainer = document.querySelector('.esg-category-tabs');
    if (!tabsContainer) return;

    const tabBtns = tabsContainer.querySelectorAll('.esg-tab-btn');
    const cards = document.querySelectorAll('.esg-metric-card');

    tabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        tabBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-esg-filter');

        cards.forEach((card) => {
          const cardCat = card.getAttribute('data-esg-cat');
          if (filter === 'all' || cardCat === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // Copy ESG Pitch Statement
    const copyBtn = document.getElementById('copy-esg-statement-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const statementText = document.getElementById('esg-pitch-statement-text').innerText;
        navigator.clipboard.writeText(statementText).then(() => {
          if (window.ScaleWise && window.ScaleWise.showToast) {
            window.ScaleWise.showToast('ESG pitch statement copied to clipboard!', 'success');
          }
        }).catch(() => {
          alert('Statement copied: ' + statementText.substring(0, 50) + '...');
        });
      });
    }
  }

  // ==========================================================================
  // EXERCISE 7: Team and Culture Scaling Exercise
  // ==========================================================================
  const ORG_STAGES_DATA = {
    10: {
      headcount: 10,
      stageName: 'Seed / Founding Core',
      structureDesc: 'Flat, founder-led hierarchy with informal communication and high generalist flexibility. Everyone wears multiple hats.',
      layers: '1 Management Layer (Founders & Team)',
      dunbarNote: 'Well below Dunbar number; informal daily scrums and implicit shared values suffice.',
      priority: 'Full-stack problem solvers; fast prototyping; customer discovery empathy.',
      cultureRisks: 'Founder single-point-of-failure; lack of codified engineering standards; informal burnout.',
      departments: [
        { name: 'Executive & Strategy', roles: ['CEO & Commercial Lead', 'CTO & Chief Architect'] },
        { name: 'Hardware & Systems', roles: ['Lead Mechanical Engineer', 'Power Electronics Engineer', 'Pilot Assembly Tech'] },
        { name: 'Firmware & Software', roles: ['Lead Embedded Firmware Dev', 'Full-Stack IoT Engineer'] },
        { name: 'Operations & Field', roles: ['Operations Lead', 'Field Deployment Technician', 'Business Development Assoc'] }
      ]
    },
    25: {
      headcount: 25,
      stageName: 'Early Scale / Series A Initial',
      structureDesc: 'First functional department leads established. Transition from direct founder oversight to functional team coordination.',
      layers: '2 Management Layers (Execs -> Functional Leads -> Individual Contributors)',
      dunbarNote: 'Reaching the first coordination boundary (~25-30 people); spontaneous hallway alignment starts missing team members.',
      priority: 'First specialist hires (QA automation, procurement manager, field operations manager).',
      cultureRisks: 'Early employees feeling loss of direct founder intimacy; emerging functional silos between hardware and software.',
      departments: [
        { name: 'Executive & Admin', roles: ['CEO', 'CTO', 'VP Finance & Operations', 'Office & People Admin'] },
        { name: 'Hardware Engineering (6)', roles: ['Mechanical Lead', '2x Mech Engineers', '2x Electrical Engineers', 'QA Test Specialist*'] },
        { name: 'Firmware & Cloud (5)', roles: ['Firmware Lead', '2x Firmware Devs', 'Cloud Architect', 'DevOps Specialist*'] },
        { name: 'Supply & Manufacturing (6)', roles: ['Manufacturing Lead*', 'Procurement Specialist*', '4x Certified Assembly Techs'] },
        { name: 'Commercial & Deployment (4)', roles: ['Head of Sales', '2x Field Service Engineers*', 'Customer Success Specialist*'] }
      ]
    },
    50: {
      headcount: 50,
      stageName: 'Series A Expansion',
      structureDesc: 'Codified middle management with explicit cross-functional squads (Product, Scale-Up Operations, Regional Delivery).',
      layers: '3 Management Layers (C-Suite -> Directors/Heads -> Managers/Leads -> Engineers)',
      dunbarNote: 'Approaching 50 people: informal culture no longer transmits organically; codified culture handbook and onboarding essential.',
      priority: 'Experienced mid-level managers; supply chain specialists; ESG and regulatory compliance officers.',
      cultureRisks: 'Inconsistent managerial styles; "us vs them" headquarters vs remote field teams; onboarding fatigue.',
      departments: [
        { name: 'Leadership & Support (6)', roles: ['CEO, CTO, CFO', 'Director of People', 'Legal & Regulatory Counsel*', 'People Partner*'] },
        { name: 'R&D Engineering (14)', roles: ['VP Engineering*', 'Battery Systems Architect', '8x Hardware/Mechanical Engineers', '4x Firmware/Cloud Developers'] },
        { name: 'Operations & Supply Chain (16)', roles: ['Director of Operations*', 'Supply Chain Manager', 'Contract Mfg Manager*', 'QA/QC Lead', '12x Assembly & Test Techs'] },
        { name: 'Commercial & Customer Success (14)', roles: ['Chief Commercial Officer', 'Regional Sales Managers (3)', '6x Field Deployment Specialists', '4x Customer Support & Telemetry Analysts'] }
      ]
    },
    100: {
      headcount: '100+',
      stageName: 'Series B Scale & Expansion',
      structureDesc: 'Full multi-tiered enterprise architecture with regional operational hubs, specialized business units, and codified governance.',
      layers: '4 Management Layers (Executive -> VP -> Director -> Manager -> IC)',
      dunbarNote: 'Past Dunbar’s 150 threshold: founders can no longer know every employee personally; institutionalized rituals and values required.',
      priority: 'Executive VPs with scaling pedigree; specialists in automated robotics; regional regulatory leads.',
      cultureRisks: 'Bureaucracy creep; decision-making paralysis; dilution of early-stage scrappiness and sustainability passion.',
      departments: [
        { name: 'Executive & Governance (10)', roles: ['C-Suite (CEO, CTO, COO, CFO, CCO)', 'VP People & Culture', 'General Counsel', 'VP ESG & Sustainability*'] },
        { name: 'Product & Advanced R&D (26)', roles: ['VP Product & R&D', 'Cell Chem Lab Team (6)', 'Next-Gen Power Electronics (8)', 'Telemetry Cloud & AI Platform (10)'] },
        { name: 'Global Supply Chain & Quality (34)', roles: ['VP Global Supply Chain', 'CM Oversight Directors (2)', 'Procurement & Logistics (12)', 'Quality & Safety Engineering (18)'] },
        { name: 'Regional Market Hubs & Deployment (30+)', roles: ['Regional Managing Directors (3)', 'Enterprise Account Executives (8)', 'Field Technical Engineering Corps (20+)'] }
      ]
    }
  };

  function initActivity7() {
    const stageContainer = document.querySelector('.org-stage-selector');
    if (!stageContainer) return;

    const stageCards = stageContainer.querySelectorAll('.org-stage-card');
    stageCards.forEach((card) => {
      card.addEventListener('click', () => {
        stageCards.forEach((c) => c.classList.remove('active'));
        card.classList.add('active');
        const size = parseInt(card.getAttribute('data-org-size'), 10) || 10;
        renderOrgChart(size);
      });
    });

    function renderOrgChart(size) {
      const data = ORG_STAGES_DATA[size] || ORG_STAGES_DATA[10];

      // Update summary tags
      const stageNameEl = document.getElementById('org-stage-name');
      const layersEl = document.getElementById('org-stage-layers');
      const dunbarEl = document.getElementById('org-stage-dunbar');
      const priorityEl = document.getElementById('org-stage-priority');
      const descEl = document.getElementById('org-stage-desc');

      if (stageNameEl) stageNameEl.textContent = `${data.headcount} Team Members — ${data.stageName}`;
      if (layersEl) layersEl.textContent = data.layers;
      if (dunbarEl) dunbarEl.textContent = data.dunbarNote;
      if (priorityEl) priorityEl.textContent = data.priority;
      if (descEl) descEl.textContent = data.structureDesc;

      // Render departments grid
      const deptsRow = document.getElementById('org-depts-container');
      if (!deptsRow) return;

      let html = '';
      data.departments.forEach((dept) => {
        html += `
          <div class="org-dept-col">
            <div class="org-dept-header">${dept.name}</div>
            <div class="org-dept-roles">
              ${dept.roles.map((role) => {
                const isNew = role.includes('*');
                const cleanRole = role.replace('*', '');
                return `
                  <div class="org-role-pill ${isNew ? 'new-hire' : ''}">
                    <span class="org-role-name">${cleanRole}</span>
                    ${isNew ? '<span class="org-role-meta">New Scale-up Specialist</span>' : '<span class="org-role-meta">Core Role</span>'}
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      });

      deptsRow.innerHTML = html;
    }
  }

  // Master Activity Initializer
  document.addEventListener('DOMContentLoaded', () => {
    initActivity1();
    initActivity2();
    initActivity3();
    initActivity4();
    initActivity5();
    initActivity6();
    initActivity7();
  });
})();
