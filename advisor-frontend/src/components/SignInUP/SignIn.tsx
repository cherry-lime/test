// Imports
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../api/LoginAPI/LoginAPI";
import ErrorPopup, { RefObject } from "../ErrorPopup/ErrorPopup";
import INGTheme from "../../Theme";
import LoginLayout from "./LoginLayout";

// Sign in functionality to be used later
export default function SignIn() {
  // Prevents the textfield to automatically refresh the page, after input
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  // Ref for error popup
  const ref = useRef<RefObject>(null);

  // Import login API calls
  const login = useLogin(ref);

  // Create statehooks to store the login details in the textfields
  const [inputUserName, setInputUserName] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  // Login page that contains the login toolbox, a dialog with informationa and a signup button.
  return (
    <ThemeProvider theme={INGTheme}>
      <LoginLayout>
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
            sx={{ bgcolor: INGTheme.palette.primary.light }}
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
            sx={{ bgcolor: INGTheme.palette.primary.light }}
            onChange={(e) => {
              setInputPassword(e.target.value);
            }}
          />
          {/* Buttons that log in and a button that goes to the sign up page */}
          <Grid container columns={2} spacing={0} sx={{ marginTop: 2 }}>
            <Grid>
              <Button
                size="medium"
                variant="contained"
                sx={{
                  p: 2,
                  m: 2,
                  ml: 6,
                }}
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
                    p: 2,
                    m: 2,
                  }}
                  variant="outlined"
                  size="medium"
                >
                  Sign Up
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </LoginLayout>
      <ErrorPopup ref={ref} />
    </ThemeProvider>
  );
}
