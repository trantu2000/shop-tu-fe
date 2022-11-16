import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearErrors, getOrderDetails } from '../../actions/orderActions'
import Loader from '../Loader'
import MetaData from '../MetaData'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Moment from 'react-moment'


const OrderDetails = ({ match }) => {
    const { loading, error, order = {} } = useSelector(state => state.orderDetails)
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus, createdAt } = order

    // const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    // const cdate = (new Date()).toLocaleDateString('vn', createdAt)



    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrderDetails(match.params.id));

        if (error) {
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch(clearErrors())
        }
    }, [dispatch, error, match.params.id])

    const formatNumber = inputNumber => {
        let formetedNumber = (Number(inputNumber)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        let splitArray = formetedNumber.split('.');
        if (splitArray.length > 1) {
            formetedNumber = splitArray[0];
        }
        return (formetedNumber);
    };


    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`
    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false

    return (
        <Fragment>
            <MetaData title={'Order Details'} />
            <ToastContainer />

            {loading ? <Loader /> : (
                <Fragment>
                    <div className='container container-fluid'>
                        <div className="row d-flex justify-content-between">
                            <div className="col-12 col-lg-8 mt-5 order-details">

                                <h1 className="my-5">Mã ĐH # {order._id}</h1>

                                <h4 className="mb-4">Thông tin vận chuyển đơn hàng</h4>
                                <p><b>Họ và tên: </b> {user && user.name}</p>
                                <p><b>Số điện thoại: </b> {shippingInfo && shippingInfo.phoneNo}</p>
                                <p className="mb-4"><b>Địa chỉ: </b>{shippingDetails}</p>
                                <p className="mb-4"><b>Ngày đặt hàng: </b><Moment format="DD/MM/YYYY hh:mm:ss">{createdAt}</Moment></p>
                                {/* <p className="mb-4"><b>Ngày đặt hàng: </b>
                                    <Moment parse="DD-MM-YYYY HH:mm">
                                        {createdAt}
                                    </Moment>
                                </p> */}
                                <p><b>Tổng tiền: </b>{formatNumber(totalPrice)} VND</p>

                                <hr />

                                <h4 className="my-4">Thanh toán</h4>
                                <p className={isPaid ? "greenColor" : "redColor"}><b>{isPaid ? "Đã thanh toán" : "Chưa thanh toán"}</b></p>


                                <h4 className="my-4">Trạng thái đơn hàng:</h4>
                                <p className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? "greenColor" : "redColor"} ><b>{orderStatus}</b></p>


                                <h4 className="my-4">Các mặt hàng:</h4>

                                <hr />
                                <div className="cart-item my-1">
                                    {orderItems && orderItems.map(item => (
                                        <div key={item.product} className="row my-5">
                                            <div className="col-4 col-lg-2">
                                                <img src={item.image} alt={item.name} height="45" width="65" />
                                            </div>

                                            <div className="col-5 col-lg-3">
                                                <Link to={`/products/${item.product}`}>{item.name}</Link>
                                            </div>


                                            <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                                <p>{formatNumber(item.price)} VND</p>
                                            </div>

                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <p>{item.quantity} Mặt hàng</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <hr />
                            </div>
                        </div>
                    </div>

                </Fragment>
            )}

        </Fragment>
    )
}

export default OrderDetails