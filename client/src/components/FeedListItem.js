import { Chip, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import moment from "moment";
import "../styles/components/FeedListItem.scss";
import convert from 'htmr';

function FeedListItem(props) {
  return (
    <div className="feed-item-container">
      <Box
        sx={{ my: 1, p: 2, display: "flex", gap: "10px", alignItems: "center" }}
      >
        <Box sx={{ flex: "1" }}>
          <Box
            sx={{
              fontSize: "h5.fontSize",
              flex: "1",
              fontWeight: "medium",
              mb: 1,
              color:"#fff"
            }}
          >
            <Link className="link-title" to={`/feeds/${props.feed._id}`}>
              {props.feed.title}
            </Link>
          </Box>
          <Box sx={{ display: "flex", mt:2 , gap: "10px", flexDirection: "column" }}>
            <Box>
              {props.feed.tags.map((tag) => (
                <Chip
                  key={tag}
                  sx={{ mr: 1, fontSize:"16px" }}
                  label={tag}
                  variant="outlined"
                  size="large"
                  color="primary"
                />
              ))}
            </Box>
            <Typography sx={{ fontSize: "16px", mt: 2 }}>
              {moment(props.feed.createdAt).format('llll')}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "h6.fontSize", fontWeight: "bold" }}>
            {props.feed.answers.length}
          </Typography>
          <Typography>Answers</Typography>
        </Box>
      </Box>
    </div>
  );
}

export default FeedListItem;
