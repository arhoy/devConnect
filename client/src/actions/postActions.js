import axios from 'axios';

import {
    GET_POST,
    GET_POSTS,
    POST_LOADING,
    DELETE_POST,
    ADD_POST,
    GET_ERRORS,
    CLEAR_ERRORS,
  } from '../actions/types';


export const addPost = postData => dispatch => {
    dispatch(clearErrors());
    axios
        .post('/api/posts',postData)
        .then( res =>
            // console.log(res.data)
            dispatch({
                type: ADD_POST,
                payload: res.data
            })
        )
        .catch( err =>
            dispatch({
                type:GET_ERRORS,
                payload: err.response.data
            })
        );
}

export const getPosts = () => dispatch => {
    dispatch(setPostLoading());
    axios
        .get('/api/posts')
        .then( res =>
            // console.log(res.data)
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        )
        .catch( err =>
            dispatch({
                type:GET_POSTS,
                payload: null
            })
        );
}

export const getPost = id => dispatch => {
    dispatch(setPostLoading());
    axios
        .get(`/api/posts/${id}`)
        .then( res =>
            // console.log(res.data)
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        )
        .catch( err =>
            dispatch({
                type:GET_POST,
                payload: null
            })
        );
}

export const deletePost = id => dispatch => {
    axios
      .delete(`/api/posts/${id}`)
      .then( res => {
        dispatch({
          type:DELETE_POST,
          payload:id
        })
      })
      .catch( err => {
         dispatch({
           type: GET_ERRORS,
           payload: err.response.data
         })
      })
}

export const addLike = id => dispatch => {
    axios
        .post(`/api/posts/like/${id}`)
        .then( res => 
            dispatch(getPosts())
        )
        .catch( err => {
            dispatch({
              type: GET_ERRORS,
              payload: err.response.data
            })
         })
}

export const removeLike = id => dispatch => {
    axios
        .post(`/api/posts/unlike/${id}`)
        .then( res => 
            dispatch(getPosts())
        )
        .catch( err => {
            dispatch({
              type: GET_ERRORS,
              payload: err.response.data
            })
         })
}



// Set loading state
export const setPostLoading = () => {
    return {
      type: POST_LOADING
    };
  };
  
  // Clear errors
  export const clearErrors = () => {
    return {
      type: CLEAR_ERRORS
    };
  };
  
// add comment
  export const addComment = (postId, commentData)  => dispatch => {
    dispatch(clearErrors());
    axios
        .post(`/api/posts/comment/${postId}`,commentData)
        .then( res =>
            // console.log(res.data)
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        )
        .catch( err =>
            dispatch({
                type:GET_ERRORS,
                payload: err.response.data
            })
        );
}

// delete comment
export const deleteComment = (postId, commentId)  => dispatch => {
    dispatch(clearErrors());
    axios
        .delete(`/api/posts/comment/${postId}/${commentId}`)
        .then( res =>
            // console.log(res.data)
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        )
        .catch( err =>
            dispatch({
                type:GET_ERRORS,
                payload: err.response.data
            })
        );
}