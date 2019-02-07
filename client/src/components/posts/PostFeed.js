import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';

class PostFeed extends Component {
  render() {
    const { posts, showActions } = this.props;

    return posts.map(post => <PostItem key={post._id} post={post} showActions = {showActions} />);
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeed;
