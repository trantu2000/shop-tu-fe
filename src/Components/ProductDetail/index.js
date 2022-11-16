import './ProductDetail.css'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getProductDetail, newReview } from '../../actions/productActions';
import Loader from '../Loader';
import { Carousel } from 'react-bootstrap'
import MetaData from '../../Components/MetaData'
import { addItemToCart } from '../../actions/cartActions';
import CurrencyFormat from 'react-currency-format';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Reviews from '../Reviews';
import { NEW_REVIEW_RESET } from '../../Constants/productConstants';


const ProductDetail = ({ match }) => {
    const [quantity, setQuantity] = useState(1)

    const dispatch = useDispatch();
    const { loading, error, product } = useSelector(state => state.productdetail);

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const { user } = useSelector(state => state.auth)
    const { error: reviewError, success } = useSelector(state => state.newReview)

    // console.log(comment);
    // console.log(rating);


    useEffect(() => {
        dispatch(getProductDetail(match.params.id))

        if (error) {
            // alert.error(error);
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch(clearErrors())
        }
        if (reviewError) {
            toast.error(reviewError, {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch(clearErrors())
        }

        if (success) {
            toast.success('Reivew posted successfully !', {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch({ type: NEW_REVIEW_RESET })
        }
    }, [dispatch, error, match.params.id, success, reviewError])

    // console.log(match.params.id);
    // console.log(product);



    const decreaseQty = () => {
        const count = document.querySelector('.count')
        if (count.valueAsNumber <= 1) return;
        const qty = count.valueAsNumber - 1;
        setQuantity(qty)
    }

    const increaseQty = () => {
        const count = document.querySelector('.count')
        if (count.valueAsNumber >= product.stock) return;
        const qty = count.valueAsNumber + 1;
        setQuantity(qty)
    }

    const addToCart = () => {
        dispatch(addItemToCart(match.params.id, quantity));
        toast.success('Item Added to Cart !', {
            position: toast.POSITION.TOP_RIGHT
        });
        // console.log(quantity);
        // console.log(match.params.id);
    }

    function setUserRatings() {
        const stars = document.querySelectorAll('.star');

        stars.forEach((star, index) => {
            star.starValue = index + 1;

            ['click', 'mouseover', 'mouseout'].forEach(function (e) {
                star.addEventListener(e, showRatings);
            })
        })

        function showRatings(e) {
            stars.forEach((star, index) => {
                if (e.type === 'click') {
                    if (index < this.starValue) {
                        star.classList.add('orange');

                        setRating(this.starValue)
                    } else {
                        star.classList.remove('orange')
                    }
                }

                if (e.type === 'mouseover') {
                    if (index < this.starValue) {
                        star.classList.add('yellow');
                    } else {
                        star.classList.remove('yellow')
                    }
                }

                if (e.type === 'mouseout') {
                    star.classList.remove('yellow')
                }
            })
        }
    }



    const reviewHandler = () => {
        const formData = new FormData();

        formData.set('rating', rating);
        formData.set('comment', comment);
        formData.set('productId', match.params.id);

        dispatch(newReview(formData));
    }
    // const formatNumber = inputNumber => {
    //     let formetedNumber = (Number(inputNumber)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    //     let splitArray = formetedNumber.split('.');
    //     if (splitArray.length > 1) {
    //         formetedNumber = splitArray[0];
    //     }
    //     return (formetedNumber);
    // };

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={product.name} />
                    <ToastContainer />
                    <div className="row f-flex justify-content-around">
                        <div className="col-12 col-lg-5 img-fluid" id="product_image">
                            <Carousel pause='hover'>
                                {product.images && product.images.map(image => (
                                    <Carousel.Item key={image.public_id}>
                                        <img className="d-block w-100" src={image.url} alt={product.title} />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>

                        <div className="col-12 col-lg-5 mt-5">
                            <h3>{product.name}</h3>
                            <p id="product_id">Id: {product._id}</p>

                            <hr />

                            <div className="rating-outer">
                                <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                            </div>
                            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

                            <hr />

                            {/* <p id="product_price">{product.price},000,000 đ</p> */}
                            <div className='cart-text-detail'>
                                {product && product.pricedecrease && product.pricedecrease !== 0 ? (
                                    <>
                                        {/* <div className="card-text-root-price">
                                            <p >{(product.price).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                                        </div>
                                        <div className="card-text-decrease-price">
                                            <p >(<strike>{(p.toLocaleString('vi', { style: 'currency', currency: 'VND' })roduct.pricedecrease)}</strike>)</p>
                                        </div> */}

                                        <div className='cart-text-container'>
                                            <div className="card-text-root-price">

                                                <div className='card-text-money'>
                                                    <div className='card-CurrencyFormat'>
                                                        <CurrencyFormat
                                                            value={(product.price)}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                        />
                                                    </div>
                                                    <div className='card-money'>
                                                        đ
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-text-decrease-price">
                                                <p >
                                                    <div className='card-text-money'>
                                                        (
                                                        <div className='card-CurrencyFormat'>
                                                            <CurrencyFormat
                                                                value={(product.pricedecrease)}
                                                                displayType={'text'}
                                                                thousandSeparator={true}
                                                            />
                                                        </div>

                                                        <div className='card-money'>
                                                            đ
                                                        </div>
                                                        )
                                                    </div>
                                                </p>
                                            </div>
                                        </div>
                                    </>

                                ) : (

                                    <>
                                        {/* <div className="card-text-root-price">
                                        <p >{(product.price).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                                    </div>
                                    <div className="card-text-decrease-price">
                                        <p >(<strike>{(product.pricedecrease).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</strike>)</p>
                                    </div> */}

                                        <div className='cart-text-container'>
                                            <div className="card-text-root-price">
                                                <div className='card-text-money'>
                                                    <div className='card-CurrencyFormat'>
                                                        <CurrencyFormat
                                                            value={(product.price)}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                        />
                                                    </div>
                                                    <div className='card-money'>
                                                        đ
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}

                            </div>

                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                                <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                                <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                            </div>
                            <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" disabled={product.stock === 0} onClick={addToCart}>Thêm vào giỏ hàng</button>

                            <hr />

                            <p>Status: <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'}> {product.stock > 0 ? 'Còn hàng' : 'Hết hàng'}</span></p>

                            <hr />

                            <h4 className="mt-2">Thông tin sản phẩm:</h4>
                            <p>{product.description}</p>
                            <hr />
                            <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>


                            {user ? <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal" onClick={setUserRatings}>
                                Gửi đánh giá
                            </button>
                                :
                                <div className="alert alert-danger mt-5" type='alert'>Đăng nhập để đăng đánh giá của bạn.</div>
                            }


                            <div className="row mt-2 mb-5">
                                <div className="rating w-50">

                                    <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">

                                                    <ul className="stars" >
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                    </ul>

                                                    <textarea
                                                        name="review"
                                                        id="review" className="form-control mt-3"
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                    >

                                                    </textarea>

                                                    <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close" onClick={reviewHandler} >Đánh giá</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                        {product.reviews && product.reviews.length > 0 && (
                            <Reviews reviews={product.reviews} />
                        )}
                    </div>

                </Fragment>
            )
            }
        </Fragment>





    )
}
export default ProductDetail