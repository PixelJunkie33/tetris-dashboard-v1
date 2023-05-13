export function getAverage(arr) {
  let avg = 0;
  if (arr.length) {
    avg = arr.reduce((total, current) => total + current) / arr.length;
  }
  return avg;
}

export function groupBy(games, prop) {
  return games.reduce((acc, obj) => {
    const key = obj[prop];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

export function getChartData(games, title) {
  let labels;
  let datasets = [];
  switch (title) {
    default:
    case "Scores by Date":
      labels = games.map((x) => x.datetime);
      datasets.push({ data: games.map((x) => x.score) });
      break;
    case "Scores by Session":
      labels = Object.keys(groupBy(games, "session"));
      let gamesByNum = groupBy(games, "game num");
      gamesByNum = Object.keys(gamesByNum).map((key) => gamesByNum[key]);
      for (let i = 0; i < gamesByNum.length; i++) {
        datasets.push({ data: gamesByNum[i].map((x) => x.score) });
      }
      break;
  }
  return [labels, datasets];
}

export function getSessionInfo(games) {
  const gamesBySession = groupBy(games, "session");
  const sessions = Object.keys(gamesBySession);
  const dates = [];
  const numGamesBySession = [];
  const avgScores = [];
  const bestScores = [];
  const bestScoresIndex = [];
  sessions.forEach((session) => {
    const scores = gamesBySession[session].map((x) => x.score);
    avgScores.push(getAverage(scores));
    const best = Math.max(...scores);
    bestScores.push(best);
    bestScoresIndex.push(scores.indexOf(best) + 1);
    const numOfGamesPerSession = gamesBySession[session].length;
    numGamesBySession.push(numOfGamesPerSession);
    dates.push(gamesBySession[session][0].datetime);
  });
  return [sessions, dates, numGamesBySession, avgScores, bestScores, bestScoresIndex];
}
