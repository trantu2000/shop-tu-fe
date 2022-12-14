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

                                <h1 className="my-5">M?? ??H # {order._id}</h1>

                                <h4 className="mb-4">Th??ng tin v???n chuy???n ????n h??ng</h4>
                                <p><b>H??? v?? t??n: </b> {user && user.name}</p>
                                <p><b>S??? ??i???n tho???i: </b> {shippingInfo && shippingInfo.phoneNo}</p>
                                <p className="mb-4"><b>?????a ch???: </b>{shippingDetails}</p>
                                <p className="mb-4"><b>Ng??y ?????t h??ng: </b><Moment format="DD/MM/YYYY hh:mm:ss">{createdAt}</Moment></p>
                                {/* <p className="mb-4"><b>Ng??y ?????t h??ng: </b>
                                    <Moment parse="DD-MM-YYYY HH:mm">
                                        {createdAt}
                                    </Moment>
                                </p> */}
                                <p><b>T???ng ti???n: </b>{formatNumber(totalPrice)} VND</p>

                                <hr />

                                <h4 className="my-4">Thanh to??n</h4>
                                <p className={isPaid ? "greenColor" : "redColor"}><b>{isPaid ? "???? thanh to??n" : "Ch??a thanh to??n"}</b></p>


                                <h4 className="my-4">Tr???ng th??i ????n h??ng:</h4>
                                <p className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? "greenColor" : "redColor"} ><b>{orderStatus}</b></p>


                                <h4 className="my-4">C??c m???t h??ng:</h4>

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
                                                <p>{item.quantity} M???t h??ng</p>
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