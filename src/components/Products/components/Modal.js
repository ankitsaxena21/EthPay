import React, { Component } from 'react';
import styled from 'styled-components';
import { ProductConsumer } from '../context';
import { ButtonContainer } from './button';
import { Link } from 'react-router-dom';
class Modal extends Component {
  render() {
    return (
      <div>
      <ProductConsumer>
        {(value) => {
          const { modalOpen, closeModal } = value;
          const { img, title, price } = value.modalProduct;
          if (!modalOpen) {
            return null;
          } else {
            return (<ModalContainer>
              <div className="container-fluid mt-4">
                <div className="row">
                  <div id="modal" className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize p-5">
                    <h5>item added to the cart</h5>
                    <img src={img} className="img-fluid" alt="product" />
                    <h5>{title}</h5>
                    <h5 className="text-muted">price : {price} ANK</h5>
                    <Link to="/products">
                      <ButtonContainer onClick={()=>closeModal()}>
                        Store
                      </ButtonContainer>
                    </Link>
                    <Link to="/cart">
                      <ButtonContainer cart onClick={()=>closeModal()}>
                        Go to the cart
                      </ButtonContainer>
                      
                    </Link>
                  </div>
                </div>

              </div>
            </ModalContainer>)
          }
          return
        }}
      </ProductConsumer>
      </div>
    );
  }
}
const ModalContainer = styled.div`
position:fixed;
top:0;
left:0;
right:0;
bottom:0;
background: rgba(0,0,0,0.3);
display: flex;
align-items: center;
justify-content:center;
#modal {
  background:var(--mainWhite);
}

`;
export default Modal;
