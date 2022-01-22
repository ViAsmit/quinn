import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import Header from "./components/Header";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import DayCard from "./components/DayCard";
import quinnBody from "./quinnBody";
import { setHeaderDate } from "./actions/headerAction";
import { connect } from "react-redux";
import CarousalWidget from "./components/Carousal";

const useStyle = makeStyles((theme) => ({
  root: {},
  scroll: {
    marginTop: "12vh",
  },
  day: {
    height: "45vh",
    display: "inline-block",
    margin: "0px",
    padding: "0px",
  },
  "@media (max-width: 600px)": {
    day: {
      height: "20vh",
    },
  },
}));

var token = null;
var lastDate = new Date();
var posts = [];

function App({ setDate }) {
  const classes = useStyle();
  const [state, setState] = useState({
    dayList: [],
    endDate: new Date(),
  });

  const [car, setCar] = useState({
    show: false,
    index: 0,
  });

  const getDaysArray = function (start, end) {
    for (
      var arr = [], dt = new Date(start);
      dt >= end;
      dt.setDate(dt.getDate() - 1)
    ) {
      arr.push({
        date: new Date(dt),
      });
    }
    return arr;
  };

  const handleClick = (idx) => {
    setCar({
      show: !car.show,
      index: idx,
    });
  };

  const fetchMoreData = async () => {
    console.log("CURRENT MONTH", state.endDate);
    setDate(state.endDate);

    const newEndDate = new Date(
      state.endDate.getTime() - 30 * 24 * 60 * 60 * 1000
    );
    const allDays = getDaysArray(state.endDate, newEndDate);

    if (allDays[allDays.length - 1].date.getTime() < lastDate.getTime()) {
      const response = await fetch("https://api.quinn.care/graph", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quinnBody(token)),
      });
      const data = await response.json();

      posts = data.responseobjects[0].posts;

      token = data.responseobjects[0].continuationtoken;
      lastDate = new Date(posts[posts.length - 1].calendardatetime);
    }

    allDays.forEach((d) => {
      const idx = posts.findIndex((p) => {
        const d1 = new Date(p.calendardatetime);
        const d2 = new Date(d?.date);
        return d1.toDateString() === d2.toDateString();
      });
      if (idx !== -1) {
        d.media = posts[idx].media;
        d.text = posts[idx].text;
        d.rating = posts[idx].rating;
        d.typeofday = posts[idx].typeofday;
        d.calendardatetime = posts[idx].calendardatetime;
      }
    });
    setState((state) => ({
      dayList: [...state.dayList, ...allDays],
      endDate: new Date(newEndDate.getTime() + 24 * 60 * 60 * 1000),
    }));
  };

  return (
    <>
      <Header />
      <CarousalWidget posts={posts} state={car} />
      <InfiniteScroll
        className={classes.scroll}
        loadMore={fetchMoreData}
        hasMore={true}
        loader={<h1 key={0}>Loading...</h1>}
        initialLoad={true}
        threshold={window.innerHeight * 0.4}
      >
        {console.log(state.dayList.length)}
        {state.dayList.map((day, idx) => (
          <Grid key={idx} item xs={1.71} className={classes.day}>
            <div onClick={() => handleClick(idx)}>
              <DayCard day={day} />
            </div>
          </Grid>
        ))}
      </InfiniteScroll>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDate: (date) => dispatch(setHeaderDate(date)),
  };
};

export default connect(null, mapDispatchToProps)(App);
