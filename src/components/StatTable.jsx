import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const StatTable = ({ title, data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  if (data) {
    return (
      <Box
        gridColumn="span 4"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
        overflow="auto"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderBottom={`4px solid ${colors.primary[500]}`}
          colors={colors.grey[100]}
          p="15px"
        >
          <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
            {title}
          </Typography>
        </Box>
        {data
          .slice()
          .reverse()
          .map((game) => (
            <Box
              key={game.num}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {game.col_1}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>
                {game.col_2}
              </Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                {game.col_3}
              </Box>
            </Box>
          ))}
      </Box>
    );
  }
};

export default StatTable;
