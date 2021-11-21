import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useDispatch, useSelector } from 'react-redux';
import { createFeed, updateFeed } from '../actions/feedActions';
import { listCategories } from '../actions/categoryActions';

import { darkTheme } from "../mui/themes";

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.1),
}));

export default function EditFeedAnswer(props) {
  const [answerState, setAnswerState] = React.useState(props.answer);

  function handleAnswerChange(e) {
    setAnswerState(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //dispatch(updateFeed({ answer: answerState, feedId: props.feed_id }));
    setAnswerState("");
    props.handleEditFeedAnswer(answerState);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Dialog open={props.openEditFeedAnswer} onClose={props.handleCloseDeleteDialog}>
        <DialogTitle>
        </DialogTitle>
        <DialogContent>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <PostAddIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Update Answer
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="answer"
                      label="Answer"
                      placeholder="Answer"
                      multiline
                      rows={4}
                      value={answerState}
                      onChange={handleAnswerChange}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Update
                </Button>
              </Box>
            </Box>
          </Container>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}

