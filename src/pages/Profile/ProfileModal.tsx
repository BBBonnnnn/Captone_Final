import React from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
type Props = {}

const ProfileModal = (props: Props) => {
    return (




        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Update User</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" defaultValue="example@example.com" disabled />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Phone</label>
                                <input type="text" className="form-control" id="phone" placeholder="Enter phone number" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name" placeholder="Enter name" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="birthday" className="form-label">Birthday</label>
                                <input type="date" className="form-control" id="birthday" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Gender</label>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="gender" id="male" value="true" defaultChecked />
                                    <label className="form-check-label" htmlFor="male">
                                        Male
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="gender" id="female" value="false" />
                                    <label className="form-check-label" htmlFor="female">
                                        Female
                                    </label>
                                </div>
                                
                            </div>
                            <div className="mb-3">
                                <label htmlFor="skills" className="form-label">Skills (separate with commas)</label>
                                <input type="text" className="form-control" id="skills" placeholder="Enter skills" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="certification" className="form-label">Certification (separate with commas)</label>
                                <input type="text" className="form-control" id="certification" placeholder="Enter certification" />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>




    )
}

export default ProfileModal