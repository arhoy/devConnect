import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addComment } from '../../actions/postActions';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

class CommentForm extends Component {
    state = {
        text:'',
        errors:{}
    }

    static getDerivedStateFromProps (props, state) {
        if(props.errors !== state.errors) {
        return {errors: props.errors}
        }
        return null;
        }

    onSubmit(e) {
        
        const { user } = this.props.auth;
        const { postId } = this.props;
        e.preventDefault();
        const newComment = {
          text: this.state.text,
          name:user.name,
          avatar:user.avatar
        };
    
    this.props.addComment(postId, newComment);
    // clear the form
    this.setState({text:''});
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
    
        const { errors } = this.state;
        return (
            <div className="post-form mb-3">
            <div className="card card-info">
              <div className="card-header bg-info text-white">Say Somthing...</div>
              <div className="card-body">
                <form onSubmit={ (e)=> this.onSubmit(e) }>
                  <div className="form-group">
                    <TextAreaFieldGroup
                      placeholder="Add a comment"
                      name="text"
                      value={this.state.text}
                      onChange={ (e)=> this.onChange(e)}
                      error={errors.text}
                    />
                  </div>
                  <button type="submit" className="btn btn-dark">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        );
    }
}

CommentForm.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addComment:PropTypes.func.isRequired
  };

const mapStateToProps = state => ({
    auth:state.auth,
    errors: state.errors
  });

export default connect(mapStateToProps,{ addComment })(CommentForm);