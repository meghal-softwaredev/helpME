import React from 'react';
import { Button, Dialog, DialogContent, DialogTitle, DialogActions} from '@mui/material';

const ConfirmDialog = (props) => {
  const { title, children, openDelete, handleCloseDelete, onConfirm } = props;

  return (
    <Dialog
      open={openDelete}
      onClose={handleCloseDelete}
    >
      <DialogTitle sx={{ backgroundColor: "#023047" }}>{title}</DialogTitle>
      <DialogContent sx={{ backgroundColor: "#023047" }}>{children}</DialogContent>
      <DialogActions sx={{ backgroundColor: "#023047" }}>
        <Button
          variant="outlined"
          onClick={() => handleCloseDelete()}
        >
          No
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            handleCloseDelete();
            onConfirm();
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDialog;