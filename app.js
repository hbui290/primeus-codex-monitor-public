const snapshotTs = document.querySelector("#snapshot-ts");
const serviceList = document.querySelector("#service-list");
const runtimeMode = document.querySelector("#runtime-mode");
const roomFeed = document.querySelector("#room-feed");
const roomEventCount = document.querySelector("#room-event-count");
const roomHelperStatus = document.querySelector("#room-helper-status");
const roomLatestEvent = document.querySelector("#room-latest-event");
const roomFeedSummary = document.querySelector("#room-feed-summary");
const coordinationActions = document.querySelector("#coordination-actions");
const coordinationFacts = document.querySelector("#coordination-facts");
const serviceHealth = document.querySelector("#service-health");
const statChips = Array.from(document.querySelectorAll(".stat-chip"));
const refreshButton = document.querySelector("#refresh-button");
const appearanceThemeSelect = document.querySelector("#appearance-theme");
const appearanceDensityControls = document.querySelector("#appearance-density-controls");
const appearanceRefreshIntervalSelect = document.querySelector("#appearance-refresh-interval");
const actionStatus = document.querySelector("#action-status");
const statLabel1 = document.querySelector("#stat-label-1");
const statLabel2 = document.querySelector("#stat-label-2");
const statLabel3 = document.querySelector("#stat-label-3");
const statLabel4 = document.querySelector("#stat-label-4");
const appBarEyebrow = document.querySelector("#app-bar-eyebrow");
const overviewHeadline = document.querySelector("#overview-headline");
const overviewSubline = document.querySelector("#overview-subline");
const appBarStats = document.querySelector(".app-bar-stats");
const homeSummaryCopy = document.querySelector("#home-summary-copy");
const homeSummaryGrid = document.querySelector("#home-summary-grid");
const homeAttentionSummary = document.querySelector("#home-attention-summary");
const homeAttentionList = document.querySelector("#home-attention-list");
const homeSystemSummary = document.querySelector("#home-system-summary");
const homeSystemFacts = document.querySelector("#home-system-facts");
const homeSystemActions = document.querySelector("#home-system-actions");
const homeSystemIssuesSection = document.querySelector("#home-system-issues-section");
const routeNavItems = Array.from(document.querySelectorAll(".nav-item[data-route]"));
const routeOverview = document.querySelector("#route-overview");
const routeAgents = document.querySelector("#route-agents");
const routeRuntime = document.querySelector("#route-runtime");
const routeReports = document.querySelector("#route-reports");
const routeIntegrations = document.querySelector("#route-integrations");
const routeSkills = document.querySelector("#route-skills");
const routeIdentity = document.querySelector("#route-identity");
const routeAudit = document.querySelector("#route-audit");
const reportsBoardView = document.querySelector("#reports-board-view");
const reportsDetailView = document.querySelector("#reports-detail-view");
const reportsDetailBack = document.querySelector("#reports-detail-back");
const reportsDetailPath = document.querySelector("#reports-detail-path");
const reportsDetailTitle = document.querySelector("#reports-detail-title");
const reportsDetailBadges = document.querySelector("#reports-detail-badges");
const reportsDetailContext = document.querySelector("#reports-detail-context");
const reportsDetailRuntime = document.querySelector("#reports-detail-runtime");
const agentTableBody = document.querySelector("#agent-table-body");
const agentFilterInput = document.querySelector("#agent-filter-input");
const agentRosterGrid = document.querySelector("#agent-roster-grid");
const agentSummaryGrid = document.querySelector("#agent-summary-grid");
const agentAttentionList = document.querySelector("#agent-attention-list");
const agentAttentionSummary = document.querySelector("#agent-attention-summary");
const agentEditorTitle = document.querySelector("#agent-editor-title");
const agentEditorSummary = document.querySelector("#agent-editor-summary");
const agentOverviewBadges = document.querySelector("#agent-overview-badges");
const agentLiveFacts = document.querySelector("#agent-live-facts");
const agentContextList = document.querySelector("#agent-context-list");
const agentLinkedFiles = document.querySelector("#agent-linked-files");
const agentForm = document.querySelector("#agent-form");
const agentDisplayName = document.querySelector("#agent-display-name");
const agentProvider = document.querySelector("#agent-provider");
const agentLane = document.querySelector("#agent-lane");
const agentModeTarget = document.querySelector("#agent-mode-target");
const agentApprovalPolicy = document.querySelector("#agent-approval-policy");
const agentSoulFile = document.querySelector("#agent-soul-file");
const agentIdentityFile = document.querySelector("#agent-identity-file");
const agentMemoryFile = document.querySelector("#agent-memory-file");
const agentNotes = document.querySelector("#agent-notes");
const agentReloadButton = document.querySelector("#agent-reload-button");
const runtimeReleaseVersion = document.querySelector("#runtime-release-version");
const runtimeSendMode = document.querySelector("#runtime-send-mode");
const runtimeRecommendedModeDetail = document.querySelector("#runtime-recommended-mode-detail");
const runtimeManagerHeartbeat = document.querySelector("#runtime-manager-heartbeat");
const runtimeWorkerList = document.querySelector("#runtime-worker-list");
const runtimeMonitoringGrid = document.querySelector("#runtime-monitoring-grid");
const runtimeDriftList = document.querySelector("#runtime-drift-list");
const runtimeControlList = document.querySelector("#runtime-control-list");
const reportsRunTableBody = document.querySelector("#reports-run-table-body");
const reportsWatchlistTableBody = document.querySelector("#reports-watchlist-table-body");
const reportsWatchlistHeadRow = document.querySelector("#reports-watchlist-head-row");
const reportWatchlistFilterInput = document.querySelector("#report-watchlist-filter");
const reportWatchlistModeFilters = document.querySelector("#report-watchlist-mode-filters");
const reportWatchlistSortSelect = document.querySelector("#report-watchlist-sort");
const reportWatchlistColumns = document.querySelector("#report-watchlist-columns");
const reportsActionSummary = document.querySelector("#reports-action-summary");
const reportsActionList = document.querySelector("#reports-action-list");
const reportsStateSummary = document.querySelector("#reports-state-summary");
const reportsStateList = document.querySelector("#reports-state-list");
const reportsThreadSummary = document.querySelector("#reports-thread-summary");
const reportsThreadFacts = document.querySelector("#reports-thread-facts");
const reportsThreadActions = document.querySelector("#reports-thread-actions");
const reportsRunSummary = document.querySelector("#reports-run-summary");
const reportsRunFacts = document.querySelector("#reports-run-facts");
const reportsSummaryTableBody = document.querySelector("#reports-summary-table-body");
const approvalsSummary = document.querySelector("#approvals-summary");
const approvalsSummaryList = document.querySelector("#approvals-summary-list");
const approvalFilterInput = document.querySelector("#approval-filter-input");
const approvalModeFilters = document.querySelector("#approval-mode-filters");
const approvalCaseTableBody = document.querySelector("#approval-case-table-body");
const approvalInspectorSummary = document.querySelector("#approval-inspector-summary");
const approvalInspectorFacts = document.querySelector("#approval-inspector-facts");
const approvalInspectorActions = document.querySelector("#approval-inspector-actions");
const approvalSummaryTableBody = document.querySelector("#approval-summary-table-body");
const integrationList = document.querySelector("#integration-list");
const integrationSummaryGrid = document.querySelector("#integration-summary-grid");
const integrationSecurityList = document.querySelector("#integration-security-list");
const integrationsForm = document.querySelector("#integrations-form");
const integrationPrimaryModel = document.querySelector("#integration-primary-model");
const integrationSearchProvider = document.querySelector("#integration-search-provider");
const integrationDmPolicy = document.querySelector("#integration-dm-policy");
const integrationGroupPolicy = document.querySelector("#integration-group-policy");
const integrationGatewayPort = document.querySelector("#integration-gateway-port");
const integrationOauthSummary = document.querySelector("#integration-oauth-summary");
const integrationGatewayToken = document.querySelector("#integration-gateway-token");
const integrationBraveKey = document.querySelector("#integration-brave-key");
const integrationTelegramToken = document.querySelector("#integration-telegram-token");
const restartGatewayButton = document.querySelector("#restart-gateway-button");
const skillsTableBody = document.querySelector("#skills-table-body");
const skillsSummaryTableBody = document.querySelector("#skills-summary-table-body");
const skillsInstallList = document.querySelector("#skills-install-list");
const skillsInstallForm = document.querySelector("#skills-install-form");
const skillInstallSlug = document.querySelector("#skill-install-slug");
const skillInstallVersion = document.querySelector("#skill-install-version");
const skillInstallForce = document.querySelector("#skill-install-force");
const identityList = document.querySelector("#identity-list");
const identityDocList = document.querySelector("#identity-doc-list");
const identityRuleList = document.querySelector("#identity-rule-list");
const identityTabs = document.querySelector("#identity-editor-tabs");
const identityEditorTitle = document.querySelector("#identity-editor-title");
const identityEditorSummary = document.querySelector("#identity-editor-summary");
const identityEditorPath = document.querySelector("#identity-editor-path");
const identityForm = document.querySelector("#identity-form");
const identityEditor = document.querySelector("#identity-editor");
const identityReloadButton = document.querySelector("#identity-reload-button");
const auditRoomFeed = document.querySelector("#audit-room-feed");
const auditEventList = document.querySelector("#audit-event-list");
const auditSummaryGrid = document.querySelector("#audit-summary-grid");
const auditDocList = document.querySelector("#audit-doc-list");

let currentSnapshot = null;
let currentRoute = routeFromHash(window.location.hash);
let currentIdentityFile = "SOUL.md";
let currentAgentId = "primeus";
let actionPending = false;
let agentFilterQuery = "";
let reportWatchlistFilterQuery = "";
let reportWatchlistMode = "all";
let reportWatchlistSort = "priority";
let currentReportThreadKey = "";
let currentReportRunId = "";
let currentReportsView = "board";
let reportWatchlistVisibleColumns = new Set(["owner", "lane", "due", "latest"]);
let approvalFilterQuery = "";
let approvalMode = "all";
let currentApprovalCaseKey = "";
const AUTO_REFRESH_DEFAULT_MS = 60000;
const APPEARANCE_THEME_KEY = "primeus-monitor-theme";
const APPEARANCE_DENSITY_KEY = "primeus-monitor-density";
const APPEARANCE_REFRESH_KEY = "primeus-monitor-refresh-ms";
const ALLOWED_REFRESH_INTERVALS = [0, 10000, 30000, 60000, 300000, 600000];
const ALLOWED_THEMES = new Set(["paper", "control", "terminal"]);
const ALLOWED_DENSITIES = new Set(["comfortable", "compact"]);
let currentTheme = readPreference(APPEARANCE_THEME_KEY, "paper");
let currentDensity = readPreference(APPEARANCE_DENSITY_KEY, "comfortable");
let currentRefreshMs = readRefreshPreference();
let autoRefreshTimer = null;

const REPORT_BOARD_COLUMNS = [
  { key: "thread", label: "KOL thread", required: true },
  { key: "issue", label: "Issue", required: true },
  { key: "state", label: "Current state", required: true },
  { key: "owner", label: "Owner" },
  { key: "lane", label: "Decision lane" },
  { key: "priority", label: "Priority", required: true },
  { key: "next", label: "Next step", required: true },
  { key: "due", label: "Due" },
  { key: "latest", label: "Latest inbound" },
];

for (const item of routeNavItems) {
  item.addEventListener("click", () => {
    const route = item.dataset.route || "overview";
    if (route === currentRoute) return;
    navigateToRoute(route);
  });
}

window.addEventListener("hashchange", () => {
  const route = routeFromHash(window.location.hash);
  if (route === currentRoute) return;
  currentRoute = route;
  renderRoute();
});

agentFilterInput.addEventListener("input", (event) => {
  agentFilterQuery = String(event.target.value || "").trim().toLowerCase();
  renderAgentsPane(currentSnapshot);
});

reportWatchlistFilterInput.addEventListener("input", (event) => {
  reportWatchlistFilterQuery = String(event.target.value || "").trim().toLowerCase();
  currentReportsView = "board";
  renderReportsPane(currentSnapshot);
});

reportWatchlistSortSelect.addEventListener("change", (event) => {
  reportWatchlistSort = String(event.target.value || "priority").trim().toLowerCase();
  currentReportsView = "board";
  renderReportsPane(currentSnapshot);
});

if (approvalFilterInput) {
  approvalFilterInput.addEventListener("input", (event) => {
    approvalFilterQuery = String(event.target.value || "").trim().toLowerCase();
    currentReportsView = "board";
    renderApprovalsPane(currentSnapshot);
  });
}

reportWatchlistModeFilters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-watchlist-mode]");
  if (!button) return;
  reportWatchlistMode = button.dataset.watchlistMode || "all";
  currentReportsView = "board";
  renderReportsPane(currentSnapshot);
});

reportWatchlistColumns.addEventListener("change", () => {
  const checked = Array.from(reportWatchlistColumns.querySelectorAll("input[type=\"checkbox\"]:checked")).map((input) => input.value);
  reportWatchlistVisibleColumns = new Set(checked);
  currentReportsView = "board";
  renderReportsPane(currentSnapshot);
});

if (appearanceThemeSelect) {
  appearanceThemeSelect.addEventListener("change", (event) => {
    setThemePreference(String(event.target.value || "paper"));
  });
}

if (appearanceDensityControls) {
  appearanceDensityControls.addEventListener("click", (event) => {
    const button = event.target.closest("[data-density]");
    if (!button) return;
    setDensityPreference(button.dataset.density || "comfortable");
  });
}

if (appearanceRefreshIntervalSelect) {
  appearanceRefreshIntervalSelect.addEventListener("change", (event) => {
    setRefreshPreference(Number(event.target.value || 0));
  });
}

if (approvalModeFilters) {
  approvalModeFilters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-approval-mode]");
    if (!button) return;
    approvalMode = button.dataset.approvalMode || "all";
    currentReportsView = "board";
    renderApprovalsPane(currentSnapshot);
  });
}

reportsActionList.addEventListener("click", (event) => {
  const routeButton = event.target.closest("[data-route-target]");
  if (routeButton) {
    navigateToRoute(routeButton.dataset.routeTarget || "reports");
    return;
  }
  const modeButton = event.target.closest("[data-watchlist-mode-set]");
  if (!modeButton) return;
  reportWatchlistMode = modeButton.dataset.watchlistModeSet || "all";
  currentReportsView = "board";
  renderReportsPane(currentSnapshot);
});

reportsStateList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-watchlist-mode-set]");
  if (!button) return;
  reportWatchlistMode = button.dataset.watchlistModeSet || "all";
  currentReportsView = "board";
  renderReportsPane(currentSnapshot);
});

reportsThreadActions.addEventListener("click", (event) => {
  const threadButton = event.target.closest("[data-open-report-thread]");
  if (threadButton) {
    currentReportThreadKey = threadButton.dataset.openReportThread || currentReportThreadKey;
    currentReportsView = "detail";
    renderReportsPane(currentSnapshot);
    return;
  }
  const viewButton = event.target.closest("[data-reports-view]");
  if (viewButton) {
    currentReportsView = viewButton.dataset.reportsView || "board";
    renderReportsPane(currentSnapshot);
    return;
  }
  const routeButton = event.target.closest("[data-route-target]");
  if (routeButton) {
    navigateToRoute(routeButton.dataset.routeTarget || "reports");
    return;
  }
  const modeButton = event.target.closest("[data-watchlist-mode-set]");
  if (!modeButton) return;
  reportWatchlistMode = modeButton.dataset.watchlistModeSet || "all";
  renderReportsPane(currentSnapshot);
});

if (approvalsSummaryList) {
  approvalsSummaryList.addEventListener("click", (event) => {
    const routeButton = event.target.closest("[data-route-target]");
    if (routeButton) {
      navigateToRoute(routeButton.dataset.routeTarget || "reports");
      return;
    }
    const modeButton = event.target.closest("[data-approval-mode-set]");
    if (!modeButton) return;
    approvalMode = modeButton.dataset.approvalModeSet || "all";
    renderApprovalsPane(currentSnapshot);
  });
}

reportsWatchlistTableBody.addEventListener("click", (event) => {
  const button = event.target.closest("[data-select-watchlist]");
  if (!button) return;
  currentReportThreadKey = button.dataset.selectWatchlist || currentReportThreadKey;
  currentReportsView = "detail";
  renderReportsPane(currentSnapshot);
});

if (reportsDetailBack) {
  reportsDetailBack.addEventListener("click", () => {
    currentReportsView = "board";
    renderReportsPane(currentSnapshot);
  });
}

reportsRunTableBody.addEventListener("click", (event) => {
  const button = event.target.closest("[data-select-report-run]");
  if (!button) return;
  currentReportRunId = button.dataset.selectReportRun || currentReportRunId;
  renderReportsPane(currentSnapshot);
});

if (approvalCaseTableBody) {
  approvalCaseTableBody.addEventListener("click", (event) => {
    const button = event.target.closest("[data-select-approval-case]");
    if (!button) return;
    currentApprovalCaseKey = button.dataset.selectApprovalCase || currentApprovalCaseKey;
    renderApprovalsPane(currentSnapshot);
  });
}

homeAttentionList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-route-target]");
  if (!button) return;
  navigateToRoute(button.dataset.routeTarget || "overview");
});

homeSummaryGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-route-target]");
  if (!button) return;
  navigateToRoute(button.dataset.routeTarget || "overview");
});

homeSystemActions.addEventListener("click", (event) => {
  const button = event.target.closest("[data-route-target]");
  if (!button) return;
  navigateToRoute(button.dataset.routeTarget || "runtime");
});

roomFeed.addEventListener("click", (event) => {
  const button = event.target.closest("[data-route-target]");
  if (!button) return;
  navigateToRoute(button.dataset.routeTarget || "overview");
});

coordinationActions.addEventListener("click", (event) => {
  const button = event.target.closest("[data-route-target]");
  if (!button) return;
  navigateToRoute(button.dataset.routeTarget || "overview");
});

if (approvalInspectorActions) {
  approvalInspectorActions.addEventListener("click", (event) => {
    const threadButton = event.target.closest("[data-open-report-thread]");
    if (threadButton) {
      currentReportThreadKey = threadButton.dataset.openReportThread || currentReportThreadKey;
      currentReportsView = "detail";
      renderReportsPane(currentSnapshot);
      return;
    }
    const routeButton = event.target.closest("[data-route-target]");
    if (routeButton) {
      navigateToRoute(routeButton.dataset.routeTarget || "reports");
      return;
    }
    const modeButton = event.target.closest("[data-approval-mode-set]");
    if (!modeButton) return;
    approvalMode = modeButton.dataset.approvalModeSet || "all";
    renderApprovalsPane(currentSnapshot);
  });
}

refreshButton.addEventListener("click", async () => {
  await runAction("/api/refresh", {}, "Refreshing snapshot…");
});

restartGatewayButton.addEventListener("click", async () => {
  if (!confirmAction("Restart the OpenClaw gateway? This can interrupt the control surface for a moment.")) return;
  await runAction("/api/runtime/restart", { service: "openclaw-gateway.service" }, "Restarting gateway…");
});

integrationsForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!currentSnapshot) return;
  if (!confirmAction("Save this configuration to the VPS? New secret values will overwrite the current config.")) return;
  const editor = ((currentSnapshot || {}).integrations || {}).editor || {};
  await runAction(
    "/api/integrations/save",
    {
      base_hash: editor.base_hash || "",
      primary_model: integrationPrimaryModel.value,
      search_provider: integrationSearchProvider.value,
      dm_policy: integrationDmPolicy.value,
      group_policy: integrationGroupPolicy.value,
      gateway_port: integrationGatewayPort.value,
      gateway_token: integrationGatewayToken.value,
      brave_api_key: integrationBraveKey.value,
      telegram_bot_token: integrationTelegramToken.value,
    },
    "Saving OpenClaw configuration…",
  );
});

identityTabs.addEventListener("click", (event) => {
  const button = event.target.closest(".tab-button[data-file]");
  if (!button) return;
  currentIdentityFile = button.dataset.file || currentIdentityFile;
  renderIdentityEditor(currentSnapshot);
});

identityReloadButton.addEventListener("click", () => {
  renderIdentityEditor(currentSnapshot);
  setActionStatus("Reloaded the current identity file from the latest VPS snapshot.", "pending");
});

identityForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!currentSnapshot) return;
  const selected = getCurrentIdentityEditor(currentSnapshot);
  if (!selected) return;
  if (!confirmAction(`Save ${selected.name} back to the VPS?`)) return;
  await runAction(
    "/api/identity/save",
    {
      name: selected.name,
      base_hash: selected.base_hash,
      content: identityEditor.value,
    },
    `Saving ${selected.name}…`,
  );
});

runtimeControlList.addEventListener("click", async (event) => {
  const button = event.target.closest(".action-button[data-service]");
  if (!button) return;
  const service = button.dataset.service;
  if (!service) return;
  if (!confirmAction(`Restart ${service}?`)) return;
  await runAction("/api/runtime/restart", { service }, `Restarting ${service}…`);
});

skillsInstallForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!confirmAction(`Install skill ${skillInstallSlug.value || "(missing slug)"} on the VPS?`)) return;
  await runAction(
    "/api/skills/install",
    {
      slug: skillInstallSlug.value,
      version: skillInstallVersion.value,
      force: skillInstallForce.checked,
    },
    `Installing ${skillInstallSlug.value || "skill"}…`,
  );
  skillsInstallForm.reset();
});

agentTableBody.addEventListener("click", (event) => {
  const button = event.target.closest("[data-select-agent]");
  if (!button) return;
  currentAgentId = button.dataset.selectAgent || currentAgentId;
  renderAgentsPane(currentSnapshot);
});

if (agentRosterGrid) {
  agentRosterGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-select-agent]");
    if (!button) return;
    currentAgentId = button.dataset.selectAgent || currentAgentId;
    renderAgentsPane(currentSnapshot);
  });
}

agentAttentionList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-select-agent]");
  if (!button) return;
  currentAgentId = button.dataset.selectAgent || currentAgentId;
  renderAgentsPane(currentSnapshot);
});

agentReloadButton.addEventListener("click", () => {
  renderAgentsPane(currentSnapshot);
  setActionStatus("Reloaded the selected agent profile from the latest VPS snapshot.", "pending");
});

agentForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!currentSnapshot) return;
  if (!confirmAction(`Save the ${currentAgentId} control profile?`)) return;
  const editor = ((currentSnapshot || {}).agents || {}).editor || {};
  await runAction(
    "/api/agents/save",
    {
      agent_id: currentAgentId,
      base_hash: editor.base_hash || "",
      display_name: agentDisplayName.value,
      provider: agentProvider.value,
      lane: agentLane.value,
      mode_target: agentModeTarget.value,
      approval_policy: agentApprovalPolicy.value,
      soul_file: agentSoulFile.value,
      identity_file: agentIdentityFile.value,
      memory_file: agentMemoryFile.value,
      notes: agentNotes.value,
    },
    `Saving ${currentAgentId} profile…`,
  );
});

function readPreference(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch (error) {
    return fallback;
  }
}

function writePreference(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    // Ignore storage failures and keep current in-memory preferences.
  }
}

function applyAppearancePreferences() {
  const theme = ALLOWED_THEMES.has(currentTheme) ? currentTheme : "paper";
  const density = ALLOWED_DENSITIES.has(currentDensity) ? currentDensity : "comfortable";
  document.body.dataset.theme = theme;
  document.body.dataset.density = density;

  if (appearanceThemeSelect) {
    appearanceThemeSelect.value = theme;
  }

  if (appearanceDensityControls) {
    for (const button of Array.from(appearanceDensityControls.querySelectorAll("[data-density]"))) {
      const active = (button.dataset.density || "") === density;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    }
  }

  if (appearanceRefreshIntervalSelect) {
    appearanceRefreshIntervalSelect.value = String(currentRefreshMs);
  }
}

function setThemePreference(theme) {
  currentTheme = ALLOWED_THEMES.has(theme) ? theme : "paper";
  writePreference(APPEARANCE_THEME_KEY, currentTheme);
  applyAppearancePreferences();
}

function setDensityPreference(density) {
  currentDensity = ALLOWED_DENSITIES.has(density) ? density : "comfortable";
  writePreference(APPEARANCE_DENSITY_KEY, currentDensity);
  applyAppearancePreferences();
}

function readRefreshPreference() {
  const raw = Number(readPreference(APPEARANCE_REFRESH_KEY, String(AUTO_REFRESH_DEFAULT_MS)));
  return ALLOWED_REFRESH_INTERVALS.includes(raw) ? raw : AUTO_REFRESH_DEFAULT_MS;
}

function setRefreshPreference(value) {
  currentRefreshMs = ALLOWED_REFRESH_INTERVALS.includes(value) ? value : AUTO_REFRESH_DEFAULT_MS;
  writePreference(APPEARANCE_REFRESH_KEY, String(currentRefreshMs));
  applyAppearancePreferences();
  configureAutoRefresh();
  setActionStatus(
    currentRefreshMs
      ? `Auto refresh set to ${formatRefreshIntervalLabel(currentRefreshMs)}.`
      : "Auto refresh paused. Use Refresh snapshot for manual updates.",
    "pending",
  );
}

function configureAutoRefresh() {
  if (autoRefreshTimer) {
    window.clearInterval(autoRefreshTimer);
    autoRefreshTimer = null;
  }
  if (!currentRefreshMs) return;
  autoRefreshTimer = window.setInterval(() => {
    void refreshSnapshotSilently();
  }, currentRefreshMs);
}

async function loadSnapshot() {
  const response = await fetch("/api/dashboard", { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to load dashboard snapshot: ${response.status}`);
  }
  const payload = await response.json();
  if (!payload.ok) {
    throw new Error(payload.message || "Snapshot could not be loaded.");
  }
  return payload.snapshot;
}

async function postAction(path, payload) {
  const response = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload || {}),
  });
  const data = await response.json().catch(() => ({ ok: false, message: `Request failed: ${response.status}` }));
  if (!response.ok || !data.ok) {
    throw new Error(data.message || `Request failed: ${response.status}`);
  }
  return data;
}

async function runAction(path, payload, pendingMessage) {
  if (actionPending) {
    setActionStatus("Another action is already running. Wait for it to finish.", "pending");
    return;
  }
  try {
    actionPending = true;
    setControlDisabled(true);
    setActionStatus(pendingMessage, "pending");
    const result = await postAction(path, payload);
    if (result.snapshot) {
      render(result.snapshot);
    }
    setActionStatus(result.message || "Action completed.", "active");
  } catch (error) {
    console.error(error);
    setActionStatus(error.message || "Action failed.", "blocked");
  } finally {
    actionPending = false;
    setControlDisabled(false);
  }
}

async function refreshSnapshotSilently() {
  if (actionPending || document.visibilityState === "hidden") {
    return;
  }
  try {
    const snapshot = await loadSnapshot();
    render(snapshot);
  } catch (error) {
    console.error(error);
    setActionStatus("Auto refresh failed. Showing the last successful snapshot.", "pending");
  }
}

function render(snapshot) {
  currentSnapshot = snapshot;
  const roomMeta = snapshot.room_meta || {};
  const services = ((snapshot || {}).runtime || {}).services || [];

  snapshotTs.textContent = formatTimestamp(snapshot.generated_at || "");
  roomEventCount.textContent = String(roomMeta.event_count != null ? roomMeta.event_count : 0);
  runtimeMode.textContent = snapshot.stale ? `Stale · ${describeSnapshotAge(snapshot.generated_at || "")}` : describeSnapshotAge(snapshot.generated_at || "");
  if (roomHelperStatus) {
    roomHelperStatus.innerHTML = badge(
      humanizeStatus((((roomMeta || {}).helper_status || {}).status) || "unknown"),
      badgeClass((((roomMeta || {}).helper_status || {}).status) || "unknown"),
    );
  }
  if (roomLatestEvent) {
    roomLatestEvent.textContent = roomMeta.latest_event_ts ? formatTimestamp(roomMeta.latest_event_ts) : "No event yet.";
  }

  renderCoordination(snapshot);
  renderServices(services);
  renderAgentsPane(snapshot);
  renderRuntimePane(snapshot);
  renderReportsPane(snapshot);
  renderIntegrationsPane(snapshot);
  renderSkillsPane(snapshot);
  renderIdentityPane(snapshot);
  renderAuditPane(snapshot);
  renderRuntimeControls(services);
  renderIntegrationsForm(snapshot);
  renderIdentityEditor(snapshot);

  renderRoute();
}

function renderRoute() {
  if (!currentSnapshot) return;
  const services = ((currentSnapshot || {}).runtime || {}).services || [];

  routeOverview.hidden = currentRoute !== "overview";
  routeAgents.hidden = currentRoute !== "agents";
  routeRuntime.hidden = currentRoute !== "runtime";
  routeReports.hidden = currentRoute !== "reports";
  routeIntegrations.hidden = currentRoute !== "integrations";
  routeSkills.hidden = currentRoute !== "skills";
  routeIdentity.hidden = currentRoute !== "identity";
  routeAudit.hidden = currentRoute !== "audit";

  for (const item of routeNavItems) {
    const active = item.dataset.route === currentRoute;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-current", active ? "page" : "false");
  }

  document.title = `Agent Control — ${routeDisplayName(currentRoute)}`;

  if (currentRoute === "agents") {
    renderAgentsOverview(currentSnapshot);
    return;
  }

  if (currentRoute === "runtime") {
    renderRuntimeOverview(currentSnapshot);
    return;
  }

  if (currentRoute === "reports") {
    renderReportsOverview(currentSnapshot);
    return;
  }

  if (currentRoute === "integrations") {
    renderIntegrationsOverview(currentSnapshot);
    return;
  }

  if (currentRoute === "skills") {
    renderSkillsOverview(currentSnapshot);
    return;
  }

  if (currentRoute === "identity") {
    renderIdentityOverview(currentSnapshot);
    return;
  }

  if (currentRoute === "audit") {
    renderAuditOverview(currentSnapshot);
    return;
  }

  renderOverview(currentSnapshot, services);
}

function setTopStats(items) {
  const visibleItems = items.filter(Boolean);
  if (appBarStats) {
    appBarStats.hidden = visibleItems.length === 0;
  }
  const labels = [statLabel1, statLabel2, statLabel3, statLabel4];
  const values = [snapshotTs, runtimeMode, roomEventCount, serviceHealth];
  for (let index = 0; index < labels.length; index += 1) {
    const item = items[index] || null;
    if (statChips[index]) {
      statChips[index].hidden = !item;
    }
    if (!item) {
      labels[index].textContent = "";
      values[index].textContent = "";
      values[index].removeAttribute("data-tone");
      continue;
    }
    labels[index].textContent = item.label || "-";
    if (item.html) {
      values[index].innerHTML = item.value || "-";
    } else {
      values[index].textContent = item.value || "-";
    }
  }
}

function setAppBarHeader({ eyebrow = "", headline = "", subline = "" }) {
  if (appBarEyebrow) {
    appBarEyebrow.hidden = !eyebrow;
    appBarEyebrow.textContent = eyebrow;
  }
  if (overviewHeadline) {
    overviewHeadline.textContent = headline;
  }
  if (overviewSubline) {
    overviewSubline.hidden = !subline;
    overviewSubline.textContent = subline;
  }
}

function renderOverview(snapshot, services) {
  setAppBarHeader({ headline: "Home" });
  setTopStats([]);

  renderHomeAttention(snapshot, services);
  renderHomeStatusSummary(snapshot, services);
  renderHomeSystem(snapshot, services);
}

function renderAgentsOverview(snapshot) {
  const summary = ((snapshot || {}).agents || {}).summary || {};
  const ready = Number(summary.ready_count || 0);
  const attention = Number(summary.attention_count || 0);
  const activeThreads = Number(summary.total_active_threads || 0);
  const codexDailyOps = summary.codex_required_for_daily_ops ? "Codex is required for daily ops." : "Daily ops do not depend on Codex.";

  setAppBarHeader({
    eyebrow: "Agents",
    headline: attention > 0 ? `${pluralize(attention, "agent")} need review` : `${ready} agents are ready`,
    subline:
    attention > 0
      ? `${ready} ready. ${activeThreads} active threads. ${codexDailyOps}`
      : `${activeThreads} active threads. ${codexDailyOps}`,
  });
  setTopStats([
    { label: "Snapshot", value: formatTimestamp(snapshot.generated_at || "") },
    { label: "Ready", value: String(ready) },
    { label: "Attention", value: String(attention) },
    { label: "Threads", value: String(activeThreads) },
  ]);
}

function renderRuntimeOverview(snapshot) {
  const detail = ((snapshot || {}).runtime || {}).detail || {};
  const health = detail.health || {};
  const monitoring = (detail.monitoring || {}).summary || {};
  const overall = String(health.overall_status || "unknown");
  const pending = Number(monitoring.pending_approval_count || 0);
  const escalations = Number(monitoring.escalation_count || 0);
  const threads = Number(health.total_active_threads || 0);

  setAppBarHeader({
    eyebrow: "Runtime",
    headline: overall === "healthy" ? "Runtime is healthy" : "Runtime needs review",
    subline:
    overall === "healthy"
      ? `${threads} active threads. ${pending} approvals and ${escalations} escalations in the latest pass.`
      : `${threads} active threads. ${pending} approvals and ${escalations} escalations still need attention.`,
  });
  setTopStats([
    { label: "Snapshot", value: formatTimestamp(snapshot.generated_at || "") },
    { label: "Health", value: badge(humanizeStatus(overall), badgeClass(overall)), html: true },
    { label: "Approvals", value: String(pending) },
    { label: "Escalations", value: String(escalations) },
  ]);
}

function renderReportsOverview(snapshot) {
  const runs = sortRunsByGeneratedAt((((snapshot || {}).reports || {}).runs) || []);
  const boardRows = getReportBoardRows(snapshot);
  const filteredRows = sortWatchlistRows(filterWatchlistRows(boardRows));
  const latest = runs[0];
  const manualReviewCount = boardRows.filter(needsManualReview).length;
  const greenLaneCount = boardRows.filter(isGreenLaneThread).length;
  const waitingOnKolCount = boardRows.filter(isWaitingOnKolThread).length;
  const highPriorityCount = boardRows.filter(isHighPriorityThread).length;
  const selected = boardRows.find((row) => watchlistRowKey(row) === currentReportThreadKey) || boardRows[0] || null;

  if (currentReportsView === "detail" && selected) {
    setAppBarHeader({
      eyebrow: "Reports",
      headline: selected.kol_username || selected.label || "Thread record",
      subline: selected.recommended_action || describeWatchlistNextStep(selected),
    });
    setTopStats([
      { label: "Snapshot", value: formatTimestamp(snapshot.generated_at || "") },
      { label: "Owner", value: selected.owner_label || titleCase(selected.owner || "unknown") },
      { label: "State", value: badge(selected.status_label || titleCase(selected.status || "unknown"), badgeClass(classifyWatchlistTone(selected))), html: true },
      { label: "Due", value: formatDueLabel(selected.next_action_due_at || "") },
    ]);
    return;
  }

  const activeViewLabel = getReportWatchlistModeLabel(reportWatchlistMode);
  const boardHeadline =
    reportWatchlistMode === "all"
      ? boardRows.length
        ? `${pluralize(manualReviewCount, "thread")} need manual review`
        : "Reports are in sync"
      : `${activeViewLabel} · ${pluralize(filteredRows.length, "thread")}`;

  setAppBarHeader({
    eyebrow: "Reports",
    headline: boardHeadline,
    subline: latest
      ? `${pluralize(manualReviewCount, "thread")} need review, ${pluralize(highPriorityCount, "thread")} are high priority, ${pluralize(greenLaneCount, "thread")} can keep moving, and ${pluralize(waitingOnKolCount, "thread")} are waiting on KOL replies.`
      : "No report snapshots are available yet.",
  });
  setTopStats([
    { label: "Snapshot", value: formatTimestamp(snapshot.generated_at || "") },
    { label: "View", value: activeViewLabel },
    { label: "Rows", value: String(filteredRows.length) },
    { label: "Sort", value: getReportSortLabel(reportWatchlistSort) },
  ]);
}

function renderIntegrationsOverview(snapshot) {
  const items = (((snapshot || {}).integrations || {}).items) || [];
  const healthy = items.filter((item) => ["active", "ready"].includes(String(item.status || "").toLowerCase())).length;
  const codexLane = items.find((item) => item.label === "Codex lane");
  const gateway = items.find((item) => item.label === "Gateway");

  setAppBarHeader({
    eyebrow: "Config",
    headline: `${healthy} of ${items.length} integrations are ready`,
    subline: "Edit config-backed fields here. Stored secret values stay masked; only new values are written back to the VPS.",
  });
  setTopStats([
    { label: "Updated", value: describeSnapshotAge(snapshot.generated_at || "") },
    { label: "Ready", value: `${healthy}/${items.length}` },
    {
      label: "Codex",
      value: badge(humanizeStatus((codexLane || {}).status || "unknown"), badgeClass((codexLane || {}).status || "unknown")),
      html: true,
    },
    {
      label: "Gateway",
      value: badge(humanizeStatus((gateway || {}).status || "unknown"), badgeClass((gateway || {}).status || "unknown")),
      html: true,
    },
  ]);
}

function renderIdentityOverview(snapshot) {
  const items = (((snapshot || {}).identity || {}).items) || [];
  const rules = (((snapshot || {}).identity || {}).rules) || [];
  const docs = (((snapshot || {}).identity || {}).doc_rows) || [];
  const selected = getCurrentIdentityEditor(snapshot);

  setAppBarHeader({
    eyebrow: "Identity",
    headline: selected ? `${selected.label} is ready to edit` : items.length ? "Identity pack is loaded" : "Identity pack is missing",
    subline: selected
      ? `${docs.length} core files and ${rules.length} working rules are loaded. Saving here writes back to the VPS.`
      : `${items.length} core identity files and ${rules.length} working rules are available for continuity.`,
  });
  setTopStats([
    { label: "Snapshot", value: formatTimestamp(snapshot.generated_at || "") },
    { label: "Profiles", value: String(items.length) },
    { label: "Rules", value: String(rules.length) },
    { label: "Editing", value: selected ? selected.name : String(docs.length) },
  ]);
}

function renderSkillsOverview(snapshot) {
  const skills = (((snapshot || {}).skills || {}).summary) || {};
  setAppBarHeader({
    eyebrow: "Skills",
    headline: skills.ready ? `${skills.ready} skills are ready` : "Skills need setup",
    subline: `${skills.total || 0} total skills are visible from the current OpenClaw workspace snapshot. Inspect setup state here and install new skills by known slug.`,
  });
  setTopStats([
    { label: "Snapshot", value: formatTimestamp(snapshot.generated_at || "") },
    { label: "Ready", value: String(skills.ready || 0) },
    { label: "Needs setup", value: String(skills.needs_setup || 0) },
    { label: "Blocked", value: String(skills.blocked || 0) },
  ]);
}

function renderAuditOverview(snapshot) {
  const roomEvents = (((snapshot || {}).audit || {}).room_events) || [];
  const runtimeEvents = (((snapshot || {}).audit || {}).runtime_events) || [];
  const summaryRows = (((snapshot || {}).audit || {}).summary_rows) || [];
  const roomSummary = summaryRows.find((row) => row.label === "Room events");

  setAppBarHeader({
    eyebrow: "Audit",
    headline: "Audit trail is current",
    subline: `${(roomSummary || {}).value || roomEvents.length} room events are logged. ${runtimeEvents.length} recent runtime events are visible in this snapshot.`,
  });
  setTopStats([
    { label: "Snapshot", value: formatTimestamp(snapshot.generated_at || "") },
    { label: "Room", value: (roomSummary || {}).value || String(roomEvents.length) },
    { label: "Runtime", value: String(runtimeEvents.length) },
    { label: "Doc notes", value: String(((((snapshot || {}).audit || {}).doc_rows) || []).length) },
  ]);
}

function renderMission(snapshot, services) {
  const state = snapshot.room_state || {};
  const runtime = ((snapshot || {}).runtime || {}).detail || {};
  const monitoringSummary = (runtime.monitoring || {}).summary || {};
  const topic = humanizeTopic(state.current_topic || "Operations");
  const status = String(state.status || "").toLowerCase();
  const bossNeed = String(state.needs_boss || "none").toLowerCase();
  const approvals = Number(monitoringSummary.pending_approval_count || 0);
  const escalations = Number(monitoringSummary.escalation_count || 0);
  const threads = Number(monitoringSummary.total_threads || ((runtime.health || {}).total_active_threads || 0));
  const inactiveServices = services.filter((item) => String(item.status || "").toLowerCase() !== "active");
  const owner = humanizeActor(state.current_owner || "unknown");
  missionTitle.textContent = topic;

  if (bossNeed !== "none") {
    missionCopy.textContent = `Approval required. ${compactText(String(state.needs_boss || ""), 140)}`;
    return;
  }

  if (inactiveServices.length) {
    missionCopy.textContent = `${pluralize(inactiveServices.length, "service")} need recovery before the next change.`;
    return;
  }

  if (approvals > 0 || escalations > 0) {
    missionCopy.textContent = `${pluralize(approvals, "approval")} and ${pluralize(escalations, "escalation")} are open in the latest snapshot.`;
    return;
  }

  if (status === "done") {
    missionCopy.textContent = `${owner} owns the loop. No blocker is visible in the latest snapshot, with ${pluralize(threads, "active thread")} still running.`;
    return;
  }

  missionCopy.textContent = `${owner} owns the current loop. ${pluralize(threads, "active thread")} are visible in the runtime.`;
}

function renderHomeAttention(snapshot, services) {
  const rows = buildHomeAttentionRows(snapshot, services);
  homeAttentionSummary.textContent = rows.length
    ? "Only the highest-pressure items stay on Home."
    : "No urgent issue is visible in the current snapshot.";
  homeAttentionList.innerHTML = "";

  if (!rows.length) {
    homeAttentionList.innerHTML = `
      <li class="attention-item">
        <div class="attention-topline">
          <strong>System is clear.</strong>
          ${badge("Stable", "active")}
        </div>
        <p class="attention-text">Services and review queues look calm in the current snapshot.</p>
      </li>
    `;
    return;
  }

  for (const row of rows) {
    const li = document.createElement("li");
    li.className = "attention-item";
    li.innerHTML = `
      <div class="attention-topline">
        <strong>${escapeHtml(row.title)}</strong>
        ${badge(humanizeStatus(row.tone), badgeClass(row.tone))}
      </div>
      <p class="attention-text">${escapeHtml(row.summary)}</p>
      ${row.route ? `<button class="inline-action" type="button" data-route-target="${escapeHtml(row.route)}">${escapeHtml(row.action)}</button>` : ""}
    `;
    homeAttentionList.appendChild(li);
  }
}

function renderHomeStatusSummary(snapshot, services) {
  const runtime = ((snapshot || {}).runtime || {}).detail || {};
  const health = runtime.health || {};
  const monitoringSummary = (runtime.monitoring || {}).summary || {};
  const agentsSummary = (((snapshot || {}).agents) || {}).summary || {};
  const skillsSummary = (((snapshot || {}).skills) || {}).summary || {};
  const roomMeta = (snapshot || {}).room_meta || {};
  const reports = (snapshot || {}).reports || {};
  const activeCount = services.filter((item) => String(item.status).toLowerCase() === "active").length;
  const totalCount = services.length;
  const approvals = Number(monitoringSummary.pending_approval_count || 0);
  const escalations = Number(monitoringSummary.escalation_count || 0);
  const watchlistCount = Number((reports.watchlist || []).length || 0);
  const threads = Number(health.total_active_threads || monitoringSummary.total_threads || 0);
  const helperStatus = String((((roomMeta || {}).helper_status || {}).status) || "unknown");
  const runtimeOverall = String(health.overall_status || (activeCount === totalCount ? "healthy" : "degraded"));
  const urgentReviewCount = approvals + escalations;
  const agentAttention = Number(agentsSummary.attention_count || 0);
  const readyAgents = Number(agentsSummary.ready_count || 0);
  const assignedThreads = Number(agentsSummary.total_active_threads || 0);
  const readySkills = Number(skillsSummary.ready || 0);
  const setupSkills = Number(skillsSummary.needs_setup || 0);
  const blockedSkills = Number(skillsSummary.blocked || 0);
  const runtimePrimary = totalCount ? `${activeCount}/${totalCount} online` : "No services";
  const reviewPrimary = urgentReviewCount ? `${urgentReviewCount} open` : "Clear";
  const agentsPrimary = `${assignedThreads} assigned`;
  const skillsPrimary = `${readySkills} ready`;

  homeSummaryCopy.textContent = "Current health and workload.";
  homeSummaryGrid.innerHTML = `
    <button class="summary-card summary-card-button" type="button" data-route-target="runtime">
      <span class="summary-card-title">Runtime</span>
      <strong class="summary-card-value">${escapeHtml(runtimePrimary)}</strong>
      <p class="summary-card-support">${escapeHtml(pluralize(threads, "active thread"))}</p>
      <span class="summary-card-status">${escapeHtml(humanizeStatus(runtimeOverall))}</span>
    </button>
    <button class="summary-card summary-card-button" type="button" data-route-target="reports">
      <span class="summary-card-title">Review queue</span>
      <strong class="summary-card-value">${escapeHtml(reviewPrimary)}</strong>
      <p class="summary-card-support">${escapeHtml(pluralize(approvals, "approval"))} and ${escapeHtml(pluralize(escalations, "escalation"))} need decisions</p>
      <span class="summary-card-status">${escapeHtml(snapshot.stale ? "Stale snapshot" : `${watchlistCount} tracked rows`)}</span>
    </button>
    <button class="summary-card summary-card-button" type="button" data-route-target="agents">
      <span class="summary-card-title">Agents</span>
      <strong class="summary-card-value">${escapeHtml(agentsPrimary)}</strong>
      <p class="summary-card-support">${escapeHtml(pluralize(readyAgents, "agent"))} ready, ${escapeHtml(pluralize(agentAttention, "agent"))} need review</p>
      <span class="summary-card-status">${escapeHtml(agentAttention ? `${agentAttention} need review` : `Helpers ${humanizeStatus(helperStatus).toLowerCase()}`)}</span>
    </button>
    <button class="summary-card summary-card-button" type="button" data-route-target="skills">
      <span class="summary-card-title">Skills</span>
      <strong class="summary-card-value">${escapeHtml(skillsPrimary)}</strong>
      <p class="summary-card-support">${escapeHtml(pluralize(setupSkills, "skill"))} need setup</p>
      <span class="summary-card-status">${escapeHtml(blockedSkills ? `${blockedSkills} blocked` : "No blocked skills")}</span>
    </button>
  `;
}

function renderHomeSystem(snapshot, services) {
  const runtime = ((snapshot || {}).runtime || {}).detail || {};
  const monitoringSummary = (runtime.monitoring || {}).summary || {};
  const activeCount = services.filter((item) => String(item.status).toLowerCase() === "active").length;
  const totalCount = services.length;
  const threads = Number(monitoringSummary.total_threads || ((runtime.health || {}).total_active_threads || 0));
  const servicesValue = totalCount ? `${activeCount}/${totalCount} online` : "-";
  const mode = String(((snapshot || {}).runtime || {}).recommended_mode || "-").toUpperCase();
  const lastUpdated = snapshot.stale ? `Stale · ${describeSnapshotAge(snapshot.generated_at || "")}` : formatTimestamp(snapshot.generated_at || "");
  homeSystemSummary.textContent = "Only the runtime context that still matters on Home.";
  homeSystemActions.innerHTML = `<button class="inline-action" type="button" data-route-target="runtime">Open full runtime</button>`;
  renderFactGrid(homeSystemFacts, [
    { label: "Last updated", value: lastUpdated },
    { label: "Mode", value: mode },
    { label: "Services online", value: servicesValue },
    { label: "Active threads", value: pluralize(threads, "thread") },
  ]);
  if (serviceHealth) {
    serviceHealth.textContent = totalCount ? `${activeCount}/${totalCount}` : "0/0";
  }
}

function renderChain(snapshot, services) {
  const state = snapshot.room_state || {};
  const roomMeta = snapshot.room_meta || {};
  const runtime = ((snapshot || {}).runtime || {}).detail || {};
  const monitoringSummary = (runtime.monitoring || {}).summary || {};
  const bossNeedsAttention = state.needs_boss && state.needs_boss !== "none";
  const runtimeHealthy = services.length > 0 && services.every((item) => String(item.status).toLowerCase() === "active");
  const roomOperational = String((((roomMeta || {}).helper_status || {}).status) || "").toLowerCase() === "ready";
  const activeCount = services.filter((item) => String(item.status).toLowerCase() === "active").length;
  const serviceCount = services.length;
  const approvals = Number(monitoringSummary.pending_approval_count || 0);
  const threads = Number(monitoringSummary.total_threads || ((runtime.health || {}).total_active_threads || 0));
  const owner = humanizeActor(state.current_owner || "unknown");
  const roomEvents = Number(roomMeta.event_count || 0);

  const chain = [
    {
      name: "Approval",
      note: bossNeedsAttention ? compactText(String(state.needs_boss || "Decision requested."), 70) : approvals > 0 ? `${pluralize(approvals, "approval")} open` : "Not required",
      tone: bossNeedsAttention ? "blocked" : "active",
    },
    {
      name: owner,
      note: `${humanizeStatus(state.status || "unknown")} loop state`,
      tone: String(state.status || "").toLowerCase() === "done" ? "active" : "pending",
    },
    {
      name: "Codex",
      note: roomEvents ? `${pluralize(roomEvents, "room event")} logged` : "No room events yet",
      tone: roomOperational ? "active" : "blocked",
    },
    {
      name: "VPS runtime",
      note: runtimeHealthy ? `${activeCount}/${serviceCount} services online · ${pluralize(threads, "thread")}` : `${activeCount}/${serviceCount} services online`,
      tone: runtimeHealthy ? "active" : "blocked",
    },
  ];

  chainList.innerHTML = "";
  for (const item of chain) {
    const li = document.createElement("li");
    li.className = "chain-item";
    li.innerHTML = `
      <div class="chain-copy">
        <strong>${escapeHtml(item.name)}</strong>
        <p>${escapeHtml(item.note)}</p>
      </div>
      ${badge(humanizeStatus(item.tone), badgeClass(item.tone))}
    `;
    chainList.appendChild(li);
  }
}

function renderRoomFeedInto(container, events, options = {}) {
  const { fullText = false, reverse = true, limit = null } = options;
  container.innerHTML = "";
  if (!events.length) {
    container.innerHTML = `<article class="room-item"><p class="room-text">No events yet.</p></article>`;
    return;
  }

  const rows = reverse ? events.slice().reverse() : events.slice();
  const visibleRows = limit ? rows.slice(0, limit) : rows;
  for (const item of visibleRows) {
    const article = document.createElement("article");
    article.className = "room-item";
    const routeLabel = `${humanizeActor(item.from)} to ${humanizeActor(item.to)}`;
    const messageText = fullText ? item.text || "" : compactText(item.text || "", 180);
    const topic = humanizeTopic(item.topic || "Untitled");
    article.innerHTML = `
      <div class="room-topline">
        <strong class="room-route">${escapeHtml(routeLabel)}</strong>
        <span class="room-time">${escapeHtml(formatTimestamp(item.ts || ""))}</span>
      </div>
      <p class="room-text">${escapeHtml(messageText)}</p>
      <div class="room-meta room-meta--chips">
        ${badge(humanizeType(item.type || "note"), "pending")}
        ${badge(humanizeStatus(item.status || "open"), badgeClass(item.status))}
        <span class="room-topic">${escapeHtml(topic)}</span>
      </div>
    `;
    container.appendChild(article);
  }
}

function renderCoordination(snapshot) {
  roomFeedSummary.textContent = buildCoordinationSummary(snapshot);
  renderCoordinationActions(coordinationActions, snapshot);
  renderCoordinationUpdates(roomFeed, snapshot);
}

function buildCoordinationSummary(snapshot) {
  const state = snapshot.room_state || {};
  const events = snapshot.room_events || [];
  const openEvent = findOpenCoordinationEvent(snapshot.room_events || []);
  const status = String(state.status || "").toLowerCase();
  if (state.needs_boss && state.needs_boss !== "none") {
    return "A coordination handoff is waiting on approval.";
  }
  if (openEvent) {
    return `${humanizeActor(openEvent.from)} handed work to ${humanizeActor(openEvent.to)}.`;
  }
  if (events.length) {
    return `${pluralize(events.length, "recent update")} are available in the room log.`;
  }
  if (status === "done") {
    return "No open handoff is recorded right now.";
  }
  return "Recent coordination updates will appear here.";
}

function buildCoordinationFacts(snapshot) {
  const state = snapshot.room_state || {};
  const events = (snapshot.room_events || []).slice().reverse();
  const latest = events[0] || null;
  const openEvent = findOpenCoordinationEvent(snapshot.room_events || []);
  const approval = state.needs_boss && state.needs_boss !== "none" ? compactText(String(state.needs_boss), 48) : "Not required";
  let waitingOn = "No one";
  if (state.needs_boss && state.needs_boss !== "none") {
    waitingOn = "Approval";
  } else if (openEvent) {
    waitingOn = humanizeActor(openEvent.to || state.current_owner || "unknown");
  } else if (String(state.status || "").toLowerCase() !== "done") {
    waitingOn = humanizeActor(state.current_owner || "unknown");
  }

  return [
    { label: "Topic", value: humanizeTopic(state.current_topic || "Unknown work") },
    { label: "Owner", value: humanizeActor(state.current_owner || "unknown") },
    { label: "Waiting on", value: waitingOn },
  ];
}

function renderCoordinationUpdates(container, snapshot) {
  const events = (snapshot.room_events || []).slice().reverse();
  const openEvent = findOpenCoordinationEvent(snapshot.room_events || []);
  const items = [];

  if (openEvent) {
    items.push({
      label: "Open handoff",
      event: openEvent,
    });
  }

  for (const event of events) {
    if (items.some((item) => item.event === event)) continue;
    items.push({
      label: items.length === 0 ? "Latest update" : "Earlier update",
      event,
    });
    if (items.length >= 2) break;
  }

  container.innerHTML = "";
  if (!items.length) {
    container.innerHTML = `<li class="mini-list-item mini-list-item--full"><strong>No recent activity</strong><p class="attention-text">No coordination events are recorded yet.</p></li>`;
    return;
  }

  for (const item of items) {
    const event = item.event || {};
    const li = document.createElement("li");
    li.className = "mini-list-item mini-list-item--full";
    const message = splitCoordinationMessage(event.text || "");
    const routeLine =
      event.from || event.to
        ? `<p class="activity-meta">${escapeHtml(humanizeActor(event.from))} <span aria-hidden="true">&rarr;</span> ${escapeHtml(humanizeActor(event.to))} · ${escapeHtml(formatTimestamp(event.ts || ""))}</p>`
        : `<p class="activity-meta">${escapeHtml(formatTimestamp(event.ts || ""))}</p>`;
    li.innerHTML = `
      <strong class="mini-list-label">${escapeHtml(buildCoordinationEventHeadline(item, event, message.title))}</strong>
      ${routeLine}
      ${message.detail ? `<p class="attention-text">${escapeHtml(compactText(message.detail, 140))}</p>` : ""}
    `;
    container.appendChild(li);
  }
}

function renderCoordinationActions(container, snapshot) {
  const actions = buildCoordinationActions(snapshot);
  container.innerHTML = "";
  if (!actions.length) return;
  for (const action of actions) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "inline-action";
    button.dataset.routeTarget = action.route;
    button.textContent = action.label;
    container.appendChild(button);
  }
}

function findOpenCoordinationEvent(events) {
  return (events || [])
    .slice()
    .reverse()
    .find((item) => ["open", "pending", "in_progress"].includes(String(item.status || "").toLowerCase())) || null;
}

function buildCoordinationActions(snapshot) {
  const state = snapshot.room_state || {};
  const runtime = ((snapshot || {}).runtime || {}).detail || {};
  const monitoringSummary = (runtime.monitoring || {}).summary || {};
  const services = (((snapshot || {}).runtime || {}).services) || [];
  const actions = [];
  const approvals = Number(monitoringSummary.pending_approval_count || 0);
  const inactiveServices = services.filter((item) => String(item.status || "").toLowerCase() !== "active");
  const openEvent = findOpenCoordinationEvent(snapshot.room_events || []);

  if (state.needs_boss && state.needs_boss !== "none") {
    actions.push({ route: "reports", label: "Review queue" });
  }
  if (openEvent) {
    actions.push({ route: "audit", label: "Open audit trail" });
  }
  if (approvals > 0 && !actions.some((item) => item.route === "reports")) {
    actions.push({ route: "reports", label: "Open review queue" });
  }
  if (inactiveServices.length && !actions.some((item) => item.route === "runtime")) {
    actions.push({ route: "runtime", label: "Check runtime" });
  }
  if (!actions.length) {
    actions.push({ route: "audit", label: "Open audit trail" });
  }
  return actions.slice(0, 1);
}

function buildCoordinationEventAction(snapshot, event) {
  const state = snapshot.room_state || {};
  const normalizedStatus = String(event.status || "").toLowerCase();
  const normalizedType = String(event.type || "").toLowerCase();
  const normalizedTopic = String(event.topic || "").toLowerCase();
  if (state.needs_boss && state.needs_boss !== "none") {
    return { route: "reports", label: "Review queue" };
  }
  if (["open", "pending", "in_progress"].includes(normalizedStatus)) {
    return { route: "audit", label: "Review handoff" };
  }
  if (normalizedTopic.includes("shadow") || normalizedTopic.includes("review")) {
    return { route: "reports", label: "Open reports" };
  }
  if (normalizedTopic.includes("runtime") || normalizedType === "incident") {
    return { route: "runtime", label: "Open runtime" };
  }
  return { route: "audit", label: "Open audit" };
}

function buildCoordinationEventHeadline(item, event, fallbackTitle) {
  const topic = String(event.topic || "").toLowerCase();
  const type = String(event.type || "").toLowerCase();
  const text = String(event.text || "").toLowerCase();
  if (item.label === "Open handoff") return "Open handoff is waiting";
  if (text.includes("helper scripts deployed")) return "Room helpers were deployed";
  if (text.includes("room lane acknowledged")) return "Room lane was acknowledged";
  if (text.includes("room lane enabled")) return "Room lane was opened";
  if (topic.includes("coordination-protocol") && type === "decision") return "Coordination protocol started";
  if (topic.includes("coordination-protocol")) return "Coordination protocol updated";
  if (topic.includes("operationalization")) return "Operational rollout updated";
  return fallbackTitle || `${humanizeType(event.type || "note")} in ${humanizeTopic(event.topic || "Untitled")}`;
}

function renderServices(services) {
  serviceList.innerHTML = "";
  if (!services.length) {
    if (homeSystemIssuesSection) homeSystemIssuesSection.hidden = true;
    serviceHealth.textContent = "0/0";
    return;
  }

  const activeCount = services.filter((item) => String(item.status).toLowerCase() === "active").length;
  const inactive = services.filter((item) => String(item.status).toLowerCase() !== "active");
  serviceHealth.textContent = `${activeCount}/${services.length}`;

  if (!inactive.length) {
    if (homeSystemIssuesSection) homeSystemIssuesSection.hidden = true;
    return;
  }

  if (homeSystemIssuesSection) homeSystemIssuesSection.hidden = false;

  for (const item of inactive) {
    const li = document.createElement("li");
    li.className = "service-item";
    li.innerHTML = `
      <div class="service-copy">
        <strong>${escapeHtml(humanizeServiceName(item.name || ""))}</strong>
        <p>Needs attention on Home. Open Runtime for the full service view.</p>
      </div>
      ${badge(humanizeStatus(item.status || "unknown"), badgeClass(item.status))}
    `;
    serviceList.appendChild(li);
  }
}

function renderAgentsPane(snapshot) {
  const summary = (((snapshot || {}).agents || {}).summary) || {};
  const allAgents = (((snapshot || {}).agents || {}).items) || [];
  const agents = filterAgentRows(allAgents);
  const editor = (((snapshot || {}).agents || {}).editor) || {};

  if (!agents.some((item) => item.id === currentAgentId)) {
    currentAgentId = agents[0] ? agents[0].id : (allAgents[0] ? allAgents[0].id : "primeus");
  }

  const selected = getSelectedAgent(allAgents);
  renderAgentRosterCards(allAgents);
  renderAgentTable(agents);
  renderAgentEditor(selected, editor);
  renderAgentAttention(allAgents);
  renderAgentProfileSummary(selected, summary);
  if (agentAttentionSummary) {
    const attentionCount = allAgents.filter(agentNeedsAttention).length;
    if (!allAgents.length) {
      agentAttentionSummary.textContent = "No agent data is available in the latest snapshot.";
    } else if (!attentionCount) {
      agentAttentionSummary.textContent = `${pluralize(allAgents.length, "agent")} are visible and no lane needs review right now.`;
    } else {
      agentAttentionSummary.textContent = `${pluralize(attentionCount, "agent")} need review in the current ${pluralize(allAgents.length, "agent")} roster.`;
    }
  }
}

function renderRuntimePane(snapshot) {
  const detail = (((snapshot || {}).runtime || {}).detail) || {};
  const health = detail.health || {};
  const monitoring = detail.monitoring || {};
  const monitoringSummary = monitoring.summary || {};
  const shadowReview = detail.shadow_review || {};
  const workerHealth = detail.workers || [];

  runtimeReleaseVersion.textContent = String(health.release_version || "-");
  runtimeSendMode.textContent = String(health.send_mode || "-").toUpperCase();
  runtimeRecommendedModeDetail.innerHTML = badge(
    String(health.recommended_mode || "unknown").toUpperCase(),
    badgeClass(health.recommended_mode),
  );
  runtimeManagerHeartbeat.textContent = health.manager_heartbeat_stale ? "Stale" : "Fresh";

  renderRuntimeWorkers(workerHealth);
  renderRuntimeMonitoring(monitoringSummary);
  renderRuntimeDrift(shadowReview.top_rows || []);
}

function renderRuntimeWorkers(workers) {
  runtimeWorkerList.innerHTML = "";
  if (!workers.length) {
    runtimeWorkerList.innerHTML = `<article class="agent-item"><p class="agent-summary">No worker health data yet.</p></article>`;
    return;
  }

  for (const item of workers) {
    const article = document.createElement("article");
    article.className = "agent-item";
    article.innerHTML = `
      <div class="agent-head">
        <div class="agent-copy">
          <strong>${escapeHtml(titleCase(item.account_id || "worker"))}</strong>
          <p class="agent-meta">${escapeHtml(buildRuntimeWorkerMeta(item))}</p>
        </div>
        ${badge(humanizeStatus(item.status || "unknown"), badgeClass(item.status))}
      </div>
      <div class="runtime-worker-meta">
        <span>Score ${escapeHtml(String(item.score != null ? item.score : "-"))}</span>
        <span>Threads ${escapeHtml(String(item.assigned_threads != null ? item.assigned_threads : 0))}</span>
        <span>Approvals ${escapeHtml(String(item.approval_blocked != null ? item.approval_blocked : 0))}</span>
        <span>Session ${escapeHtml(item.session_ready ? "ready" : "missing")}</span>
        <span>Heartbeat ${escapeHtml(item.heartbeat_stale ? "stale" : "ok")}</span>
        <span>Inbox ${escapeHtml(item.inbox_stale ? "stale" : "ok")}</span>
      </div>
    `;
    runtimeWorkerList.appendChild(article);
  }
}

function renderRuntimeMonitoring(summary) {
  const rows = [
    ["Threads", String(summary.total_threads != null ? summary.total_threads : 0)],
    ["Messaged", String(summary.messaged != null ? summary.messaged : 0)],
    ["Replied", String(summary.replied != null ? summary.replied : 0)],
    ["Negotiating", String(summary.negotiating != null ? summary.negotiating : 0)],
    ["Pending approval", String(summary.pending_approval_count != null ? summary.pending_approval_count : 0)],
    ["Escalations", String(summary.escalation_count != null ? summary.escalation_count : 0)],
  ];
  runtimeMonitoringGrid.innerHTML = rows
    .map(
      ([label, value]) => `
        <div>
          <dt>${escapeHtml(label)}</dt>
          <dd>${escapeHtml(value)}</dd>
        </div>
      `,
    )
    .join("");
}

function renderRuntimeDrift(rows) {
  runtimeDriftList.innerHTML = "";
  if (!rows.length) {
    runtimeDriftList.innerHTML = `
      <li class="attention-item">
        <strong>No drift rows.</strong>
        <p class="attention-text">Shadow review is clear right now.</p>
      </li>
    `;
    return;
  }

  for (const row of rows) {
    const li = document.createElement("li");
    li.className = "attention-item";
    li.innerHTML = `
      <strong>${escapeHtml(row.kol_username || "Unknown thread")}</strong>
      <p class="attention-text">${escapeHtml(buildDriftSummary(row))}</p>
    `;
    runtimeDriftList.appendChild(li);
  }
}

function renderRuntimeControls(services) {
  runtimeControlList.innerHTML = "";
  if (!services.length) {
    runtimeControlList.innerHTML = `<p class="section-copy">No service controls are available yet.</p>`;
    return;
  }

  for (const item of services) {
    const row = document.createElement("div");
    row.className = "control-row";
    row.innerHTML = `
      <div class="control-copy">
        <strong>${escapeHtml(humanizeServiceName(item.name || ""))}</strong>
        <p>${escapeHtml(String(item.name || ""))}</p>
      </div>
      <div class="control-actions">
        ${badge(humanizeStatus(item.status || "unknown"), badgeClass(item.status))}
        <button class="action-button" type="button" data-service="${escapeHtml(item.name || "")}">Restart</button>
      </div>
    `;
    runtimeControlList.appendChild(row);
  }
}

function renderReportsPane(snapshot) {
  const reports = snapshot.reports || {};
  const runtime = ((snapshot || {}).runtime || {}).detail || {};
  const monitoringSummary = (runtime.monitoring || {}).summary || {};
  const allWatchlistRows = getReportBoardRows(snapshot);
  const filteredWatchlistRows = sortWatchlistRows(filterWatchlistRows(allWatchlistRows));
  const runs = sortRunsByGeneratedAt(reports.runs || []);
  renderWatchlistModeFilters(allWatchlistRows);
  renderWatchlistSortSelect();
  renderWatchlistColumnToggles();
  if (!allWatchlistRows.some((row) => watchlistRowKey(row) === currentReportThreadKey)) {
    currentReportThreadKey = filteredWatchlistRows[0] ? watchlistRowKey(filteredWatchlistRows[0]) : (allWatchlistRows[0] ? watchlistRowKey(allWatchlistRows[0]) : "");
  }
  if (!runs.some((run) => String(run.id || run.label || "").toLowerCase() === currentReportRunId)) {
    currentReportRunId = runs[0] ? String(runs[0].id || runs[0].label || "").toLowerCase() : "";
  }
  const selectedThread =
    allWatchlistRows.find((row) => watchlistRowKey(row) === currentReportThreadKey) ||
    filteredWatchlistRows[0] ||
    allWatchlistRows[0] ||
    null;
  if (!selectedThread && currentReportsView === "detail") {
    currentReportsView = "board";
  }
  renderReportRuns(runs);
  renderReportRunInspector(runs);
  renderReportsActions(snapshot, allWatchlistRows, monitoringSummary);
  renderReportWatchlist(filteredWatchlistRows);
  renderReportThreadInspector(selectedThread, monitoringSummary);
  renderReportsSelectionInspector(selectedThread, monitoringSummary);
  renderReportsStateList(allWatchlistRows);
  renderReportsWorkspace(selectedThread);
  renderTableRows(reportsSummaryTableBody, (reports.summary_rows || []).map((row) => [row.label || "", row.value || "-"]), {
    empty: "No coverage totals yet.",
    colspan: 2,
  });
}

function renderReportsWorkspace(selectedThread) {
  const showDetail = currentReportsView === "detail" && Boolean(selectedThread);
  if (reportsBoardView) {
    reportsBoardView.hidden = showDetail;
  }
  if (reportsDetailView) {
    reportsDetailView.hidden = !showDetail;
  }
}

function renderReportsSelectionInspector(selected, monitoringSummary) {
  if (!approvalInspectorSummary || !approvalInspectorFacts || !approvalInspectorActions) return;
  if (!selected) {
    approvalInspectorSummary.textContent = "Pick a row from the board to inspect why it matters and what should happen next.";
    approvalInspectorFacts.innerHTML = "";
    approvalInspectorActions.innerHTML = `<li class="mini-list-item"><span>Select a board row when one is available.</span></li>`;
    return;
  }

  const approvals = Number(monitoringSummary.pending_approval_count || 0);
  const escalations = Number(monitoringSummary.escalation_count || 0);
  const manualReview = needsManualReview(selected);
  const waitingOnKol = isWaitingOnKolThread(selected);
  const greenLane = isGreenLaneThread(selected);

  approvalInspectorSummary.textContent = buildWatchlistInspectorSummary(selected, {
    manualReview,
    waitingOnKol,
    greenLane,
    approvals,
    escalations,
  });

  renderFactGrid(approvalInspectorFacts, [
    { label: "KOL", value: selected.kol_username || selected.label || "Unknown" },
    { label: "Issue", value: selected.issue_label || titleCase(selected.issue || "review") },
    { label: "State", value: selected.status_label || titleCase(selected.status || "unknown") },
    { label: "Owner", value: selected.owner_label || titleCase(selected.owner || "unknown") },
    { label: "Lane", value: selected.lane_label || titleCase(selected.lane || "unknown") },
    { label: "Priority", value: formatPriorityScore(selected.priority_score != null ? selected.priority_score : selected.priority) },
    { label: "Due", value: formatDueLabel(selected.next_action_due_at || "") },
  ]);

  approvalInspectorActions.innerHTML = `
    <li class="mini-list-item">
      <span class="mini-list-label">Next step</span>
      <span class="mini-list-value">${escapeHtml(selected.recommended_action || describeWatchlistNextStep(selected))}</span>
    </li>
    <li class="mini-list-item">
      <span class="mini-list-label">Next owner</span>
      <span class="mini-list-value">${escapeHtml(selected.next_action_owner || selected.owner_label || titleCase(selected.owner || "unknown"))}</span>
    </li>
    <li class="mini-list-item">
      <span class="mini-list-label">Why it matters</span>
      <span class="mini-list-value">${escapeHtml(describeWatchlistReason(selected))}</span>
    </li>
    <li class="mini-list-item mini-list-item--full">
      <div class="filter-chip-row">
        <button class="filter-chip" type="button" data-open-report-thread="${escapeHtml(watchlistRowKey(selected))}">Open Thread Page</button>
        <button class="filter-chip" type="button" data-watchlist-mode-set="${escapeHtml(String(selected.owner || "").toLowerCase() || "all")}">Filter ${escapeHtml(titleCase(selected.owner || "owner"))}</button>
      </div>
    </li>
  `;
}

function renderWatchlistModeFilters(rows = []) {
  if (!reportWatchlistModeFilters) return;
  const buttons = Array.from(reportWatchlistModeFilters.querySelectorAll("[data-watchlist-mode]"));
  const counts = {
    all: rows.length,
    manual: rows.filter(needsManualReview).length,
    priority: rows.filter(isHighPriorityThread).length,
    green: rows.filter(isGreenLaneThread).length,
    waiting: rows.filter(isWaitingOnKolThread).length,
    john: rows.filter((row) => String(row.owner || "").toLowerCase() === "john").length,
    sora: rows.filter((row) => String(row.owner || "").toLowerCase() === "sora").length,
  };
  for (const button of buttons) {
    const mode = button.dataset.watchlistMode || "all";
    const active = mode === reportWatchlistMode;
    const label = button.dataset.watchlistLabel || titleCase(mode);
    const count = counts[mode] != null ? counts[mode] : 0;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
    button.textContent = `${label} (${count})`;
  }
}

function renderWatchlistSortSelect() {
  if (!reportWatchlistSortSelect) return;
  reportWatchlistSortSelect.value = reportWatchlistSort;
}

function renderWatchlistColumnToggles() {
  if (!reportWatchlistColumns) return;
  const inputs = Array.from(reportWatchlistColumns.querySelectorAll("input[type=\"checkbox\"]"));
  for (const input of inputs) {
    input.checked = reportWatchlistVisibleColumns.has(input.value);
  }
}

function renderIntegrationsPane(snapshot) {
  const integrations = snapshot.integrations || {};
  renderIntegrationList(integrationList, integrations.items || []);
  renderFactGrid(integrationSummaryGrid, integrations.summary_rows || []);
  renderMiniList(integrationSecurityList, integrations.security_rows || [], "No security notes yet.");
}

function renderSkillsPane(snapshot) {
  const skills = snapshot.skills || {};
  renderTableRows(
    skillsTableBody,
    (skills.items || []).map((item) => [
      `<div class="table-primary"><strong>${escapeHtml(item.label || item.name || "Unknown")}</strong><span>${escapeHtml(compactText(item.description || "", 120))}</span></div>`,
      badge(humanizeStatus(item.status || "unknown"), badgeClass(item.status)),
      escapeHtml(item.source || "-"),
      escapeHtml(item.primary_env || "-"),
      escapeHtml(compactText(item.missing_summary || "No missing requirements.", 90)),
    ]),
    {
      empty: "No skill rows yet.",
      colspan: 5,
      allowHtml: true,
    },
  );
  renderTableRows(
    skillsSummaryTableBody,
    (skills.summary_rows || []).map((row) => [row.label || "", row.value || "-"]),
    {
      empty: "No skill summary yet.",
      colspan: 2,
    },
  );
  renderMiniList(skillsInstallList, skills.install_rows || [], "No install notes yet.");
}

function renderIntegrationsForm(snapshot) {
  const editor = (((snapshot || {}).integrations || {}).editor) || {};
  const fields = editor.fields || {};
  const oauth = editor.oauth || {};

  integrationPrimaryModel.value = fields.primary_model || "";
  integrationSearchProvider.value = fields.search_provider || "";
  integrationDmPolicy.value = fields.dm_policy || "";
  integrationGroupPolicy.value = fields.group_policy || "";
  integrationGatewayPort.value = fields.gateway_port || "";
  integrationOauthSummary.textContent = `${titleCase(oauth.provider || "unknown")} · ${titleCase(oauth.mode || "unknown")} · ${oauth.email || "unknown"}`;
  integrationGatewayToken.value = "";
  integrationBraveKey.value = "";
  integrationTelegramToken.value = "";
}

function renderIdentityPane(snapshot) {
  const identity = snapshot.identity || {};
  renderIdentityList(identity.items || []);
  renderMiniList(identityDocList, identity.doc_rows || [], "No identity files yet.");
  renderTextList(identityRuleList, identity.rules || [], "No working rules yet.");
}

function renderIdentityEditor(snapshot) {
  const editors = ((((snapshot || {}).identity) || {}).editors) || [];
  if (!editors.length) {
    identityTabs.innerHTML = "";
    identityEditorTitle.textContent = "No identity file";
    identityEditorSummary.textContent = "No editable identity files were found.";
    identityEditorPath.textContent = "-";
    identityEditor.value = "";
    return;
  }

  if (!editors.some((item) => item.name === currentIdentityFile)) {
    currentIdentityFile = editors[0].name;
  }

  identityTabs.innerHTML = "";
  for (const item of editors) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `tab-button${item.name === currentIdentityFile ? " is-active" : ""}`;
    button.dataset.file = item.name || "";
    button.textContent = item.label || item.name || "File";
    identityTabs.appendChild(button);
  }

  const selected = getCurrentIdentityEditor(snapshot);
  if (!selected) return;
  identityEditorTitle.textContent = selected.name || "Identity file";
  identityEditorSummary.textContent = selected.summary || "No summary available.";
  identityEditorPath.textContent = selected.path || "-";
  identityEditor.value = selected.content || "";
}

function getCurrentIdentityEditor(snapshot) {
  const editors = ((((snapshot || {}).identity) || {}).editors) || [];
  return editors.find((item) => item.name === currentIdentityFile) || editors[0] || null;
}

function renderAuditPane(snapshot) {
  const audit = snapshot.audit || {};
  renderRoomFeedInto(auditRoomFeed, audit.room_events || [], { fullText: true, reverse: true });
  renderRuntimeEventList(audit.runtime_events || []);
  renderFactGrid(auditSummaryGrid, audit.summary_rows || []);
  renderMiniList(auditDocList, audit.doc_rows || [], "No document updates yet.");
}

function renderReportRuns(runs) {
  renderTableRows(
    reportsRunTableBody,
    runs.map((run) => {
      const key = reportRunKey(run);
      const selected = key === currentReportRunId;
      return {
        cells: [
          `
            <button class="table-row-button" type="button" data-select-report-run="${escapeHtml(key)}" aria-pressed="${selected ? "true" : "false"}">
              <span class="table-primary"><strong>${escapeHtml(run.label || "Unknown")}</strong><span>${escapeHtml(compactText(run.summary || "No summary available.", 64))}</span></span>
            </button>
          `,
          escapeHtml(formatTimestamp(run.generated_at || "")),
          escapeHtml(formatCountBadge(run.row_count || 0, "row")),
        ],
        attrs: `class="${selected ? "is-selected" : ""}"`,
      };
    }),
    {
      empty: "No report snapshots were found.",
      colspan: 3,
      allowHtml: true,
    },
  );
}

function watchlistRowKey(row) {
  return String(row.kol_username || row.label || row.issue || "unknown").toLowerCase();
}

function reportRunKey(run) {
  return String(run.id || run.label || "unknown").toLowerCase();
}

function renderReportRunInspector(runs) {
  const selected = runs.find((run) => reportRunKey(run) === currentReportRunId) || runs[0] || null;
  if (!selected) {
    reportsRunSummary.textContent = "No report run is available in the current snapshot.";
    reportsRunFacts.innerHTML = "";
    return;
  }

  reportsRunSummary.textContent = `${selected.label || "This run"} was generated ${formatTimestamp(selected.generated_at || "")} and is the current source for this reporting lane.`;
  renderFactGrid(reportsRunFacts, [
    { label: "Report", value: selected.label || "Unknown" },
    { label: "Generated", value: formatTimestamp(selected.generated_at || "") },
    { label: "Rows", value: String(selected.row_count != null ? selected.row_count : 0) },
    { label: "JSON artifacts", value: String(selected.json_count != null ? selected.json_count : 0) },
    { label: "HTML artifacts", value: String(selected.html_count != null ? selected.html_count : 0) },
    { label: "Latest JSON", value: selected.latest_json || "-" },
  ]);
}

function getVisibleReportBoardColumns() {
  return REPORT_BOARD_COLUMNS.filter((column) => column.required || reportWatchlistVisibleColumns.has(column.key));
}

function renderReportBoardHeaders() {
  if (!reportsWatchlistHeadRow) return;
  const columns = getVisibleReportBoardColumns();
  reportsWatchlistHeadRow.innerHTML = columns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join("");
}

function getReportWatchlistModeLabel(mode) {
  const labels = {
    all: "All threads",
    manual: "Manual Review",
    priority: "High Priority",
    green: "Green Lane",
    waiting: "Waiting on KOL",
    john: "John",
    sora: "Sora",
  };
  return labels[mode] || titleCase(mode || "all");
}

function getReportSortLabel(mode) {
  const labels = {
    priority: "Highest priority",
    due: "Due soonest",
    owner: "Owner",
    state: "Current state",
    lane: "Decision lane",
  };
  return labels[mode] || "Highest priority";
}

function renderIntegrationList(container, items) {
  container.innerHTML = "";
  if (!items.length) {
    container.innerHTML = `<article class="agent-item"><p class="agent-summary">No integration data yet.</p></article>`;
    return;
  }

  for (const item of items) {
    const article = document.createElement("article");
    article.className = "agent-item";
    article.innerHTML = `
      <div class="agent-head">
        <div class="agent-copy">
          <strong>${escapeHtml(item.label || "Unknown")}</strong>
          <p class="agent-meta">${escapeHtml(item.summary || "")}</p>
        </div>
        ${badge(humanizeStatus(item.status || "unknown"), badgeClass(item.status))}
      </div>
      <dl class="agent-metrics">${renderAgentMetrics(item.metrics || [])}</dl>
    `;
    container.appendChild(article);
  }
}

function renderIdentityList(items) {
  identityList.innerHTML = "";
  if (!items.length) {
    identityList.innerHTML = `<article class="agent-item"><p class="agent-summary">No identity data yet.</p></article>`;
    return;
  }

  for (const item of items) {
    const article = document.createElement("article");
    article.className = "agent-item";
    article.innerHTML = `
      <div class="agent-head">
        <div class="agent-copy">
          <strong>${escapeHtml(item.label || "Unknown")}</strong>
          <p class="agent-meta">${escapeHtml(item.summary || "")}</p>
        </div>
      </div>
      ${renderBulletBlock(item.highlights || [])}
    `;
    identityList.appendChild(article);
  }
}

function renderRuntimeEventList(items) {
  auditEventList.innerHTML = "";
  if (!items.length) {
    auditEventList.innerHTML = `
      <li class="attention-item">
        <strong>No runtime events.</strong>
        <p class="attention-text">The latest snapshot did not return event rows.</p>
      </li>
    `;
    return;
  }

  for (const item of items) {
    const li = document.createElement("li");
    li.className = "attention-item";
    li.innerHTML = `
      <strong>${escapeHtml(humanizeType(item.event_type || "event"))}</strong>
      <p class="attention-text">${escapeHtml(buildRuntimeEventSummary(item))}</p>
    `;
    auditEventList.appendChild(li);
  }
}

function renderFactGrid(container, rows) {
  if (!container) return;
  container.innerHTML = rows
    .map(
      (row) => `
        <div>
          <dt>${escapeHtml(row.label || "")}</dt>
          <dd>${escapeHtml(row.value || "-")}</dd>
        </div>
      `,
    )
    .join("");
}

function renderMiniList(container, rows, emptyText) {
  if (!container) return;
  container.innerHTML = "";
  if (!rows.length) {
    container.innerHTML = `<li class="mini-list-item"><span>${escapeHtml(emptyText)}</span></li>`;
    return;
  }

  for (const row of rows) {
    const li = document.createElement("li");
    li.className = "mini-list-item";
    li.innerHTML = `
      <span class="mini-list-label">${escapeHtml(row.label || "")}</span>
      <span class="mini-list-value">${escapeHtml(row.value || "-")}</span>
    `;
    container.appendChild(li);
  }
}

function renderTextList(container, rows, emptyText) {
  if (!container) return;
  container.innerHTML = "";
  if (!rows.length) {
    container.innerHTML = `<li class="mini-list-item"><span>${escapeHtml(emptyText)}</span></li>`;
    return;
  }

  for (const value of rows) {
    const li = document.createElement("li");
    li.className = "mini-list-item mini-list-item--full";
    li.textContent = value;
    container.appendChild(li);
  }
}

function renderReportWatchlist(rows) {
  const columns = getVisibleReportBoardColumns();
  renderReportBoardHeaders();
  renderTableRows(
    reportsWatchlistTableBody,
    rows.map((row) => {
      const key = watchlistRowKey(row);
      const selected = key === currentReportThreadKey;
      const cellByColumn = {
        thread: `
          <button class="table-row-button" type="button" data-select-watchlist="${escapeHtml(key)}" aria-pressed="${selected ? "true" : "false"}">
            <span class="table-primary">
              <strong>${escapeHtml(row.kol_username || row.label || "Unknown")}</strong>
              <span>${escapeHtml(compactText(row.thread_id || row.source || "Thread row", 72))}</span>
              <span>${escapeHtml("Open record")}</span>
            </span>
          </button>
        `,
        issue: escapeHtml(row.issue_label || titleCase(row.issue || "review")),
        state: `
          <div class="table-primary">
            <strong>${escapeHtml(row.status_label || titleCase(row.status || "unknown"))}</strong>
            <span>${badge(humanizeStatus(classifyWatchlistTone(row)), badgeClass(classifyWatchlistTone(row)))}</span>
          </div>
        `,
        owner: escapeHtml(row.owner_label || titleCase(row.owner || "unknown")),
        lane: escapeHtml(row.lane_label || titleCase(row.lane || "unknown")),
        priority: escapeHtml(formatPriorityScore(row.priority_score != null ? row.priority_score : row.priority)),
        next: escapeHtml(row.recommended_action || describeWatchlistNextStep(row)),
        due: escapeHtml(formatDueLabel(row.next_action_due_at || "")),
        latest: escapeHtml(compactText(row.latest_inbound_message || "No inbound message", 96)),
      };
      return {
        cells: columns.map((column) => cellByColumn[column.key] || escapeHtml("-")),
        attrs: `class="${selected ? "is-selected" : ""}"`,
      };
    }),
    {
      empty: "No priority threads right now.",
      colspan: columns.length,
      allowHtml: true,
    },
  );
}

function renderReportThreadInspector(selected, monitoringSummary) {
  if (!selected) {
    if (reportsThreadSummary) reportsThreadSummary.textContent = "Open a row from the board to inspect the full operator record.";
    if (reportsThreadFacts) reportsThreadFacts.innerHTML = "";
    if (reportsThreadActions) reportsThreadActions.innerHTML = `<li class="mini-list-item"><span>Select a thread when one is available.</span></li>`;
    if (reportsDetailPath) reportsDetailPath.textContent = "Reports / Thread";
    if (reportsDetailTitle) reportsDetailTitle.textContent = "No thread selected";
    if (reportsDetailBadges) reportsDetailBadges.innerHTML = "";
    if (reportsDetailContext) reportsDetailContext.innerHTML = `<li class="mini-list-item"><span>No thread context is visible right now.</span></li>`;
    if (reportsDetailRuntime) reportsDetailRuntime.innerHTML = `<li class="mini-list-item"><span>No runtime context is available right now.</span></li>`;
    return;
  }

  const manualReview = needsManualReview(selected);
  const waitingOnKol = isWaitingOnKolThread(selected);
  const greenLane = isGreenLaneThread(selected);
  const highPriority = isHighPriorityThread(selected);
  const approvals = Number(monitoringSummary.pending_approval_count || 0);
  const escalations = Number(monitoringSummary.escalation_count || 0);
  const ownerMode = String(selected.owner || "").toLowerCase();
  const focusMode = manualReview ? "manual" : highPriority ? "priority" : greenLane ? "green" : waitingOnKol ? "waiting" : "all";
  const activeViewLabel = getReportWatchlistModeLabel(reportWatchlistMode);
  const detailSummary = buildWatchlistInspectorSummary(selected, {
    manualReview,
    waitingOnKol,
    greenLane,
    approvals,
    escalations,
  });

  if (reportsDetailPath) {
    reportsDetailPath.textContent = reportWatchlistMode === "all"
      ? `Reports / ${selected.kol_username || selected.label || "Thread"}`
      : `Reports / ${activeViewLabel} / ${selected.kol_username || selected.label || "Thread"}`;
  }
  if (reportsDetailTitle) {
    reportsDetailTitle.textContent = selected.kol_username || selected.label || "Unknown thread";
  }
  if (reportsThreadSummary) {
    reportsThreadSummary.textContent = detailSummary;
  }
  if (reportsDetailBadges) {
    reportsDetailBadges.innerHTML = [
      badge(selected.status_label || titleCase(selected.status || "unknown"), badgeClass(classifyWatchlistTone(selected))),
      badge(selected.lane_label || titleCase(selected.lane || "unknown"), badgeClass(manualReview ? "pending" : greenLane ? "active" : "pending")),
      badge(`Owner ${selected.owner_label || titleCase(selected.owner || "unknown")}`, "stale"),
      badge(formatPriorityScore(selected.priority_score != null ? selected.priority_score : selected.priority), highPriority ? "blocked" : "pending"),
    ].join("");
  }

  renderFactGrid(reportsThreadFacts, [
    { label: "KOL handle", value: selected.kol_username || selected.label || "Unknown" },
    { label: "Thread id", value: selected.thread_id || selected.source || "-" },
    { label: "Owner", value: selected.owner_label || titleCase(selected.owner || "unknown") },
    { label: "Current state", value: selected.status_label || titleCase(selected.status || "unknown") },
    { label: "Decision lane", value: selected.lane_label || titleCase(selected.lane || "unknown") },
    { label: "Priority", value: formatPriorityScore(selected.priority_score != null ? selected.priority_score : selected.priority) },
    { label: "Next step", value: selected.recommended_action || describeWatchlistNextStep(selected) },
    { label: "Next owner", value: selected.next_action_owner || selected.owner_label || titleCase(selected.owner || "unknown") },
    { label: "Due", value: formatDueLabel(selected.next_action_due_at || "") },
    { label: "Reason it is here", value: describeWatchlistReason(selected) },
  ]);

  renderMiniList(
    reportsDetailContext,
    [
      { label: "Full inbound text", value: selected.latest_inbound_message || "No inbound message recorded." },
      { label: "Request / ask", value: selected.latest_inbound_request || "Unknown" },
      { label: "Offer / cash lane", value: selected.offer_summary || "No offer context" },
      { label: "Blocker", value: selected.blocker_summary || "No blocker recorded" },
      { label: "Escalation details", value: selected.escalation_summary || "None" },
      { label: "Operator note", value: selected.operator_note || buildWatchlistOperatorNote(selected, { manualReview, waitingOnKol, greenLane, approvals, escalations }) },
    ],
    "No thread context is available.",
  );

  renderMiniList(
    reportsDetailRuntime,
    [
      { label: "Review queue pressure", value: `${pluralize(approvals, "approval")} and ${pluralize(escalations, "escalation")} are open overall` },
      { label: "Focus bucket", value: titleCase(focusMode.replaceAll("_", " ")) },
      { label: "Manual review", value: manualReview ? "Yes" : "No" },
      { label: "Waiting on KOL", value: waitingOnKol ? "Yes" : "No" },
      { label: "Green lane", value: greenLane ? "Yes" : "No" },
      { label: "Source", value: selected.source || "Monitoring report" },
    ],
    "No runtime context is available.",
  );

  reportsThreadActions.innerHTML = `
    <li class="mini-list-item">
      <span class="mini-list-label">Recommended action</span>
      <span class="mini-list-value">${escapeHtml(selected.recommended_action || describeWatchlistNextStep(selected))}</span>
    </li>
    <li class="mini-list-item">
      <span class="mini-list-label">Next owner</span>
      <span class="mini-list-value">${escapeHtml(selected.next_action_owner || selected.owner_label || titleCase(selected.owner || "unknown"))}</span>
    </li>
    <li class="mini-list-item">
      <span class="mini-list-label">Due</span>
      <span class="mini-list-value">${escapeHtml(formatDueLabel(selected.next_action_due_at || ""))}</span>
    </li>
    <li class="mini-list-item mini-list-item--full">
      <div class="filter-chip-row">
        <button class="filter-chip" type="button" data-reports-view="board">Back to board</button>
        <button class="filter-chip" type="button" data-watchlist-mode-set="${escapeHtml(focusMode)}">Focus similar threads</button>
        <button class="filter-chip" type="button" data-watchlist-mode-set="${escapeHtml(ownerMode || "all")}">Filter ${escapeHtml(titleCase(selected.owner || "owner"))}</button>
      </div>
    </li>
  `;
}

function renderReportsActions(snapshot, boardRows, monitoringSummary) {
  const manualReviewRows = boardRows.filter(needsManualReview);
  const escalationRows = boardRows.filter(hasEscalationPressure);
  const greenLaneRows = boardRows.filter(isGreenLaneThread);
  const waitingOnKolRows = boardRows.filter(isWaitingOnKolThread);
  const approvals = Number(monitoringSummary.pending_approval_count || 0);
  const escalations = Number(monitoringSummary.escalation_count || 0);
  const rows = [];

  if (manualReviewRows.length) {
    rows.push({
      title: `${pluralize(manualReviewRows.length, "thread")} need manual approval`,
      summary: `${formatWatchlistNames(manualReviewRows)} still need human review before the next send.`,
      tone: "blocked",
      mode: "manual",
      action: "Focus manual review",
    });
  }

  if (escalationRows.length || escalations > 0) {
    rows.push({
      title: `${pluralize(escalationRows.length || escalations, "thread")} carry escalation pressure`,
      summary: "These rows are carrying escalation context and should stay visible until the decision lands.",
      tone: "blocked",
      mode: "priority",
      action: "Focus high priority",
    });
  }

  if (approvals > 0 && !manualReviewRows.length) {
    rows.push({
      title: `${pluralize(approvals, "approval")} are pending`,
      summary: "Approvals are open even though no watchlist row is marked as manual review yet.",
      tone: "pending",
      route: "reports",
      action: "Open review queue",
    });
  }

  if (greenLaneRows.length) {
    rows.push({
      title: `${pluralize(greenLaneRows.length, "thread")} can keep moving`,
      summary: `${formatWatchlistNames(greenLaneRows)} are in low-friction lanes and do not need manual review right now.`,
      tone: "active",
      mode: "green",
      action: "Focus green lanes",
    });
  }

  if (waitingOnKolRows.length) {
    rows.push({
      title: `${pluralize(waitingOnKolRows.length, "thread")} are waiting on KOL replies`,
      summary: `${formatWatchlistNames(waitingOnKolRows)} are currently in a wait state, so they only need monitoring.`,
      tone: "pending",
      mode: "waiting",
      action: "Focus waiting threads",
    });
  }

  reportsActionSummary.textContent = rows.length
    ? "These queue cards use the same board rows as the table below, so counts and thread lists stay aligned."
    : "No immediate report issue is visible in the current snapshot.";
  reportsActionList.innerHTML = "";

  if (!rows.length) {
    reportsActionList.innerHTML = `
      <li class="attention-item">
        <div class="attention-topline">
          <strong>Report queue is clear.</strong>
          ${badge("Stable", "active")}
        </div>
        <p class="attention-text">No approval-heavy or blocked KOL thread is visible in the current snapshot.</p>
      </li>
    `;
    return;
  }

  for (const row of rows) {
    const li = document.createElement("li");
    li.className = "attention-item";
    li.innerHTML = `
      <div class="attention-topline">
        <strong>${escapeHtml(row.title)}</strong>
        ${badge(humanizeStatus(row.tone), badgeClass(row.tone))}
      </div>
      <p class="attention-text">${escapeHtml(row.summary)}</p>
      ${row.mode ? `<button class="inline-action" type="button" data-watchlist-mode-set="${escapeHtml(row.mode)}">${escapeHtml(row.action)}</button>` : ""}
      ${row.route ? `<button class="inline-action" type="button" data-route-target="${escapeHtml(row.route)}">${escapeHtml(row.action)}</button>` : ""}
    `;
    reportsActionList.appendChild(li);
  }
}

function renderReportsStateList(rows) {
  const visibleRows = [
    {
      label: "Manual review",
      value: rows.filter(needsManualReview).length,
      summary: "These threads are blocked until someone reviews the next move.",
      mode: "manual",
    },
    {
      label: "High priority",
      value: rows.filter(isHighPriorityThread).length,
      summary: "These rows should be read before the calmer lanes because their priority score is high.",
      mode: "priority",
    },
    {
      label: "Green lanes",
      value: rows.filter(isGreenLaneThread).length,
      summary: "These threads can usually continue without a manual handoff.",
      mode: "green",
    },
    {
      label: "Waiting on KOL",
      value: rows.filter(isWaitingOnKolThread).length,
      summary: "These threads mainly need monitoring because the next move belongs to the KOL.",
      mode: "waiting",
    },
  ].filter((row) => row.value > 0);
  reportsStateSummary.textContent = visibleRows.length
    ? "These decision buckets use the same logic source as the queue cards and the board rows."
    : "No decision bucket is visible in the current snapshot.";
  reportsStateList.innerHTML = "";

  if (!visibleRows.length) {
    reportsStateList.innerHTML = `
      <li class="attention-item">
        <strong>No decision buckets.</strong>
        <p class="attention-text">Monitoring did not return enough rows to build the current decision buckets.</p>
      </li>
    `;
    return;
  }

  for (const row of visibleRows) {
    const li = document.createElement("li");
    li.className = "attention-item";
    li.innerHTML = `
      <div class="attention-topline">
        <strong>${escapeHtml(row.label || "Unknown")}</strong>
        <span class="summary-count">${escapeHtml(String(row.value || "0"))}</span>
      </div>
      <p class="attention-text">${escapeHtml(row.summary || "")}</p>
      ${row.mode ? `<button class="inline-action" type="button" data-watchlist-mode-set="${escapeHtml(row.mode)}">Filter matching threads</button>` : ""}
    `;
    reportsStateList.appendChild(li);
  }
}

function renderApprovalsPane(snapshot) {
  if (!approvalInspectorSummary || !approvalInspectorFacts || !approvalInspectorActions) return;
  const allCases = buildApprovalCases(snapshot);
  const filteredCases = filterApprovalCases(allCases);
  renderApprovalModeFilters();
  if (!filteredCases.some((item) => approvalCaseKey(item) === currentApprovalCaseKey)) {
    currentApprovalCaseKey = filteredCases[0] ? approvalCaseKey(filteredCases[0]) : (allCases[0] ? approvalCaseKey(allCases[0]) : "");
  }
  renderApprovalSummary(snapshot, allCases, filteredCases);
  renderApprovalCaseTable(filteredCases);
  renderApprovalInspector(snapshot, filteredCases, allCases);
  renderApprovalTotals(snapshot, allCases);
}

function renderApprovalModeFilters() {
  if (!approvalModeFilters) return;
  const buttons = Array.from(approvalModeFilters.querySelectorAll("[data-approval-mode]"));
  for (const button of buttons) {
    const active = (button.dataset.approvalMode || "all") === approvalMode;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  }
}

function renderApprovalSummary(snapshot, allCases, filteredCases) {
  const runtime = ((snapshot || {}).runtime || {}).detail || {};
  const monitoringSummary = (runtime.monitoring || {}).summary || {};
  const approvals = Number(monitoringSummary.pending_approval_count || 0);
  const escalations = Number(monitoringSummary.escalation_count || 0);
  const manualReviewCount = allCases.filter((item) => item.manual_review).length;
  const highPriorityCount = allCases.filter((item) => item.high_priority).length;
  const johnOwned = allCases.filter((item) => String(item.owner || "").toLowerCase() === "john").length;
  const soraOwned = allCases.filter((item) => String(item.owner || "").toLowerCase() === "sora").length;

  approvalsSummary.textContent = filteredCases.length
    ? `${pluralize(approvals, "approval")} and ${pluralize(escalations, "escalation")} are open in the latest monitoring pass. ${pluralize(filteredCases.length, "case")} match the current filter.`
    : "No approval case matches the current filter. Clear the filters to inspect the full queue.";

  const rows = [];
  if (approvals > 0) {
    rows.push({
      title: `${pluralize(approvals, "approval")} are open`,
      summary: `${pluralize(manualReviewCount, "thread")} are already parked in manual review lanes.`,
      tone: "pending",
      mode: "manual",
      action: "Focus manual review",
    });
  }
  if (escalations > 0) {
    rows.push({
      title: `${pluralize(escalations, "escalation")} are open`,
      summary: `${pluralize(highPriorityCount, "case")} are high priority enough to review first.`,
      tone: "blocked",
      mode: "priority",
      action: "Focus high priority",
    });
  }
  if (johnOwned > 0) {
    rows.push({
      title: `${pluralize(johnOwned, "case")} sit with John`,
      summary: "Use this filter when you want to review John-owned approval pressure only.",
      tone: johnOwned > soraOwned ? "pending" : "active",
      mode: "john",
      action: "Filter John",
    });
  }
  if (soraOwned > 0) {
    rows.push({
      title: `${pluralize(soraOwned, "case")} sit with Sora`,
      summary: "Use this filter when you want to review Sora-owned approval pressure only.",
      tone: soraOwned > johnOwned ? "pending" : "active",
      mode: "sora",
      action: "Filter Sora",
    });
  }

  approvalsSummaryList.innerHTML = "";
  if (!rows.length) {
    approvalsSummaryList.innerHTML = `
      <li class="attention-item">
        <div class="attention-topline">
          <strong>No approval pressure is visible.</strong>
          ${badge("Stable", "active")}
        </div>
        <p class="attention-text">The latest monitoring snapshot does not show a manual-review backlog.</p>
      </li>
    `;
    return;
  }

  for (const row of rows.slice(0, 4)) {
    const li = document.createElement("li");
    li.className = "attention-item";
    li.innerHTML = `
      <div class="attention-topline">
        <strong>${escapeHtml(row.title)}</strong>
        ${badge(humanizeStatus(row.tone), badgeClass(row.tone))}
      </div>
      <p class="attention-text">${escapeHtml(row.summary)}</p>
      <button class="inline-action" type="button" data-approval-mode-set="${escapeHtml(row.mode)}">${escapeHtml(row.action)}</button>
    `;
    approvalsSummaryList.appendChild(li);
  }
}

function renderApprovalCaseTable(rows) {
  renderTableRows(
    approvalCaseTableBody,
    rows.map((row) => {
      const key = approvalCaseKey(row);
      const selected = key === currentApprovalCaseKey;
      return {
        cells: [
          `
            <button class="table-row-button" type="button" data-select-approval-case="${escapeHtml(key)}" aria-pressed="${selected ? "true" : "false"}">
              <span class="table-primary"><strong>${escapeHtml(row.kol_username || row.label || "Unknown")}</strong><span>${escapeHtml(compactText(row.source || "Approval case", 72))}</span></span>
            </button>
          `,
          `
            <div class="table-primary">
              <strong>${escapeHtml(row.status_label || titleCase(row.status || "unknown"))}</strong>
              <span>${badge(humanizeStatus(classifyApprovalTone(row)), badgeClass(classifyApprovalTone(row)))}</span>
            </div>
          `,
          escapeHtml(row.owner_label || titleCase(row.owner || "unknown")),
          escapeHtml(row.issue_label || titleCase(row.issue || "review")),
          escapeHtml(row.lane_label || titleCase(row.lane || "unknown")),
          escapeHtml(formatPriorityScore(row.priority_score != null ? row.priority_score : row.priority)),
        ],
        attrs: `class="${selected ? "is-selected" : ""}"`,
      };
    }),
    {
      empty: "No approval case matches the current filter.",
      colspan: 6,
      allowHtml: true,
    },
  );
}

function renderApprovalInspector(snapshot, filteredCases, allCases) {
  const selected =
    filteredCases.find((item) => approvalCaseKey(item) === currentApprovalCaseKey) ||
    allCases.find((item) => approvalCaseKey(item) === currentApprovalCaseKey) ||
    filteredCases[0] ||
    allCases[0] ||
    null;

  if (!selected) {
    approvalInspectorSummary.textContent = "No approval case is visible in the current filter.";
    approvalInspectorFacts.innerHTML = "";
    approvalInspectorActions.innerHTML = `<li class="mini-list-item"><span>Clear the filters or wait for the next snapshot.</span></li>`;
    return;
  }

  const approvals = Number((((snapshot || {}).runtime || {}).detail || {}).monitoring?.summary?.pending_approval_count || 0);
  const escalations = Number((((snapshot || {}).runtime || {}).detail || {}).monitoring?.summary?.escalation_count || 0);
  const ownerMode = String(selected.owner || "").toLowerCase();
  const priorityMode = selected.high_priority ? "priority" : selected.manual_review ? "manual" : "all";

  approvalInspectorSummary.textContent = buildApprovalInspectorSummary(selected, approvals, escalations);
  renderFactGrid(approvalInspectorFacts, [
    { label: "KOL", value: selected.kol_username || selected.label || "Unknown" },
    { label: "State", value: selected.status_label || titleCase(selected.status || "unknown") },
    { label: "Reason", value: selected.issue_label || titleCase(selected.issue || "review") },
    { label: "Owner", value: selected.owner_label || titleCase(selected.owner || "unknown") },
    { label: "Lane", value: selected.lane_label || titleCase(selected.lane || "unknown") },
    { label: "Priority", value: formatPriorityScore(selected.priority_score != null ? selected.priority_score : selected.priority) },
    { label: "Source", value: selected.source || "-" },
  ]);

  approvalInspectorActions.innerHTML = `
    <li class="mini-list-item">
      <span class="mini-list-label">Decision</span>
      <span class="mini-list-value">${escapeHtml(describeApprovalCaseNextStep(selected))}</span>
    </li>
    <li class="mini-list-item">
      <span class="mini-list-label">Why it matters</span>
      <span class="mini-list-value">${escapeHtml(describeApprovalCaseReason(selected))}</span>
    </li>
    <li class="mini-list-item">
      <span class="mini-list-label">Operator note</span>
      <span class="mini-list-value">${escapeHtml(buildApprovalOperatorNote(selected, approvals, escalations))}</span>
    </li>
    <li class="mini-list-item mini-list-item--full">
      <div class="filter-chip-row">
        <button class="filter-chip" type="button" data-approval-mode-set="${escapeHtml(priorityMode)}">Focus similar cases</button>
        <button class="filter-chip" type="button" data-approval-mode-set="${escapeHtml(ownerMode || "all")}">Filter ${escapeHtml(titleCase(selected.owner || "owner"))}</button>
        <button class="filter-chip" type="button" data-open-report-thread="${escapeHtml(watchlistRowKey(selected))}">Open thread page</button>
      </div>
    </li>
  `;
}

function renderApprovalTotals(snapshot, cases) {
  const runtime = ((snapshot || {}).runtime || {}).detail || {};
  const monitoringSummary = (runtime.monitoring || {}).summary || {};
  const manualReviewCount = cases.filter((item) => item.manual_review).length;
  const highPriorityCount = cases.filter((item) => item.high_priority).length;
  const johnOwned = cases.filter((item) => String(item.owner || "").toLowerCase() === "john").length;
  const soraOwned = cases.filter((item) => String(item.owner || "").toLowerCase() === "sora").length;

  renderTableRows(
    approvalSummaryTableBody,
    [
      ["Pending approvals", String(monitoringSummary.pending_approval_count != null ? monitoringSummary.pending_approval_count : 0)],
      ["Escalations", String(monitoringSummary.escalation_count != null ? monitoringSummary.escalation_count : 0)],
      ["Manual review lanes", String(manualReviewCount)],
      ["High priority cases", String(highPriorityCount)],
      ["John-owned cases", String(johnOwned)],
      ["Sora-owned cases", String(soraOwned)],
    ],
    {
      empty: "No approval totals yet.",
      colspan: 2,
    },
  );
}

function renderTableRows(container, rows, options = {}) {
  if (!container) return;
  const { empty = "No rows.", colspan = 1, allowHtml = false } = options;
  container.innerHTML = "";
  if (!rows.length) {
    container.innerHTML = `<tr><td colspan="${colspan}" class="table-empty">${escapeHtml(empty)}</td></tr>`;
    return;
  }

  for (const row of rows) {
    const tr = document.createElement("tr");
    if (Array.isArray(row)) {
      tr.innerHTML = row.map((cell) => `<td>${allowHtml ? cell : escapeHtml(cell)}</td>`).join("");
    } else {
      if (row.attrs) {
        for (const attr of parseRowAttrs(row.attrs)) {
          tr.setAttribute(attr.name, attr.value);
        }
      }
      tr.innerHTML = (row.cells || []).map((cell) => `<td>${allowHtml ? cell : escapeHtml(cell)}</td>`).join("");
    }
    container.appendChild(tr);
  }
}

function parseRowAttrs(raw) {
  const attrs = [];
  const matches = String(raw || "").matchAll(/([a-zA-Z0-9_-]+)="([^"]*)"/g);
  for (const match of matches) {
    attrs.push({ name: match[1], value: match[2] });
  }
  return attrs;
}

function renderSelectOptions(select, options, selectedValue) {
  select.innerHTML = "";
  for (const option of options) {
    const element = document.createElement("option");
    element.value = option;
    element.textContent = option;
    element.selected = option === selectedValue;
    select.appendChild(element);
  }
}

function renderAgentTable(agents) {
  renderTableRows(
    agentTableBody,
    agents.map((item) => {
      const selected = item.id === currentAgentId;
      const controls = item.controls || {};
      const lane = controls.lane || metricValue(item.metrics || [], "Lane") || metricValue(item.metrics || [], "Route") || "-";
      const threads = item.live && item.live.threads ? item.live.threads : metricValue(item.metrics || [], "Threads") || "-";
      const approvals = item.live && item.live.approvals ? item.live.approvals : metricValue(item.metrics || [], "Approvals") || "-";
      return {
        cells: [
          `
            <button class="table-row-button" type="button" data-select-agent="${escapeHtml(item.id || "")}" aria-pressed="${selected ? "true" : "false"}">
              <span class="table-primary"><strong>${escapeHtml(item.label || "Unknown")}</strong><span>${escapeHtml(buildAgentMeta(item))}</span></span>
            </button>
          `,
          badge(humanizeStatus(item.status || "unknown"), badgeClass(item.status)),
          escapeHtml(compactText(lane, 44)),
          escapeHtml(threads),
          escapeHtml(approvals),
          escapeHtml(buildAgentHealth(item)),
        ],
        attrs: `data-agent-id="${escapeHtml(item.id || "")}" class="${selected ? "is-selected" : ""}"`,
      };
    }),
    {
      empty: "No agent data yet.",
      colspan: 6,
      allowHtml: true,
    },
  );
}

function renderAgentRosterCards(agents) {
  if (!agentRosterGrid) return;
  agentRosterGrid.innerHTML = "";
  if (!agents.length) {
    agentRosterGrid.innerHTML = `
      <article class="summary-card">
        <span class="summary-card-title">Roster</span>
        <strong class="summary-card-value">No agents</strong>
        <p class="summary-card-support">The latest snapshot did not return any agent rows.</p>
      </article>
    `;
    return;
  }

  for (const item of agents) {
    const selected = item.id === currentAgentId;
    const threads = item.live && item.live.threads ? item.live.threads : metricValue(item.metrics || [], "Threads") || "0";
    const approvals = item.live && item.live.approvals ? item.live.approvals : metricValue(item.metrics || [], "Approvals") || "0";
    const route = ((item.controls || {}).lane)
      || ((item.live || {}).route)
      || metricValue(item.metrics || [], "Route")
      || metricValue(item.metrics || [], "Lane")
      || "No route";
    const handle = compactText(item.handle || "No binding", 32);
    const role = compactText(item.kind || "Agent", 24);
    const provider = compactText(((item.controls || {}).provider) || "Unassigned provider", 34);
    const workloadText = `${threads} threads · ${approvals} approvals`;
    const button = document.createElement("button");
    button.className = `summary-card summary-card-button${selected ? " is-selected" : ""}`;
    button.type = "button";
    button.dataset.selectAgent = item.id || "";
    button.setAttribute("aria-pressed", selected ? "true" : "false");
    button.innerHTML = `
      <span class="summary-card-title">${escapeHtml(item.label || "Agent")}</span>
      <strong class="summary-card-value">${escapeHtml(humanizeStatus(item.status || "unknown"))}</strong>
      <p class="summary-card-support">${escapeHtml(`${role} · ${handle}`)}</p>
      <span class="summary-card-meta">${escapeHtml(workloadText)}</span>
      <span class="summary-card-status">${escapeHtml(compactText(route, 40))}</span>
      <span class="summary-card-note">${escapeHtml(provider)}</span>
    `;
    agentRosterGrid.appendChild(button);
  }
}

function renderAgentEditor(selected, editor) {
  if (!selected) {
    agentEditorTitle.textContent = "No agent";
    agentEditorSummary.textContent = "No agent data is available in the latest snapshot.";
    if (agentOverviewBadges) agentOverviewBadges.innerHTML = "";
    agentLiveFacts.innerHTML = "";
    agentContextList.innerHTML = `<li class="mini-list-item"><span>No agent context.</span></li>`;
    agentLinkedFiles.innerHTML = `<li class="mini-list-item"><span>No linked files.</span></li>`;
    return;
  }

  const controls = selected.controls || {};
  const live = selected.live || {};
  agentEditorTitle.textContent = selected.label || "Unknown agent";
  agentEditorSummary.textContent = selected.summary || "No summary available.";
  if (agentOverviewBadges) {
    agentOverviewBadges.innerHTML = [
      badge(selected.kind || "Agent", "stale"),
      badge(humanizeStatus(selected.status || "unknown"), badgeClass(selected.status)),
      badge(buildAgentHealth(selected), badgeClass(classifyAgentHealthTone(selected))),
    ].join("");
  }

  renderFactGrid(agentLiveFacts, [
    { label: "Status", value: humanizeStatus(selected.status || "unknown") },
    { label: "Service", value: live.service || selected.service || "n/a" },
    { label: "Route", value: live.route || metricValue(selected.metrics || [], "Route") || metricValue(selected.metrics || [], "Lane") || "-" },
    { label: "Threads", value: live.threads || metricValue(selected.metrics || [], "Threads") || "-" },
    { label: "Approvals", value: live.approvals || metricValue(selected.metrics || [], "Approvals") || "-" },
    { label: "Health", value: buildAgentHealth(selected) },
  ]);

  renderMiniList(
    agentContextList,
    [
      { label: "Role", value: selected.kind || "Not recorded" },
      { label: "Handle", value: selected.handle || "Not recorded" },
      { label: "Last updated", value: formatOptionalTimestamp(controls.updated_at || "") },
      { label: "Control file", value: basenamePath((editor || {}).file || "") || "Not recorded" },
    ],
    "No agent context.",
  );

  renderMiniList(
    agentLinkedFiles,
    [
      { label: "Soul", value: controls.soul_file || "-" },
      { label: "Identity", value: controls.identity_file || "-" },
      { label: "Memory", value: controls.memory_file || "-" },
    ],
    "No linked files.",
  );

  agentDisplayName.value = controls.display_name || selected.label || "";
  agentProvider.value = controls.provider || "";
  agentLane.value = controls.lane || "";
  agentModeTarget.value = controls.mode_target || "";
  agentApprovalPolicy.value = controls.approval_policy || "";
  renderSelectOptions(agentSoulFile, (editor || {}).identity_files || [], controls.soul_file || "SOUL.md");
  renderSelectOptions(agentIdentityFile, (editor || {}).identity_files || [], controls.identity_file || "IDENTITY.md");
  renderSelectOptions(agentMemoryFile, (editor || {}).identity_files || [], controls.memory_file || "MEMORY.md");
  agentNotes.value = controls.notes || "";
}

function renderAgentAttention(agents) {
  agentAttentionList.innerHTML = "";
  const attentionItems = agents.filter(agentNeedsAttention);

  if (!attentionItems.length) {
    agentAttentionList.innerHTML = `
      <li class="attention-item">
        <strong>No agent needs review.</strong>
        <p class="attention-text">All current lanes look healthy right now.</p>
      </li>
    `;
    return;
  }

  for (const item of attentionItems) {
    const li = document.createElement("li");
    li.className = "attention-item";
    li.innerHTML = `
      <strong>${escapeHtml(item.label || "Unknown")}</strong>
      <p class="attention-text">${escapeHtml(describeAgentAttention(item))}</p>
      <button class="inline-action" type="button" data-select-agent="${escapeHtml(item.id || "")}">Review agent</button>
    `;
    agentAttentionList.appendChild(li);
  }
}

function renderAgentProfileSummary(selected, summary) {
  if (!selected) {
    renderFactGrid(agentSummaryGrid, [
      { label: "Roster", value: "No agents loaded" },
      { label: "Mode", value: String(summary.recommended_mode || "-").toUpperCase() },
      { label: "Active threads", value: String(summary.total_active_threads != null ? summary.total_active_threads : 0) },
      { label: "Codex daily ops", value: summary.codex_required_for_daily_ops ? "Required" : "Not required" },
    ]);
    return;
  }

  const controls = selected.controls || {};
  renderFactGrid(agentSummaryGrid, [
    { label: "Provider", value: controls.provider || "Not recorded" },
    { label: "Lane", value: controls.lane || "Not recorded" },
    { label: "Mode target", value: controls.mode_target || "Not recorded" },
    { label: "Approval policy", value: compactText(controls.approval_policy || "Not recorded", 120) },
    { label: "Last updated", value: formatOptionalTimestamp(controls.updated_at || "") },
  ]);
}

function renderAgentMetrics(metrics) {
  return metrics
    .slice(0, 3)
    .map(
      (item) => `
        <div>
          <dt>${escapeHtml(item.label || "")}</dt>
          <dd>${escapeHtml(item.value || "-")}</dd>
        </div>
      `,
    )
    .join("");
}

function buildAgentMeta(item) {
  const bits = [item.kind || ""];
  if (item.handle) bits.push(item.handle);
  return bits.filter(Boolean).join(" · ");
}

function metricValue(metrics, label) {
  const match = (metrics || []).find((item) => String(item.label || "").toLowerCase() === String(label || "").toLowerCase());
  return match ? String(match.value || "") : "";
}

function buildAgentHealth(item) {
  const flags = [];
  if (item.session_ready === false) flags.push("session missing");
  if (item.heartbeat_stale === true) flags.push("heartbeat stale");
  if (item.inbox_stale === true) flags.push("inbox stale");
  if (!flags.length) {
    const live = item.live || {};
    if (live.protocol && live.protocol !== "ready" && live.protocol !== "session ready") {
      flags.push(String(live.protocol));
    }
  }
  return flags.length ? titleCase(flags.join(", ")) : "Healthy";
}

function classifyAgentHealthTone(item) {
  return buildAgentHealth(item) === "Healthy" ? "active" : "pending";
}

function buildRuntimeWorkerMeta(item) {
  const bits = [];
  if (item.service) bits.push(`service ${item.service}`);
  if (item.recommended_mode) bits.push(`mode ${item.recommended_mode}`);
  return bits.join(" · ");
}

function agentNeedsAttention(item) {
  const status = String(item.status || "").toLowerCase();
  return (
    status === "blocked" ||
    status === "pending" ||
    item.session_ready === false ||
    item.heartbeat_stale === true ||
    item.inbox_stale === true
  );
}

function describeAgentAttention(item) {
  const issues = [];
  if (item.session_ready === false) issues.push("session missing");
  if (item.heartbeat_stale === true) issues.push("heartbeat stale");
  if (item.inbox_stale === true) issues.push("inbox stale");
  if (!issues.length) {
    const status = String(item.status || "").toLowerCase();
    if (status === "pending") issues.push("watch this lane");
    if (status === "blocked") issues.push("service or route needs review");
  }
  return titleCase(issues.join(", ") || "Needs review");
}

function buildDriftSummary(row) {
  const parts = [];
  if (row.review_reason) parts.push(titleCase(String(row.review_reason).replaceAll("_", " ")));
  if (row.owner_account) parts.push(`owner ${titleCase(row.owner_account)}`);
  if (row.decision_lane) parts.push(titleCase(String(row.decision_lane).replaceAll("_", " ")));
  if (row.review_priority) parts.push(`priority ${row.review_priority}`);
  return parts.join(" · ");
}

function buildRuntimeEventSummary(item) {
  const parts = [];
  if (item.actor_id) parts.push(`actor ${item.actor_id}`);
  if (item.thread_id) parts.push(`thread ${item.thread_id}`);
  if (item.created_at) parts.push(formatTimestamp(item.created_at));
  return parts.join(" · ");
}

function needsManualReview(row) {
  if (row && typeof row.manual_review === "boolean") return row.manual_review;
  const issue = String(row.issue_label || row.issue || "").toLowerCase();
  const status = String(row.status_label || row.status || "").toLowerCase();
  const lane = String(row.lane_label || row.lane || "").toLowerCase();
  return (
    status.includes("human approval") ||
    issue.includes("approval") ||
    lane.includes("review") ||
    lane.includes("guarded") ||
    lane.includes("hold")
  );
}

function isGreenLaneThread(row) {
  if (row && typeof row.green_lane === "boolean") return row.green_lane;
  const lane = String(row.lane_label || row.lane || "").toLowerCase();
  return lane.includes("green auto send");
}

function isWaitingOnKolThread(row) {
  if (row && typeof row.waiting_on_kol === "boolean") return row.waiting_on_kol;
  const status = String(row.status_label || row.status || "").toLowerCase();
  return status.includes("awaiting kol") || status.includes("waiting on kol");
}

function isHighPriorityThread(row) {
  const score = Number(row.priority_score != null ? row.priority_score : row.priority || 0);
  return score >= 80;
}

function hasEscalationPressure(row) {
  const summary = String(row.escalation_summary || "").toLowerCase();
  return Boolean(summary && summary !== "none");
}

function classifyWatchlistTone(row) {
  if (isHighPriorityThread(row)) return "blocked";
  if (needsManualReview(row)) return "blocked";
  if (isGreenLaneThread(row)) return "active";
  if (isWaitingOnKolThread(row)) return "pending";
  return "pending";
}

function describeWatchlistNextStep(row) {
  if (row.recommended_action) return row.recommended_action;
  if (needsManualReview(row)) return "Review by hand before the next send";
  if (isWaitingOnKolThread(row)) return "Wait for the KOL reply and monitor";
  if (isGreenLaneThread(row)) return "Safe to keep running in the current lane";
  return "Monitor this thread";
}

function describeWatchlistReason(row) {
  const issue = row.issue_label || titleCase(row.issue || "review");
  const status = row.status_label || titleCase(row.status || "unknown");
  const lane = row.lane_label || titleCase(row.lane || "unknown");
  return `${issue} · ${status} · ${lane}`;
}

function buildWatchlistInspectorSummary(row, context) {
  const nextStep = row.recommended_action || describeWatchlistNextStep(row);
  const nextOwner = row.next_action_owner || row.owner_label || titleCase(row.owner || "unknown");
  const due = formatDueLabel(row.next_action_due_at || "");
  if (context.manualReview) {
    return `${row.kol_username || row.label || "This thread"} is blocked behind a human decision. Next step: ${nextStep}. Next owner: ${nextOwner}. Due: ${due}.`;
  }
  if (context.waitingOnKol) {
    return `${row.kol_username || row.label || "This thread"} is waiting on the KOL, so the lane mainly needs monitoring. Next owner: ${nextOwner}. Due: ${due}.`;
  }
  if (context.greenLane) {
    return `${row.kol_username || row.label || "This thread"} is in a low-friction lane. Next step: ${nextStep}. Next owner: ${nextOwner}. Due: ${due}.`;
  }
  return `${row.kol_username || row.label || "This thread"} is on the board because it still deserves operator attention. Next step: ${nextStep}. Next owner: ${nextOwner}. Due: ${due}.`;
}

function buildWatchlistOperatorNote(row, context) {
  if (context.manualReview) {
    return `${context.approvals} approvals and ${context.escalations} escalations are open overall, so this row should stay in the manual review lane until someone clears it.`;
  }
  if (context.waitingOnKol) {
    return "No operator action is needed unless the thread state changes or the KOL replies.";
  }
  if (context.greenLane) {
    return "This lane is designed to keep moving unless a new approval or mismatch appears.";
  }
  return "Keep this thread visible and review again after the next monitoring pass.";
}

function buildApprovalCases(snapshot) {
  const reports = ((snapshot || {}).reports || {});
  const runtime = ((snapshot || {}).runtime || {}).detail || {};
  const shadowRows = ((runtime.shadow_review || {}).top_rows) || [];
  const boardRows = reports.board_rows || [];
  const cases = new Map();

  for (const row of boardRows) {
    if (!needsManualReview(row) && !isHighPriorityThread(row) && !hasEscalationPressure(row)) {
      continue;
    }
    const normalized = normalizeApprovalCase({
      ...row,
      source: row.source || "Monitoring report",
    });
    cases.set(approvalCaseKey(normalized), normalized);
  }

  for (const row of reports.watchlist || []) {
    const normalized = {
      label: row.label || row.kol_username || "Unknown",
      kol_username: row.kol_username || row.label || "Unknown",
      issue: row.issue || "review",
      owner: row.owner || "unknown",
      lane: row.lane || "unknown",
      status: row.status || "unknown",
      priority: Number(row.priority != null ? row.priority : 0),
      source: "Watchlist",
    };
    cases.set(approvalCaseKey(normalized), normalizeApprovalCase(normalized));
  }

  for (const row of shadowRows) {
    const normalized = {
      label: row.kol_username || "Unknown",
      kol_username: row.kol_username || "Unknown",
      issue: String(row.review_reason || "review").replaceAll("_", " "),
      owner: row.owner_account || "unknown",
      lane: String(row.decision_lane || "unknown").replaceAll("_", " "),
      status: String(row.status || "unknown").replaceAll("_", " "),
      priority: Number(row.review_priority != null ? row.review_priority : 0),
      source: "Shadow review",
    };
    const key = approvalCaseKey(normalized);
    const existing = cases.get(key);
    if (!existing) {
      cases.set(key, normalizeApprovalCase(normalized));
      continue;
    }
    cases.set(
      key,
      normalizeApprovalCase({
        ...existing,
        issue: normalized.issue || existing.issue,
        owner: normalized.owner || existing.owner,
        lane: normalized.lane || existing.lane,
        status: normalized.status || existing.status,
        priority: Math.max(Number(existing.priority || 0), normalized.priority || 0),
        source: "Watchlist + shadow review",
      }),
    );
  }

  return Array.from(cases.values()).sort((left, right) => {
    const priorityDelta = Number(right.priority || 0) - Number(left.priority || 0);
    if (priorityDelta !== 0) return priorityDelta;
    return String(left.kol_username || "").localeCompare(String(right.kol_username || ""));
  });
}

function normalizeApprovalCase(row) {
  const normalized = {
    ...row,
    label: row.label || row.kol_username || "Unknown",
    kol_username: row.kol_username || row.label || "Unknown",
    issue: row.issue || "review",
    issue_label: row.issue_label || titleCase(row.issue || "review"),
    owner: row.owner || "unknown",
    owner_label: row.owner_label || titleCase(row.owner || "unknown"),
    lane: row.lane || "unknown",
    lane_label: row.lane_label || titleCase(row.lane || "unknown"),
    status: row.status || "unknown",
    status_label: row.status_label || titleCase(row.status || "unknown"),
    priority: Number(row.priority != null ? row.priority : 0),
    priority_score: Number(row.priority_score != null ? row.priority_score : row.priority != null ? row.priority : 0),
    source: row.source || "Approval case",
  };
  normalized.manual_review = needsManualReview(normalized);
  normalized.high_priority = Number(normalized.priority_score || normalized.priority || 0) >= 85;
  return normalized;
}

function approvalCaseKey(row) {
  return watchlistRowKey(row);
}

function filterApprovalCases(rows) {
  return (rows || []).filter((row) => {
    if (approvalMode === "manual" && !row.manual_review) return false;
    if (approvalMode === "priority" && !row.high_priority) return false;
    if (approvalMode === "john" && String(row.owner || "").toLowerCase() !== "john") return false;
    if (approvalMode === "sora" && String(row.owner || "").toLowerCase() !== "sora") return false;
    if (!approvalFilterQuery) return true;
    const haystack = [
      row.kol_username,
      row.issue,
      row.issue_label,
      row.owner,
      row.owner_label,
      row.lane,
      row.lane_label,
      row.status,
      row.status_label,
      row.recommended_action,
      row.next_action_owner,
      row.offer_summary,
      row.blocker_summary,
      row.escalation_summary,
      row.operator_note,
      row.source,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(approvalFilterQuery);
  });
}

function classifyApprovalTone(row) {
  if (row.high_priority) return "blocked";
  if (row.manual_review) return "pending";
  if (isWaitingOnKolThread(row)) return "pending";
  return "active";
}

function describeApprovalCaseNextStep(row) {
  if (row.high_priority) return "Review this case before lower-priority approval work.";
  if (row.manual_review) return "A human decision is still needed before the next send.";
  if (isWaitingOnKolThread(row)) return "Keep monitoring until the KOL replies.";
  return "Inspect the linked report lane and decide whether it still needs manual review.";
}

function describeApprovalCaseReason(row) {
  return `${row.issue_label || titleCase(row.issue || "review")} · ${row.status_label || titleCase(row.status || "unknown")} · ${row.lane_label || titleCase(row.lane || "unknown")}`;
}

function buildApprovalInspectorSummary(row, approvals, escalations) {
  if (row.high_priority) {
    return `${row.kol_username || row.label || "This case"} is one of the highest-priority approval lanes in the current snapshot. ${pluralize(approvals, "approval")} and ${pluralize(escalations, "escalation")} remain open overall.`;
  }
  if (row.manual_review) {
    return `${row.kol_username || row.label || "This case"} is waiting on a human decision before the lane can continue.`;
  }
  return `${row.kol_username || row.label || "This case"} is part of the approval surface because it still affects the review queue.`;
}

function buildApprovalOperatorNote(row, approvals, escalations) {
  if (row.high_priority) {
    return `This case should be reviewed ahead of lower-priority lanes while ${approvals} approvals and ${escalations} escalations remain open.`;
  }
  if (row.manual_review) {
    return "Keep this thread in the manual-review lane until the decision is explicitly cleared.";
  }
  return "This case is lower pressure, so it mainly needs monitoring and a quick re-check on the next pass.";
}

function formatWatchlistNames(rows) {
  const names = (rows || [])
    .slice(0, 3)
    .map((row) => row.kol_username || row.label || "Unknown thread");
  if (!names.length) return "No threads";
  const remainder = Math.max(0, (rows || []).length - names.length);
  if (!remainder) return joinNaturalList(names);
  return `${names.join(", ")} + ${remainder} more`;
}

function describeThreadState(label) {
  const normalized = String(label || "").toLowerCase();
  if (normalized.includes("awaiting human approval")) return "These threads are blocked until someone approves the next move.";
  if (normalized.includes("awaiting kol decision")) return "These threads have reached the KOL and are waiting on a response.";
  if (normalized.includes("outreach sent")) return "These conversations have been opened and are now in follow-up mode.";
  if (normalized.includes("waiting on kol")) return "These threads are parked until the KOL replies.";
  if (normalized.includes("closed")) return "These conversations are no longer active in the current outreach loop.";
  return "This is one of the current conversation states in monitoring.";
}

function mapThreadStateToWatchlistMode(label) {
  const normalized = String(label || "").toLowerCase();
  if (normalized.includes("awaiting human approval")) return "manual";
  if (normalized.includes("awaiting kol")) return "waiting";
  return "";
}

function getReportBoardRows(snapshot) {
  return ((((snapshot || {}).reports) || {}).board_rows) || ((((snapshot || {}).reports) || {}).watchlist) || [];
}

function sortWatchlistRows(rows) {
  const items = [...(rows || [])];
  const compareText = (left, right) => String(left || "").localeCompare(String(right || ""), undefined, { sensitivity: "base" });
  const dueRank = (value) => {
    if (!value) return Number.POSITIVE_INFINITY;
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? Number.POSITIVE_INFINITY : parsed.getTime();
  };

  items.sort((left, right) => {
    if (reportWatchlistSort === "due") {
      const dueDelta = dueRank(left.next_action_due_at) - dueRank(right.next_action_due_at);
      if (dueDelta !== 0) return dueDelta;
    }

    if (reportWatchlistSort === "owner") {
      const ownerDelta = compareText(left.owner_label || left.owner, right.owner_label || right.owner);
      if (ownerDelta !== 0) return ownerDelta;
    }

    if (reportWatchlistSort === "state") {
      const stateDelta = compareText(left.status_label || left.status, right.status_label || right.status);
      if (stateDelta !== 0) return stateDelta;
    }

    if (reportWatchlistSort === "lane") {
      const laneDelta = compareText(left.lane_label || left.lane, right.lane_label || right.lane);
      if (laneDelta !== 0) return laneDelta;
    }

    const priorityDelta = Number(right.priority_score != null ? right.priority_score : right.priority || 0) - Number(left.priority_score != null ? left.priority_score : left.priority || 0);
    if (priorityDelta !== 0) return priorityDelta;

    const dueDelta = dueRank(left.next_action_due_at) - dueRank(right.next_action_due_at);
    if (dueDelta !== 0) return dueDelta;

    return compareText(left.kol_username || left.label, right.kol_username || right.label);
  });

  return items;
}

function formatPriorityScore(value) {
  const score = Number(value || 0);
  if (!score) return "0 · Low";
  if (score >= 90) return `${score} · Urgent`;
  if (score >= 70) return `${score} · Review soon`;
  if (score >= 30) return `${score} · Active`;
  return `${score} · Waiting`;
}

function formatDueLabel(value) {
  if (!value) return "No due time";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  const now = new Date();
  const deltaMs = parsed.getTime() - now.getTime();
  const dayMs = 24 * 60 * 60 * 1000;
  const sameDay =
    parsed.getFullYear() === now.getFullYear() &&
    parsed.getMonth() === now.getMonth() &&
    parsed.getDate() === now.getDate();

  if (deltaMs < 0) return `Overdue · ${formatTimestamp(value)}`;
  if (sameDay) {
    return `Today · ${parsed.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}`;
  }
  if (deltaMs <= dayMs) return `Due soon · ${formatTimestamp(value)}`;
  return formatTimestamp(value);
}

function routeFromHash(hash) {
  const route = String(hash || "")
    .replace(/^#/, "")
    .trim()
    .toLowerCase();
  if (route === "home") return "overview";
  if (route === "approvals") return "reports";
  return ["overview", "agents", "runtime", "reports", "integrations", "skills", "identity", "audit"].includes(route) ? route : "overview";
}

function navigateToRoute(route) {
  const normalized = routeFromHash(route);
  if (normalized === "reports") {
    currentReportsView = "board";
  }
  currentRoute = normalized;
  window.location.hash = normalized;
  renderRoute();
}

function routeDisplayName(route) {
  const labels = {
    overview: "Home",
    agents: "Agents",
    runtime: "Runtime",
    reports: "Reports",
    integrations: "Config",
    skills: "Skills",
    identity: "Identity",
    audit: "Audit",
  };
  return labels[route] || titleCase(route);
}

function buildHomeAttentionRows(snapshot, services) {
  const runtime = ((snapshot || {}).runtime || {}).detail || {};
  const monitoringSummary = (runtime.monitoring || {}).summary || {};
  const reports = (snapshot || {}).reports || {};
  const boardRows = getReportBoardRows(snapshot);
  const skillsSummary = ((snapshot || {}).skills || {}).summary || {};
  const rows = [];
  const inactiveServices = services.filter((item) => String(item.status || "").toLowerCase() !== "active");
  const approvals = Number(monitoringSummary.pending_approval_count || 0);
  const escalations = Number(monitoringSummary.escalation_count || 0);
  const skillsNeedingSetup = Number(skillsSummary.needs_setup || 0);
  const blockedThread = boardRows.find((row) => needsManualReview(row) || isHighPriorityThread(row));

  if (inactiveServices.length) {
    rows.push({
      title: `${pluralize(inactiveServices.length, "service")} need recovery`,
      summary: `${inactiveServices.map((item) => humanizeServiceName(item.name || "")).join(", ")} still need operator attention.`,
      tone: "blocked",
      route: "runtime",
      action: "Open runtime",
    });
  }

  if (approvals > 0) {
    rows.push({
      title: `${pluralize(approvals, "approval")} pending`,
      summary: "Manual review is still blocking the next move for these lanes.",
      tone: "pending",
      route: "reports",
      action: "Open reports",
    });
  }

  if (escalations > 0) {
    rows.push({
      title: `${pluralize(escalations, "escalation")} open`,
      summary: "These cases should stay visible until a decision lands.",
      tone: "blocked",
      route: "reports",
      action: "Open reports",
    });
  }

  if (blockedThread) {
    rows.push({
      title: "Blocked watchlist case",
      summary: compactText(`${blockedThread.kol_username || blockedThread.label || "A thread"} is sitting in ${blockedThread.lane_label || titleCase(blockedThread.lane || "review")} and still needs operator review.`, 180),
      tone: isHighPriorityThread(blockedThread) ? "blocked" : "pending",
      route: "reports",
      action: "Open case",
    });
  }

  if (skillsNeedingSetup > 0) {
    rows.push({
      title: `${pluralize(skillsNeedingSetup, "skill")} need setup`,
      summary: "The latest skill inventory still has setup work pending.",
      tone: "pending",
      route: "skills",
      action: "Open skills",
    });
  }

  return rows.slice(0, 4);
}

function countHomeAttention(snapshot, services) {
  return buildHomeAttentionRows(snapshot, services).length;
}

function badge(text, tone) {
  return `<span class="badge ${tone}">${escapeHtml(text)}</span>`;
}

function badgeClass(value) {
  const normalized = String(value || "").toLowerCase();
  if (["active", "healthy", "done", "ready"].includes(normalized)) return "active";
  if (["stale", "degraded"].includes(normalized)) return "stale";
  if (["invalid", "conflict"].includes(normalized)) return "invalid";
  if (["open", "in_progress", "pending", "shadow", "unknown"].includes(normalized)) return "pending";
  if (["blocked", "error", "failed", "missing"].includes(normalized)) return "blocked";
  return "pending";
}

function confirmAction(message) {
  return window.confirm(message);
}

function humanizeActor(value) {
  const normalized = String(value || "").trim().toLowerCase();
  if (!normalized) return "Unknown";
  if (normalized === "primeus") return "Primeus";
  if (normalized === "codex") return "Codex";
  return titleCase(normalized.replaceAll("_", " ").replaceAll("-", " "));
}

function actorInitial(value) {
  return humanizeActor(value).charAt(0).toUpperCase() || "?";
}

function humanizeTopic(value) {
  const raw = String(value || "").trim();
  const normalized = raw.toLowerCase().replaceAll("_", "-");
  const aliases = {
    "option-2-operationalization": "coordination rollout",
    "coordination-protocol": "coordination protocol",
    "worker-autonomy": "worker autonomy",
    "shadow-review": "shadow review",
  };
  return titleCase(aliases[normalized] || raw.replaceAll("_", " ").replaceAll("-", " ").trim() || "Unknown work");
}

function humanizeType(value) {
  return titleCase(String(value || "").replaceAll("_", " ").replaceAll("-", " ").trim() || "Note");
}

function humanizeStatus(value) {
  return titleCase(String(value || "").replaceAll("_", " ").replaceAll("-", " ").trim() || "Unknown");
}

function humanizeAction(value) {
  const raw = String(value || "").trim();
  const normalized = raw.toLowerCase();
  const aliases = {
    "room helpers deployed and dashboard snapshot path ready": "Room helpers are deployed. Snapshot sync is ready.",
    "no action recorded.": "No action recorded.",
  };
  return aliases[normalized] || raw;
}

function humanizeServiceName(value) {
  return titleCase(
    String(value || "")
      .replace(/\.service$/i, "")
      .replace(/^tg-/i, "telegram-")
      .replaceAll("_", " ")
      .replaceAll("-", " ")
      .trim(),
  );
}

function titleCase(value) {
  return String(value || "")
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function pluralize(count, noun) {
  return `${count} ${noun}${count === 1 ? "" : "s"}`;
}

function joinNaturalList(items) {
  const values = (items || []).filter(Boolean);
  if (!values.length) return "No open items";
  if (values.length === 1) return values[0];
  if (values.length === 2) return `${values[0]} and ${values[1]}`;
  return `${values.slice(0, -1).join(", ")}, and ${values[values.length - 1]}`;
}

function formatTimestamp(value) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value || "-";
  return parsed.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatOptionalTimestamp(value) {
  return value ? formatTimestamp(value) : "Not recorded";
}

function formatRefreshIntervalLabel(value) {
  if (!value) return "manual";
  if (value < 60000) return `${Math.round(value / 1000)}s`;
  if (value % 60000 === 0) return `${Math.round(value / 60000)} min`;
  return `${Math.round(value / 1000)}s`;
}

function basenamePath(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  const parts = text.split("/").filter(Boolean);
  return parts[parts.length - 1] || text;
}

function describeSnapshotAge(value) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value || "-";
  const diffMs = Math.max(0, Date.now() - parsed.getTime());
  const diffMinutes = Math.floor(diffMs / 60000);
  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

function splitCoordinationMessage(value) {
  const text = compactText(value || "No message recorded.", 220);
  const match = text.match(/^(.+?[.!?])(?:\s+|$)(.*)$/);
  if (!match) {
    return { title: text, detail: "" };
  }
  return {
    title: match[1].trim(),
    detail: match[2].trim(),
  };
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function compactText(value, limit) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (text.length <= limit) return text;
  return `${text.slice(0, limit - 1).trimEnd()}…`;
}

function filterAgentRows(items) {
  if (!agentFilterQuery) return items;
  return items.filter((item) => {
    const controls = item.controls || {};
    const live = item.live || {};
    const haystack = [
      item.label,
      item.kind,
      item.handle,
      item.status,
      controls.provider,
      controls.lane,
      controls.mode_target,
      controls.approval_policy,
      live.route,
      live.protocol,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(agentFilterQuery);
  });
}

function getSelectedAgent(items) {
  return items.find((item) => item.id === currentAgentId) || items[0] || null;
}

function filterWatchlistRows(rows) {
  return rows.filter((row) => {
    if (reportWatchlistMode === "manual" && !needsManualReview(row)) return false;
    if (reportWatchlistMode === "priority" && !isHighPriorityThread(row)) return false;
    if (reportWatchlistMode === "green" && !isGreenLaneThread(row)) return false;
    if (reportWatchlistMode === "waiting" && !isWaitingOnKolThread(row)) return false;
    if (reportWatchlistMode === "john" && String(row.owner || "").toLowerCase() !== "john") return false;
    if (reportWatchlistMode === "sora" && String(row.owner || "").toLowerCase() !== "sora") return false;
    if (!reportWatchlistFilterQuery) return true;
    const haystack = [
      row.kol_username,
      row.label,
      row.issue,
      row.issue_label,
      row.owner,
      row.owner_label,
      row.lane,
      row.lane_label,
      row.status,
      row.status_label,
      row.recommended_action,
      row.next_action_owner,
      row.latest_inbound_message,
      row.latest_inbound_request,
      row.offer_summary,
      row.blocker_summary,
      row.escalation_summary,
      row.operator_note,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(reportWatchlistFilterQuery);
  });
}

function setActionStatus(message, tone = "pending") {
  actionStatus.hidden = false;
  actionStatus.className = `action-status tone-${tone}`;
  actionStatus.textContent = message;
}

function setControlDisabled(disabled) {
  refreshButton.disabled = disabled;
  restartGatewayButton.disabled = disabled;
  identityReloadButton.disabled = disabled;
  agentReloadButton.disabled = disabled;
  for (const element of document.querySelectorAll(".action-button, .tab-button, .control-form input, .control-form textarea, .control-form select, .control-form button")) {
    element.disabled = disabled;
  }
}

function renderBulletBlock(rows) {
  if (!rows.length) {
    return `<p class="agent-summary">No highlights yet.</p>`;
  }
  return `
    <ul class="mini-list mini-list--bullets">
      ${rows
        .slice(0, 5)
        .map((row) => `<li class="mini-list-item mini-list-item--full">${escapeHtml(row)}</li>`)
        .join("")}
    </ul>
  `;
}

function formatCountBadge(count, noun) {
  return `${count} ${noun}${count === 1 ? "" : "s"}`;
}

function sortRunsByGeneratedAt(runs) {
  return runs
    .slice()
    .sort((a, b) => new Date(b.generated_at || 0).getTime() - new Date(a.generated_at || 0).getTime());
}

applyAppearancePreferences();
configureAutoRefresh();

loadSnapshot()
  .then(render)
  .catch((error) => {
    console.error(error);
    setAppBarHeader({
      headline: "Snapshot could not be loaded.",
      subline: compactText(error.message, 80),
    });
    if (homeSystemSummary) {
      homeSystemSummary.textContent = error.message;
    }
    snapshotTs.textContent = "Unavailable";
    roomFeed.innerHTML = `<article class="room-item"><p class="room-text">${escapeHtml(compactText(error.message, 170))}</p></article>`;
  });
