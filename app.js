const sports = [
  "Alpine Skiing",
  "Biathlon",
  "Bobsleigh",
  "Cross-Country Skiing",
  "Curling",
  "Figure Skating",
  "Freestyle Skiing",
  "Ice Hockey",
  "Luge",
  "Nordic Combined",
  "Short Track Speed Skating",
  "Skeleton",
  "Ski Jumping",
  "Snowboarding",
  "Speed Skating",
  "Ski Mountaineering"
];

const countries = [
  "USA",
  "Canada",
  "China",
  "Japan",
  "South Korea",
  "Germany",
  "Austria",
  "Switzerland",
  "Norway",
  "Sweden",
  "Finland",
  "France",
  "Italy",
  "Netherlands",
  "Great Britain",
  "Czech Republic",
  "Slovakia",
  "Slovenia",
  "Poland",
  "Latvia",
  "Estonia",
  "Lithuania",
  "Ukraine",
  "Australia",
  "New Zealand",
  "Spain",
  "Hungary",
  "Belgium",
  "Denmark",
  "Bulgaria",
  "Romania",
  "Turkey",
  "Kazakhstan",
  "INA",
  "Croatia"
];

const medalData = {
  2022: {
    "Alpine Skiing": {
      Switzerland: { gold: 6, silver: 2, bronze: 5 },
      Austria: { gold: 2, silver: 5, bronze: 2 },
      Norway: { gold: 2, silver: 1, bronze: 1 },
      France: { gold: 0, silver: 2, bronze: 1 },
      USA: { gold: 1, silver: 0, bronze: 1 }
    },
    Biathlon: {
      Norway: { gold: 5, silver: 3, bronze: 2 },
      France: { gold: 1, silver: 3, bronze: 4 },
      Sweden: { gold: 2, silver: 1, bronze: 0 },
      Germany: { gold: 0, silver: 2, bronze: 1 }
    },
    Bobsleigh: {
      Germany: { gold: 3, silver: 2, bronze: 0 },
      USA: { gold: 0, silver: 1, bronze: 2 },
      Canada: { gold: 0, silver: 1, bronze: 1 },
      Great Britain: { gold: 0, silver: 0, bronze: 1 }
    },
    "Cross-Country Skiing": {
      Norway: { gold: 6, silver: 4, bronze: 2 },
      INA: { gold: 4, silver: 4, bronze: 5 },
      Sweden: { gold: 2, silver: 1, bronze: 3 },
      Finland: { gold: 0, silver: 1, bronze: 2 }
    },
    Curling: {
      Sweden: { gold: 1, silver: 1, bronze: 1 },
      Great Britain: { gold: 1, silver: 0, bronze: 0 },
      Canada: { gold: 0, silver: 1, bronze: 1 },
      Norway: { gold: 0, silver: 0, bronze: 1 }
    },
    "Figure Skating": {
      USA: { gold: 1, silver: 1, bronze: 2 },
      Japan: { gold: 1, silver: 0, bronze: 1 },
      China: { gold: 1, silver: 0, bronze: 0 },
      INA: { gold: 2, silver: 2, bronze: 2 }
    },
    "Freestyle Skiing": {
      China: { gold: 2, silver: 1, bronze: 2 },
      USA: { gold: 3, silver: 1, bronze: 3 },
      Sweden: { gold: 2, silver: 0, bronze: 0 },
      Canada: { gold: 1, silver: 2, bronze: 1 }
    },
    "Ice Hockey": {
      Finland: { gold: 1, silver: 0, bronze: 0 },
      Canada: { gold: 1, silver: 1, bronze: 0 },
      USA: { gold: 0, silver: 0, bronze: 1 },
      Switzerland: { gold: 0, silver: 1, bronze: 0 }
    },
    Luge: {
      Germany: { gold: 4, silver: 3, bronze: 0 },
      Austria: { gold: 1, silver: 0, bronze: 0 },
      Latvia: { gold: 0, silver: 0, bronze: 2 },
      USA: { gold: 0, silver: 0, bronze: 0 }
    },
    "Nordic Combined": {
      Germany: { gold: 2, silver: 1, bronze: 1 },
      Norway: { gold: 1, silver: 1, bronze: 1 },
      Austria: { gold: 0, silver: 1, bronze: 2 }
    },
    "Short Track Speed Skating": {
      China: { gold: 2, silver: 1, bronze: 1 },
      South Korea: { gold: 1, silver: 2, bronze: 0 },
      Canada: { gold: 0, silver: 1, bronze: 1 },
      Netherlands: { gold: 0, silver: 1, bronze: 0 }
    },
    Skeleton: {
      Germany: { gold: 1, silver: 1, bronze: 0 },
      Great Britain: { gold: 1, silver: 0, bronze: 0 },
      Canada: { gold: 0, silver: 0, bronze: 1 }
    },
    "Ski Jumping": {
      Norway: { gold: 2, silver: 0, bronze: 1 },
      Japan: { gold: 1, silver: 0, bronze: 1 },
      Slovenia: { gold: 1, silver: 1, bronze: 2 },
      Austria: { gold: 0, silver: 2, bronze: 1 }
    },
    Snowboarding: {
      Austria: { gold: 2, silver: 0, bronze: 1 },
      USA: { gold: 1, silver: 2, bronze: 1 },
      Japan: { gold: 2, silver: 1, bronze: 1 },
      Canada: { gold: 0, silver: 1, bronze: 2 }
    },
    "Speed Skating": {
      Netherlands: { gold: 5, silver: 4, bronze: 2 },
      Norway: { gold: 2, silver: 1, bronze: 1 },
      USA: { gold: 1, silver: 0, bronze: 1 },
      Japan: { gold: 0, silver: 1, bronze: 1 }
    },
    "Ski Mountaineering": {
      France: { gold: 0, silver: 0, bronze: 0 }
    }
  },
  2026: {}
};

const STORAGE_KEY = "olympicsFantasyRosters";

const sportsGrid = document.getElementById("sports-grid");
const totalPointsEl = document.getElementById("total-points");
const totalGoldsEl = document.getElementById("total-golds");
const sportsCompleteEl = document.getElementById("sports-complete");
const resultsBody = document.getElementById("results-body");
const resultsHelper = document.getElementById("results-helper");
const yearButtons = document.querySelectorAll(".year-button");
const rosterNameInput = document.getElementById("roster-name");
const rosterSelect = document.getElementById("roster-select");
const rosterStatus = document.getElementById("roster-status");
const leaderboardBody = document.getElementById("leaderboard-body");

let selectedYear = 2022;
let currentRosterId = null;
const selections = new Map();

const yearLabels = {
  2022: "2022 results are loaded.",
  2026: "2026 is a preview. Points will populate as results are finalized."
};

const calculatePoints = (medals) => medals.gold * 3 + medals.silver * 2 + medals.bronze;

const getMedals = (sport, country) => {
  if (!sport || !country) return { gold: 0, silver: 0, bronze: 0 };
  const yearData = medalData[selectedYear] || {};
  const sportData = yearData[sport] || {};
  return sportData[country] || { gold: 0, silver: 0, bronze: 0 };
};

const getTopPerformers = (sport) => {
  const yearData = medalData[selectedYear] || {};
  const sportData = yearData[sport] || {};
  const entries = Object.entries(sportData).map(([country, medals]) => ({
    country,
    points: calculatePoints(medals)
  }));
  return entries.sort((a, b) => b.points - a.points).slice(0, 3);
};

const getStoredRosters = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveStoredRosters = (rosters) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rosters));
};

const setRosterStatus = (message) => {
  rosterStatus.textContent = message;
};

const initializeSports = () => {
  sportsGrid.innerHTML = "";
  sports.forEach((sport) => {
    const card = document.createElement("article");
    card.className = "sport-card";

    const title = document.createElement("h3");
    title.textContent = sport;

    const select = document.createElement("select");
    select.setAttribute("data-sport", sport);
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Select a country";
    select.appendChild(placeholder);

    countries.forEach((country) => {
      const option = document.createElement("option");
      option.value = country;
      option.textContent = country;
      select.appendChild(option);
    });

    const meta = document.createElement("div");
    meta.className = "sport-meta";
    meta.innerHTML = "<span>Points</span><span class=\"points\">0</span>";

    const hint = document.createElement("p");
    hint.className = "sport-hint";

    select.addEventListener("change", (event) => {
      selections.set(sport, event.target.value);
      enforceUniqueSelections();
      updateScores();
    });

    card.append(title, select, meta, hint);
    sportsGrid.appendChild(card);
  });
};

const enforceUniqueSelections = () => {
  const chosen = Array.from(selections.values()).filter(Boolean);
  const selects = sportsGrid.querySelectorAll("select");

  selects.forEach((select) => {
    const currentSport = select.getAttribute("data-sport");
    const currentValue = selections.get(currentSport) || "";

    Array.from(select.options).forEach((option) => {
      if (!option.value) return;
      option.disabled = option.value !== currentValue && chosen.includes(option.value);
    });
  });
};

const updateSportHints = () => {
  const cards = sportsGrid.querySelectorAll(".sport-card");
  cards.forEach((card) => {
    const sport = card.querySelector("select").getAttribute("data-sport");
    const hint = card.querySelector(".sport-hint");
    const topPerformers = getTopPerformers(sport);

    if (!topPerformers.length) {
      hint.textContent = "No results yet for this sport.";
      return;
    }

    hint.textContent = `Top medals: ${topPerformers
      .map((entry) => `${entry.country} (${entry.points} pts)`) 
      .join(", ")}`;
  });
};

const updateScores = () => {
  let totalPoints = 0;
  let totalGolds = 0;
  let completed = 0;

  resultsBody.innerHTML = "";

  sports.forEach((sport) => {
    const country = selections.get(sport) || "";
    if (country) {
      completed += 1;
    }

    const medals = getMedals(sport, country);
    const points = calculatePoints(medals);
    totalPoints += points;
    totalGolds += medals.gold;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${sport}</td>
      <td>${country || "–"}</td>
      <td>${medals.gold}</td>
      <td>${medals.silver}</td>
      <td>${medals.bronze}</td>
      <td>${points}</td>
    `;
    resultsBody.appendChild(row);

    const card = Array.from(sportsGrid.children).find(
      (item) => item.querySelector("select").getAttribute("data-sport") === sport
    );
    if (card) {
      const pointsEl = card.querySelector(".points");
      pointsEl.textContent = points;
    }
  });

  totalPointsEl.textContent = totalPoints;
  totalGoldsEl.textContent = totalGolds;
  sportsCompleteEl.textContent = `${completed} / ${sports.length}`;

  updateLeaderboard();
};

const setYear = (year) => {
  selectedYear = year;
  yearButtons.forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.year) === year);
  });
  resultsHelper.textContent = yearLabels[year] || "";
  updateScores();
  updateSportHints();
};

const resetSelections = () => {
  selections.clear();
  const selects = sportsGrid.querySelectorAll("select");
  selects.forEach((select) => {
    select.value = "";
  });
  enforceUniqueSelections();
  updateScores();
};

const loadRoster = (roster) => {
  resetSelections();
  if (!roster) return;

  Object.entries(roster.selections || {}).forEach(([sport, country]) => {
    selections.set(sport, country);
  });

  const selects = sportsGrid.querySelectorAll("select");
  selects.forEach((select) => {
    const sport = select.getAttribute("data-sport");
    select.value = selections.get(sport) || "";
  });

  enforceUniqueSelections();
  updateScores();
};

const refreshRosterSelect = () => {
  const rosters = getStoredRosters();
  rosterSelect.innerHTML = "";

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Select saved roster";
  rosterSelect.appendChild(placeholder);

  rosters.forEach((roster) => {
    const option = document.createElement("option");
    option.value = roster.id;
    option.textContent = roster.name;
    rosterSelect.appendChild(option);
  });
};

const saveRoster = () => {
  const name = rosterNameInput.value.trim();
  if (!name) {
    setRosterStatus("Add a roster name before saving.");
    return;
  }

  const rosters = getStoredRosters();
  const existingIndex = rosters.findIndex((roster) => roster.name.toLowerCase() === name.toLowerCase());
  const rosterData = {
    id: existingIndex >= 0 ? rosters[existingIndex].id : crypto.randomUUID(),
    name,
    selections: Object.fromEntries(selections.entries())
  };

  if (existingIndex >= 0) {
    rosters[existingIndex] = rosterData;
  } else {
    rosters.push(rosterData);
  }

  saveStoredRosters(rosters);
  currentRosterId = rosterData.id;
  rosterSelect.value = rosterData.id;
  setRosterStatus(existingIndex >= 0 ? "Roster updated." : "Roster saved.");
  refreshRosterSelect();
  updateLeaderboard();
};

const deleteRoster = () => {
  if (!currentRosterId) {
    setRosterStatus("Select a roster to delete.");
    return;
  }

  const rosters = getStoredRosters().filter((roster) => roster.id !== currentRosterId);
  saveStoredRosters(rosters);
  currentRosterId = null;
  rosterSelect.value = "";
  rosterNameInput.value = "";
  setRosterStatus("Roster deleted.");
  refreshRosterSelect();
  updateLeaderboard();
};

const newRoster = () => {
  currentRosterId = null;
  rosterSelect.value = "";
  rosterNameInput.value = "";
  resetSelections();
  setRosterStatus("Started a new roster.");
};

const updateLeaderboard = () => {
  const rosters = getStoredRosters();
  leaderboardBody.innerHTML = "";

  rosters.forEach((roster) => {
    let totalPoints = 0;
    let totalGolds = 0;
    let completed = 0;

    sports.forEach((sport) => {
      const country = roster.selections?.[sport] || "";
      if (country) completed += 1;
      const medals = getMedals(sport, country);
      totalPoints += calculatePoints(medals);
      totalGolds += medals.gold;
    });

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${roster.name}</td>
      <td>${completed} / ${sports.length}</td>
      <td>${totalGolds}</td>
      <td>${totalPoints}</td>
    `;
    leaderboardBody.appendChild(row);
  });
};

const connectRosterActions = () => {
  document.getElementById("save-roster").addEventListener("click", saveRoster);
  document.getElementById("delete-roster").addEventListener("click", deleteRoster);
  document.getElementById("new-roster").addEventListener("click", newRoster);

  rosterSelect.addEventListener("change", (event) => {
    const rosters = getStoredRosters();
    const selected = rosters.find((roster) => roster.id === event.target.value);
    if (!selected) return;
    currentRosterId = selected.id;
    rosterNameInput.value = selected.name;
    setRosterStatus("Roster loaded.");
    loadRoster(selected);
  });
};

yearButtons.forEach((button) => {
  button.addEventListener("click", () => setYear(Number(button.dataset.year)));
});

initializeSports();
connectRosterActions();
refreshRosterSelect();
setYear(2022);
updateSportHints();
