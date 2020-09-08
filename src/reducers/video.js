import {
  GET_VIDEO,
  CLEAR_VIDEO,
  ADD_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  SUBSCRIBE_FROM_VIDEO,
  UNSUBSCRIBE_FROM_VIDEO,
  LIKE,
  DISLIKE,
  CANCEL_LIKE,
  CANCEL_DISLIKE
} from "../actions/types";

const initialState = {
  isFetching: true
};

const video = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEO:
      return action.payload;
    case CLEAR_VIDEO:
      return { isFetching: true };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments]
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        comments: state.comments.map(comment =>
          comment.id === action.payload.id
          ? action.payload
          : comment
       )
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== action.payload)
      };
    case SUBSCRIBE_FROM_VIDEO:
      return {
        ...state,
        isSubscribed: !state.isSubscribed
      };
    case UNSUBSCRIBE_FROM_VIDEO:
      return {
        ...state,
        isSubscribed: !state.isSubscribed
      };
    case LIKE:
      return {
        ...state,
        isLiked: action.payload.isLiked,
        likesCount: action.payload.likesCount
      };
    case DISLIKE:
      return {
        ...state,
        isDisliked: action.payload.isDisliked,
        dislikesCount: action.payload.dislikesCount
      };
    case CANCEL_LIKE:
      return {
        ...state,
        isLiked: action.payload.isLiked,
        likesCount: action.payload.likesCount
      };
    case CANCEL_DISLIKE:
      return {
        ...state,
        isDisliked: action.payload.isDisliked,
        dislikesCount: action.payload.dislikesCount
      };
    default:
      return state;
  }
};

export default video;
