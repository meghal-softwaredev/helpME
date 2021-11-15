import * as React from 'react';
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

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.1),
}));

export default function NewFeed(props) {

  const [tag, setTag] = React.useState("");
  const [tags, setTags] = React.useState([]);
  
  function handleTagChange(e) {
    setTag(e.target.value);
  };
  const handleAddTag = (event) => {
    setTags([...tags, tag]);
    setTag("");
  };
  const handleDeleteTag = (tagToDelete) => () => {
    setTags((tags) => tags.filter((tag) => tag !== tagToDelete));
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
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    autoComplete="title"
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
                  />
                </Grid>
                <Grid item xs={12} sm={9}>
                  <TextField
                    fullWidth
                    id="tag"
                    label="Add Tag"
                    name="tag"
                    autoComplete="tag"
                    value={tag}
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
                      tags.map((data) => {
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