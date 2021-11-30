import React, { useEffect } from 'react';
import { Button, TextField, Dialog, DialogContent, DialogTitle, Grid, Box, Typography, Container, InputLabel, MenuItem, FormControl, Select, Paper, Chip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createGroup } from '../actions/groupActions';
import { listCategories } from '../actions/categoryActions';
import { updateGroup } from '../actions/groupActions';
import PeopleSharpIcon from '@mui/icons-material/PeopleSharp';
import { styled } from '@mui/material/styles';
import { listGroups } from '../actions/groupActions';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.1),
}));

export default function NewGroup(props) {
  const [groupState, setGroupState] = React.useState({
    title: props.group ? props.group.title : "",
    description: props.group ? props.group.description : "",
    category_id: props.group ? props.group.category_id : "",
    group_url: props.group ? props.group.group_url : "",
    tag: "",
    tags: props.group? props.group.tags : []
  });

  const individualGroupDetails = useSelector((state) => state.individualGroupDetails);
  const { group } = individualGroupDetails;
  
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  function handleTitleChange(e) {
    setGroupState(prev => ({ ...prev, title: e.target.value }));
  };
  function handleDescriptionChange(e) {
    setGroupState(prev => ({ ...prev, description: e.target.value }));
  };
  
  function handleCategoryChange(e) {
    setGroupState(prev => ({ ...prev, category_id: e.target.value }));
  };

  function handlegroupURLChange(e) {
    setGroupState(prev => ({ ...prev, group_url: e.target.value }));
  };

  const handleAddTag = () => {
    setGroupState(prev => ({ ...prev, tags: [...prev.tags, groupState.tag], tag: ""}));
  };

  const handleDeleteTag = (tagIndexToDelete) => () => {
    setGroupState(prev => ({ ...prev, tags: prev.tags.filter((tag, index) => index !== tagIndexToDelete)}));
  };


  function handleTagChange(e) {
    setGroupState(prev => ({...prev, tag: e.target.value}));
  };

  
  const handleSubmit = (event) => {
    event.preventDefault();
    //if (!group) {
    if (!props.edit) {
      dispatch(createGroup(groupState));
    } else {
      dispatch(updateGroup(props.groupId, groupState));
    }
    setGroupState(prev => ({
      ...prev, title: "",
      description: "",
      category_id: "",
      group_url: "",
      tag: "",
      tags: []
     })
    );
    props.handleCloseNewGroup();
  };

  return (
    <Dialog open={props.openNewGroup} onClose={props.handleCloseNewGroup} >
      <DialogContent sx={{ backgroundColor: "#023047" }}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <PeopleSharpIcon color="primary" fontSize="large"/>
            {(props.edit) ? (
              <Typography component="h1" variant="h5">
                Update Group
              </Typography>) : (
              <Typography component="h1" variant="h5">
                Create Group
              </Typography>
             )}
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
                    value={groupState.title}
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
                    value={groupState.description}
                    onChange={handleDescriptionChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      id="category"
                      value={groupState.category_id}
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
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="groupURL"
                    label="Group Image URL"
                    placeholder="Group Image URL"
                    value={groupState.group_url}
                    onChange={handlegroupURLChange}
                  />
                </Grid>
                <Grid item xs={12} sm={9}>
                    <TextField
                      fullWidth
                      id="tag"
                      label="Add Tag"
                      name="tag"
                      autoComplete="tag"
                      value={groupState.tag}
                      onChange={handleTagChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Button
                      variant="outlined"
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
                        backgroundColor: 'transparent'
                      }}
                      component="ul"
                    >
                      {
                          Array.isArray(groupState.tags) && groupState.tags.map((data, index)  => {
                          return (
                            <ListItem key={data}>
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
              {props.edit ? (<Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
              >
                Update Group
              </Button>) : (<Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
              >
                Create Group
              </Button>
              )}
            </Box>
          </Box>
        </Container>
        </DialogContent>
      </Dialog>
  );
}