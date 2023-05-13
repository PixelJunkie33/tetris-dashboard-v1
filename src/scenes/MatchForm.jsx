import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import { useState, useEffect, useId } from "react";

const MatchForm = ({ data, onUpdateMatches, id, onUpdateId }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [matches, setMatches] = useState(data);
  const [text, setText] = useState("");

  const getRecord = (values) => {
    let win = 0;
    let loss = 0;
    for (let i = 1; i <= 5; i++) {
      if (values[`game${i}win`] === "W") {
        win += 1;
      } else if (values[`game${i}win`] === "L") {
        loss += 1;
      }
    }
    const result = win > loss ? "W" : "L"
    return [win + "-" + loss, result]
  }

  const handleFormSubmit = (values) => {
    const [record, result] = getRecord(values)
    const matchId = id? id : 0
    const matchValues = { ...values, id: matchId, record: record, result: result };
    matchValues.date = matchValues.date.replace(/-/g, '/')
    let matchData = matches ? [...matches] : [];

    matchData.push(matchValues);
    setMatches(matchData);
    setText("Added new match.");
    onUpdateId(matchId + 1)
  };

  useEffect(() => {
    onUpdateMatches(matches);
  }, [matches]);

  return (
    <Box m="20px">
      <Header title="MATCH FORM" subtitle="Add a match" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(6, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 6" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.date}
                name="date"
                error={!!touched.date && !!errors.date}
                helperText={touched.date && errors.date}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Time (XX:XX AM/PM)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.time}
                name="time"
                error={!!touched.time && !!errors.time}
                helperText={touched.time && errors.time}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Tier Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.tier}
                name="tier"
                error={!!touched.tier && !!errors.tier}
                helperText={touched.tier && errors.tier}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Seed"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.seed}
                name="seed"
                error={!!touched.seed && !!errors.seed}
                helperText={touched.seed && errors.seed}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Round Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.number}
                name="number"
                error={!!touched.number && !!errors.number}
                helperText={touched.number && errors.number}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Opponent"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.opponent}
                name="opponent"
                error={!!touched.opponent && !!errors.opponent}
                helperText={touched.opponent && errors.opponent}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Opponent's Seed"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.oppseed}
                name="oppseed"
                error={!!touched.oppseed && !!errors.oppseed}
                helperText={touched.oppseed && errors.oppseed}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="VOD Link"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.vod}
                name="vod"
                error={!!touched.vod && !!errors.vod}
                helperText={touched.vod && errors.vod}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Game 1 Score"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.game1}
                name="game1"
                error={!!touched.game1 && !!errors.game1}
                helperText={touched.game1 && errors.game1}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Game 1 Losing Score"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.game1losing}
                name="game1losing"
                error={!!touched.game1losing && !!errors.game1losing}
                helperText={touched.game1losing && errors.game1losing}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Game 1 Starting Level"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.game1lvl}
                name="game1lvl"
                error={!!touched.game1lvl && !!errors.game1lvl}
                helperText={touched.game1lvl && errors.game1lvl}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Game 1 Win or Loss (W or L)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.game1win}
                name="game1win"
                error={!!touched.game1win && !!errors.game1win}
                helperText={touched.game1win && errors.game1win}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Game 2 Score"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.game2}
                name="game2"
                error={!!touched.game2 && !!errors.game2}
                helperText={touched.game2 && errors.game2}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Game 2 Losing Score"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.game2losing}
                name="game2losing"
                error={!!touched.game2losing && !!errors.game2losing}
                helperText={touched.game2losing && errors.game2losing}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Game 2 Starting Level"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.game2lvl}
                name="game2lvl"
                error={!!touched.game2lvl && !!errors.game2lvl}
                helperText={touched.game2lvl && errors.game2lvl}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Game 2 Win or Loss (W or L)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.game2win}
                name="game2win"
                error={!!touched.game2win && !!errors.game2win}
                helperText={touched.game2win && errors.game2win}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Game 3 Score"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.game3}
                name="game3"
                error={!!touched.game3 && !!errors.game3}
                helperText={touched.game3 && errors.game3}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Game 3 Losing Score"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.game3losing}
                name="game3losing"
                error={!!touched.game3losing && !!errors.game3losing}
                helperText={touched.game3losing && errors.game3losing}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Game 3 Starting Level"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.game3lvl}
                name="game3lvl"
                error={!!touched.game3lvl && !!errors.game3lvl}
                helperText={touched.game3lvl && errors.game3lvl}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Game 3 Win or Loss (W or L)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.game3win}
                name="game3win"
                error={!!touched.game3win && !!errors.game3win}
                helperText={touched.game3win && errors.game3win}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Game 4 Score"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.game4}
                name="game4"
                error={!!touched.game4 && !!errors.game4}
                helperText={touched.game4 && errors.game4}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Game 4 Losing Score"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.game4losing}
                name="game4losing"
                error={!!touched.game4losing && !!errors.game4losing}
                helperText={touched.game4losing && errors.game4losing}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Game 4 Starting Level"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.game4lvl}
                name="game4lvl"
                error={!!touched.game4lvl && !!errors.game4lvl}
                helperText={touched.game4lvl && errors.game4lvl}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Game 4 Win or Loss (W or L)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.game4win}
                name="game4win"
                error={!!touched.game4win && !!errors.game4win}
                helperText={touched.game4win && errors.game4win}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Game 5 Score"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.game5}
                name="game5"
                error={!!touched.game5 && !!errors.game5}
                helperText={touched.game5 && errors.game5}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Game 5 Losing Score"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.game5losing}
                name="game5losing"
                error={!!touched.game5losing && !!errors.game5losing}
                helperText={touched.game5losing && errors.game5losing}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Game 5 Starting Level"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.game5lvl}
                name="game5lvl"
                error={!!touched.game5lvl && !!errors.game5lvl}
                helperText={touched.game5lvl && errors.game5lvl}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Game 5 Win or Loss (W or L)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.game5win}
                name="game5win"
                error={!!touched.game5win && !!errors.game5win}
                helperText={touched.game5win && errors.game5win}
                sx={{ gridColumn: "span 1" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Add New Match
              </Button>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Typography variant="h5" color="secondary">
                {text}
              </Typography>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  date: yup.date().required(),
  time: yup.string().required(),
  tier: yup.number().required(),
  seed: yup.number().required(),
  number: yup.number().required(),
  opponent: yup.string().required(),
  oppseed: yup.number().required(),
  vod: yup.string(),
  game1: yup.number(),
  game1losing: yup.number(),
  game1lvl: yup.number(),
  game1win: yup.string().required(),
  game2: yup.number(),
  game2losing: yup.number(),
  game2lvl: yup.number(),
  game2win: yup.string().required(),
  game3: yup.number(),
  game3losing: yup.number(),
  game3lvl: yup.number(),
  game3win: yup.string().required(),
  game4: yup.number(),
  game4losing: yup.number(),
  game4lvl: yup.number(),
  game4win: yup.string(),
  game5: yup.number(),
  game5losing: yup.number(),
  game5lvl: yup.number(),
  game5win: yup.string(),
});
const initialValues = {
  date: "",
  time: "",
  tier: "",
  seed: "",
  number: "",
  opponent: "",
  oppseed: "",
  vod: "",
  game1: "",
  game1losing: "",
  game1win: "",
  game1lvl: "",
  game2: "",
  game2losing: "",
  game2win: "",
  game2lvl: "",
  game3: "",
  game3losing: "",
  game3win: "",
  game3lvl: "",
  game4: "",
  game4losing: "",
  game4win: "",
  game4lvl: "",
  game5: "",
  game5losing: "",
  game5win: "",
  game5lvl: "",
};

export default MatchForm;
