import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../../../Components/MetaData'
import Sidebar from '../Sidebar'
import { updateProduct, getProductDetail, clearErrors } from '../../../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_PRODUCT_RESET } from '../../../Constants/productConstants'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import FileBase64 from 'react-file-base64';
import CurrencyFormat from 'react-currency-format'



const UpdateProduct = ({ match, history }) => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);

    const [pricedecrease, setPriceDecrease] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState('');
    const [images, setImages] = useState([]);

    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([])

    const { error, product } = useSelector(state => state.productdetail)
    const dispatch = useDispatch();
    const { loading, error: updateError, isUpdated } = useSelector(state => state.product);

    const productId = match.params.id;
    console.log(price);

    useEffect(() => {

        if (product && product._id !== productId) {
            dispatch(getProductDetail(productId));
        } else {
            setName(product.name);
            setPrice(product.price);
            setPriceDecrease(product.pricedecrease);
            setDescription(product.description);
            setCategory(product.category);
            setSeller(product.seller);
            setStock(product.stock)
            setOldImages(product.images)
        }

        if (error) {
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch(clearErrors())
        }

        if (updateError) {
            toast.error(updateError, {
                position: toast.POSITION.TOP_RIGHT
            });

            dispatch(clearErrors())
        }


        if (isUpdated) {
            history.push('/admin/products');
            toast.success('Product updated successfully !', {
                position: toast.POSITION.TOP_RIGHT
            });

            dispatch({ type: UPDATE_PRODUCT_RESET })
        }

    }, [dispatch, error, isUpdated, history, updateError, product, productId])

    const categories = [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Phone',
        'Phone13',
        'Phone14',
        'Applewatch',
        'Airpod'
    ]
    // console.log(images);

    const onChange = (e) => {

        setImagesPreview(oldArray => [...oldArray, e.base64])
        setImages(oldArray => [...oldArray, e.base64])
    }

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('price', price);
        formData.set('pricedecrease', pricedecrease);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('stock', stock);
        formData.set('seller', seller);

        images.forEach(image => {
            formData.append('images', image)
        })

        dispatch(updateProduct(product._id, formData))
    }
    return (
        <Fragment>
            <MetaData title={'Update Product'} />
            <ToastContainer />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">Update Product</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price_field">Giá gốc</label>
                                    <CurrencyFormat

                                        id="price_field"
                                        className="form-control"
                                        thousandSeparator={true}
                                        // prefix={'(VND) '}
                                        name="price"
                                        value={price}
                                        onChange={(e) => setPrice(parseInt((e.target.value)?.replace(/,/g, "")))}
                                    />

                                    {/* <input
                                        type="text"
                                        id="price_field"
                                        className="form-control"

                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    /> */}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price_field">Giá khuyến mãi</label>
                                    {/* <input
                                        type="text"
                                        id="pricedecrease_field"
                                        className="form-control"
                                        value={pricedecrease}
                                        onChange={(e) => setPriceDecrease(e.target.value)}
                                    /> */}
                                    <CurrencyFormat
                                        className="form-control"
                                        id="pricedecrease_field"
                                        thousandSeparator={true}
                                        // prefix={'(VND) '}
                                        value={pricedecrease}
                                        onChange={(e) => setPriceDecrease(parseInt((e.target.value)?.replace(/,/g, "")))}
                                    />
                                </div>


                                <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea className="form-control" id="description_field" rows="8" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Category</label>
                                    <select className="form-control" id="category_field" value={category} onChange={(e) => setCategory(e.target.value)}>
                                        {categories.map(category => (
                                            <option key={category} value={category} >{category}</option>
                                        ))}

                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stock_field">Stock</label>
                                    <input
                                        type="number"
                                        id="stock_field"
                                        className="form-control"
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="seller_field">Seller Name</label>
                                    <input
                                        type="text"
                                        id="seller_field"
                                        className="form-control"
                                        value={seller}
                                        onChange={(e) => setSeller(e.target.value)}
                                    />
                                </div>

                                <div className='form-group'>
                                    <label>Images</label>

                                    <div className='custom-file'>
                                        <FileBase64
                                            multiple={false}
                                            onDone={onChange}
                                            name='images'
                                            value={images}
                                            accept="image/*"
                                        />
                                        {/* <input
                                            type='file'
                                            name='product_images'
                                            className='custom-file-input'
                                            id='customFile'
                                            onChange={onChange}
                                            multiple
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Images
                                        </label> */}
                                    </div>
                                    <div>
                                        <h5>Ảnh cũ</h5>
                                        {oldImages && oldImages.map(img => (
                                            <img key={img} src={img.url} alt={img.url} className="mt-3 mr-2" width="55" height="52" />
                                        ))}
                                    </div>
                                    <div>
                                        <h5>Ảnh mới</h5>
                                        {imagesPreview.map(img => (
                                            <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                        ))}
                                    </div>





                                </div>


                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    UPDATE
                                </button>

                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default UpdateProduct