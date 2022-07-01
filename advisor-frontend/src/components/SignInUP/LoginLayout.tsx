// Imports
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircle";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import { ThemeProvider, useTheme } from "@mui/material";
import { useRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ErrorPopup, { RefObject } from "../ErrorPopup/ErrorPopup";
import INGTheme from "../../Theme";

// Sign in functionality to be used later
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Ref for error popup
  const ref = useRef<RefObject>(null);

  // State hook to keep track if the dialog is opened or not
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const theme = useTheme();

  // Login page that contains the login toolbox, a dialog with informationa and a signup button.
  return (
    <ThemeProvider theme={INGTheme}>
      <div
        // ING colored image for background
        style={{
          backgroundImage: "url(/backpic.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
        }}
      >
        {" "}
        {/* Help button placed on the left */}
        <IconButton
          size="medium"
          onClick={handleClickOpen}
          sx={{
            color: "white",
            float: "left",
          }}
        >
          <HelpOutlineOutlinedIcon />
        </IconButton>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Our Tool</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              TestING Advisor builds on an Excel-based tool by giving users
              automated feedback based on individual/team assessments, which
              previously had to be done manually by an assessor. The current
              tool has seven categories of assessment: Ready Work, Alignment,
              Testware, Test Environment, Mastery, Metrics and Reporting. First,
              login or signup by clicking the sign up button. This will take you
              to a choose role screen where you can pick your role as an
              Assessor or an Admin, then your username and password will be
              generated, you can use these from now on.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Go to Login</Button>
          </DialogActions>
        </Dialog>
        <Box sx={{ height: "25vh" }}>
          <Typography
            variant="h2"
            align="center"
            color="white"
            fontWeight="fontWeightBold"
            sx={{
              pt: 5,
            }}
          >
            TestING Advisor
          </Typography>
        </Box>
        {/* Container is where all functionality exists */}
        <Box sx={{ height: "25vh" }}>
          <Container
            component="main"
            maxWidth="xs"
            sx={{
              pt: 10,
            }}
          >
            <Box
              sx={{
                pt: 0,
                marginBottom: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "20px 5px 0",
                borderRadius: "16px",
                bgcolor: "white",
              }}
            >
              {/* Contact icon on top of username */}
              <Avatar sx={{ m: 1, bgcolor: theme.palette.primary.main }}>
                <AccountCircleRoundedIcon sx={{ fontSize: 40 }} />
              </Avatar>
              {children}
            </Box>
          </Container>
        </Box>
        <ErrorPopup ref={ref} />
      </div>
    </ThemeProvider>
  );
}
