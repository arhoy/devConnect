import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {getPost} from '../../actions/postActions';
import Spinner from '../common/Spinner';
import PostItem from '../posts/PostItem';
import CommentFeed from './CommentFeed';
import CommentForm from './CommentForm';

class Post extends Component {
    componentDidMount() {
        const postId = this.props.match.params.post;
        if(postId){
            this.props.getPost(postId)
        }
    }
    
    render() {
        const { post, loading } = this.props.post;
        let postContent;

        if (post === null || loading || !Object.keys(post).length) {
          postContent = <Spinner />;
        } else {
          postContent = (
              <div>
                <h1>This is an awesome post</h1>
                <p>{post.text}</p>
                <PostItem post = {post} showActions = {false} />
                <CommentForm postId={post._id} />
                <CommentFeed postId = { post._id } comments = { post.comments }  />
              </div>
          )
        }

        return (
            <div className="post">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <Link to="/feed" className="btn btn-light mb-3">
                    Back To Feed
                  </Link>
                  {postContent}
                </div>
              </div>
            </div>
          </div>
        );
    }
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    post: state.post
  });


export default connect(mapStateToProps, { getPost })(Post);