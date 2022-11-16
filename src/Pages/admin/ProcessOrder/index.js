import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../../../Components/Loader'
import MetaData from '../../../Components/MetaData'
import Sidebar from '../Sidebar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearErrors, getOrderDetails, updateOrder } from '../../../actions/orderActions'
import { UPDATE_ORDER_RESET } from '../../../Constants/orderConstants'
import Moment from 'react-moment'

const ProcessOrder = ({ match }) => {

    const { loading, order = {} } = useSelector(state => state.orderDetails)
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus , createdAt} = order
    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`
    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false
    const [status, setStatus] = useState('');
    const dispatch = useDispatch();
    const orderId = match.params.id;
    const { error, isUpdated } = useSelector(state => state.order)


    useEffect(() => {

        dispatch(getOrderDetails(orderId))

        if (error) {
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch(clearErrors())
        }


        if (isUpdated) {
            toast.success('Order updated successfully', {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch({ type: UPDATE_ORDER_RESET })
        }

    }, [dispatch, orderId, error, isUpdated,])

    const updateOrderHandler = (id) => {

        const formData = new FormData();
        formData.set('status', status);

        dispatch(updateOrder(id, formData))
    }

    const formatNumber = inputNumber => {
        let formetedNumber = (Number(inputNumber)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        let splitArray = formetedNumber.split('.');
        if (splitArray.length > 1) {
            formetedNumber = splitArray[0];
        }
        return (formetedNumber);
    };


    return (
        <Fragment>
            <MetaData title={`Process Order # ${order && order._id}`} />
            <ToastContainer />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        {loading ? <Loader /> : (
                            <div className='container container-fluid'>
                                <div className="row d-flex justify-content-around">
                                    <div className="col-12 col-lg-7 order-details">

                                        <h2 className="my-5">Order # {order._id}</h2>

                                        <h4 className="mb-4">Shipping Info</h4>
                                        <p><b>Name:</b> {user && user.name}</p>
                                        <p><b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}</p>
                                        <p className="mb-4"><b>Address:</b>{shippingDetails}</p>
                                        <p className="mb-4"><b>Ngày đặt hàng: </b><Moment format="DD/MM/YYYY hh:mm:ss">{createdAt}</Moment></p>
                                        <p><b>Amount:</b> {formatNumber(totalPrice)} VND</p>

                                        <hr />

                                        <h4 className="my-4">Payment</h4>
                                        <p className={isPaid ? "greenColor" : "redColor"}><b>{isPaid ? "Đã thanh toán" : "Chưa thanh toán"}</b></p>

                                        <h4 className="my-4">Stripe ID</h4>
                                        <p><b>{paymentInfo && paymentInfo.id}</b></p>

                                        <h4 className="my-4">Order Status:</h4>
                                        <p className={order.orderStatus && String(order.orderStatus).includes('Đã giao hàng') ? "greenColor" : "redColor"} ><b>{orderStatus}</b></p>


                                        <h4 className="my-4">Order Items:</h4>

                                        <hr />
                                        <div className="cart-item my-1">
                                            {orderItems && orderItems.map(item => (
                                                <div key={item.product} className="row my-5">
                                                    <div className="col-4 col-lg-2">
                                                        <img src={item.image} alt={item.name} height="45" width="65" />
                                                    </div>

                                                    <div className="col-5 col-lg-4">
                                                        <Link to={`/products/${item.product}`}>{item.name}</Link>
                                                    </div>


                                                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                        <p>{formatNumber(item.price)} VND</p>
                                                    </div>

                                                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                        <p>{item.quantity} mặt hàng</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <hr />
                                    </div>

                                    <div className="col-12 col-lg-3 mt-5">
                                        <h4 className="my-4">Trạng thái đơn hàng</h4>

                                        <div className="form-group">
                                            <select
                                                className="form-control"
                                                name='status'
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value)}
                                            >
                                                <option value="Đang xử lý">Đang xử lý</option>
                                                <option value="Đã vận chuyển">Đã vận chuyển</option>
                                                <option value="Đã giao hàng">Đã giao hàng</option>
                                            </select>
                                        </div>

                                        <button className="btn btn-primary btn-block" onClick={() => updateOrderHandler(order._id)}>
                                            Cập nhật trạng thái
                                        </button>
                                    </div>

                                </div>
                            </div>
                        )}
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default ProcessOrder