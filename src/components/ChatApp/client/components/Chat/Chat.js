import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import Modal from "react-animated-modal";
import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import trophy from './trophy.png';

import './Chat.css';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [address, setAddress] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [modal, setModal] = useState(false);

  const ENDPOINT = 'https://chatserver19.herokuapp.com/';

  useEffect(() => {
    const { name, address, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);
    setAddress(address);
    socket.emit('join', { name, address, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
        <Modal
          visible={modal}
          closemodal={() => setModal(false)}
          type="bounceInUp"
        >
          <div className="container-fluid mt-4 ml-3">
            <div className="row ml-5">
            <img className="ml-5" src={trophy} width="100" height="80" alt="prize" />
            </div>
            <div className="text-center mr-2 ">
            <h3>Congrats! You just won :</h3>
            <h2><b>5 ANK</b></h2>
            </div>
          </div>
        </Modal>
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users} setModal={setModal} />
    </div>
  );
}

export default Chat;
