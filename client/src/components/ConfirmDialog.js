import React from 'react';
import { Button, Dialog, DialogContent, DialogTitle, DialogActions} from '@mui/material';

const ConfirmDialog = (props) => {
  const { title, children, openDelete, handleCloseDelete, onConfirm } = props;

  return (
    <Dialog
      open={openDelete}
      onClose={handleCloseDelete}
    >
      <DialogTitle >{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => handleCloseDelete()}
        >
          No
        </Button>
        <Button
          variant="contained"
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