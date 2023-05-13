import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const ProgressCircle = ({ progress = "0.75", size = "40" }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let progressColor = colors.greenAccent[500];
  let circleColor = colors.blueAccent[500];
  if (progress > 1) {
    progress -= 1;
  } else {
    circleColor = colors.greenAccent[500];
    progressColor = colors.blueAccent[500];
  }
  const angle = progress * 360;
  return (
    <Box
      sx={{
        background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${circleColor} ${angle}deg 360deg),
            ${progressColor}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default ProgressCircle;
