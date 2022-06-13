import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OutlinedInput from "@mui/material/OutlinedInput";

const theme = createTheme();
export default function DetailGen() {
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          backgroundImage: "url(/backpic.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
          width: "100vw",
        }}
      >
        <IconButton size="medium" sx={{ color: "white", mr: 250, mt: 1 }}>
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
            <Avatar sx={{ m: 1, bgcolor: "orange" }}>
              <AccountCircleRoundedIcon />
            </Avatar>
            <Typography
              variant="h6"
              align="center"
              color="black"
              fontWeight="fontWeightBold"
              sx={{
                pt: 0,
              }}
            >
              Your username and password were generated for you
            </Typography>
            <FormControl variant="standard">
              <InputLabel htmlFor="Username">Username</InputLabel>
              <OutlinedInput
                id="username"
                inputProps={{ readOnly: true }}
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton>
                      <ContentCopyIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
              <InputLabel htmlFor="Username">Password</InputLabel>
              <OutlinedInput
                inputProps={{ readOnly: true }}
                id="username"
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton>
                      <ContentCopyIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <Button
              size="medium"
              type="submit"
              variant="contained"
              sx={{ p: 1, m: 2 }}
            >
              Finish and Log in
            </Button>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}
