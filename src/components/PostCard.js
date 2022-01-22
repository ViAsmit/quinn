import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Button, Grid, Rating } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
  root: {
    border: "1px solid #d9d9d9",
    height: window.innerHeight * 0.55,
    width: "14vw",
    flexGrow: 1,
  },
  img: {
    width: "100%",
    height: window.innerHeight * 0.4,
    marginBottom: "20px",
  },
  rating: {
    marginBottom: "10px !important",
  },
  box: {
    margin: "0 5px !important",
  },
  text: {
    marginTop: "1vh !important",
  },

  "@media (max-width: 600px)": {
    root: {
      height: window.innerHeight * 0.2,
      width: "50px",
    },
    img: {
      width: "100%",
      height: "8vh",
      marginBottom: "10px",
    },
    box: {
      height: "40px !important",
      width: "40px !important",
      fontSize: "1rem !important",
    },
    rating: {
      fontSize: "1rem !important",
    },
    text: {
      fontSize: "0.5rem !important",
      fontWeight: "bold !important",
    },
  },
}));

export default function PostCard({ post }) {
  const classes = useStyle();
  console.log(post);

  const date = new Date(post.calendardatetime);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <center>
      <Card sx={{ maxWidth: 900 }}>
        <CardMedia
          component="img"
          height={window.innerHeight * 0.4}
          image={post.media[0].mediaurl}
          alt="Paella dish"
        />
        <CardContent>
          <Grid container direction={"row"} justifyContent={"space-between"}>
            {post.typeofday &&
              post.typeofday.map((type, idx) => (
                <Avatar key={idx} className={classes.box} aria-label="recipe">
                  {type
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .toUpperCase()}
                </Avatar>
              ))}
            <div style={{ flexGrow: 1 }}></div>
            <Rating
              name="read-only"
              value={post.rating}
              className={classes.rating}
              readOnly
              size={"medium"}
            />
          </Grid>
          <Typography variant="h6" align="left">
            {date.getDay() +
              " " +
              months[date.getMonth()] +
              " " +
              date.getFullYear()}
          </Typography>
          <Typography variant="bodyText2" align="left">
            {post.text.substring(0, 100) + "..."}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            style={{ width: "100%" }}
            variant="contained"
            color="primary"
            onClick={() =>
              (document.getElementById("carousel-custom").style.visibility =
                "hidden")
            }
          >
            View Full Post
          </Button>
        </CardActions>
      </Card>
    </center>
  );
}
