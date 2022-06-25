import { Alert, Snackbar } from "@mui/material";
import { AxiosError } from "axios";
import { forwardRef, Ref, useImperativeHandle, useState } from "react";

export interface RefObject {
  handleErrorPopup: (msg: string) => void;
}

export const handleError = (
  ref: React.RefObject<RefObject>,
  error: unknown
) => {
  if (ref && ref.current) {
    if (error instanceof AxiosError) {
      const errorMessage = `${error.response?.data.error}: ${error.response?.data.message}`;
      ref.current.handleErrorPopup(errorMessage);
    } else if (error instanceof Error) {
      ref.current.handleErrorPopup(error.toString());
    }
  }
};

const ErrorPopup = forwardRef((props, ref: Ref<RefObject>) => {
  // Use error states
  const [errorPopup, setErrorPopup] = useState<{ msg: string; open: boolean }>({
    msg: "",
    open: false,
  });

  const handleErrorPopup = (msg: string) => setErrorPopup({ msg, open: true });

  // Handle error close
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setErrorPopup({ msg: "", open: false });
  };

  // Use imperative handle for parent class
  useImperativeHandle(ref, () => ({ handleErrorPopup }));

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={errorPopup.open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {errorPopup.msg}
      </Alert>
    </Snackbar>
  );
});

export default ErrorPopup;
