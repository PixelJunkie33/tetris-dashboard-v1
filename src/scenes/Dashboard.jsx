import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useState, useEffect } from "react";
import { filterGames } from "../utils/dashUtils";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import VideogameAssetOutlinedIcon from "@mui/icons-material/VideogameAssetOutlined";
import UpgradeOutlinedIcon from "@mui/icons-material/UpgradeOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import Header from "../components/Header";
import BarChart from "../components/BarChart";
import StatBox from "../components/StatBox";
import DropDown from "../components/DropDown";
import { getScoresByDate, getSessionInfoChart } from "../utils/chartUtils";
import StatTable from "../components/StatTable";
import {
  getAvgScore,
  getAvgTrt,
  getNumOfGames,
  getPB,
  getTransRate,
} from "../utils/statBoxUtils";
import {
  getPBHistory,
  getRecentGames,
  getSessionInfoTable,
} from "../utils/statTableUtils";

const Dashboard = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [lvl, setLvl] = useState(18);
  const [timeSpan, setTimeSpan] = useState("Last Year");
  const [games, setGames] = useState(filterGames(data, lvl, timeSpan));

  function handleTimeSpanChange(event) {
    setTimeSpan(event.target.value);
  }

  function handleLvlChange(event) {
    setLvl(event.target.value);
  }

  // update games when data gets changed through input bar
  useEffect(() => {
    setGames(filterGames(data, lvl, timeSpan));
  }, [data, lvl, timeSpan]);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" alignItems="center">
        <Header
          title="DASHBOARD"
          subtitle={"Level " + lvl}
          sx={{ marginRight: "auto" }}
        />
        <Box marginLeft="auto" marginRight="20px" minWidth="120px">
          <DropDown
            label="Level"
            value={lvl}
            onChange={handleLvlChange}
            items={[15, 18, 19]}
          />
        </Box>
        <Box minWidth="120px">
          <DropDown
            label="Time Span"
            value={timeSpan}
            onChange={handleTimeSpanChange}
            items={["Last Week", "Last Month", "Last 3 Months", "Last Year"]}
          />
        </Box>
        {/* <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              marginLeft: "auto",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Data
          </Button>
        </Box> */}
      </Box>

      {/* GRID & CHARTS */}

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <StatBox
          data={getAvgScore(data, lvl, timeSpan)}
          icon={
            <LeaderboardOutlinedIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          data={getNumOfGames(data, lvl, timeSpan)}
          icon={
            <VideogameAssetOutlinedIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          data={getAvgTrt(data, lvl, timeSpan)}
          icon={
            <LeaderboardOutlinedIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          data={getTransRate(data, lvl, timeSpan)}
          icon={
            <UpgradeOutlinedIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
        <StatTable title="Recent PBs" data={getPBHistory(games)} />
        <StatBox
          data={getPB(data, lvl, timeSpan, "Score")}
          icon={
            <WorkspacePremiumOutlinedIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          data={getPB(data, lvl, timeSpan, "Lines")}
          icon={
            <WorkspacePremiumOutlinedIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          data={getPB(data, lvl, timeSpan, "Trans")}
          icon={
            <WorkspacePremiumOutlinedIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          data={getPB(data, lvl, timeSpan, "Post")}
          icon={
            <WorkspacePremiumOutlinedIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />

        {/* ROW 2 */}
        <StatTable title={"Recent Games Played"} data={getRecentGames(games)} />
        <BarChart title={"Scores by Date"} data={getScoresByDate(games)} />

        {/* ROW 3 */}
        <BarChart
          title={"Number of Games by Session"}
          data={getSessionInfoChart(games, "number")}
        />
        <StatTable
          title={"Recent Number of Games By Session"}
          data={getSessionInfoTable(games, "number")}
        />

        {/* ROW 4 */}
        <BarChart
          title={"Average Score by Session"}
          data={getSessionInfoChart(games, "avg")}
        />
        <StatTable
          title={"Recent Average Scores By Session"}
          data={getSessionInfoTable(games, "avg")}
        />

        {/* ROW 5 */}
        <BarChart
          title={"Best Score by Session"}
          data={getSessionInfoChart(games, "best")}
        />
        <StatTable
          title={"Recent Best Scores By Session"}
          data={getSessionInfoTable(games, "best")}
        />

        {/* ROW 6 */}
        <BarChart
          title={"Best Game Number by Session"}
          data={getSessionInfoChart(games, "index")}
        />
        <StatTable
          title={"Recent Best Game Numbers By Session"}
          data={getSessionInfoTable(games, "index")}
        />
      </Box>
      <Box height="20px"></Box>
    </Box>
  );
};

export default Dashboard;
