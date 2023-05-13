import { getAverage, getSessionInfo } from "./utils";

export function getScoresByDate(games) {
  const dates = games.map((x) => x.datetime);
  const scores = games.map((x) => x.score);
  const avgScore = Math.round(getAverage(scores)).toLocaleString();

  return {
    span: "span 8",
    title: "Scores by Date",
    value: avgScore,
    text: "Average score during this period",
    labels: dates,
    data: scores,
  };
}

export function getSessionInfoChart(games, chart) {
  const sessionInfo = getSessionInfo(games);
  let index = -1;
  switch (chart) {
    default:
    case "number":
      index = 2;
      break;
    case "avg":
      index = 3;
      break;
    case "best":
      index = 4;
      break;
    case "index":
      index = 5;
      break;
  }
  return {
    span: "span 8",
    value: Math.round(getAverage(sessionInfo[index])).toLocaleString(),
    labels: sessionInfo[0],
    data: sessionInfo[index],
  };
}