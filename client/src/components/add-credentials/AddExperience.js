import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExperience } from '../../actions/profileActions';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

class AddExperience extends Component {

    state = {
        title:'',
        company:'',
        location:'',
        from:'',
        to:'',
        current:false,
        description:'',
        errors:{},
        disabled:false // if they click current then disable to.
    }
    static getDerivedStateFromProps (props, state) {
        if(props.errors !== state.errors) {
        return {errors: props.errors}
        }
        return null;
        }

    onSubmit(e) {
        e.preventDefault();
    
        const expData = {
          title: this.state.title,
          company: this.state.company,
          location: this.state.location,
          from: this.state.from,
          to: this.state.to,
          current: this.state.current,
          description: this.state.description
        };
    
    this.props.addExperience(expData, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }

    onCheck = (e) => {
        this.setState({ 
            current: !this.state.current,
            disabled: !this.state.disabled
         })
    }
    
    render() {
        const {errors} = this.state;
        console.log(this.state.current)
        return (
            <div className="add-experience">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                <Link className = "btn btn-light" to = "dashboard"> Back to dashboard</Link>
                  <h1 className="display-4 text-center">Add Experience</h1>
                  <p className = "lead text-center" >Add your current and previous work experience </p>
           
                  <form onSubmit={ (e)=> this.onSubmit(e) }>
                    <TextFieldGroup
                      placeholder="* Title"
                      name="title"
                      value={this.state.title}
                      onChange={ (e)=>this.onChange(e) }
                      error={errors.title}
                      info="Your current position"
                    />
                    <TextFieldGroup
                      placeholder="Company"
                      name="company"
                      value={this.state.company}
                      onChange={ (e)=>this.onChange(e) }
                      error={errors.company}
                    />
                    <TextFieldGroup
                      placeholder="Location"
                      name="location"
                      value={this.state.location}
                      onChange={ (e)=>this.onChange(e) }
                      error={errors.location}
                    />
                    <TextFieldGroup
                      placeholder="From"
                      label = "From"
                      name="from"
                      type = "date"
                      value={this.state.from}
                      onChange={ (e)=>this.onChange(e) }
                      error={errors.from}
                    />
                    <TextFieldGroup
                      placeholder="To"
                      label = "To"
                      name="to"
                      disabled = { this.state.disabled ?  'disabled' : '' }
                      type = "date"
                      value={this.state.to}
                      onChange={ (e)=>this.onChange(e) }
                      error={errors.to}
                    />

                    <div className = "form-check mb-4">
                        <input 
                            type="checkbox"
                            className = "form-check-input"
                            name = "current"
                            value = { this.state.current }
                            checked = { this.state.current }
                            onChange = { (e)=> this.onCheck(e) }
                        />
                        <label htmlFor="current" className = "form-check-label" >
                            Current Job
                        </label>
                    </div>

                    <TextAreaFieldGroup
                        placeholder="Job Description"
                        name="description"
                        value={this.state.description}
                        onChange={ (e)=> this.onChange(e) }
                        error={errors.description}
                        info="Tell us about the the position"
                    />

                        <input
                        type="submit"
                        value="Submit"
                        className="btn btn-info btn-block mt-4"
                        />
                    
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

AddExperience.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addExperience:PropTypes.func.isRequired
  };

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
  });

export default connect(mapStateToProps, {addExperience})(AddExperience);