import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../../Components/MetaData'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, resetPassword } from '../../actions/userActions';

const NewPassword = ({ history, match }) => {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch();
    const { error, success } = useSelector(state => state.forgotPassword)

    useEffect(() => {

        if (error) {
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch(clearErrors());
        }

        if (success) {
            toast.success('Password updated successfully!', {
                position: toast.POSITION.TOP_RIGHT
            });
            history.push('/login')
        }

    }, [dispatch, error, success, history])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('password', password);
        formData.set('confirmPassword', confirmPassword);

        dispatch(resetPassword(match.params.token, formData))
    }

    return (
        <Fragment>
            <MetaData title={'New password'} />
            <ToastContainer />
            <div class="container-container-fluid">
                <div class="row wrapper">
                    <div class="col-10 col-lg-5">
                        <form class="shadow-lg" onSubmit={submitHandler}>
                            <h1 class="mb-3">New Password</h1>

                            <div class="form-group">
                                <label for="password_field">Password</label>
                                <input
                                    type="password"
                                    id="password_field"
                                    class="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div class="form-group">
                                <label for="confirm_password_field">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirm_password_field"
                                    class="form-control"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            <button
                                id="new_password_button"
                                type="submit"
                                class="btn btn-block py-3">
                                Set Password
                            </button>

                        </form>
                    </div>
                </div>

            </div>
        </Fragment>
    )
}

export default NewPassword