import { Alert, Snackbar } from "@mui/material";
import { AxiosError } from "axios";
import { forwardRef, Ref, useImperativeHandle, useState } from "react";

export interface RefObject {
  handleErrorPopup: (msg: string) => void;
}

export const getOnError = (ref: React.RefObject<RefObject>) => {
  const onError = (err: unknown) => {
    if (ref && ref.current) {
      if (err instanceof AxiosError) {
        const errorMessage = `${err.response?.data.error}: ${err.response?.data.message}`;
        ref.current.handleErrorPopup(errorMessage);
      } else if (err instanceof Error) {
        ref.current.handleErrorPopup(err.toString());
      } else if (typeof err === "string") {
        ref.current.handleErrorPopup(err);
      }
    }
  };

  return onError;
};

const ErrorPopup = forwardRef(
  // eslint-disable-next-line react/require-default-props
  (props: { isWarning?: boolean }, ref: Ref<RefObject>) => {
    // Use error states
    const [errorPopup, setErrorPopup] = useState<{
      msg: string;
      open: boolean;
    }>({
      msg: "",
      open: false,
    });

    const handleErrorPopup = (msg: string) =>
      setErrorPopup({ msg, open: true });

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
        <Alert
          onClose={handleClose}
          severity={props.isWarning ? "warning" : "error"}
          sx={{ width: "100%" }}
        >
          {errorPopup.msg}
        </Alert>
      </Snackbar>
    );
  }
);

export default ErrorPopup;
