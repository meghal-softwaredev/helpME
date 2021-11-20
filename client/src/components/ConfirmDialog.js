import React from 'react';
import { Button, Dialog, DialogContent, DialogTitle, DialogActions} from '@mui/material';

const ConfirmDialog = (props) => {
  const { title, children, openDeleteGroup, handleCloseDeleteGroup, onConfirm } = props;
  return (
    <Dialog
      open={openDeleteGroup}
      onClose={handleCloseDeleteGroup}
    >
      <DialogTitle >{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => handleCloseDeleteGroup()}
        >
          No
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            handleCloseDeleteGroup();
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