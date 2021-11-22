import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { listGroups } from '../actions/groupActions';
import GroupListItem from './GroupListItem';
import { Button, Box, TextField, InputAdornment, FormControl, Select, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { ThemeProvider } from '@mui/material/styles';

function GroupList(props) {
  const groupList = useSelector((state) => state.groupList);
  const { loading, error, groups } = groupList;

  const [sortValue, setSortValue] = React.useState('');
  const [keywordValue, setkeywordValue] = React.useState('');
  const [openFeedSort, setOpenFeedSort] = React.useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listGroups({}));
  }, [dispatch, listGroups, navigate, location]);
  
  const handleSortValueChange = (e) => {
    setSortValue(e.target.value);
    dispatch(listGroups({ keyword: keywordValue, sortBy: e.target.value }));
  };

  const handleKeywordValueChange = (e) => {
    setkeywordValue(e.target.value);
    dispatch(listGroups({ keyword: e.target.value, sortBy: sortValue }));
  };

  const handleSortSelectClose = () => {
    setOpenFeedSort(false);
  };

  const handleSortSelectOpen = () => {
    setOpenFeedSort(true);
  };

  const handleEvent = () => {
    navigate('/events');
  }

  return (
    // <ThemeProvider theme={darkTheme}>
    <Box sx={{flex:1, display:"flex", flexDirection:"column", justifyContent:"center"}}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: '1px solid #0077b6', my: 2, px: 2 }}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
        >
          <TextField 
            id="outlined-basic"
            variant="outlined"
            size="small"
            value={keywordValue}
            onChange={handleKeywordValueChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }} />
        </Box>
        <Box>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              labelId="controlled-open-sort-select-label"
              id="controlled-sort-select"
              size="small"
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              open={openFeedSort}
              onClose={handleSortSelectClose}
              onOpen={handleSortSelectOpen}
              value={sortValue}
              onChange={handleSortValueChange}
            >
              <MenuItem value="">
                <em>Sort</em>
              </MenuItem>
              <MenuItem value={"latest"}>Latest First</MenuItem>
              <MenuItem value={"oldest"}>Oldest First</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <div>
        <Button size="large" variant="outlined" onClick={handleEvent} sx={{mr: 2, color:"white"}}>
          Event
        </Button>
        <Button size="large" variant="outlined" sx={{color:"white"}}>
          Group
        </Button>
      </div>
      {loading ? (
        <span>Loading</span>
      ) : error ? (
        <span>Error: {error}</span>
      ) : (
        <>
          {groups.map((group) => (
            <GroupListItem key={group._id} group={group} />
          ))}
        </>
      )}
    </Box>
    // </ThemeProvider>
  );
}

export default GroupList;
