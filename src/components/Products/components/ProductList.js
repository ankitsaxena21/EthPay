import React, { Component } from 'react';
import Product from './Product';
import Title from './title';
import '../App.css';
import { ProductConsumer } from '../context';
import { Link } from 'react-router-dom';
import { ButtonContainer } from './button';
class ProductList extends Component {
  render() {
    return (
        <div className="py-5">
          <div className="container-fluid">
            <div className="row">
              <div className="col">
            <Title name="our" title="products" />
            </div>
            <Link to="/cart" className="mr-5 nav-item">
              <ButtonContainer>
                <span className="mr-2">
                  <i className="fas fa-cart-plus" />
                </span>
                MyCart
            </ButtonContainer>
            </Link>
            </div>
            <div className="row">
              <ProductConsumer>
                {(value) => {
                  return value.products.map(product => {
                    return <Product key={product.id} product={product} />
                  })
                }}
              </ProductConsumer>
            </div>
          </div>
        </div>
    );
  }
}

export default ProductList;
