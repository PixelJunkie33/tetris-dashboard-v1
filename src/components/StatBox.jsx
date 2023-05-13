import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const StatBox = ({ data, icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      gridColumn="span 2"
      gridRow="span 1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1.25rem 1rem"
      flex="1 1 100%"
      backgroundColor={colors.primary[400]}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" sx={{ color: colors.grey[100] }}>
          {data.title}
        </Typography>
        {icon}
      </Box>
      <Typography
        variant="h3"
        fontWeight="600"
        sx={{ color: colors.greenAccent[500] }}
      >
        {data.value}
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" gap="1rem">
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[500] }}
        >
          {data.increase}
        </Typography>
        <Typography>{data.description}</Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
