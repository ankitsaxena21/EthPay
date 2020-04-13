import React, { Component } from 'react';
import Web3 from 'web3';
import Compound from '../abis/Compound.json'
import './Main.css'

class CompoundApp extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
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

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Network ID
    const compound = web3.eth.Contract(Compound.abi, "0x9Ff49807145790046E5410FD19a792d593735112")
    this.setState({ compound })
    let bal = await this.state.compound.methods.balances(accounts[0]).call()
    this.setState({balance:bal.toNumber()})
    // Load Posts

  }

  handleChange(e) {
    e.preventDefault()
    let n = e.target.value
    this.state.amount = n
  }

  async deposit(e) {
    e.preventDefault()
    await this.state.compound.methods.deposit(this.state.amount).send({from:this.state.account})
  }

  async withdraw(e) {
    e.preventDefault()
    await this.state.compound.methods.withdraw(this.state.amount).send({from:this.state.account})
  }


  constructor(props) {
    super(props)
    this.state = {
      compound: {},
      account: '',
      amount : 0,
      balance : 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.deposit = this.deposit.bind(this)
    this.withdraw = this.withdraw.bind(this)
  }

  render() {
    return (
      <div>
        <div className="container-fluid mt-5">
        <div className="row mt-4">
          <main role="main" className="col-lg-12 mx-auto mt-5 px-4" style={{ maxWidth: '500px' }}>
            <div className="card shadow-lg bg-white rounded border-secondary mb-3 content mr-auto ml-auto">
              <p>&nbsp;</p>
                <form onSubmit={this.deposit}>
                <div className="form-group mr-sm-2">
                  <input
                    style={{width: "430px"}}
                    onChange={this.handleChange}
                    type="text"
                    className="form-control ml-2"
                    placeholder="Enter amount in DAI"
                    required />
                </div>
                <button type="submit" style={{width: "430px"}} className="btn btn-success mb-2 ml-2 mr-2">Deposit</button>
              </form>
              </div>
              </main>
          <main role="main" className="col-lg-12 mx-auto mt-5 px-4" style={{ maxWidth: '500px' }}>
            <div className="card shadow-lg bg-white rounded border-secondary mb-3 content mr-auto ml-auto">
              <p>&nbsp;</p>
                <form onSubmit={this.withdraw}>
                <div className="form-group mr-sm-2">
                  <input
                    style={{width: "430px"}}
                    onChange={this.handleChange}
                    type="text"
                    className="form-control ml-2"
                    placeholder="Enter amount in cDAI"
                    required />
                </div>
                <button type="submit" style={{width: "430px"}} className="btn btn-dark btn-block mb-2 ml-2 mr-2">Withdraw</button>
              </form>
              </div>
              </main>
              </div>
              <div className="row mt-4">
              <main role="main" className="col-lg-12  mx-auto px-4" style={{ maxWidth: '500px' }}>
              <div className="shadow-lg bg-white rounded content2">
                <h2>Your Balance <br /> {this.state.balance} CDAI</h2>
              </div>
              </main>
              <main role="main" className="col-lg-12 mx-auto px-4" style={{ maxWidth: '500px' }}>
              <div className="shadow-lg bg-white rounded content3">
                <b>Your Account <br /> {this.state.account}</b>
              </div>
              </main>
              </div>
              </div>
       </div>
            );
          }
        }
        
export default CompoundApp;
