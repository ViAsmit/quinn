import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./Carousal.css";
import PostCard from "./PostCard";

function CarousalWidget({ posts, state }) {
  return (
    <center
      id="carousel-custom"
      style={{
        background: "black",
        position: "fixed",
        zIndex: "5",
        width: "100%",
        height: "100%",
        visibility: state.show ? "visible" : "hidden",
      }}
    >
      <Carousel
        selectedItem={state.index}
        className="root"
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
      >
        {posts.map((post, idx) => (
          <PostCard key={idx} post={post} />
        ))}
        {/* <PostCard />
        <PostCard />
        <PostCard />
        <PostCard /> */}
      </Carousel>
    </center>
  );
}

export default CarousalWidget;
