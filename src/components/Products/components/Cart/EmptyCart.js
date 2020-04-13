import React, { Component } from 'react';
import '../../App.css';
class EmptyCart extends Component {
  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-10 mx-auto text-center text-title">
            <h1>your cart is currently empty</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default EmptyCart;
