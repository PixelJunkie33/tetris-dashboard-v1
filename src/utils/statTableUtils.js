import { getSessionInfo } from "./utils";

export function getPBHistory(games) {
  const pbs = [];
  let num = 0;
  for (let i = 0; i < games.length; i++) {
    for (let j = 0; j < games[i].pb_type.length; j++) {
      pbs.push({
        id: games[i].id,
        num: num,
        col_1: games[i].pb_type[j],
        col_2: new Date(games[i].datetime).toLocaleDateString(),
        col_3: games[i].pb_val[j].toLocaleString(),
      });
      num += 1;
    }
  }
  return pbs;
}

export function getRecentGames(games) {
  const recent = [];
  let num = 0;
  games.forEach((game) => {
    recent.push({
      id: game.id,
      num: num,
      col_1: new Date(game.datetime).toLocaleTimeString("en", {
        timeStyle: "short",
      }),
      col_2: new Date(game.datetime).toLocaleDateString(),
      col_3: game.score.toLocaleString(),
    });
    num += 1;
  });
  return recent;
}

export function getSessionInfoTable(games, table) {
  let num = 0;
  const col = [];
  const sessionInfo = getSessionInfo(games);
  let index = -1;
  switch (table) {
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

  for (let i = 0; i < sessionInfo[0].length; i++) {
    col.push({
      num: num,
      col_1: "Session " + sessionInfo[0][i],
      col_2: new Date(sessionInfo[1][i]).toLocaleDateString(),
      col_3: Math.round(sessionInfo[index][i]).toLocaleString(),
    });
    num += 1;
  }
  return col;
}
