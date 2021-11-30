import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { listGroups } from '../actions/groupActions';
import GroupListItem from './GroupListItem';
import { Button, Box, TextField, InputAdornment, FormControl, Select, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { ThemeProvider } from '@mui/material/styles';
import { showProfileDetails } from '../actions/profileActions';
import { darkTheme } from "../mui/themes";

function GroupList(props) {
  const groupList = useSelector((state) => state.groupList);
  const { loading, error, groups } = groupList;

  const [sortValue, setSortValue] = React.useState('');
  const [keywordValue, setkeywordValue] = React.useState('');
  const [openGroupSort, setOpenGroupSort] = React.useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const handleSortValueChange = (e) => {
    setSortValue(e.target.value);
    dispatch(listGroups({ keyword: keywordValue, sortBy: e.target.value, category: profileDetails.current_category }));
  };

  const handleKeywordValueChange = (e) => {
    setkeywordValue(e.target.value);
    dispatch(listGroups({ keyword: e.target.value, sortBy: sortValue, category: profileDetails.current_category }));
  };

  const handleSortSelectClose = () => {
    setOpenGroupSort(false);
  };

  const handleSortSelectOpen = () => {
    setOpenGroupSort(true);
  };

  const handleEvent = () => {
    navigate('/events');
  }
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const profileDetailsList = useSelector((state) => state.profileDetailsList);
  const { profileDetails } = profileDetailsList;

  useEffect(() => {
    userInfo && dispatch(showProfileDetails(userInfo._id));
  }, []);
  
  useEffect(() => {
    typeof profileDetails === 'object' && Object.keys(profileDetails).length > 0 && dispatch(listGroups({ category: profileDetails.current_category}));
    !userInfo && dispatch(listGroups({}));
  }, [dispatch, location, profileDetailsList]);

  return (
    <ThemeProvider theme={darkTheme}>
    <Box sx={{flex:1, display:"flex", flexDirection:"column", justifyContent:"center"}}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: '1px solid #218380', my: 2, px: 2 }}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ width: "100%" }}
        >
          <TextField 
            fullWidth
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
              open={openGroupSort}
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
      <Box sx={{ p: 2 }}>
      <div>
            <Button size="large" variant="outlined" sx={{ mr: 2, color: "white", border: "solid 1px white", backgroundColor:"#adb5bd30" }}>
          Group
        </Button>
        <Button size="large" variant="outlined" onClick={handleEvent} sx={{color:"white"}}>
          Event
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
    </Box>
    </ThemeProvider>
  );
}

export default GroupList;
