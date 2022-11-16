import React, { Fragment } from 'react'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MetaData from '../../Components/MetaData'
import { addItemToCart, removeItemFromCart } from '../../actions/cartActions'
// import { useState } from 'react'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Cart = ({ history }) => {

    const { cartItems } = useSelector(state => state.cart)
    // const [cartItems, setCartItems] = useState(true)
    const dispatch = useDispatch();

    const increaseQty = (id, quantity, stock) => {
        const newQty = quantity + 1;

        if (newQty > stock) return;

        dispatch(addItemToCart(id, newQty))
    }

    const decreaseQty = (id, quantity) => {

        const newQty = quantity - 1;

        if (newQty <= 0) return;

        dispatch(addItemToCart(id, newQty))

    }
    const removeCartItemHandler = (id) => {
        dispatch(removeItemFromCart(id))
        toast.success('Delete success !', {
            position: toast.POSITION.TOP_RIGHT
        });

    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
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
            <MetaData title={'Your Cart'} />
            <ToastContainer />
            {cartItems.length === 0 ? <h2>Bạn chưa có mặt hàng nào</h2> : (
                <Fragment>
                    <div className="container container-fluid">

                        <h2 className="mt-5">Giỏ hàng của bạn: <b>{cartItems.length} mặt hàng</b></h2>

                        <div className="row d-flex justify-content-between">
                            <div className="col-12 col-lg-8">
                                {cartItems.map(item => (
                                    <Fragment>
                                        <hr />
                                        <div className="cart-item" key={item.product}>
                                            <div className="row">
                                                <div className="col-4 col-lg-3">
                                                    <img src={item.image} alt={item.image} height="90" width="115" />
                                                </div>

                                                <div className="col-5 col-lg-3" id='card_item_name'>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </div>


                                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                    <p id="card_item_price">{(item.price).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                                                </div>

                                                <div className="col-4 col-lg-3 mt-4 mt-lg-0" id='stockCounter-item'>
                                                    <div className="stockCounter d-inline">
                                                        <span className="btn btn-danger minus" onClick={() => decreaseQty(item.product, item.quantity)}>-</span>
                                                        <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

                                                        <span className="btn btn-primary plus" onClick={() => increaseQty(item.product, item.quantity, item.stock)}>+</span>
                                                    </div>
                                                </div>

                                                <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                    <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => removeCartItemHandler(item.product)} ></i>
                                                </div>

                                            </div>
                                        </div>
                                    </Fragment>
                                ))}
                                <hr />
                            </div>

                            <div className="col-12 col-lg-3 my-4">
                                <div id="order_summary">
                                    <h4>Thanh toán</h4>
                                    <hr />
                                    <p>Số lượng :  <span className="order-summary-values">{cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)} (sản phẩm)</span></p>
                                    <p>Tổng : <span className="order-summary-values">{(cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span></p>

                                    <hr />
                                    <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkoutHandler}>Check out</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Cart

