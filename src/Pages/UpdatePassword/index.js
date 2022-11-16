import React, { Fragment, useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword } from '../../actions/userActions'
import MetaData from '../../Components/MetaData'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearErrors } from '../../actions/productActions'
import { UPDATE_PASSWORD_RESET } from '../../Constants/userConsstants'


const UdatePassword = ({ history }) => {
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const { error, isUpdated, loading } = useSelector(state => state.user)
    const dispatch = useDispatch();

    

    useEffect(() => {

        if (error) {
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast.success('Password updated successfully', {
                position: toast.POSITION.TOP_RIGHT
            });

            history.push('/me')

            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }

    }, [dispatch, error, history, isUpdated])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('oldPassword', oldPassword);
        formData.set('password', password);

        dispatch(updatePassword(formData))
    }
    return (
        <Fragment>
            <ToastContainer />
            <MetaData title={'Change Password'} />
            <div class="container-container-fluid">
                <div class="row wrapper">
                    <div class="col-10 col-lg-5">
                        <form class="shadow-lg" onSubmit={submitHandler}>
                            <h1 class="mt-2 mb-5">Update Password</h1>
                            <div class="form-group">
                                <label for="old_password_field">Old Password</label>
                                <input
                                    type="password"
                                    id="old_password_field"
                                    class="form-control"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </div>

                            <div class="form-group">
                                <label for="new_password_field">New Password</label>
                                <input
                                    type="password"
                                    id="new_password_field"
                                    class="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <button type="submit" class="btn update-btn btn-block mt-4 mb-3" disabled={loading ? true : false}>Update Password</button>
                        </form>
                    </div>
                </div>

            </div>
        </Fragment>
    )
}

export default UdatePassword