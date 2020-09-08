import React from 'react';
import { connect } from 'react-redux';
import styled from "styled-components";
import { deleteComment } from "../actions";
import { DeleteIcon } from './Icons';

const Wrapper = styled.div`
  svg:hover {
    fill: #FFF;
  }
`;

const DelComment = ({deleteComment, commentId}) =>{

  const delComment = () => {
    console.log(commentId);
    deleteComment({ commentId });
  };

  return (
    <Wrapper>
      <DeleteIcon onClick={delComment} />
    </Wrapper>
  )
};

export default connect(null, { deleteComment })(DelComment);
