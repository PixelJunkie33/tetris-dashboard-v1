import { Box, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const BarChart = ({ title, data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  if (data) {
    // const [labels, datasets] = getChartData(data, title);
    // for (let i = 0; i < datasets.length; i++) {
    //   datasets[i] = {
    //     ...datasets[i],
    //     backgroundColor: colors.greenAccent[500],
    //   };
    // }
    return (
        <Box
          gridColumn={data.span}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                {title}
              </Typography>
              <Tooltip
                title={data.text}
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
                  {data.value}
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
          <Box height="250px" m="-20px 0 0 0">
          <Bar
            data={{
              labels: data.labels,
              datasets: [
                {
                  data: data.data,
                  backgroundColor: colors.greenAccent[500],
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  callbacks: {
                    title: function (context) {
                      const xLabel = context[0].label;
                      if (title.includes("by Session")) {
                        return "Session " + xLabel;
                      }
                      const time = new Date(xLabel).toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "numeric",
                      });
                      return (
                        new Date(xLabel).toLocaleDateString([], {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }) +
                        " " +
                        time
                      );
                    },
                  },
                },
              },
              scales: {
                x: {
                  ticks: {
                    callback: function (val) {
                      val = this.getLabelForValue(val);
                      if (title.includes("by Date"))
                        val = new Date(val)
                          .toLocaleDateString()
                          .slice(0, -5)
                          .replace("/", "-");
                      return val;
                    },
                    color: colors.grey[100],
                  },
                },
                y: {
                  ticks: {
                    callback: function (val) {
                      val = this.getLabelForValue(val);
                      if (title.includes("Scores by")) {
                        if (!(val === "0")) {
                          val = val.toLocaleString().slice(0, -4) + "k";
                        }
                      }
                      return val;
                    },
                    color: colors.grey[100],
                  },
                },
              },
              layout: {
                padding: {
                  top: 50,
                  right: 30,
                  bottom: 30,
                  left: 30,
                },
              },
            }}
          />
        </Box>
      </Box>
    );
  }
};
export default BarChart;
