import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { StyledHome } from "./Home";
import VideoCardVert from "../components/VideoCardVert";
import VideoGrid from "../styles/VideoGrid";
import Suggestions from "../components/Suggestions";
import { getFeed } from "../actions";
import Skeleton from "../skeletons/HomeSkeleton";

const Subscriptions = ({ isFetching, videos, getFeed }) => {
  useEffect(() => {
    getFeed();
  }, [getFeed]);

  if (isFetching) {
    return <Skeleton />;
  }

  if (!isFetching && !videos.length) {
    return <Suggestions />;
  }

  return (
    <StyledHome>
      <div style={{ marginTop: "1.5rem" }}></div>
      <VideoGrid>
        {!isFetching &&
          videos.map((video) => (
            <Link key={video.id} to={`/watch/${video.id}`}>
              <VideoCardVert key={video.id} hideavatar={true} video={video} />
            </Link>
          ))}
      </VideoGrid>
    </StyledHome>
  );
};

const mapStateToProps = ({ feed }) => ({
  isFetching: feed.isFetching,
  videos: feed.videos
});

export default connect(mapStateToProps, { getFeed })(Subscriptions);
