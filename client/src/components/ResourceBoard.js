import { darkTheme } from "../mui/themes";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { IconButton, Popover, TextField, Button, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { listResourceCategories } from "../actions/resourceActions";
import ResourceList from "./ResourceList";
import '../styles/components/ResourceBoard.scss';

function ResourceBoard() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [resourceCategoryTitle, setResourceCategoryTitle] = useState("");
  const [resourceCategory, setResourceCategory] = useState([]);
  const open = Boolean(anchorEl);

  const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

  const resourceCategoryList = useSelector((state) => state.resourceCategoryList);
  const { resourceCategories } = resourceCategoryList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listResourceCategories())
  },[]);

  const handleAddResourceCategoryTitle = () => {
    Axios.post('/api/resourceCategories/new', { 
      title: resourceCategoryTitle,
      user_id: userInfo._id }, 
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
  }
  const handlePopOver = (e) => {
    setAnchorEl(e.currentTarget);
  }
  return (
    // <ThemeProvider theme={darkTheme}>
      <div >
        <IconButton onClick={handlePopOver}>
          Add Resource <AddCircleOutlineIcon />
        </IconButton>
        <Popover
        anchorEl={anchorEl}
        open={open}
        id={open ? "simple-popover" : undefined}
        onClose={() => {
          setAnchorEl(null);
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box sx={{mr:2, display:"flex", direction:"column"}}>
          <TextField 
          id="outlined-basic" 
          label="Resource Title" 
          variant="outlined" 
          value={resourceCategoryTitle}
          placeholder="Add resource title"
          onChange={(e) => {setResourceCategoryTitle(e.target.value)}}/>
          <Button variant="outlined" onClick={handleAddResourceCategoryTitle}>Add Resource</Button>
        </Box>
      </Popover>
      <div className='resource-category-container'>
      {resourceCategories &&
        resourceCategories.map((resourceCategory) => (
          <ResourceList
            key={resourceCategory._id}
            resourceCategory={resourceCategory}
          />
        ))}
      </div>
    </div>
    // </ThemeProvider>
  );
}
export default ResourceBoard;