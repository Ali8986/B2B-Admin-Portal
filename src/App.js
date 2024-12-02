import "bootstrap/dist/css/bootstrap.min.css";
import { SnackbarProvider, useSnackbar } from "notistack";
import Router from "./Routes";
import { IconButton, Slide } from "@mui/material";
import styled from "@emotion/styled/macro";
import ThemeProvider from "./Themes/index";
import { AppProvider } from "./Hooks/App_Context";
import { MaterialDesignContent } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import { UserProvider } from "./Hooks/adminUser";

function App() {
  const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
    "&.notistack-MuiContent-success": {
      backgroundColor: "#2D7738",
    },
    "&.notistack-MuiContent-error": {
      backgroundColor: "#970C0C",
    },
  }));

  const CloseButton = ({ snackbarKey }) => {
    const { closeSnackbar } = useSnackbar();
    return (
      <IconButton
        size="small"
        aria-label="close"
        className="Snackbar_Close_Btn"
        onClick={() => closeSnackbar(snackbarKey)} // Ensure the snackbarKey is passed here
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    );
  };

  return (
    <ThemeProvider>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        TransitionComponent={Slide}
        maxSnack={3}
        action={(snackbarKey) => <CloseButton snackbarKey={snackbarKey} />}
        Components={{
          success: StyledMaterialDesignContent,
          error: StyledMaterialDesignContent,
        }}
      >
        <UserProvider>
          <AppProvider>
            <div className="App">
              <Router />
            </div>
          </AppProvider>
        </UserProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
