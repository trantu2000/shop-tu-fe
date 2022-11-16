import { MDBDataTable } from 'mdbreact'
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { allOrders, clearErrors, deleteOrder } from '../../../actions/orderActions'
import Loader from '../../../Components/Loader'
import MetaData from '../../../Components/MetaData'
import { DELETE_ORDER_RESET } from '../../../Constants/orderConstants'
import Sidebar from '../Sidebar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const OrdersList = ({ history }) => {

  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector(state => state.allOrders);
  const { isDeleted } = useSelector(state => state.order)

  useEffect(() => {
    dispatch(allOrders());

    if (error) {
      toast.success(error, {
        position: toast.POSITION.TOP_RIGHT
      });
      dispatch(clearErrors())
    }

    if (isDeleted) {
      toast.success('Order deleted successfully !', {
        position: toast.POSITION.TOP_RIGHT
      });
      history.push('/admin/orders');
      dispatch({ type: DELETE_ORDER_RESET })
    }

  }, [dispatch, error, isDeleted, history])

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id))
  }

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: 'Order ID',
          field: 'id',
          sort: 'asc'
        },
        {
          label: 'Số lượng',
          field: 'numofItems',
          sort: 'asc'
        },
        {
          label: 'Tổng tiền',
          field: 'amount',
          sort: 'asc'
        },
        {
          label: 'Trạng thái',
          field: 'status',
          sort: 'asc'
        },
        {
          label: '#',
          field: 'actions',
        },
      ],
      rows: []
    }

    orders.forEach(order => {
      data.rows.push({
        id: order._id,
        numofItems: order.orderItems.length,
        amount: `${(order.totalPrice).toLocaleString('vi', { style: 'currency', currency: 'VND' })}`,
        status: order.orderStatus && String(order.orderStatus).includes('Đã giao hàng')
          ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
          : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
        actions: <Fragment>
          <Link to={`/admin/order/${order._id}`} className="btn btn-primary py-1 px-2">
            <i className="fa fa-eye"></i>
          </Link>

          <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteOrderHandler(order._id)}>
            <i className="fa fa-trash"></i>
          </button>
        </Fragment>
      })
    })

    return data;
  }
  return (
    <Fragment>
      <MetaData title={'All Orders'} />
      <ToastContainer />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Orders</h1>

            {loading ? <Loader /> : (
              <MDBDataTable
                data={setOrders()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}

          </Fragment>
        </div>
      </div>

    </Fragment>
  )
}

export default OrdersList