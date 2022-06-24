// Imports
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useLoginTwo } from "../../app/loginAPI";

// Sign in functionality to be used later
export default function SignIn() {
  // Prevents the textfield to automatically refresh the page, after input
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  // Import login API calls
  const login = useLoginTwo();
  // Create statehooks to store the login details in the textfields
  const [inputUserName, setInputUserName] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      // ING colored image for background
      style={{
        backgroundImage: "url(/backpic.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      {" "}
      {/* Help button placed on the left */}
      <IconButton
        size="medium"
        onClick={handleClickOpen}
        sx={{ color: "white", mt: 1 }}
      >
        <HelpOutlineOutlinedIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Our Tool"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            TestING Advisor builds on an Excel-based tool by giving users
            automated feedback based on individual/team assessments, which
            previously had to be done manually by an assessor. The current tool
            has seven categories of assessment: Ready Work, Alignment, Testware,
            Test Environment, Mastery, Metrics and Reporting. First, login or
            signup by clicking the sign up button. This will take you to a
            choose role screen where you can pick your role as an Assessor or an
            Admin, then your username and password will be generated, you can
            use these from now on.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Go to Login</Button>
        </DialogActions>
      </Dialog>
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
      {/* Container is where all functionality exists */}
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          pt: 10,
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            pt: 0,
            marginBottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: 4,
            borderColor: "#FF6200",
            borderRadius: "16px",
            bgcolor: "white",
          }}
        >
          {/* Contact icon on top of username */}
          <Avatar sx={{ m: 1, bgcolor: "#FF6200" }}>
            <AccountCircleRoundedIcon />
          </Avatar>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ p: 4, pt: 1.5 }}
          >
            {/* Textfield for username and password */}
            <TextField
              margin="normal"
              fullWidth
              id="Username"
              label="Username"
              name="Username"
              autoComplete="email"
              variant="filled"
              sx={{ bgcolor: "#FFD6B1", borderColor: "#FF6200" }}
              value={inputUserName}
              onChange={(e) => {
                setInputUserName(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              variant="filled"
              value={inputPassword}
              sx={{ bgcolor: "#FFD6B1", borderColor: "#FF6200" }}
              onChange={(e) => {
                setInputPassword(e.target.value);
              }}
            />
            {/* Buttons that log in and a button that goes to the sign up page */}
            <Grid container columns={2} spacing={0}>
              <Grid>
                <Button
                  size="medium"
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    p: 2,
                    m: 2,
                    ml: 6,
                    color: "white",
                    borderColor: "#FF6200",
                    bgcolor: "#FF6200",
                  }}
                  style={{ fontWeight: "700" }}
                  onClick={() => {
                    login.mutate({
                      username: inputUserName,
                      password: inputPassword,
                    });
                  }}
                >
                  Log In
                </Button>
              </Grid>
              <Grid>
                <Link to="/signup">
                  <Button
                    sx={{
                      backgroundColor: "white",
                      p: 2,
                      m: 2,
                      color: "#FF6200",
                      borderColor: "#FF6200",
                    }}
                    style={{ fontWeight: "700" }}
                    variant="outlined"
                    size="medium"
                    type="submit"
                  >
                    Sign Up
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
