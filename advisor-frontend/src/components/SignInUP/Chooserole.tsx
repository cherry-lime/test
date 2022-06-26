// Imports
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider, Theme } from "@mui/material/styles";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { userRegister } from "../../api/LoginAPI";
import INGTheme from "../../Theme";

export default function Chooserole({ theme }: { theme: Theme }) {
  // Defines the role state to keep track of the selected role
  const [userRole, setUserRole] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setUserRole(event.target.value as string);
  };
  // Imports the API hook for registering
  const userReg = userRegister();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            <Button onClick={handleClose}>Go back to sign up</Button>
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
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                pt: 0,
                marginBottom: 0,
                padding: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "16px",
                bgcolor: "white",
              }}
            >
              {/* Conact rounded circle */}
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
                  marginBottom: 2,
                }}
              >
                Please, select your role
              </Typography>
              {/* The form for the drop down menu to pick a role */}
              <FormControl fullWidth>
                <Select sx={{ m: 2 }} value={userRole} onChange={handleChange}>
                  <MenuItem value="USER">User</MenuItem>
                  <MenuItem value="ASSESSOR">Assessor</MenuItem>
                </Select>
              </FormControl>
              <Button
                size="medium"
                variant="contained"
                color="primary"
                sx={{
                  p: 2,
                  m: 2,
                }}
                onClick={() => {
                  userReg.mutate({ role: userRole });
                }}
              >
                Continue
              </Button>
            </Box>
          </Container>
        </Box>
      </div>
    </ThemeProvider>
  );
}
