import React from "react";
import { Box, Typography, Button, Alert, Stack } from "@mui/material";
import { lunchContinue } from "../../DAL/Listings/dashbaord/dashboard";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const LunchAlertBanner = ({ lunchState }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleAgree = async () => {
    let postData = {
      want_lunch: true,
    };
    lunchState(true);
    const response = await lunchContinue(postData);
    if (response.code === 200) {
      enqueueSnackbar(response.message, { variant: "success" });
      navigate("/dashboard");
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };

  const handleDisagree = async () => {
    let postData = {
      want_lunch: false,
    };
    const response = await lunchContinue(postData);
    if (response.code === 200) {
      enqueueSnackbar(response.message, { variant: "success" });
      lunchState(false);
      navigate("/dashboard");
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };

  return (
    <Box
      sx={{
        width: "55%",
        padding: "0px 0px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Alert
        severity="warning"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          backgroundColor: "#fff8e1",
          color: "#000",
          boxShadow: 1,
          borderRadius: 0.5,
        }}
      >
        <div className="d-flex align-items-center flex-wrap col-sm-12 col-lg-12">
          <Typography sx={{ fontWeight: "bold", marginRight: "15px" }}>
            Do you want to continue your lunch?
          </Typography>
          <Stack direction="row" spacing={1} className="col-sm-6 col-lg-4">
            <Button
              onClick={handleAgree}
              variant="contained"
              color="primary"
              size="small"
            >
              Agree
            </Button>
            <Button
              onClick={handleDisagree}
              variant="outlined"
              color="secondary"
              size="small"
            >
              Disagree
            </Button>
          </Stack>
        </div>
      </Alert>
    </Box>
  );
};

export default LunchAlertBanner;
