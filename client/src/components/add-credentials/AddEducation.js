import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEducation } from '../../actions/profileActions';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';

class AddEducation extends Component {

    state = {
        school:'',
        degree:'',
        fieldofstudy:'',
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
          school: this.state.school,
          degree: this.state.degree,
          fieldofstudy: this.state.fieldofstudy,
          from: this.state.from,
          to: this.state.to,
          current: this.state.current,
          description: this.state.description
        };
    
    this.props.addEducation(expData, this.props.history);
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
    
            // Select options for status
        const degreeOptions = [
            { label: '* Select Education', value: 0 },
            { label: 'High School', value: 'High School' },
            { label: 'Associate Degree', value: 'Associate Degree' },
            { label: `Bachelor's Degree`, value: `Bachelor's Degree` },
            { label: `Master's Degree`, value: `Master's Degree` },
            { label: `Doctoral Degree`, value: `Doctoral Degree` }
        ];
        return (
            <div className="add-education">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                <Link className = "btn btn-light" to = "dashboard"> Back to dashboard</Link>
                  <h1 className="display-4 text-center">Add Education</h1>
                  <p className = "lead text-center" >Add your Education background </p>
           
                  <form onSubmit={ (e)=> this.onSubmit(e) }>
                    <TextFieldGroup
                      placeholder="Name of school"
                      name="school"
                      value={this.state.school}
                      onChange={ (e)=>this.onChange(e) }
                      error={errors.school}
                      info="What school/college/university do you attend?"
                    />
                     <SelectListGroup
                        placeholder="Degree Type"
                        name="degree"
                        value={this.state.degree}
                        onChange={ (e)=> this.onChange(e) }
                        options={degreeOptions}
                        error={errors.degree}
                     />
                    <TextFieldGroup
                      placeholder="Field of Study (ie. computing science )"
                      name="fieldofstudy"
                      value={this.state.fieldofstudy}
                      onChange={ (e)=>this.onChange(e) }
                      error={errors.fieldofstudy}
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
                            Degree in progress
                        </label>
                    </div>

                    <TextAreaFieldGroup
                        placeholder= {`Other experiences? Recognitions, awards during your time at ${this.state.school} ?`}
                        name="description"
                        value={this.state.description}
                        onChange={ (e)=> this.onChange(e) }
                        error={errors.description}
                        info="Other school experiences, ie. member of Student Services Group"
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

AddEducation.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addEducation:PropTypes.func.isRequired
  };

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
  });

export default connect(mapStateToProps, {addEducation})(AddEducation);