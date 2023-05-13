import { groupBy } from "./chartUtilsTemp";
import { getAverage } from "./dashUtils";

export function getScoresByDate(games) {
  getAverage(games.map((game) => game.score));
}

export function getScoresBySession(games) {
  const gamesBySession = groupBy(games, "sessions");
  const sessions = Object.keys(gamesBySession);
  const avgsPerSession = [];
  sessions.forEach((session) => {
    const scoresPerSession = gamesBySession[session].map((x) => x.score);
    avgsPerSession.push(getAverage(scoresPerSession));
  });
  return getAverage(avgsPerSession);
}

export function getNumOfGames(games) {
  return games.length;
}

export function getBestScoresPerSession(games) {
  const gamesBySession = groupBy(games, "sessions");
  const sessions = Object.keys(gamesBySession);
  const bestScores = [];
  sessions.forEach((session) => {
    const scoresPerSession = gamesBySession[session].map((x) => x.score);
    bestScores.push(Math.max(scoresPerSession));
  });
  return Math.max(bestScores);
}
