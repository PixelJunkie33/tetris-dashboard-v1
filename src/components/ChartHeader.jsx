import { Box, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

const ChartHeader = ({ title, value, text }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      mt="25px"
      p="0 30px"
      display="flex "
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
          {title}
        </Typography>
        <Tooltip
          title={text}
          componentsProps={{
            tooltip: {
              sx: {
                bgcolor: "common.black",
              },
            },
          }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            color={colors.greenAccent[500]}
          >
            {value}
          </Typography>
        </Tooltip>
      </Box>
      <Box>
        <IconButton>
          <DownloadOutlinedIcon
            sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChartHeader;
