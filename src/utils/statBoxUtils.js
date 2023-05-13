import { timeSpans, filterGames } from "./dashUtils";
import { getAverage } from "./utils";

export function getCurrentAndLastGames(data, lvl, timeSpan) {
  let lastDate = new Date();
  lastDate.setTime(lastDate.getTime() - timeSpans[timeSpan][0]);
  const currentGames = filterGames(data, lvl, timeSpan);
  const lastGames = filterGames(data, lvl, timeSpan, lastDate);
  return [currentGames, lastGames];
}

export function getIncrease(current, last) {
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

export function getAvgScore(data, lvl, timeSpan) {
  const [currentGames, lastGames] = getCurrentAndLastGames(data, lvl, timeSpan);
  const current = Math.round(
    getAverage(currentGames.map((x) => x.score))
  ).toLocaleString();
  const last = Math.round(
    getAverage(lastGames.map((x) => x.score))
  ).toLocaleString();
  const increase = getIncrease(current, last);
  return {
    title: "Avg Score",
    value: current,
    increase: increase,
    description: timeSpans[timeSpan][1],
  };
}

export function getNumOfGames(data, lvl, timeSpan) {
  const [currentGames, lastGames] = getCurrentAndLastGames(data, lvl, timeSpan);
  const current = currentGames.length;
  const last = lastGames.length;
  const increase = getIncrease(current, last);
  return {
    title: "Num of Games",
    value: current,
    increase: increase,
    description: timeSpans[timeSpan][1],
  };
}

export function getTransRate(data, lvl, timeSpan) {
  const [currentGames, lastGames] = getCurrentAndLastGames(data, lvl, timeSpan);
  let current = currentGames.filter((x) => !(x.trans === null));
  current = ((current.length / currentGames.length) * 100).toFixed(1);
  let last = lastGames.filter((x) => !(x.trans === null));
  last = ((last.length / lastGames.length) * 100).toFixed(1);
  const increase = getIncrease(current, last);
  return {
    title: "Trans Rate",
    value: current + "%",
    increase: increase,
    description: timeSpans[timeSpan][1],
  };
}

export function getAvgTrt(data, lvl, timeSpan) {
  const [currentGames, lastGames] = getCurrentAndLastGames(data, lvl, timeSpan);
  const current = getAverage(currentGames.map((x) => x.rate)).toFixed(1);
  const last = getAverage(lastGames.map((x) => x.rate)).toFixed(1);
  const increase = getIncrease(current, last);
  return {
    title: "Avg TRT",
    value: current + "%",
    increase: increase,
    description: timeSpans[timeSpan][1],
  };
}

export function getPB(data, lvl, timeSpan, type) {
  const [currentGames, lastGames] = getCurrentAndLastGames(data, lvl, timeSpan);
  const current = Math.max(
    ...currentGames.map((x) => x[type.toLowerCase()])
  ).toLocaleString();
  const last = Math.max(...lastGames.map((x) => x[type.toLowerCase()])).toLocaleString();
  const increase = getIncrease(current, last);
  return {
    title: type + " PB",
    value: current,
    increase: increase,
    description: timeSpans[timeSpan][1],
  };
}
