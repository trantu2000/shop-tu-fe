import React, { Fragment, useEffect } from 'react'
import MetaData from '../../Components/MetaData'
import CheckoutSteps from '../CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux'

import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearErrors, createOrder } from '../../actions/orderActions'


const options = {
  style: {
    base: {
      fontSize: '16px'
    },
    invalid: {
      color: '#9e2146'
    }
  }
}





const Payment = ({ history }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();


  const { user } = useSelector(state => state.auth)

  const { cartItems, shippingInfo } = useSelector(state => state.cart);
  const { error } = useSelector(state => state.newOrder)

  const order = {
    orderItems: cartItems,
    shippingInfo
  }

  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice
    order.shippingPrice = orderInfo.shippingPrice
    order.taxPrice = orderInfo.taxPrice
    order.totalPrice = orderInfo.totalPrice
  }

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice)
  }

  //console.log(orderInfo);

  useEffect(() => {

    if (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT
      });
      dispatch(clearErrors())
    }

  }, [dispatch, error])

  const submitHandler = async (e) => {
    e.preventDefault();

    document.querySelector('#pay_btn').disabled = true;

    let res;
    try {

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      res = await axios.post('/api/v1/payment/process', paymentData, config)

      const clientSecret = res.data.client_secret;

      //console.log(clientSecret);

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email
          }
        }
      });

      if (result.error) {
        toast.error(result.error.message, {
          position: toast.POSITION.TOP_RIGHT
        });
        //console.log(result.error.message);


        document.querySelector('#pay_btn').disabled = false;
      } else {

        // The payment is processed or not
        if (result.paymentIntent.status === 'succeeded') {

          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status
          }

          dispatch(createOrder(order))
          toast.success('Order success !', {
            position: toast.POSITION.TOP_RIGHT
          });

          history.push('/success')
        } else {
          toast.error('There is some issue while payment processing !', {
            position: toast.POSITION.TOP_RIGHT
          });
          console.log('There is some issue while payment processing !');
        }
      }
      


    } catch (error) {
      document.querySelector('#pay_btn').disabled = false;
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_RIGHT
      });
      console.log(error.response.data.message);


    }
  }

  return (
    <Fragment>
      <MetaData title={'Payment'} />
      <ToastContainer />
      <CheckoutSteps shipping confirmOrder payment />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">


          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Card Info</h1>

            <div className="form-group">
              <label htmlFor="card_num_field">Card Number</label>
              <CardNumberElement
                type="text"
                id="card_num_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <CardExpiryElement
                type="text"
                id="card_exp_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <CardCvcElement
                type="text"
                id="card_cvc_field"
                className="form-control"
                options={options}
              />
            </div>


            <button
              id="pay_btn"
              type="submit"
              className="btn btn-block py-3"
            // disabled={!stripe}
            >
              Thanh toán {` - ${orderInfo && (orderInfo.totalPrice).toLocaleString('vi', { style: 'currency', currency: 'VND' })}`}
              
            </button>

          </form>
        </div>
      </div>

    </Fragment>
  )
}

export default Payment