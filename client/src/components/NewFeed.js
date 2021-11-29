import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import ReactHtmlParser from 'react-html-parser';
import convert from 'htmr';

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

import { createFeed, updateFeed } from '../actions/feedActions';
import { listCategories } from '../actions/categoryActions';

import { darkTheme} from "../mui/themes";
import "../styles/components/NewFeed.scss";
//import "../styles/elements/richText.scss";

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.1),
}));

export default function NewFeed(props) {
  const navigate = useNavigate();

  const html = props.feed ? props.feed.description : "";
  const contentBlock = htmlToDraft(html);
  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
  const initialEditorState = EditorState.createWithContent(contentState);

  const [editorState, setEditorState] = useState(initialEditorState ? initialEditorState :
    () => EditorState.createEmpty(),
  );

  const [feedState, setFeedState] = useState({
    title: props.feed ? props.feed.title : "",
    description: props.feed ? props.feed.description : "",
    category_id: props.feed ? props.feed.category : "",
    tag: "",
    tags: props.feed ? props.feed.tags : []
  });

  const categoryList = useSelector((state) => state.categoryList);
  const {categories } = categoryList;


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);
  
  function handleTitleChange(e) {
    setFeedState(prev => ({ ...prev, title: e.target.value }));
  };

  const handleEditorChange = (state) => {
    setEditorState(state);
    //const htmlDescription = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const htmlDescription = draftToHtml(convertToRaw(state.getCurrentContent()));
    setFeedState(prev => ({ ...prev, description: htmlDescription }));
  }
  /* function handleDescriptionChange(e) {
    setFeedState(prev => ({ ...prev, description: e.target.value }));
  }; */

  /* function handleDescriptionChange(state) {
    setFeedState(prev => ({ ...prev, description: state }));
  }; */

  function handleTagChange(e) {
    setFeedState(prev => ({...prev, tag: e.target.value}));
  };
  function handleCategoryChange(e) {
    setFeedState(prev => ({ ...prev, category_id: e.target.value }));
  };
  const handleAddTag = (event) => {
    setFeedState(prev => ({ ...prev, tags: [...prev.tags, feedState.tag], tag: ""}));
  };
  const handleDeleteTag = (tagIndexToDelete) => () => {
    setFeedState(prev => ({ ...prev, tags: prev.tags.filter((tag, index) => index !== tagIndexToDelete)}));
  };

  const handleSubmit = (event) => {
    /* const htmlDescription = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    console.log("htmlDescription", htmlDescription);
    setFeedState(prev => ({ ...prev, description: htmlDescription })); */
    console.log(feedState);
    event.preventDefault();
    dispatch(props.activity === "EditFeed" ? updateFeed({ ...feedState, feedId: props.feed._id}) : createFeed(feedState));
    setFeedState(prev => ({
      ...prev, title: "",
      description: "",
      category_id: "",
      tag: "",
      tags: [] }));
    props.handleCloseNewFeed();
    if (props.activity === "NewFeed") {
      navigate('/feeds');
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Dialog fullWidth={true} maxWidth={'md'} open={props.openNewFeed} onClose={props.handleCloseNewFeed}>
        <DialogTitle>
        </DialogTitle>
        <DialogContent>
          <Container component="main" maxWidth="md">
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
                {props.activity === "EditFeed" ? "Update Question" : "Post Question"}
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="title"
                      label="Title"
                      name="title"
                      autoComplete="title"
                      value={feedState.title}
                      onChange={handleTitleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {/* <TextField
                      required
                      fullWidth
                      id="description"
                      label="Description"
                      placeholder="Description"
                      multiline
                      rows={4}
                      value={feedState.description}
                      onChange={handleDescriptionChange}
                    /> */}
                    <Editor
                      editorState={editorState}
                      wrapperClassName="wrapper-gray-class"
                      editorClassName="editor-class"
                      onEditorStateChange={handleEditorChange}

                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Category</InputLabel>
                      <Select
                        id="category"
                        value={feedState.category_id}
                        label="Category"
                        onChange={handleCategoryChange}
                      >
                        {categories && categories.map((category) => (
                          <MenuItem
                            key={category._id}
                            value={category._id}
                          >
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <TextField
                      fullWidth
                      id="tag"
                      label="Add Tag"
                      name="tag"
                      autoComplete="tag"
                      value={feedState.tag}
                      onChange={handleTagChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Button
                      variant="contained"
                      sx={{ mt: 1 }}
                      onClick={handleAddTag}
                    >
                      Add
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        listStyle: 'none',
                        p: 0.5,
                        m: 0,
                      }}
                      component="ul"
                    >
                      {
                        Array.isArray(feedState.tags) && feedState.tags.map((data, index) => {
                          return (
                            <ListItem key={index}>
                              <Chip
                                label={data}
                                onDelete={handleDeleteTag(index)}
                              />
                            </ListItem>
                          );
                        })
                      }
                    </Paper>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {props.activity === "EditFeed" ? "Update" : "Post"}
                </Button>
              </Box>
            </Box>
          </Container>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}

