import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
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
import { createFeed } from '../actions/feedActions';
import { listCategories } from '../actions/categoryActions';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.1),
}));

export default function NewFeed(props) {
  const [feedState, setFeedState] = React.useState({
    title: "",
    description: "",
    category_id: "",
    tag: "",
    tags: []
  });

  const categoryList = useSelector((state) => state.categoryList);
  const {
    loading,
    error,
    categories } = categoryList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);
  
  function handleTitleChange(e) {
    setFeedState(prev => ({ ...prev, title: e.target.value }));
  };
  function handleDescriptionChange(e) {
    setFeedState(prev => ({ ...prev, description: e.target.value }));
  };
  function handleTagChange(e) {
    setFeedState(prev => ({...prev, tag: e.target.value}));
  };
  function handleCategoryChange(e) {
    setFeedState(prev => ({ ...prev, category_id: e.target.value }));
  };
  const handleAddTag = (event) => {
    setFeedState(prev => ({ ...prev, tags: [...prev.tags, feedState.tag], tag: ""}));
  };
  const handleDeleteTag = (tagToDelete) => () => {
    setFeedState(prev => ({ ...prev, tags: (tags) => tags.filter((tag) => tag !== tagToDelete)}));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      createFeed(feedState)
    );
    props.handleCloseNewFeed();
    setFeedState(prev => ({
      ...prev, title: "",
      description: "",
      category_id: "",
      tag: "",
      tags: [] }));
  };

  return (
    <Dialog open={props.openNewFeed} onClose={props.handleCloseNewFeed}>
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
              Post A Question
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
                  <TextField
                    required
                    fullWidth
                    id="description"
                    label="Description"
                    placeholder="Description"
                    multiline
                    rows={4}
                    value={feedState.description}
                    onChange={handleDescriptionChange}
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
                    sx={{ mt: 1}}
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
                      feedState.tags.map((data) => {
                        return (
                          <ListItem key={data}>
                            <Chip
                              label={data}
                              onDelete={handleDeleteTag(data)}
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
                Post
              </Button>
            </Box>
          </Box>
        </Container>
        </DialogContent>
      </Dialog>
  );
}

