import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from "@mui/styles";
import { Card, Grid } from "@mui/material";
import { connect } from "react-redux";

const useStyle = makeStyles((theme) => ({
  head: {
    background: "white !important",
    color: "black !important",
  },
  week: {
    zIndex: "100",
    background: "white",
    height: "3vh",
  },
}));

function Header({ header }) {
  const classes = useStyle();
  console.log(header);
  const weeks = ["S", "M", "T", "W", "T", "F", "S"];
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

  const d = new Date();
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" className={classes.head}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My Hair Diary
            </Typography>
            <Typography variant="h6" component="div">
              {months[header.getMonth()] + " " + header.getFullYear()}
            </Typography>
          </Toolbar>
          <Card elevation={0} className={classes.week} sx={{ flexGrow: 1 }}>
            <Grid
              container
              direction="row"
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ position: "fixed", fontWeight: "bold" }}
            >
              {weeks.map((day, idx) => (
                <Grid key={idx} item xs={1.71} className={classes.week}>
                  <center>{day}</center>
                </Grid>
              ))}
            </Grid>
          </Card>
        </AppBar>
      </Box>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    header: state.header,
  };
};

export default connect(mapStateToProps, null)(Header);
