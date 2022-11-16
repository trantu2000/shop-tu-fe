import React, { Fragment, useEffect, useState } from 'react'
import './index.css'
import MetaData from '../../Components/MetaData'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearErrors, loadUser, updateProfile } from '../../actions/userActions';
import { UPDATE_PROFILE_RESET } from '../../Constants/userConsstants';
import FileBase64 from 'react-file-base64';

const UdateProfile = ({ history }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);
    const { error, isUpdated, loading } = useSelector(state => state.user)

    useEffect(() => {

        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url)
        }

        if (error) {
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast.success('User updated successfully', {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch(loadUser());

            history.push('/me')

            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }
        // else{
        //     toast.error('update failed', {
        //         position: toast.POSITION.TOP_RIGHT
        //     });
        // }

    }, [dispatch, error, history, isUpdated, user])

    const handleChangeAvt = (e) => {
        //console.log(e.base64);
        setAvatar(e.base64)
        setAvatarPreview(e.base64)
    }

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('avatar', avatar);

        dispatch(updateProfile(formData))
    }
    // const onChange = e => {
    //     const reader = new FileReader();

    //     reader.onload = () => {
    //         if (reader.readyState === 2) {
    //             setAvatarPreview(reader.result)
    //             setAvatar(reader.result)
    //         }
    //     }

    //     reader.readAsDataURL(e.target.files[0])

    // }
    //console.log(avatar);

    return (
        <Fragment>
            <ToastContainer />
            <MetaData title={'Update Profile'} />
            <div className="container-container-fluid">
                <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                        <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                            <h1 className="mt-2 mb-5">Update Profile</h1>

                            <div className="form-group">
                                <label htmlFor="email_field">Name</label>
                                <input
                                    type="name"
                                    id="name_field"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
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
                                    onChange={(e) => setEmail(e.target.value)}
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
                                        {/* <input
                                            type='file'
                                            name='avatar'
                                            className='custom-file-input'
                                            id='customFile'
                                            accept="image/*"
                                            multiple={true}
                                            onChange={onChange}
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Avatar
                                        </label> */}
                                        <FileBase64
                                            multiple={false}
                                            onDone={handleChangeAvt}
                                            name='avatar'
                                            value={avatar}
                                            accept="image/*"
                                        //className='custom-file-input'
                                        />
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="btn update-btn btn-block mt-4 mb-3" disabled={loading ? true : false} >Update</button>
                        </form>
                    </div>
                </div>

            </div>
        </Fragment>
    )
}

export default UdateProfile