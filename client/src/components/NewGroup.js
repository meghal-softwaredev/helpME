import React, { useEffect } from 'react';
import { Button, TextField, Dialog, DialogContent, DialogTitle, Avatar, Grid, Box, Typography, Container, InputLabel, MenuItem, FormControl, Select} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { createGroup } from '../actions/groupActions';
import { listCategories } from '../actions/categoryActions';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.1),
}));

export default function NewGroup(props) {
  const [groupState, setGroupState] = React.useState({
    title: "",
    description: "",
    category_id: "",
    group_url: ""
  });

  const individualGroupDetails = useSelector((state) => state.individualGroupDetails);
  const { group } = individualGroupDetails;
  
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  useEffect(() => {
    if (group) {
      setGroupState({
        title: group.title,
        description: group.description,
        category_id: group.category_id,
        group_url: group.group_url
      })
    }
  }, []);

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
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!group) {
      dispatch(createGroup(groupState));
    } else {
      dispatch(updateGroup(groupState));
    }
    props.handleCloseNewGroup();
    setGroupState(prev => ({
      ...prev, title: "",
      description: "",
      category_id: "",
      group_url: "" }));
  };

  return (
    <Dialog open={props.openNewGroup} onClose={props.handleCloseNewGroup} >
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
              {/* <PostAddIcon /> */}
            </Avatar>
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
              </Grid>
              {props.edit ? (<Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update Group
              </Button>) : (<Button
                type="submit"
                fullWidth
                variant="contained"
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