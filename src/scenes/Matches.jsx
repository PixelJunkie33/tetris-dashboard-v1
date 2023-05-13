import { Box, IconButton, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import LaunchOutlinedIcon from "@mui/icons-material/LaunchOutlined";
import Header from "../components/Header";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useState } from "react";
import { Link } from "react-router-dom";

const Matches = ({ matches, onUpdateMatches }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectionModel, setSelectionModel] = useState([]);

  function handleDelete() {
    const filteredGames = matches.filter(
      (match) => !selectionModel.includes(match.id)
    );
    onUpdateMatches(filteredGames);
  }

  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    {
      field: "date",
      headerName: "Date",
      type: "dateTime",
      minWidth: 120,
      flex: 1,
      valueGetter: ({ value }) =>
        value && new Date(value).toLocaleDateString("en-US", options),
    },
    {
      field: "time",
      headerName: "Start Time",
      minWidth: 70,
      flex: 1,
    },
    {
      field: "tier",
      headerName: "Tier",
      type: "number",
      headerAlign: "left",
      align: "left",
      minWidth: 55,
      flex: 1,
    },
    {
      field: "seed",
      headerName: "Seed",
      type: "number",
      headerAlign: "left",
      align: "left",
      minWidth: 55,
      flex: 1,
    },
    {
      field: "opponent",
      headerName: "Opponent",
      minWidth: 130,
      flex: 1,
    },
    {
      field: "oppseed",
      headerName: "Opponent Seed",
      type: "number",
      headerAlign: "left",
      align: "left",
      minWidth: 95,
      flex: 1,
    },
    {
      field: "result",
      headerName: "Result",
      minWidth: 55,
      flex: 1,
    },
    {
      field: "record",
      headerName: "Record",
      minWidth: 55,
      flex: 1,
    },
    {
      field: "vod",
      headerName: "Replay",
      minWidth: 55,
      flex: 1,
      renderCell: ({ row: { vod } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            borderRadius="4px"
          >
            <a
              href={vod}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: colors.greenAccent[200] }}
            >
              <LaunchOutlinedIcon />
            </a>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" alignItems="center">
        <Header title="Matches" subtitle="Manage Matches" />
        <Box display="flex" marginLeft={"auto"}>
          <Link to={"/matchform"}>
            <IconButton>
              <AddOutlinedIcon />
            </IconButton>
          </Link>
          <IconButton onClick={handleDelete}>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        height="70vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={matches || []}
          columns={columns}
          onSelectionModelChange={setSelectionModel}
          selectionModel={selectionModel}
          initialState={{
            sorting: {
              sortModel: [{ field: "id", sort: "desc" }],
            },
          }}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Matches;
