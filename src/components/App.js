import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Menu from './Menu';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chat from './ChatApp/client/components/Chat/Chat';
import Join from './ChatApp/client/components/Join/Join';
import Swap from './Swap/src/components/Swap';
import ProductList from './Products/components/ProductList';
import Cart from './Products/components/Cart';
import Details from './Products/components/Details';
import Default from './Products/components/Defalut';
import Modal from './Products/components/Modal';
import CompoundApp from './Compound/src/components/Compound';
import CoronaApp from '../components/Corona_Tracker/src/CoronaApp';
import UniswapApp from '../components/Uniswap/components/UniSwapApp';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar /><br /><br />
        <Switch>
          <Route path="/" exact component={Menu} />
          <Route path="/join" exact component={Join} />
          <Route path="/swap" exact component={Swap} />
          <Route path="/products" exact component={ProductList} />
          <Route path="/corona_tracker" exact component={CoronaApp} />
          <Route path="/details" exact component={Details} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/chat" exact component={Chat} />
          <Route path="/compound" exact component={CompoundApp} />
          <Route path="/uniswap" exact component={UniswapApp} />
          <Route component={Default} />
        </Switch>
        <Modal />
      </React.Fragment>
    );
  }
}

export default App;
