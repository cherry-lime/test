// Imports
import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useLogin } from "../../api/LoginAPI/LoginAPI";
import ErrorPopup, { RefObject } from "../ErrorPopup/ErrorPopup";
import INGTheme from "../../Theme";
import LoginLayout from "./LoginLayout";

export default function DetailGen() {
  // Make global state variables accessible
  const { userPassword, userName } = useSelector(
    (state: RootState) => state.userData
  );

  // Ref for error popup
  const ref = React.useRef<RefObject>(null);

  // Make Login API call available
  const login = useLogin(ref);

  return (
    <ThemeProvider theme={INGTheme}>
      <LoginLayout>
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
                  onClick={() => navigator.clipboard.writeText(userPassword)}
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
      </LoginLayout>
      <ErrorPopup ref={ref} />
    </ThemeProvider>
  );
}
