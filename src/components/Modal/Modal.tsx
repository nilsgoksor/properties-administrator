import { Box, Modal as MuiModal } from "@mui/material";

interface ModalProps {
  children: React.ReactNode;
  show: boolean;
  hide(): void;
}

export const Modal = ({ children, show, hide }: ModalProps) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <MuiModal
      open={show}
      onClose={() => hide()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>{children}</Box>
    </MuiModal>
  );
};
