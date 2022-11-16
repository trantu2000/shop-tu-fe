import React, { Fragment, useEffect, useState } from 'react'
import './index.css'
import { Link } from 'react-router-dom'
import MetaData from '../../Components/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { register, clearErrors } from '../../actions/userActions'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import FileBase64 from 'react-file-base64';


const Register = ({ history }) => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    })
    const { name, email, password } = user;
    const dispatch = useDispatch();
    const { isAuthenticated, error, loading } = useSelector(state => state.auth);
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState(['/images/default_avatar.jpg'])
    // console.log(user);
    // console.log(avatar);
    //console.log(avatarPreview);



    useEffect(() => {

        if (isAuthenticated) {
            history.push('/')
            toast.success('Register success!', {
                position: toast.POSITION.TOP_RIGHT
            });

        }

        if (error) {
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch(clearErrors());
        }

    }, [dispatch, isAuthenticated, error, history])

    const handleChangeAvt = (e) => {
        //console.log(e.base64);
        setAvatar(e.base64)
        setAvatarPreview(e.base64)
    }

    const onChange = e => {

        setUser({ ...user, [e.target.name]: e.target.value })

    }



    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('avatar', avatar)
        // avatar.forEach(image => {
        //     formData.append('avatar', avatar)
        // })

        dispatch(register(formData))
    }

    // const onChange = e => {
    //     if (e.target.name === 'avatar') {

    //         const reader = new FileReader();

    //         reader.onload = () => {
    //             if (reader.readyState === 2) {
    //                 setAvatarPreview(reader.result)
    //                 setAvatar(reader.result)
    //             }
    //         }

    //         reader.readAsDataURL(e.target.files[0])

    //     } else {
    //         setUser({ ...user, [e.target.name]: e.target.value })
    //     }
    // }



    return (

        <Fragment>

            <div className="container container-fluid">
                <MetaData title={'Register User'} />
                <ToastContainer />
                <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                        <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data' method='post'>
                            <h1 className="mb-3">Register</h1>

                            <div className="form-group">
                                <label htmlFor="email_field">Name</label>
                                <input
                                    multiple="multiple"
                                    type="name"
                                    id="name_field"
                                    className="form-control"
                                    name='name'
                                    value={name}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email_field">Email</label>
                                <input
                                    type="email"
                                    id="email_field"
                                    className="form-control"
                                    name='email'
                                    value={email}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password_field">Password</label>
                                <input
                                    type="password"
                                    id="password_field"
                                    className="form-control"
                                    name='password'
                                    value={password}
                                    onChange={onChange}
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='avatar_upload'>Avatar</label>
                                <div className='d-flex align-items-center'>
                                    <div>
                                        <figure className='avatar mr-3 item-rtl'>
                                            <img
                                                src={avatarPreview}
                                                className='rounded-circle'
                                                alt='Avatar Preview'
                                            />
                                        </figure>
                                    </div>
                                    <div className='custom-file'>
                                        <FileBase64
                                            multiple={false}
                                            onDone={handleChangeAvt}
                                            name='avatar'
                                            value={avatar}
                                            accept="image/*"
                                            //className='custom-file-input'
                                        />
                                        
                                        {/* <input
                                            type='file'
                                            name='avatar'
                                            className='custom-file-input'
                                            id='customFile'
                                            accept="image/*"
                                            multiple={true}
                                            onChange={onChange}

                                        /> */}


                                    </div>
                                </div>
                            </div>

                            <button
                                id="register_button"
                                type="submit"
                                className="btn btn-block py-3"
                                disabled={loading ? true : false}
                            >
                                REGISTER
                            </button>
                            <div className='already'>
                                <Link to="/login" className="float-right mt-3">Already have an account?</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Register