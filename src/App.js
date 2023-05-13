import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";
import { parseInput } from "./utils/dataUtils";
import Topbar from "./scenes/Topbar";
import Sidebar from "./scenes/Sidebar";
import Dashboard from "./scenes/Dashboard";
import Games from "./scenes/Games";
import Matches from "./scenes/Matches";
import Calendar from "./scenes/Calendar";
import MatchForm from "./scenes/MatchForm";
import FAQ from "./scenes/Faq";
import { sampleDataGames, sampleDataMatches } from "./data/sampleData";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const [data, setData] = useLocalStorage("", "data");
  const [input, setInput] = useState("");

  const [matches, setMatches] = useLocalStorage("", "matches");
  const [matchId, setMatchId] = useLocalStorage("", "matchId");
  const [calendar, setCalendar] = useLocalStorage("", "calendar");

  function handleInputChange(input) {
    setInput(input);
  }
  function handleInputSubmit() {
    setData(parseInput(input, data));
  }

  function updateData(games) {
    setData(games);
  }

  function updateMatches(matchData) {
    setMatches(matchData);
  }

  function updateId(id) {
    setMatchId(id);
  }

  function updateCalendar(events) {
    setCalendar(events);
  }

  function handleClickSample() {
    setData(sampleDataGames);
    setMatches(sampleDataMatches);
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar
              setIsSidebar={setIsSidebar}
              onInputSubmit={handleInputSubmit}
              onInputChange={handleInputChange}
              onClickSample={handleClickSample}
            />
            <Routes>
              <Route path="/" element={<Dashboard data={data} />} />
              <Route
                path="/games"
                element={<Games data={data} onUpdateData={updateData} />}
              />
              <Route
                path="/matches"
                element={
                  <Matches matches={matches} onUpdateMatches={updateMatches} />
                }
              />
              <Route
                path="/matchform"
                element={
                  <MatchForm
                    data={matches}
                    onUpdateMatches={updateMatches}
                    id={matchId}
                    onUpdateId={updateId}
                  />
                }
              />
              <Route path="/faq" element={<FAQ />} />
              <Route
                path="/calendar"
                element={
                  <Calendar
                    calendar={calendar}
                    onUpdateCalendar={updateCalendar}
                  />
                }
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
