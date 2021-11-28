import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import { Chip, Box, Divider, Container, Typography, Grid, TextField, Button, Card, CardContent, CardActions, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { darkTheme } from "../mui/themes";
import { getIndividualFeed, getFeedAnswers, saveAnswer, deleteFeed, deleteFeedAnswer, updateFeedAnswer } from '../actions/feedActions';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { borderColor, display } from '@mui/system';
import NewFeed from './NewFeed';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import EditFeedAnswer from './EditFeedAnswer';

import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import convert from 'htmr';
import '../styles/components/IndividualFeed.scss'

function IndividualFeed() {

  const [newAnswer, setNewAnswer] = useState("");
  const [alterAnswerId, setAlterAnswerId] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");

  const [openDialog, setOpenDialog] = useState(false);
  const [currentDialog, setcurrentDialog] = useState("");

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

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

  const handleEditorChange = (state) => {
    setEditorState(state);
    const htmlAnswer = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setNewAnswer(htmlAnswer);
  }

  /* function handleNewAnswerChange(e) {
    setNewAnswer(e.target.value);
  }; */

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
    setEditorState("");
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
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', border: '1px solid #0077b6', my: 2, p: 2 }}>
              <Box sx={{ fontSize: 'h6.fontSize', fontWeight: 'medium', mb: 2 }}>
                    {feed.title}
              </Box>
              <Typography className="feed-description">{convert(feed.description)}</Typography>
              <Box>
                {feed.tags.map(tag => (
                  <Chip key={tag} sx={{ mr: 1 }} label={tag} color="primary" variant="outlined" size="small" />
                ))}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flex: '1' }}>
                    <Typography>Posted by <b>{feed.user && feed.user.name}</b> on {moment(feed.createdAt).format("MMMM Do, YYYY")}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: 'h6.fontSize', fontWeight: 'bold', color: '#b5e48c' }}>{answers ? answers.length : 0}</Typography>
                  <Typography>Answers</Typography>
                </Box>
              </Box>
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
                <Box key={ans._id} sx={{ minWidth: 275, display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Card sx={{flex: 1, backgroundColor: "transparent", mt: "10px"}}>
                    <CardContent>
                      <Typography variant="body" className="feed-answer">
                        {convert(ans.answer)}
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
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <IconButton color="primary" aria-label="up vote" component="span">
                      <KeyboardArrowUpIcon/>
                    </IconButton>
                    <Typography sx={{ fontSize: 'h6.fontSize', fontWeight: 'bold' }}>{ans.votes_count}</Typography>
                    <IconButton color="primary" aria-label="down vote" component="span">
                      <KeyboardArrowDownIcon />
                    </IconButton>
                  </Box>
                </Box>
              ))}
              {userInfo && (
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      {/* <TextField
                        required
                        fullWidth
                        id="answer"
                        label="Answer"
                        placeholder="Answer"
                        multiline
                        rows={4}
                        value={newAnswer}
                        onChange={handleNewAnswerChange}
                      /> */}
                        <Editor
                          editorState={editorState}
                          wrapperClassName="wrapper-class"
                          editorClassName="editor-class"
                          onEditorStateChange={handleEditorChange}

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
