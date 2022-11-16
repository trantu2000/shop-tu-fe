import React, { Fragment, useEffect, useState } from 'react'
import './index.css'
import MetaData from '../../Components/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../actions/productActions'
import Product from '../../Components/Product'
import Loader from '../../Components/Loader'
import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';


const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range)

const Home = ({ match, history }) => {
    const categories = [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Phone',
        'Phone13',
        'Phone14',
        'Applewatch',
        'Airpod'
    ]

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([1, 1000000000])
    const [category, setCategory] = useState('')
    const [rating, setRating] = useState(0)
    //console.log(price);

    const dispatch = useDispatch();
    const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector(state => state.products)
    const alert = useAlert();

    //console.log(products);
    // console.log(resPerPage);
    // console.log(filteredProductsCount);


    const keyword = match.params.keyword

    useEffect(() => {

        if (error) {
            //alert.success('Success')
            return alert.error(error)
        }

        dispatch(getProducts(keyword, currentPage, price, category, rating))

    }, [dispatch, alert, error, currentPage, keyword, price, category, rating])

    function setCurrentPageNo(pageNumber) {
        // history.push(`/page/${pageNumber}`)
        setCurrentPage(pageNumber)
        console.log(pageNumber);
    }




    // function setCurrentPageNo(pageNumber) {
    //     setCurrentPage(pageNumber)
    //     history.push(`/page/${pageNumber}`)
    // }

    let count = productsCount;
    if (keyword) {
        count = filteredProductsCount
    }



    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={"Home"} />
                    <div className='container container-fluid'>
                        <h1 id="products_heading">Sản phẩm nổi bật</h1>
                        <section id="products" className="container mt-5">
                            <div className="row">

                                {keyword ? (
                                    <Fragment>
                                        <div className="col-6 col-md-3 mt-5 mb-5">
                                            <div className="px-5">

                                                <Range
                                                    marks={{
                                                        1: `1đ`,
                                                        1000000000: `1000000000đ`
                                                    }}
                                                    min={1}
                                                    max={1000000000}
                                                    defaultValue={[1, 1000000000]}
                                                    tipFormatter={value => `${value}`}
                                                    tipProps={{
                                                        placement: "top",
                                                        visible: true
                                                    }}
                                                    value={price}
                                                    onChange={price => setPrice(price)}
                                                />

                                                <hr className="my-5" />

                                                <div className="mt-5">
                                                    <h4 className="mb-3">
                                                        Tìm theo thể loại
                                                    </h4>

                                                    <ul className="pl-0">
                                                        {categories.map(category => (
                                                            <li
                                                                style={{
                                                                    cursor: 'pointer',
                                                                    listStyleType: 'none'
                                                                }}
                                                                key={category}
                                                                onClick={() => setCategory(category)}
                                                            >
                                                                {category}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <hr className="my-3" />

                                                <div className="mt-5">
                                                    <h4 className="mb-3">
                                                        Tìm theo đánh giá sao
                                                    </h4>

                                                    <ul className="pl-0">
                                                        {[5, 4, 3, 2, 1].map(star => (
                                                            <li
                                                                style={{
                                                                    cursor: 'pointer',
                                                                    listStyleType: 'none'
                                                                }}
                                                                key={star}
                                                                onClick={() => setRating(star)}
                                                            >
                                                                <div className="rating-outer">
                                                                    <div className="rating-inner"
                                                                        style={{
                                                                            width: `${star * 20}%`
                                                                        }}
                                                                    >
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="col-6 col-md-9">
                                            <div className="row">
                                                {products.map(product => (
                                                    <Product key={product._id} product={product} col={4} />
                                                ))}
                                            </div>
                                        </div>
                                    </Fragment>
                                ) : (
                                    products.map(product => (
                                        <Product key={product._id} product={product} col={3} />
                                    ))
                                )}

                            </div>
                        </section>
                        {resPerPage <= count && (
                            <div className="d-flex justify-content-center mt-5">
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resPerPage}
                                    totalItemsCount={productsCount}
                                    onChange={setCurrentPageNo}
                                    nextPageText={'Next'}
                                    prevPageText={'Prev'}
                                    firstPageText={'First'}
                                    lastPageText={'Last'}
                                    itemClass="page-item"
                                    linkClass="page-link"
                                />
                            </div>
                        )}
                    </div>


                </Fragment>
            )}
        </Fragment>
    )
}

export default Home