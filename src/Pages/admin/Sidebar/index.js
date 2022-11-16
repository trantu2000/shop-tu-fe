import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

const Sidebar = () => {
    return (

        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i> Dashboard</Link>
                    </li>

                    <li>
                        <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fab fa-product-hunt"></i>Mặt hàng</a>
                        <ul className="collapse list-unstyled" id="productSubmenu">
                            <li>
                                <Link to="/admin/products"><i className="fas fa-clipboard-list"></i>Tất cả</Link>
                            </li>

                            <li>
                                <Link to="/admin/product"><i className="fas fa-clipboard-list"></i>Tạo sản phẩm mới</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link to="/admin/orders"><i className="fas fa-shopping-basket"></i>Đơn đặt hàng</Link>
                    </li>

                    <li>
                        <Link to="/admin/users"><i className="fas fa-users"></i> Người dùng</Link>
                    </li>
                    <li>
                        <Link to="/admin/reviews"><i className="fa fa-star"></i> Đánh giá</Link>
                    </li>

                </ul>
            </nav>
        </div>
    )
}

export default Sidebar