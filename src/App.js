import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './Pages/Home';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import ProductDetail from './Components/ProductDetail';
import Login from './Pages/Login';
import Register from './Pages/Register';

import { loadUser } from './actions/userActions';
import store from './store'
import { useEffect, useState } from 'react';
import Profile from './Pages/Profile';
import ProtectedRoute from './Components/route/ProtectedRoute';
import UdateProfile from './Pages/UpdateProfile';
import updatePassword from './Pages/UpdatePassword';
import ForgotPassword from './Pages/ForgotPassword';
import NewPassword from './Pages/NewPassword';
import Cart from './Components/Cart';
import Dashboard from './Pages/admin/Dashboard';
import { useSelector } from 'react-redux';
import ProductList from './Pages/admin/ProductList';
import UserList from './Pages/admin/UserList';
import NewProduct from './Pages/admin/NewProduct';
import UpdateProduct from './Pages/admin/UpdateProduct';
import UpdateUser from './Pages/admin/UpdateUser';
import ProductReviews from './Pages/admin/ProductReviews';
import Shipping from './Components/Shipping';
import ConfirmOrder from './Components/ConfirmOrder';
import axios from 'axios';
import Payment from './Components/Payment';

// Payment
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import OrderSuccess from './Components/OrderSuccess';
import ListOrders from './Components/ListOrders';
import OrderDetails from './Components/OrderDetails';
import OrdersList from './Pages/admin/OrdersList';
import ProcessOrder from './Pages/admin/ProcessOrder';

function App() {

  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
    store.dispatch(loadUser())

    async function getStripApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');
      //console.log(data.stripeApiKey);
      setStripeApiKey(data.stripeApiKey)
    }

    getStripApiKey();
  }, [])


  const { user, isAuthenticated, loading } = useSelector(state => state.auth)
  return (
    <Router>
      <div className="App">
        <Header />

        <Route path="/" component={Home} exact />
        <Route path="/search/:keyword" component={Home} />
        <Route path="/page/:page" component={Home} />
        <Route path="/product/:id" component={ProductDetail} exact />

        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <ProtectedRoute path="/me" component={Profile} exact />
        <ProtectedRoute path="/me/update" component={UdateProfile} exact />
        <ProtectedRoute path="/password/update" component={updatePassword} exact />
        <Route path="/password/forgot" component={ForgotPassword} exact />
        <Route path="/password/reset/:token" component={NewPassword} exact />

        <ProtectedRoute path="/orders/me" component={ListOrders} exact />
        <ProtectedRoute path="/order/:id" component={OrderDetails} exact />


        <Route path="/cart" component={Cart} exact />
        <ProtectedRoute path="/shipping" component={Shipping} />

        <ProtectedRoute path="/confirm" component={ConfirmOrder} exact />
        <ProtectedRoute path="/success" component={OrderSuccess} />
        {stripeApiKey &&
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute path="/payment" component={Payment} />
          </Elements>
        }

        <ProtectedRoute path="/dashboard" isAdmin={true} component={Dashboard} exact />
        <ProtectedRoute path="/admin/products" isAdmin={true} component={ProductList} exact />
        <ProtectedRoute path="/admin/product" isAdmin={true} component={NewProduct} exact />
        <ProtectedRoute path="/admin/product/:id" isAdmin={true} component={UpdateProduct} exact />

        <ProtectedRoute path="/admin/users" isAdmin={true} component={UserList} exact />
        <ProtectedRoute path="/admin/user/:id" isAdmin={true} component={UpdateUser} exact />

        <ProtectedRoute path="/admin/orders" isAdmin={true} component={OrdersList} exact />
        <ProtectedRoute path="/admin/order/:id" isAdmin={true} component={ProcessOrder} exact />



        <ProtectedRoute path="/admin/reviews" isAdmin={true} component={ProductReviews} exact />



        {!loading && (!isAuthenticated || user.role !== 'admin') && (
          <Footer />
        )}
      </div>
    </Router>

  );
}

export default App;
