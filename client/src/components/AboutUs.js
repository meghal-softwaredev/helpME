import React from "react";
// import "../../../App.css";
import { Paper } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import "../styles/components/AboutUs.scss";
import { Box } from "@mui/system";
export default function AboutUs() {
  return (
    <>
        <Box
          sx={{
            width: 1 / 2,
            fontWeight: "light",
            flexDirection: "column",
            color: "white",
            height: "80vh"
          }}
        >
          <h1>About Us</h1>
          <br></br>
          <h3>
            HelpME is an interactive social help network. Where you can contact
            volunteers from out community and quickly connect through video,
            voice or chat anytime and get the help you need. In our community
            anything can be posted as a topic. Personalize your profile. Post a
            question. Answer a question. No mods, no restrictions, and topics
            can be as general or as specific as you want.
          </h3>
        </Box>

        <img
          src="/images/sky.jpg"
          alt=""
          height="500px"
          width="500px"
          paddingRight="100px"
        ></img>
    </>
  );
}
