// Imports
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Theme, ThemeProvider } from "@mui/material/styles";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OutlinedInput from "@mui/material/OutlinedInput";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useLogin } from "../../api/LoginAPI";
import ErrorPopup, { RefObject } from "../ErrorPopup/ErrorPopup";
import INGTheme from "../../Theme";

export default function DetailGen({ theme }: { theme: Theme }) {
  // Make global state variables accessible
  const { userPassword, userName } = useSelector(
    (state: RootState) => state.userData
  );

  // Ref for error popup
  const ref = React.useRef<RefObject>(null);

  // Make Login API call available
  const login = useLogin(ref);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={INGTheme}>
      <div // ING background image
        style={{
          backgroundImage: "url(/backpic.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
        }}
      >
        {/* Help circle on the left */}
        <IconButton
          size="medium"
          onClick={handleClickOpen}
          sx={{
            color: "white",
            mr: 250,
            mt: 1,
            float: "left",
            marginLeft: 2,
            marginTop: 2,
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
            <Button onClick={handleClose}>Go back to Sign up</Button>
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
        <Box sx={{ height: "50vh" }}>
          <Container
            maxWidth="xs"
            sx={{
              pt: 10,
            }}
          >
            <Box
              sx={{
                pt: 0,
                marginBottom: 0,
                padding: "20px 30px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "16px",
                bgcolor: "white",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: theme.palette.primary.main }}>
                <AccountCircleRoundedIcon sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography
                variant="h6"
                align="center"
                color="text.secondary"
                fontWeight="fontWeightBold"
                sx={{
                  pt: 0,
                  marginTop: 2,
                  marginBottom: 3,
                }}
              >
                Your username and password were generated for you
              </Typography>
              {/* Uneditable text field */}
              <FormControl variant="standard">
                <InputLabel htmlFor="Username">Username</InputLabel>
                <OutlinedInput
                  id="username"
                  value={userName}
                  readOnly
                  sx={{ m: 2 }}
                  startAdornment={
                    <InputAdornment position="start">
                      <IconButton
                        onClick={() => navigator.clipboard.writeText(userName)}
                      >
                        <ContentCopyIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl variant="standard">
                <InputLabel htmlFor="Username">Password</InputLabel>
                <OutlinedInput
                  readOnly
                  sx={{ m: 2 }}
                  id="password"
                  value={userPassword}
                  startAdornment={
                    <InputAdornment position="start">
                      <IconButton
                        onClick={() =>
                          navigator.clipboard.writeText(userPassword)
                        }
                      >
                        <ContentCopyIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  p: 2,
                  m: 2,
                }}
                onClick={() =>
                  login.mutate({
                    username: userName,
                    password: userPassword,
                  })
                }
              >
                Finish and Log in
              </Button>
            </Box>
          </Container>
        </Box>
        <ErrorPopup ref={ref} />
      </div>
    </ThemeProvider>
  );
}
