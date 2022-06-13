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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import IconButton from "@mui/material/IconButton";

const theme = createTheme();

// Sign in functionality to be used later
export default function SignIn() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
  };

  return (
    <ThemeProvider theme={theme}>
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
        > {/* Help button placed on the left */}
        <IconButton size="medium" sx={{ color: "white", mt: 1}}>
          <HelpOutlineOutlinedIcon />
        </IconButton>
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
              borderColor: "orange",
              borderRadius: "16px",
              bgcolor: "white",
            }}
          >
            {/* Contact icon on top of username */}
            <Avatar sx={{ m: 1, bgcolor: "orange" }}>
              <AccountCircleRoundedIcon />
            </Avatar>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ p: 4, pt: 2 }}
            >
              {/* Textfield for username and password */}
              <TextField
                margin="normal"
                fullWidth
                id="Username"
                label="Username"
                name="Username"
                autoComplete="email"
                sx={{ pt: 0 }}
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                sx={{ pt: 0 }}
              />
              {/* Buttons that log in and a button that goes to the sign up page */}
              <Grid container columns={2} spacing={0}>
                <Grid>
                  <Button
                    size="small"
                    type="submit"
                    variant="contained"
                    sx={{ p: 2, m: 2, ml: 7.5 }}
                  >
                    Log In
                  </Button>
                </Grid>
                <Grid>
                  <Button
                    size="small"
                    type="submit"
                    variant="contained"
                    sx={{ p: 2, m: 2 }}
                  >
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}
