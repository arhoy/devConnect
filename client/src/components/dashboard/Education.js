import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';



class Education extends Component {

    onDeleteClick = (id) =>{
        this.props.deleteEducation(id);
    }
    render() {
        // const education = this.props.education;
        const education = this.props.education.map(edu=>(
            <tr key = {edu._id}>
                <td>{edu.school}</td>
                <td> <div>{edu.degree} </div>{edu.fieldofstudy}<div></div> </td>
                <td>

                <Moment format="MMM YYYY">{edu.from}</Moment> - 
                {edu.to === null ? (
                    <div>
                        'Now'
                    </div>
                    
                ) : (
                    <div>
                      <Moment format="MMM YYYY">{edu.to}</Moment> 
                    </div>
                )}
                </td>
                <td>
                    <button
                        onClick={this.onDeleteClick.bind(this, edu._id)}
                        className="btn btn-danger"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        ));

        console.log(education)
        return (
            <div>
                <h4 className = "mb-4">Education Credentials</h4>
                <table className = "table" >

                    <thead>
                        <tr>
                            <th>School</th>
                            <th>Degree</th>
                            <th>Years</th>
                        </tr>
                    </thead>
                    <tbody>
                    {education}
                    </tbody>
                </table>
            </div>
        );
    }
}

Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, {deleteEducation})(Education);