import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { connect } from "react-redux";
import { useState } from "react";
import { addComment, updateComment } from "../actions";
import useInput from "../hooks/useInput";
import { timeSince } from "../utils";
import DelComment from './DelComment';
import { EditIcon} from './Icons';

const Wrapper = styled.div`
  margin: 1rem 0;

  h3 {
    margin-bottom: 0.8rem;
  }

  .add-comment {
    display: flex;
    align-items: center;
    margin-bottom: 2.3rem;
  }

  .add-comment textarea {
    background: inherit;
    border: none;
    border-bottom: 1px solid ${(props) => props.theme.darkGrey};
    color: ${(props) => props.theme.primaryColor};
    width: 100%;
    height: 100%;
  }

  .add-comment img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    object-fit: cover;
    margin-right: 1rem;
  }

  .comment {
    display: flex;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }

  .comment img {
    width: 40px;
    object-fit: cover;
    height: 40px;
    border-radius: 20px;
    position: relative;
    top: 2px;
    margin-right: 1rem;
  }

  .conmment-header {
    display: flex;
  }

  .buttons {
    display: flex;
  }

  svg:hover {
    fill: #FFF;
  }
`;

const Comments = ({ user, comments, addComment, updateComment, videoId }) => {
  const text = useInput("");
  const [commentId, setCommentId] = useState("");

  const handleComment = (e) => {
    if (e.keyCode === 13) {
      if (!text.value.trim()) {
        return toast.error("Please write a comment");
      }

      if (commentId) {
        updateComment({commentId, text: text.value} );
        setCommentId("");
      } else {
        addComment({ videoId, text: text.value });
      }
      
      text.setValue("");
    }
  };

  const toggleUpdateComment = (comment) => {
    setCommentId(comment.id);
    text.setValue(comment.text);
  };

  return (
    <Wrapper>
      <h3>{comments?.length} comments</h3>

      <div className="add-comment">
        <img src={user.avatar} alt="avatar" />
        <textarea
          placeholder="Add a public comment"
          value={text.value}
          onKeyDown={handleComment}
          onChange={text.onChange} />
      </div>

      {comments &&
        comments.map((comment) => (
          <div key={comment.id} className="comment">
            <Link to={`/channel/${comment.User?.id}`}>
              <img src={comment.User?.avatar} alt="avatar" />
            </Link>
            <div className="comment-info">
              <div className="conmment-header">
                <p className="secondary">
                  <span>
                    <Link to={`/channel/${comment.User?.id}`}>
                      {comment.User?.username}
                    </Link>
                  </span>
                  <span style={{ marginLeft: "0.6rem" }}>
                    {timeSince(comment.createdAt)} ago
                  </span>
                </p>

                {comment.User?.id === user.id &&
                  <div className="buttons">
                    <div style={{ marginLeft: "3rem" }}>
                      <DelComment commentId={comment.id} />
                    </div>
                    <div style={{ marginLeft: ".6rem" }}>
                      <EditIcon onClick={()=>toggleUpdateComment(comment)} />
                    </div>
                  </div>
                }
              </div>
              
              <p>{comment.text}</p>
            </div>
          </div>
        ))}
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  comments: state.video.comments,
  videoId: state.video.id,
  user: state.user,
});

export default connect(mapStateToProps, { addComment, updateComment })(Comments);
