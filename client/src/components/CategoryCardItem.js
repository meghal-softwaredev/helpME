import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

import { darkTheme } from "../mui/themes";

export default function CategoryCardItem(props) {
  const handleSelectPreferedCategories = (category_id) => {
    /* const index = props.preferredCategories.indexOf(id);
    if (index > -1) {
      props.setpreferredCategories(props.preferredCategories.splice(index, 1));
    } else {
      props.setpreferredCategories(prev => [...prev, id]);
    } */
    if (props.preferredCategories.includes(category_id)) {
      props.setpreferredCategories(
        props.preferredCategories.filter((id) => id !== category_id)
      );
    } else {
      props.setpreferredCategories((prev) => [...prev, category_id]);
    }
    //props.setpreferredCategories(prev => ({...prev, [prev._id]:{...prev, }}));
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <Card sx={{ maxWidth: 345, textAlign: "center" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={props.category.img_url}
            alt="green iguana"
          />
          <CardContent sx={{backgroundColor: "#023047"}}>
            <Typography gutterBottom variant="h5" component="div">
              {props.category.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.category.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ display: "flex", justifyContent: "center", backgroundColor: "#023047" }}>
          <Button
            size="medium"
            variant="outlined"
            //color={props.preferredCategories[props.category._id].selected ? "success" : "primary"}
            color={
              props.preferredCategories.includes(props.category._id)
                ? "success"
                : "primary"
            }
            onClick={() => {
              handleSelectPreferedCategories(props.category._id);
            }}
            endIcon={
              props.preferredCategories.includes(props.category._id) && (
                <CheckIcon />
              )
            }
          >
            {props.preferredCategories.includes(props.category._id)
              ? "Selected"
              : "Select"}
          </Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}
