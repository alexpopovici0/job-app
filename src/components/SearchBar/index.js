import React, { useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  Button,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";

const useStyle = makeStyles({
  wrapper: {
    backgroundColor: "#fff",
    display: "flex",
    boxShadow: "0px 1px 5px rgba(0,0,0,0.1)",
    borderRadius: "5px",
    "& > *": {
      flex: 1,
      height: "45px",
      margin: "8px",
    },
  },
});

export default (props) => {
  const { fetchJobsCustom } = props;
  const [loading, setLoading] = useState(false);
  const [jobSearch, setJobSearch] = useState({
    type: "Full time",
    location: "Remote",
  });
  const classes = useStyle();

  const handleChange = (e) => {
    e.persist();
    setJobSearch((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value,
    }));
  };
  const search = async () => {
    setLoading(true);
    await fetchJobsCustom(jobSearch);
    setLoading(false);
  };

  console.log(jobSearch);

  return (
    <Box p={2} mt={-5} mb={2} className={classes.wrapper}>
      <Select
        onChange={handleChange}
        value={jobSearch.type}
        name="type"
        disableUnderline
        variant="filled"
      >
        <MenuItem value="Full time">Full time</MenuItem>
        <MenuItem value="Part time">Part time</MenuItem>
        <MenuItem value="Contact">Contact</MenuItem>
      </Select>
      <Select
        name="location"
        onChange={handleChange}
        value={jobSearch.location}
        disableUnderline
        variant="filled"
      >
        <MenuItem value="Remote">Remote</MenuItem>
        <MenuItem value="In office">In-office</MenuItem>
      </Select>
      <Button
        disable={loading}
        variant="filled"
        variant="contained"
        color="primary"
        disableElevation
        onClick={search}
      >
        {loading ? <CircularProgress color="secondary" size={22} /> : "Search"}
      </Button>
    </Box>
  );
};
