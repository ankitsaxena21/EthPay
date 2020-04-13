import React, { Component } from 'react';
import './App.css';
import {NavLink} from 'react-router-dom';
class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="http://www.github.com/ankitsaxena21"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>EthPay</h2>
        </a>
        <table>
          <tr>
          <th>
        <NavLink to="/" exact>
        <a className="navbar-brand" href="#">Home</a>
        </NavLink>
        </th>
        <th>
        <NavLink to="/join" exact>
        <a className="navbar-brand" href="#">Chat</a>
        </NavLink>
        </th>
        <th>
        <NavLink to="/swap" exact>
        <a className="navbar-brand" href="#">Swap</a>
        </NavLink>
        </th>
        <th>
        <NavLink to="/products" exact>
        <a className="navbar-brand" href="#">Products</a>
        </NavLink>
        </th>
        <th>
        <NavLink to="/compound">
        <a className="navbar-brand" href="#">Compound</a>
        </NavLink>
        </th>
        <th>
        <NavLink to="/uniswap">
        <a className="navbar-brand" href="#">Uniswap</a>
        </NavLink>
        </th>
       
        </tr>
        </table>
      </nav>

    );
  }
}

export default Navbar;
