import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteConfirmDialog(props) {

  return (
    <Dialog
      open={props.openDeleteDialog}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.handleCloseDeleteDialog}
      aria-describedby="alert-dialog-slide-delete-confirmation"
    >
      <DialogTitle sx={{ backgroundColor: "#023047" }}>{props.title}</DialogTitle>
      <DialogContent sx={{ backgroundColor: "#023047" }}>
        <DialogContentText id="alert-dialog-slide-confirmation">
          {props.children}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: "#023047" }}>
        {/* <Button onClick={props.handleCloseDeleteDialog}>No</Button>
        <Button onClick={() => props.handleConfirmDelete(props.activity)}>Yes</Button> */}
        <Button
          variant="outlined"
          onClick={props.handleCloseDeleteDialog}>
          No
        </Button>
        <Button
          variant="outlined"
          onClick={() => props.handleConfirmDelete(props.activity)}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
