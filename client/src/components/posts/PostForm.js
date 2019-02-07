import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

class PostForm extends Component {
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
        const {user} = this.props.auth;
        console.log(user);
        e.preventDefault();
        console.log('post submitted!')
        const newPost = {
          text: this.state.text,
          name:user.name,
          avatar: user.avatar
        };
    
    this.props.addPost(newPost);
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
                      placeholder="Create a post"
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

PostForm.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addPost:PropTypes.func.isRequired
  };

const mapStateToProps = state => ({
    auth:state.auth,
    errors: state.errors
  });

export default connect(mapStateToProps,{ addPost })(PostForm);