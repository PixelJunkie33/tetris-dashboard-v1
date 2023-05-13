import { getAverage } from "./utils";

let current;
let last;
export const timeSpans = {
  "Last Week": [6.048e8, "since last week"],
  "Last Month": [2.592e9, "since last month"],
  "Last 3 Months": [7.776e9, "since last 3 Months"],
  "Last Year": [3.154e10, "since last year"],
};

export function filterGames(games, lvl, timeSpan, date = new Date()) {
  if (!games) {
    games = [];
  }
  games = games.filter((x) => x.start === lvl);
  if (!(timeSpan === "Lifetime")) {
    games = games.filter(
      (x) =>
        date.getTime() > new Date(x.datetime).getTime() &&
        date.getTime() - new Date(x.datetime).getTime() <=
          timeSpans[timeSpan][0]
    );
  }
  return games;
}

// STAT BOX FUNCTIONS
export function getStatValue(data, stat, lvl, timeSpan) {
  let lastDate = new Date();
  lastDate.setTime(lastDate.getTime() - timeSpans[timeSpan][0]);

  const currentFiltered = filterGames(data, lvl, timeSpan);
  const lastFiltered = filterGames(data, lvl, timeSpan, lastDate);

  if (stat === "Avg Score") {
    const currentAvg = getAverage(currentFiltered.map((x) => x.score));
    current = Math.round(currentAvg).toLocaleString();

    const lastAvg = getAverage(lastFiltered.map((x) => x.score));
    last = Math.round(lastAvg).toLocaleString();
  } else if (stat === "Number of Games") {
    current = currentFiltered.length;
    last = lastFiltered.length;
  } else if (stat === "Transition Rate") {
    const currentTransGames = currentFiltered.filter(
      (x) => !(x.trans === null)
    );
    current = (
      (currentTransGames.length / currentFiltered.length) *
      100
    ).toFixed(1);
    const lastTransGames = lastFiltered.filter((x) => !(x.trans === null));
    last = ((lastTransGames.length / lastFiltered.length) * 100).toFixed(1);
  } else if (stat === "Avg Tetris Rate") {
    const currentAvg = getAverage(currentFiltered.map((x) => x.rate));
    current = currentAvg.toFixed(1);
    const lastAvg = getAverage(lastFiltered.map((x) => x.rate));
    last = lastAvg.toFixed(1);
  }
  return current;
}

export function getIncrease() {
  let progress = parseFloat(parseFloat(current) / parseFloat(last));
  if (isFinite(progress)) {
    if (progress > 1) {
      progress = (progress - 1) * 100;
      return "+" + progress.toFixed(1) + "%";
    } else {
      progress = (1 - progress) * 100;
      return "-" + progress.toFixed(1) + "%";
    }
  } else {
    return "NA";
  }
}

export function getDescription(timeSpan) {
  switch (timeSpan) {
    default:
    case "Last Week":
      return "Since last week";
    case "Last Month":
      return "Since last month";
    case "Last 3 Months":
      return "Since last 3 months";
    case "Last Year":
      return "Since last year";
    case "Lifetime":
      return "All time";
  }
}
