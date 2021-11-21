import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Chip, Box, Divider, Container, Typography, Grid, TextField, Button, Card, CardContent, CardActions, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { darkTheme } from "../mui/themes";
import { getIndividualFeed, getFeedAnswers, saveAnswer, deleteFeed, deleteFeedAnswer, updateFeedAnswer } from '../actions/feedActions';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { borderColor } from '@mui/system';
import NewFeed from './NewFeed';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import EditFeedAnswer from './EditFeedAnswer';

function IndividualFeed() {

  const [newAnswer, setNewAnswer] = useState("");
  const [alterAnswerId, setAlterAnswerId] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");

  const [openDialog, setOpenDialog] = React.useState(false);
  const [currentDialog, setcurrentDialog] = React.useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let feedId = useParams().id;

  const individualFeedDetails = useSelector((state) => state.individualFeedDetails);
  const { loadingFeedDetails, errorFeedDetails, feed } = individualFeedDetails;
  const feedAnswers = useSelector((state) => state.feedAnswers);
  const { loadingAnswers, errorAnswers, answers } = feedAnswers;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;


  useEffect(() => {
    dispatch(getIndividualFeed(feedId));
  }, [dispatch, feedId, openDialog]);

  useEffect(() => {
    dispatch(getFeedAnswers(feedId));
  }, [openDialog]);

  function handleNewAnswerChange(e) {
    setNewAnswer(e.target.value);
  };

  const handleOpenDialog = (data) => {
    data.ans_id && setAlterAnswerId(data.ans_id);
    data.answer && setCurrentAnswer(data.answer);
    setcurrentDialog(data.msg);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = (currentTask) => {
    if (currentTask === "DeleteFeed") {
      dispatch(deleteFeed(feedId));
      setOpenDialog(false);
      navigate('/feeds');
    } else if (currentTask === "DeleteFeedAnswer") {
      setOpenDialog(false);
      dispatch(deleteFeedAnswer(alterAnswerId));
    }
  };

  const handleEditFeedAnswer = (answer) => {
    dispatch(updateFeedAnswer({ ans_id: alterAnswerId, answer}));
    setOpenDialog(false);
    dispatch(getFeedAnswers(feedId));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      saveAnswer({feedId, newAnswer})
    );
    setNewAnswer("");
    dispatch(getFeedAnswers(feedId));
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="feed-item-container">
        {loadingFeedDetails ? (
          <LoadingBox></LoadingBox>
        ) : errorFeedDetails ? (
            <MessageBox variant="danger">{errorFeedDetails}</MessageBox>
        ) : feed && (
              <Box sx={{ border: '1px solid #0077b6', my: 2, p: 2 }}>
            <Box sx={{ fontSize: 'h6.fontSize', fontWeight: 'medium', mb: 2 }}>
                  {feed.title}
            </Box>
                {feed.tags.map(tag => (
              <Chip key={tag} sx={{ mr: 1 }} label={tag} color="primary" />
            ))}
                <p>{feed.description}</p>
                <p>Posted by: {feed.user && feed.user.name}</p>
                <p>Posted on: {feed.createdAt}</p>
                {userInfo && feed.user && feed.user._id === userInfo._id && (
                  <CardActions>
                    <IconButton color="warning" aria-label="edit feed" component="span" onClick={() => handleOpenDialog({msg: "EditFeed"})}>
                      <EditIcon />
                    </IconButton>
                    <IconButton sx={{ color: "#df7373" }} aria-label="delete feed" component="span" onClick={() => handleOpenDialog({msg:"DeleteFeed"})}>
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                )}
                {currentDialog === "EditFeed" && (
                  <NewFeed
                    activity="EditFeed"
                    feed={feed}
                    openNewFeed={openDialog}
                    handleCloseNewFeed={handleCloseDialog} />
                )}
                {currentDialog === "DeleteFeed" && (
                  <DeleteConfirmDialog
                    activity="DeleteFeed"
                    title="Delete Feed?"
                    openDeleteDialog={openDialog} 
                    handleCloseDeleteDialog={handleCloseDialog}
                    handleConfirmDelete={handleConfirmDelete} >
                      Are you sure you want to delete this feed?
                  </DeleteConfirmDialog>
                )}
            <br />
            <Divider light={true}>
              <Chip label="ANSWERS"/>
            </Divider>
                {answers && answers.map(ans => (
                  <Box key={ans._id} sx={{ minWidth: 275 }}>
                    <Card sx={{backgroundColor: "transparent", mt: "10px"}}>
                      <CardContent>
                        <Typography variant="body">
                          {ans.answer}
                        </Typography>
                        <Typography sx={{ mt: 1 }} color="text.secondary">
                          Posted by: {ans.user.name}
                        </Typography>
                        
                      </CardContent>
                      {userInfo && userInfo._id === ans.user._id && (
                        <CardActions>
                          <IconButton color="warning" aria-label="edit answer" component="span" onClick={() => handleOpenDialog({ msg: "EditFeedAnswer", ans_id: ans._id, answer: ans.answer })}>
                            <EditIcon />
                          </IconButton>
                          <IconButton sx={{ color: "#df7373" }} aria-label="delete answer" component="span" onClick={() => handleOpenDialog({ msg: "DeleteFeedAnswer", ans_id: ans._id})}>
                            <DeleteIcon />
                          </IconButton>
                        </CardActions>
                      )}
                      {currentDialog === "EditFeedAnswer" && (
                        <EditFeedAnswer
                          answer={currentAnswer}
                          openEditFeedAnswer={openDialog}
                          handleEditFeedAnswer={handleEditFeedAnswer}
                          handleCloseEditFeedAnswer={handleCloseDialog} />
                      )}
                      {currentDialog === "DeleteFeedAnswer" && (
                        <DeleteConfirmDialog
                          activity="DeleteFeedAnswer"
                          title="Delete Feed Answer?"
                          openDeleteDialog={openDialog}
                          handleCloseDeleteDialog={handleCloseDialog}
                          handleConfirmDelete={handleConfirmDelete} >
                          Are you sure you want to delete this feed answer?
                        </DeleteConfirmDialog>
                      )}
                    </Card>
                  </Box>
            ))}
            {userInfo && (
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
                      value={newAnswer}
                      onChange={handleNewAnswerChange}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Post Answer
                </Button>
              </Box>
            )}
                
          </Box>
        )}
      </div>
    </ThemeProvider>
  );
}

export default IndividualFeed;
