import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { Grid, Button, Typography } from '@mui/material';
import { getIndividualGroup } from '../actions/groupActions';
import NewGroup from './NewGroup';

function IndividualGroup(props) {
  const [openNewGroup, setOpenNewGroup] = useState(false);
  const { id } = useParams();

  const individualGroupDetails = useSelector((state) => state.individualGroupDetails);
  const { loading, error, group } = individualGroupDetails;
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIndividualGroup(id));
  }, [dispatch, id]);

  const handleOpenNewGroup = () => {
    setOpenNewGroup(true);
  };

  const handleCloseNewGroup = () => {
    setOpenNewGroup(false);
  };

  return (
    <div className="item-container">
    {loading ? (
      <LoadingBox></LoadingBox>
    ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
    ) : (
      <div>
        <Grid container sx={{ border: 1,  p: 2 }}>
          <Grid item xs={3} > 
          <img src={group.group_url} width="150px" height="150px"/>
          </Grid>
          <Grid item xs={9} sx={{ fontSize: 'h6.fontSize', fontWeight: 'medium', mb: 2 }}>
            <Grid container>
              <Grid item>
                <Typography component="h5" variant="h5">
                  <Link className="link" to={`/groups/${id}`}>{group.title}</Link>
                </Typography>
              </Grid>
             <Grid item justifyContent="flex-end">
                <Button size="small" variant="contained" onClick={handleOpenNewGroup}>
                  Edit
                </Button>
                <NewGroup openNewGroup={openNewGroup} handleCloseNewGroup={handleCloseNewGroup} edit={true} groupId={id}/>
                <Button size="small" variant="contained" >
                  Delete
                </Button>
              </Grid>
            </Grid>
            <Typography component="h6" variant="h6">{group.description}</Typography>
            <Button variant="contained">Join</Button>
          </Grid>
        </Grid>
       </div>
    )} 
    </div>
  );
}

export default IndividualGroup;