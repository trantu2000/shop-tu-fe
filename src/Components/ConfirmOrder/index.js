import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CheckoutSteps from '../CheckoutSteps'
import MetaData from '../MetaData'
import './index.css'

const ConfirmOrder = ({ history }) => {
    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)

    // Calculate Order Prices
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    // console.log(itemsPrice);
    const shippingPrice = itemsPrice > 10000000 ? 0 : 30000;
    //console.log(shippingPrice);
    const taxPrice = parseInt(0.01 * itemsPrice)
    const totalPrice = itemsPrice + shippingPrice + taxPrice;
    //console.log(totalPrice );

    //console.log(totalPrice);
    // zjtr-vpbc-ctns-auna-cgrx
    //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
    // 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

    const processToPayment = () => {
        const data = {
            itemsPrice: itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        }

        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        history.push('/payment')
    }

    return (
        <Fragment>

            <MetaData title={'Confirm Order'} />

            <CheckoutSteps shipping confirmOrder />

            <div className='container'>
                <div className="row d-flex justify-content-between">
                    <div className="col-12 col-lg-8 mt-5 order-confirm">

                        <h4 className="mb-3">Shipping Info</h4>
                        <p><b>Name:</b> {user && user.name}</p>
                        <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                        <p className="mb-4"><b>Address:</b> {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}</p>

                        <hr />
                        <h4 className="mt-4">Your Cart Items:</h4>

                        {cartItems.map(item => (
                            <Fragment>
                                <hr />
                                <div className="cart-item my-1" key={item.product}>
                                    <div className="row">
                                        <div className="col-2 col-lg-2">
                                            <img src={item.image} alt="Laptop" height="45" width="65" />
                                        </div>

                                        <div className="col-4 col-lg-4">
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>


                                        <div className="col-6 col-lg-6 mt-4 mt-lg-0">
                                            <p>{item.quantity} * {(item.price).toLocaleString('vi', { style: 'currency', currency: 'VND' })} = <b>{(item.quantity * item.price).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</b></p>
                                        </div>

                                    </div>
                                </div>
                                <hr />
                            </Fragment>
                        ))}



                    </div>

                    <div className="col-12 col-lg-3 my-4">
                        <div id="order_summary">
                            <h4>Thanh toán</h4>
                            <hr />
                            <p>Tiền hàng:  <span className="order-summary-values">{(itemsPrice).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span></p>
                            <p>Phí giao hàng: <span className="order-summary-values">{(shippingPrice).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span></p>
                            <p>Thuế:  <span className="order-summary-values">{(taxPrice).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span></p>

                            <hr />

                            <p>Tổng cộng: <span className="order-summary-values">{(totalPrice).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span></p>

                            <hr />
                            <button id="checkout_btn" className="btn btn-primary btn-block" onClick={processToPayment}>Tiến hành thanh toán</button>
                        </div>
                    </div>


                </div>
            </div>

        </Fragment>
    )
}

export default ConfirmOrder