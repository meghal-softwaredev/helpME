import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Chip, Box, Divider, Container, Typography, Grid, TextField, Button, Card, CardContent, CardActions, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { darkTheme } from "../mui/themes";
import { getIndividualFeed, getFeedAnswers, saveAnswer } from '../actions/feedActions';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { borderColor } from '@mui/system';
import NewFeed from './NewFeed';

function IndividualFeed() {

  const [newAnswer, setNewAnswer] = useState("");
  const [openNewFeed, setOpenNewFeed] = React.useState(false);

  const dispatch = useDispatch();
  let feedId = useParams().id;

  const individualFeedDetails = useSelector((state) => state.individualFeedDetails);
  const { loadingFeedDetails, errorFeedDetails, feed } = individualFeedDetails;
  const feedAnswers = useSelector((state) => state.feedAnswers);
  const { loadingAnswers, errorAnswers, answers } = feedAnswers;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;


  useEffect(() => {
    dispatch(getIndividualFeed(feedId));
  }, [dispatch, feedId]);

  useEffect(() => {
    dispatch(getFeedAnswers(feedId));
  }, []);

  function handleNewAnswerChange(e) {
    setNewAnswer(e.target.value);
  };

  const handleOpenNewFeed = () => {
    setOpenNewFeed(true);
  };

  const handleCloseNewFeed = () => {
    setOpenNewFeed(false);
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
                {feed.user && feed.user._id === userInfo._id && (
                  <CardActions>
                    <IconButton color="warning" aria-label="edit answer" component="span" onClick={handleOpenNewFeed}>
                      <EditIcon />
                    </IconButton>
                    <IconButton sx={{ color: "#df7373" }} aria-label="edit answer" component="span">
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                )}
                <NewFeed activity="edit" feed={feed} openNewFeed={openNewFeed} handleCloseNewFeed={handleCloseNewFeed} />
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
                      {userInfo._id === ans.user._id && (
                        <CardActions>
                          <IconButton color="warning" aria-label="edit answer" component="span">
                            <EditIcon />
                          </IconButton>
                          <IconButton sx={{ color: "#df7373" }} aria-label="edit answer" component="span">
                            <DeleteIcon />
                          </IconButton>
                        </CardActions>
                      )}
                      
                    </Card>
                  </Box>
            ))}
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
          </Box>
        )}
      </div>
    </ThemeProvider>
  );
}

export default IndividualFeed;
