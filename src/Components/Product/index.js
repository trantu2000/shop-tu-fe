import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { Link } from 'react-router-dom'
import './index.css'


const Product = ({ product, col }) => {


    return (
        <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
            <div className="card p-3 rounded">
                <img
                    className="card-img-top mx-auto"
                    src={product.images[0].url}
                    alt=''
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </h5>
                    {/* <div className='cart-text'>
                        {product && product.pricedecrease && product.pricedecrease !== 0 ? (
                            <>
                                <p className="card-text-decrease-price">{(product.price).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                                <p className="card-text-root-price">(<strike>{(product.pricedecrease).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</strike>)</p>
                            </>

                        ) : (
                            <p className="card-text-decrease-price">{(product.price).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                        )}

                    </div> */}

                    <div className='cart-text'>
                        {product && product.pricedecrease && product.pricedecrease !== 0 ? (
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

                    <div className="ratings mt-auto">
                        <div className="rating-outer">
                            <div className="rating-inner" style={{
                                width: `${(
                                    product.ratings / 5) * 100
                                    }%`
                            }}></div>
                        </div>
                        <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                    </div>
                    <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">Xem chi tiết</Link>
                </div>
            </div>
        </div>
    )
}

export default Product