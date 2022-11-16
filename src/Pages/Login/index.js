import React, { Fragment, useEffect, useState } from 'react'
import './index.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login } from '../../actions/userActions';
import Loader from '../../Components/Loader';
import MetaData from '../../Components/MetaData';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ history,location }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // console.log(email);
    // console.log(password);

    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector(state => state.auth)

    const redirect = location.search ? location.search.split('=')[1] : '/'


    useEffect(() => {

        if (isAuthenticated) {
            history.push(redirect);
            // alert.success('Login success');
            toast.success('Login success !', {
                position: toast.POSITION.TOP_RIGHT
            });

        } 

        if (error) {
            // alert.error(error);
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch(clearErrors())
        }
    }, [dispatch, isAuthenticated, error, history,redirect])

    const submitHandle = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Login'} />
                    <ToastContainer />
                    <div className="container container-fluid">
                        <div className="row wrapper">
                            <div className="col-10 col-lg-5">
                                <form className="shadow-lg" onSubmit={submitHandle}>
                                    <h1 className="mb-3">Login</h1>
                                    <div className="form-group">
                                        <label htmlFor="email_field">Email</label>
                                        <input
                                            type="email"
                                            id="email_field"
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password_field">Password</label>
                                        <input
                                            type="password"
                                            id="password_field"
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>

                                    <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>

                                    <button
                                        id="login_button"
                                        type="submit"
                                        className="btn btn-block py-3"
                                    >
                                        LOGIN
                                    </button>

                                    <div className='new-user'>
                                        <Link to="/register" className="float-right mt-3">New User?</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Login