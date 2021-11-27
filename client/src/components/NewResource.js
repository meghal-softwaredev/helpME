import { useState, useEffect } from 'react';
import Axios from 'axios';
import { Dialog, DialogTitle, DialogContent, Container, Box, Typography, Grid, TextField, Button } from '@mui/material';
import EventSharpIcon from '@mui/icons-material/EventSharp';
import { listResources } from '../actions/resourceActions';

function NewResource(props) {
  const [resourceState, setResourceState] = useState({
    title: "",
    resource_url: "",
    resource_category_id: props.categoryId
  });

  const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

  useEffect(() => {
    if (props.edit) {
      console.log("hello")
      setResourceState({
        title: props.resource.title,
        resource_url: props.resource.resource_url,
      })
    }
  }, [props.edit]);

  function handleTitleChange(e) {
    setResourceState(prev => ({ ...prev, title: e.target.value }));
  };

  function handleResourceURLChange(e) {
    setResourceState(prev => ({ ...prev, resource_url: e.target.value }));
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();
    if (!props.edit) {
      Axios.post('/api/resources/new', { 
        title: resourceState.title,
        resource_url:resourceState.resource_url,
        resource_category_id: resourceState.resource_category_id
        }, 
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
    } else {
      Axios.post(`/api/resources/${props.id}`, { 
        title: resourceState.title,
        resource_url:resourceState.resource_url
        }, 
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
    }
    setResourceState(prev => ({
      ...prev, 
      title: "",
      resource_url: "",
      resource_category_id: ""
    }));
    props.handleCloseNewResource();
  };

  return (
    <Dialog open={props.openNewResource} onClose={props.handleCloseNewResource}>
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
            <EventSharpIcon color="primary" fontSize="large"/>
            {(props.edit) ? (
              <Typography component="h1" variant="h5">
                Update Resource
              </Typography>) : (
              <Typography component="h1" variant="h5">
                Create Resource
              </Typography>
             )}
            <Box component="form" noValidate onSubmit={(e) => handleSubmit(e, props.id)} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    autoComplete="title"
                    value={resourceState.title}
                    onChange={handleTitleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="resourceURL"
                    label="resource URL"
                    placeholder="resource URL"
                    value={resourceState.resource_url}
                    onChange={handleResourceURLChange}
                  />
                </Grid>
                
              {props.edit ? (<Button
                type="submit"
                fullWidth
                variant="contained"
                // onClick={() => window.location.reload(false)}
                sx={{ mt: 3, mb: 2 }}
              >
                Update Resource
              </Button>) : (<Button
                type="submit"
                fullWidth
                variant="contained"
                // onClick={() => window.location.reload(false)}
                sx={{ mt: 3, mb: 2 }}
              >
                Create Resource
              </Button>
              )}
          </Grid>
          </Box>
          </Box>
        </Container>
        </DialogContent>
      </Dialog>
  );
}
export default NewResource;