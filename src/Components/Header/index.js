import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import Search from '../Search'
import './index.css'
import { logout } from '../../actions/userActions'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Header = () => {

    const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.auth);
    //console.log(user);

    const [avatarPreview] = useState('/images/default_avatar.jpg')

    const logoutHandler = () => {

        dispatch(logout());
        toast.success('Logged out successfully.', {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    const { cartItems } = useSelector(state => state.cart)



    return (
        <Fragment>
            <ToastContainer />
            <nav className="navbar  row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                        <Link to="/">
                            <img src="/images/shopit_logo.png" alt="" />
                        </Link>

                    </div>
                </div>

                <div className="col-12 col-md-6 mt-2 mt-md-0">
                    <Route render={({ history }) => <Search history={history} />} />

                </div>

                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    <Link to="/cart" style={{ textDecoration: 'none' }}>
                        <span id="cart" className="ml-3">Cart</span>
                        <span className="ml-1" id="cart_count">{cartItems.length}</span>
                    </Link>

                    {user ? (
                        <div className="ml-4 dropdown d-inline">
                            <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                <figure className="avatar avatar-nav">
                                    {user.avatar && user.avatar.url ? (
                                        <img
                                            src={user.avatar && user.avatar.url}
                                            // alt={user && user.name}
                                            alt=""
                                            className="rounded-circle"
                                        />
                                    ) : (
                                        <img
                                            src={avatarPreview}
                                            // alt={user && user.name}
                                            alt=""
                                            className="rounded-circle"
                                        />
                                    )}

                                </figure>
                                <span>{user && user.name}</span>
                            </Link>

                            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">

                                {user && user.role === 'admin' && (
                                    <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                                )}
                                <Link className="dropdown-item" to="/orders/me">Orders</Link>
                                <Link className="dropdown-item" to="/me">Profile</Link>
                                <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
                                    Logout
                                </Link>

                            </div>


                        </div>

                    ) : !loading && <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>}


                </div>
            </nav>
        </Fragment>
    )
}

export default Header