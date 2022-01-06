import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Navigation(props) {
    const cartQty = props.products.length;

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <Link class="navbar-brand" to="/">
                Shopzy
                </Link>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                        <Link class="nav-link" to="/">
                            Home <span class="sr-only">(current)</span>
                        </Link>
                        </li>
                        <li class="nav-item">
                        <Link class="nav-link" to="/cart">
                            Cart<span class="badge badge-pill badge-info">{cartQty}</span>
                        </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
    }
    const mapStateToProps = (state) => {
    const products = state.CartReducer.products;
    return {
        products,
        rerender: state.CartReducer.rerender,
    };
};
export default connect(mapStateToProps)(Navigation);
