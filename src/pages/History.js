import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { StyledTrending } from "./Trending";
import VideoCardHoriz from "../components/VideoCardHoriz";
import { getHistory } from "../actions";
import Skeleton from "../skeletons/TrendingSkeleton";

const History = ({ nopad, isFetching, videos, getHistory }) => {
  useEffect(() => {
    getHistory();
  }, [videos.length, getHistory]);

  if (isFetching) {
    return <Skeleton />;
  }

  return (
    <StyledTrending nopad={nopad}>
      <h2>History</h2>

      {!isFetching && !videos.length && (
        <p className="secondary">
          Videos that you have watched will show up here
        </p>
      )}

      {videos.map((video) => (
        <Link to={`/watch/${video.id}`} key={video.id}>
          <VideoCardHoriz video={video} />
        </Link>
      ))}
    </StyledTrending>
  );
};

const mapStateToProps = ({ history }) => ({
  isFetching: history.isFetching,
  videos: history.videos,
});

export default connect(mapStateToProps, { getHistory })(History);
