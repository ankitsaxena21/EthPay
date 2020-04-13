import React, { useState, useEffect } from 'react';
import onlineIcon from '../../icons/onlineIcon.png';
import Web3 from 'web3';
import Token from '../../../../Swap/src/abis/Token.json';
import './TextContainer.css';

const TextContainer = ({ users, setModal }) => {
  const [token, setToken] = useState({});
  const [address, setAddress] = useState('');
  let [amount, setAmount] = useState('');
  const [account, setAccount] = useState('');

  useEffect(async () => {
    await loadWeb3();
    await loadToken();
  }, []);

  const loadWeb3 = async () => {
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
  const loadToken = async () => {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    let account1 = accounts[0]
    setAccount(account1)
    // Load Token
    const token = new web3.eth.Contract(Token.abi, "0x96fEC69061902eDD5681FA56e7eA71922C5732B6")
    setToken(token);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
   
    const web3 = window.web3
    let conv = parseInt(amount) * Math.pow(10, 18)
    const accounts = await web3.eth.getAccounts()
    if (amount > 10){
      await token.methods.transfer(document.getElementById("address").value.toString(), conv.toString()).send({ from: accounts[0] }).then(setTimeout(
       function () {
          setModal(true)
        }, 14000))
    } else {
       await token.methods.transfer(document.getElementById("address").value.toString(), conv.toString()).send({ from: accounts[0] })
    }
  }
  return (
    <div className="textContainer">
      <div>

        <h1>Welcome to the EthPay ChatRoom! <span role="img" aria-label="emoji">💬</span></h1>
        <h2>Transferring tokens between people made easier than it ever has been <span role="img" aria-label="emoji">❤️</span></h2>
      </div>
      {
        users
          ? (
            <div>
              <h1>People Online:</h1>
              <div className="activeContainer">
                <h2>
                  {users.map(({ name, address }) => (
                    <div key={name} className="activeItem">
                      {name}
                      <img alt="Online Icon" src={onlineIcon} />
                      <form>
                        <div className="input-group ml-1 mt-2">
                          <input type="text" id="address" className="form-control mr-3" placeholder="Address" value={address} disabled/>
                          <input type="text" className="form-control" placeholder="Enter amount in Ank" onChange={(event) => setAmount(event.target.value)} />
                          <button onClick={onSubmit} type="button" className="btn btn-outline-success ml-3">Transfer token</button>
                        </div>
                      </form>

                    </div>
                  ))}
                </h2>
              </div>
            </div>
          )
          : null
      }
    </div>
  );
};
export default TextContainer;
