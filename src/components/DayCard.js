import React from "react";
import { Grid, Typography, Rating, Avatar, Card } from "@mui/material";
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
    marginBottom: "10px !important",
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
      height: "20px !important",
      width: "20px !important",
      fontSize: "0.6rem !important",
    },
    rating: {
      fontSize: "0.6rem !important",
      marginBottom: "5px !important",
    },
    text: {
      fontSize: "0.5rem !important",
      fontWeight: "bold !important",
    },
  },
}));

function DayCard({ day }) {
  const date = new Date(day.date);
  const classes = useStyle();

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

  const getDate = date.getDate();
  const getMonth = date.getMonth();
  const getYear = date.getFullYear();

  return (
    <Card className={classes.root} elevation={0} sx={{ flexGrow: 1 }}>
      <Grid container direction={"column"} alignItems={"center"}>
        <Typography className={classes.text}>
          {getDate + " " + (getDate === 1 ? months[getMonth] : "")}
        </Typography>
        {day.rating && (
          <Rating
            name="read-only"
            value={day.rating}
            className={classes.rating}
            readOnly
            size={"small"}
          />
        )}
        {day.media && (
          <img
            className={classes.img}
            src={day.media[0].mediaurl}
            alt="person"
          />
        )}

        {day.typeofday && (
          <Grid container direction={"row"} justifyContent={"space-evenly"}>
            {day.typeofday.map((type, idx) => (
              <Avatar key={idx} className={classes.box} aria-label="recipe">
                {type
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase()}
              </Avatar>
            ))}
          </Grid>
        )}
      </Grid>
    </Card>
  );
}

export default DayCard;
