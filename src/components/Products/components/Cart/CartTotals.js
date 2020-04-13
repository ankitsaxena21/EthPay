import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import Token from '../../../Swap/src/abis/Token.json';
import { string } from 'prop-types';
import { stringify } from 'query-string';
export default class CartTotals extends Component {
    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    async loadBlockchainData() {
        const web3 = window.web3

        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })

        const ethBalance = await web3.eth.getBalance(this.state.account)
        this.setState({ ethBalance })
        const token = new web3.eth.Contract(Token.abi, "0x96fEC69061902eDD5681FA56e7eA71922C5732B6")
        this.setState({ token })
        this.setState({ total: this.props.value.cartTotal })
    }

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    async buyProducts(e) {
        e.preventDefault()
        const conv = Math.pow(10, 18) 
        let amt = parseInt(this.state.total) *conv
        amt = amt.toString()
        await this.state.token.methods.transfer("0x3BcD2C161c427490E23a8D2E912e417aAa7DCEA7", amt).send({ from: this.state.account }).then(setTimeout(function () { window.location.reload(true) }, 15000))        
       
    }
    constructor(props) {
        super(props)
        this.state = {
            account: '',
            token: {},
            ethBalance: '0',
            total: 0,
            purchased : 'Purchase item(s)'
        }
        this.buyProducts = this.buyProducts.bind(this)
    }
    render() {
        const { cartSubtotal, cartTax, cartTotal, clearCart, history } = this.props.value;
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                            <Link to="/products">
                                <button className="btn btn-outline-danger text-uppercase mb-3 px-5"
                                    type="button"
                                    onClick={() => clearCart()}
                                >clear cart</button>
                            </Link>
                            <h5>
                                <span className="text-title">
                                    subtotal :
                                </span>
                                <strong>{cartSubtotal} ANK</strong>
                            </h5>
                            <h5>
                                <span className="text-title">
                                    tax :
                                </span>
                                <strong>{cartTax} ANK</strong>
                            </h5>
                            <h5>
                                <span className="text-title">
                                    total :
                                </span>
                                <strong>{cartTotal} ANK</strong>
                            </h5>
                            <button onClick={this.buyProducts} type="button" className="btn btn-outline-success btn-lg">
                                {this.state.purchased}
                            </button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}