//packages imports
import React, { useState, useEffect } from "react";
import "./App.css";
import {
  ThemeProvider,
  Grid,
  CircularProgress,
  Box,
  Button,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";

//local imports
import theme from "./theme/theme";
import Header from "./components/Header/index";
import SearchBar from "./components/SearchBar";
import JobCard from "./components/Job/JobCard";
import NewJobModal from "./components/Job/NewJobModal";
import jobData from "./dummyDate";
import { firestore, app, firestorage } from "./firebase/config";
import ViewJobModal from "./components/Job/ViewJobModal";
import ApplyJobModal from "./components/Job/ApplyJobModal";

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newJobModal, setNewJobModal] = useState(false);
  const [customSearch, setCustomSearch] = useState(false);
  const [viewJob, setViewJob] = useState({});
  const [applyJobModal, setApplyJobModal] = useState(false);

  const fetchJobs = async () => {
    setCustomSearch(false);
    setLoading(true);
    const req = await firestore
      .collection("jobs")
      .orderBy("postedOn", "desc")
      .get();
    const tempJobs = req.docs.map((job) => ({
      ...job.data(),
      id: job.id,
      postedOn: job.data().postedOn.toDate(),
    }));
    setJobs(tempJobs);
    setLoading(false);
  };

  const fetchJobsCustom = async (jobSearch) => {
    setCustomSearch(true);
    setLoading(true);
    const req = await firestore
      .collection("jobs")
      .orderBy("postedOn", "desc")
      .where("location", "==", jobSearch.location)
      .where("type", "==", jobSearch.type)
      .get();
    const tempJobs = req.docs.map((job) => ({
      ...job.data(),
      id: job.id,
      postedOn: job.data().postedOn.toDate(),
    }));
    setJobs(tempJobs);
    setLoading(false);
  };

  const postJob = async (jobDetails) => {
    await firestore.collection("jobs").add({
      ...jobDetails,
      postedOn: app.firestore.FieldValue.serverTimestamp(),
    });
    fetchJobs();
  };

  const applyJob = async (applyDetails) => {
    await firestore
      .collection("applications")
      .add({
        ...applyDetails,
        file: applyDetails.file.name,
        job: viewJob.id,
      })
      .then((e) => {
        const storageRef = firestorage.ref();
        const fileRef = storageRef.child(e.f_.path.segments[1]);
        fileRef.put(applyDetails.file);
      })
      .then(() => {
        setApplyJobModal(false);
      });
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Header openNewJobModal={() => setNewJobModal(true)} />
      <ApplyJobModal
        job={viewJob}
        applyJob={applyJob}
        applyJobModal={applyJobModal}
        closeModal={() => setApplyJobModal(false)}
      />
      <NewJobModal
        newJobModal={newJobModal}
        postJob={postJob}
        closeNewJobModal={() => setNewJobModal(false)}
      />
      <ViewJobModal
        job={viewJob}
        closeModal={() => setViewJob({})}
        openApplyModal={() => setApplyJobModal(true)}
      />
      <Box mb={3}>
        <Grid container justify="center">
          <Grid item xs={10}>
            <SearchBar fetchJobsCustom={fetchJobsCustom} />
            {loading ? (
              <Box display="flex" justifyContent="center">
                <CircularProgress />
              </Box>
            ) : (
              <>
                {customSearch && (
                  <Box my={2} display="flex" justifyContent="flex-end">
                    <Button onClick={fetchJobs}>
                      <CloseIcon size={20} />
                      Custom Search
                    </Button>
                  </Box>
                )}
                {jobs.map((job) => (
                  <JobCard open={() => setViewJob(job)} key={job.id} {...job} />
                ))}
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;
