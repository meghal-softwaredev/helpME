import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from "../mui/themes";
import { Button, Box, Divider, FormControl, Select, InputLabel, MenuItem, TextField, InputAdornment } from '@mui/material';
import { listFeeds } from '../actions/feedActions';
import FeedListItem from './FeedListItem';
import SearchIcon from '@mui/icons-material/Search';

import {
  showProfileDetails,
} from "../actions/profileActions";

import "../styles/components/FeedList.scss";

function FeedList(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const [sortValue, setSortValue] = React.useState('');
  const [keywordValue, setkeywordValue] = React.useState('');
  const [openFeedSort, setOpenFeedSort] = React.useState(false);

  const handleSortValueChange = (event) => {
    setSortValue(event.target.value);
    dispatch(listFeeds({ keyword: keywordValue, sortBy: event.target.value }));
  };
  const handleKeywordValueChange = (event) => {
    setkeywordValue(event.target.value);
    dispatch(listFeeds({ keyword: event.target.value, sortBy: sortValue }));
  };

  const handleSortSelectClose = () => {
    setOpenFeedSort(false);
  };

  const handleSortSelectOpen = () => {
    setOpenFeedSort(true);
  };

  const feedList = useSelector((state) => state.feedList);
  const { loading, error, feeds } = feedList;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const profileDetailsList = useSelector((state) => state.profileDetailsList);
  const { profileDetails } = profileDetailsList;

  const dispatch = useDispatch();

  useEffect(() => {
    
    userInfo && dispatch(showProfileDetails(userInfo._id));
  }, []);

  useEffect(() => {
    typeof profileDetails === 'object' && Object.keys(profileDetails).length > 0 && dispatch(listFeeds({ category: profileDetails.current_category}));
    !userInfo && dispatch(listFeeds({}));
  }, [dispatch, location, profileDetailsList]);


  return (
    <ThemeProvider theme={darkTheme}>
      <Box className="feed-list-main-container" sx={{flex:1, display:"flex", flexDirection:"column", justifyContent:"center"}}>
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
        <Box sx={{ my: 2, px: 2 }}>
          {loading ? (
            <span>Loading</span>
          ) : error ? (
            <span>Error: {error}</span>
          ) : (
            <>
              {feeds.map((feed) => (
                <React.Fragment key= { feed._id }>
                  <FeedListItem feed={feed} />
                  <Divider />
                </React.Fragment>
              ))}
            </>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default FeedList
