export function parseInput(input, data) {
  const records = input
    .replace(/\s+/g, " ")
    .split("Actions ")[1]
    .slice(0, -4)
    .split(".ngf ");

  let games = [];

  records.forEach((record) => {
    let fields = record.split(" ");

    const game = getGame(fields);
    if (!containsGame(data, game)) {
      games.push(game);
    }
  });
  games.reverse();
  addPBs(data, games, 15);
  addPBs(data, games, 18);
  addPBs(data, games, 19);
  if (data) {
    games = data.concat(games);
  }
  addSessions(games);
  return games;
}

export function getGame(fields) {
  const id = parseInt(fields[12].slice(16, 22));
  return {
    datetime: fields[0],
    date: fields[0].slice(5, 10),
    start: parseInt(fields[1]),
    end: parseInt(fields[2]),
    score: parseInt(fields[3]),
    lines: parseInt(fields[4]),
    rate: parseFloat(fields[5]),
    num_droughts: parseInt(fields[6]),
    max_droughts: parseInt(fields[7]),
    das: parseFloat(fields[8]),
    length: fields[9],
    id: id,
    competition: fields[17],
    trans: fields[24] === "-" ? null : parseInt(fields[24]),
    clears: fields[26],
    pseudo_29: parseInt(fields[31]),
    pieces: fields[33],
    files: (fields[37] += ".ngf"),
    replay:
      "https://nestrischamps.herokuapp.com/replay/classic/" +
      id +
      "?bg=2&speed=2",
  };
}

export function containsGame(data, game) {
  let contained = false;
  if (data) {
    data.forEach((currentGame) => {
      if (currentGame.id === game.id) {
        contained = true;
        return;
      }
    });
  }
  if (contained) return true;
  return false;
}

export function addSessions(games) {
  let session = 1;
  let gameNum = 0;
  let old = null;

  for (let i = 0; i < games.length; i++) {
    const current = new Date(games[i].datetime);
    if (old) {
      if (current - old > 3.6e6) {
        session += 1;
        gameNum = 0;
      }
    }
    old = current;
    gameNum += 1;

    games[i] = {
      ...games[i],
      session: session,
      game_num: gameNum,
    };
  }
}

export function addPBs(data, games, lvl) {
  let filteredData = data ? data.filter((x) => x.start === lvl) : [];
  let filteredGames = games.filter((x) => x.start === lvl);
  let pbScore = data ? Math.max(...filteredData.map((x) => x.score)) : 0;
  let pbLines = data ? Math.max(...filteredData.map((x) => x.lines)) : 0;
  let pbTrans = data ? Math.max(...filteredData.map((x) => x.trans)) : 0;
  let pbPost = data ? Math.max(...filteredData.map((x) => x.post)) : 0;
  for (let i = 0; i < games.length; i++) {
    let pbType = [];
    let pbVal = [];
    let post = null;
    if (containsGame(filteredGames, games[i])) {
      if (games[i].score > pbScore) {
        pbScore = games[i].score;
        pbType.push("Score");
        pbVal.push(pbScore);
      }
      if (games[i].lines > pbLines) {
        pbLines = games[i].lines;
        pbType.push("Lines");
        pbVal.push(pbLines);
      }
      if (games[i].trans) {
        post = games[i].score - games[i].trans;
        if (games[i].trans > pbTrans) {
          pbTrans = games[i].trans;
          pbType.push("Trans");
          pbVal.push(pbTrans);
        }
        if (post > pbPost) {
          pbPost = post;
          pbType.push("Post");
          pbVal.push(pbPost);
        }
      }
      games[i] = {
        ...games[i],
        pb_type: pbType,
        pb_val: pbVal,
        post: pbPost,
      };
    }
  }
}
