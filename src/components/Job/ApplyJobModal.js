import React, { useState } from "react";
import {
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  makeStyles,
  Button,
  IconButton,
  Input,
  TextField,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { format, set } from "date-fns";

const initialValidation = {
  firstname: false,
  lastname: false,
  phone: false,
  email: false,
  file: false,
};
const initialData = {
  firstname: "",
  lastname: "",
  phone: "",
  email: "",
  file: "",
};

export default (props) => {
  const { job, applyJob, applyJobModal, closeModal } = props;
  const [applyData, setApplyData] = useState(initialData);

  const [validation, setValidation] = useState(initialValidation);

  const fileHandle = async (e) => {
    formValidation(e, false);
    await setApplyData({ ...applyData, file: e.target.files[0] });
  };

  const inputHandle = (e) => {
    formValidation(e, false);
    setApplyData({ ...applyData, [e.target.name]: e.target.value });
  };

  const formValidation = (e, value) => {
    {
      setValidation({ ...validation, [e.target.name]: value });
    }
  };
  return (
    <Dialog open={applyJobModal} fullWidth>
      <form
        onInvalid={(e) => {
          setValidation(initialValidation);
          formValidation(e, true);
          console.log(e);
        }}
        onSubmit={(e) => {
          applyJob(applyData);
          e.preventDefault();
          setValidation(initialValidation);
          setApplyData(initialData);
        }}
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {job.title} @ {job.companyName}
            <IconButton onClick={closeModal}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                variant="filled"
                error={validation.firstname}
                type="text"
                onChange={inputHandle}
                name="firstname"
                value={applyData.firstname}
                autoComplete="off"
                placeholder="First Name*"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="filled"
                error={validation.lastname}
                onChange={inputHandle}
                type="text"
                name="lastname"
                value={applyData.lastname}
                autoComplete="off"
                placeholder="Last Name*"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="filled"
                error={validation.phone}
                onChange={inputHandle}
                type="tel"
                name="phone"
                value={applyData.phone}
                autoComplete="off"
                placeholder="Phone*"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="filled"
                error={validation.email}
                onChange={inputHandle}
                name="email"
                type="email"
                value={applyData.email}
                autoComplete="off"
                placeholder="E-mail*"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                variant="filled"
                type="file"
                name="file"
                error={validation.file}
                onChange={fileHandle}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
