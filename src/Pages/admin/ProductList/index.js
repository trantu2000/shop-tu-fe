import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../../../Components/MetaData'
import Sidebar from '../Sidebar'
import Loader from '../../../Components/Loader';
import { MDBDataTable } from 'mdbreact'
import { getAdminProducts, deleteProduct, clearErrors } from '../../../actions/productActions'
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DELETE_PRODUCT_RESET } from '../../../Constants/productConstants';

const ProductList = ({ history }) => {

    const { loading, products,error } = useSelector(state => state.products);
    const { error: deleteError, isDeleted } = useSelector(state => state.product)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAdminProducts());

        if (error) {
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch(clearErrors())
        }

        if (deleteError) {
            toast.error(deleteError, {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch(clearErrors())
        }

        if (isDeleted) {
            toast.success('Product deleted successfully !', {
                position: toast.POSITION.TOP_RIGHT
            });
            history.push('/admin/products');
            dispatch({ type: DELETE_PRODUCT_RESET })

        }

    }, [dispatch,error, deleteError, isDeleted, history])
    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Tên mặt hàng',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Giá gốc',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Giá khuyến mãi',
                    field: 'pricedecrease',
                    sort: 'asc'
                },
                
                {
                    label: 'Hàng trong kho',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: '#',
                    field: 'actions',
                },
            ],
            rows: []
        }
        products.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `${(product.price).toLocaleString('vi', { style: 'currency', currency: 'VND' })}`,
                stock: product.stock,
                pricedecrease: `${(product.pricedecrease).toLocaleString('vi', { style: 'currency', currency: 'VND' })}`,
                actions: <Fragment>
                    <Link to={`/admin/product/${product._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteProductHandler(product._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }
    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }


    return (
        <Fragment>
            <MetaData title={'All Products'} />
            <ToastContainer />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">Danh sách mặt hàng</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setProducts()}
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

export default ProductList