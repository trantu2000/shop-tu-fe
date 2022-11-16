import React from 'react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../MetaData'
import './index.css'

const OrderSuccess = () => {
    return (
        <Fragment>

            <MetaData title={'Order Success'} />

            <div className="row justify-content-center order-success">
                <div className="col-6 mt-5 text-center">
                    <img className="my-5 img-fluid d-block mx-auto" src="/images/order_success.png" alt="Order Success" width="200" height="200" />

                    <h2>Đơn hàng của bạn đã được đặt thành công.</h2>

                    <Link to="/orders/me">Xem đơn đặt đơn đặt hàng.</Link>
                </div>

            </div>

        </Fragment>
    )
}

export default OrderSuccess