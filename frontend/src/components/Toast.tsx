import * as React from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface ToastProps {
  open: boolean;
  message: string;
  onClose: () => void;
  backColor?: string;
}

export default function Toast({ open, message, onClose, backColor }: ToastProps) {
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") return;
    onClose();
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      autoHideDuration={4000}
      onClose={handleClose}
      message={message}
      sx={{
        "& .MuiSnackbarContent-root": {
          backgroundColor: backColor, // Altere para a cor desejada
          color: "#fff", // Cor do texto
        },
      }}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  );
}
