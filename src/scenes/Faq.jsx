import { Box, useTheme } from "@mui/material";
import Header from "../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What is the purpose of this project?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The purpose of this project is to aid NES Tetris players in
            visualizing and analysizing their games by providing statistics in
            the form of graphs and tables. These can be viewed in the
            "Dashboard" page. The data can be filtered by level and timespan, to
            show improvements over time.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Where does the game Data come from?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The game stats that are pasted into the top left bar should be
            copied from your stats page from NESTrisChamps. All game details
            should be expanded before copying. Future development plans include
            fetching this data automatically.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Where can I view all the games I've played?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Games and all of their details can be viewed, modified, and filtered
            in the "Games Info" page.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Where can I view all the matches I've played?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Matches and all of their details can be viewed, modified and
            filtered in the "Matches Info" page. New Matches can be added in the
            "Match Form" page.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What is the purpose of the "Calendar" page?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Many NES Tetris players compete in the monthly Tetris tournament
            Classic Tetris Monthly (CTM). The Calendar allows players to
            schedule their matches or other Tetris-related events and view them
            all in a central location.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Box height="20px"></Box>
    </Box>
  );
};

export default FAQ;
