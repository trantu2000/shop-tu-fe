import { MDBDataTable } from 'mdbreact'
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../Loader'
import MetaData from '../MetaData'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearErrors, myOrders } from '../../actions/orderActions'

const ListOrders = () => {

  const { loading, error, orders } = useSelector(state => state.myOrders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(myOrders());

    if (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT
      });
      dispatch(clearErrors())
    }
  }, [dispatch, error])

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
          field: 'numOfItems',
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
          sort: 'asc'
        },
      ],
      rows: []
    }

    orders.forEach(order => {
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `${(order.totalPrice).toLocaleString('vi', { style: 'currency', currency: 'VND' })}`,
        status: order.orderStatus && String(order.orderStatus).includes('Đã giao hàng')
          ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
          : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
        actions:
          <Link to={`/order/${order._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
      })
    })

    return data;
  }
  return (
    <Fragment>

      <MetaData title={'My Orders'} />
      <ToastContainer />
      <div className='container container-fluid'>
        <h1 className="my-5">Đơn đặt hàng của bạn</h1>

        {loading ? <Loader /> : (
          <MDBDataTable
            data={setOrders()}
            className="px-3"
            bordered
            striped
            hover
          />
        )}
      </div>



    </Fragment>
  )
}

export default ListOrders