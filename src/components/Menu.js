import React, { Component } from 'react';
import './Main.css';
import Web3 from 'web3';
import Token from '../components/Swap/src/abis/Token.json';
import { Link } from 'react-router-dom';
class Menu extends Component {
    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    async loadBlockchainData() {
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        const eth = await web3.eth.getBalance(this.state.account)
        const ethBalance = await web3.utils.fromWei(eth, 'ether')
        this.setState({ ethBalance })
        const token = new web3.eth.Contract(Token.abi, "0x96fEC69061902eDD5681FA56e7eA71922C5732B6")
        this.setState({ token })
        let tokenBalance = await token.methods.balanceOf(this.state.account).call()
        const conv = Math.pow(10, 18)
        tokenBalance = tokenBalance / conv
        this.setState({ tokenBalance: tokenBalance.toString() })
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
    async sendToken(e) {
        e.preventDefault()
        console.log(this.state.address, this.state.amount)
        let conv = parseInt(this.state.amount) * Math.pow(10, 18)
        await this.state.token.methods.transfer(this.state.address, conv.toString()).send({from:this.state.account})
    }
    constructor(props) {
        super(props)
        this.state = {
            account: '',
            token: {},
            ethBalance: '0',
            tokenBalance: '0',
            address: '',
            amount : 0
        }
        this.sendToken = this.sendToken.bind(this)
    }
    render() {
        return (
            <React.Fragment>
                <div className="row container-fluid mt-3">
                    <div className="card shadow rounded mt-2 col-3 ml-2">
                        <div>
                            <h4 className="card-header"><b>Welcome!</b></h4>

                            <div class="card-body">
                                <h5 class="card-title"><b>Your ANK Balance : </b></h5>
                                <h4>
                                    <div className="ANK">
                                        {this.state.tokenBalance} ANK
                                </div>
                                </h4>
                                <div class="card-footer text-muted">
                                    EthPay is a fast and simple peer to peer payment app with an inbuilt reward system for transactions above 10 ANK.
                                    <hr /><b>Why EthPay ?</b>
                                    <ul>
                                        <li>Easily swap Eth&lt;=&gt;Ank</li>
                                        <li>Buy cool products</li>
                                        <li>Chatrooms</li>
                                        <li>Use compound and uniswap protocol</li>
                                    </ul>

                             </div>
                            </div>
                        </div>

                    </div>
                    <div className="col mt-4 ml-3">
                        <div className="container-fluid">
                            <div className="row mt-3">
                                <div className="shadow-lg bg-white text-white col-5 ETH mr-2 ml-3 mr-2" >
                                    <div className="card-text">
                                        <h4>Your balance <br /> {this.state.ethBalance} ETH
                                        </h4>
                                    </div>
                                </div>

                                <div className="ml-5 shadow-lg bg-white text-white Address">
                                    <div className="card-text pl-3 pr-3">
                                        <h5>Your Address <br /><small><b>{this.state.account}</b></small>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <main role="main" className="col-lg-6" style={{ maxWidth: '420px' }}>
                                    <div className="card shadow-lg rounded border-secondary bg-light">
                                        <div class="card-title text-center mr-2 mt-2"><b>Transfer ANK</b></div>
                                        <form onSubmit={this.sendToken}>
                                            <div className="form-group mr-sm-2 ">
                                                <input
                                                    style={{ maxWidth: "350px" }}
                                                    type="text"
                                                    className="form-control ml-3 mb-2"
                                                    placeholder="Enter address"
                                                    onChange={(event) => this.setState({address : event.target.value})}
                                                    required />
                                                <input
                                                    style={{ maxWidth: "350px" }}
                                                    type="text"
                                                    className="form-control ml-3"
                                                    placeholder="Enter amount in ANK"
                                                    onChange={(event) => this.setState({amount : event.target.value})}
                                                    required />
                                            </div>
                                            <button type="submit" style={{ maxWidth: "350px" }} className="btn btn-dark btn-block mb-3 ml-3 mr-2"><b>Send</b></button>
                                        </form>
                                    </div>
                                </main>

                                <div className="ml-5 pl-3 shadow-lg bg-white pr-3 text-white info" style={{ maxWidth: '440px' }}>
                                    <div className="card-text">
                                        <h5>Send more than 10 ANK and get a chance to win upto 100 ANK
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <Link to="/corona_tracker">
                            <marquee direction="right" >
                            <div className="container-fluid row mt-4 ml-1 covid-19">
                            <h6><button type="button" class="btn btn-success mr-2">Covid-19 Tracker</button> -> <b className="mr-5">Check status of corona virus  </b></h6>
                            </div>
                            </marquee>
                            </Link>
                        </div>
                    </div>
                </div>

            </React.Fragment >
        )
    }
}
export default Menu;