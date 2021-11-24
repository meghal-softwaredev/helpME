import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import { Box, Button, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import { darkTheme } from "../mui/themes";
import CategoryCardItem from "./CategoryCardItem";
import {
  listCategories,
  savePrefferedCategories,
} from "../actions/categoryActions";

function CategoryList() {
  const navigate = useNavigate();

  const [preferredCategories, setpreferredCategories] = useState([]);

  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listCategories({}));
  }, [dispatch]);
  /* useEffect(() => {
    if(categories) {
      for(const category of categories) {
        setpreferredCategories(prev => ({...prev, [category._id]:{id: category._id, selected: false}}));
      }
    }
  }, []); */

  const handleContinue = () => {
    dispatch(savePrefferedCategories(preferredCategories));
    navigate("/feeds");
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
          <Button
            variant="outlined"
            endIcon={<SendIcon />}
            onClick={handleContinue}
          >
            Continue
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "50px",
          }}
        >
          {categories &&
            categories.map((category) => (
              <CategoryCardItem
                category={category}
                preferredCategories={preferredCategories}
                setpreferredCategories={setpreferredCategories}
              />
            ))}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default CategoryList;
