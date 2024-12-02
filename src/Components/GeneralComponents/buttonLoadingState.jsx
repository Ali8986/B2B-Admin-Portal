import React from "react";
import { Button, CircularProgress } from "@mui/material";

const LoadingButton = ({ isLoading, children, ...props }) => {
  return (
    <Button
      {...props}
      fullWidth
      className="Loading-BTN mt-1"
      startIcon={isLoading ? <CircularProgress size={15} /> : null}
      disabled={isLoading}
    >
      {children}
    </Button>
  );
};

export default LoadingButton;
