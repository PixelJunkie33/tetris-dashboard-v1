import { Box, IconButton, Button, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import AddchartOutlinedIcon from "@mui/icons-material/AddchartOutlined";

const Topbar = ({ onInputSubmit, onInputChange, onClickSample }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* INPUT BAR */}
      <Box display="flex">
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
        >
          <InputBase
            sx={{ ml: 2, flex: 1 }}
            placeholder="Update Game Data"
            onChange={(event) => {
              onInputChange(event.target.value);
            }}
          />
          <IconButton type="button" sx={{ p: 1 }} onClick={onInputSubmit}>
            <AddchartOutlinedIcon />
          </IconButton>
        </Box>
        <Button sx={{ ml: 2 }} type="submit" color="secondary" variant="contained" onClick={onClickSample}>
          Use Sample Data
        </Button>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
