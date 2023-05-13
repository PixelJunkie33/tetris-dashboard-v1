import { Box, IconButton, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import LaunchOutlinedIcon from "@mui/icons-material/LaunchOutlined";
import Header from "../components/Header";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useState } from "react";
import { Link } from "react-router-dom";

const Games = ({ data, onUpdateData }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectionModel, setSelectionModel] = useState([]);

  function handleDelete() {
    const filteredGames = data.filter(
      (game) => !selectionModel.includes(game.id)
    );
    onUpdateData(filteredGames);
  }

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    {
      field: "datetime",
      headerName: "Date",
      type: "dateTime",
      minWidth: 130,
      flex: 1,
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: "start",
      headerName: "Start Level",
      type: "number",
      headerAlign: "left",
      align: "left",
      minWidth: 70,
      flex: 1,
    },
    {
      field: "end",
      headerName: "End Level",
      type: "number",
      headerAlign: "left",
      align: "left",
      minWidth: 65,
      flex: 1,
    },
    {
      field: "score",
      headerName: "Score",
      type: "number",
      headerAlign: "left",
      align: "left",
      minWidth: 70,
      flex: 1,
    },
    {
      field: "lines",
      headerName: "Lines",
      type: "number",
      headerAlign: "left",
      align: "left",
      minWidth: 55,
      flex: 1,
    },
    {
      field: "rate",
      headerName: "Tetris Rate",
      type: "number",
      headerAlign: "left",
      align: "left",
      minWidth: 70,
      flex: 1,
      valueFormatter: ({ value }) => {
        return `${value.toLocaleString()}%`;
      },
    },
    {
      field: "trans",
      headerName: "Transition Score",
      type: "number",
      headerAlign: "left",
      align: "left",
      minWidth: 100,
      flex: 1,
      valueFormatter: ({ value }) => {
        if (!value) {
          return "NA";
        }
        return value.toLocaleString();
      },
    },
    {
      field: "pseudo_29",
      headerName: "Psuedo 29",
      type: "number",
      headerAlign: "left",
      align: "left",
      minWidth: 70,
      flex: 1,
    },
    {
      field: "length",
      headerName: "Duration",
      minWidth: 60,
      flex: 1,
    },
    {
      field: "replay",
      headerName: "Replay",
      minWidth: 55,
      flex: 1,
      renderCell: ({ row: { replay } }) => {
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
              href={replay}
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
        <Header title="Games" subtitle="Manage Games" />
        <Box display="flex" marginLeft={"auto"}>
          <Link to={"/gameform"}>
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
          rows={data || []}
          columns={columns}
          onSelectionModelChange={setSelectionModel}
          selectionModel={selectionModel}
          initialState={{
            sorting: {
              sortModel: [{ field: "datetime", sort: "desc" }],
            },
          }}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Games;
