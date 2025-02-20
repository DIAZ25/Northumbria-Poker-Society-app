import React, { useRef, useState, useEffect } from 'react';
import './chat.css';
import { TailSpin } from "react-loader-spinner";
import useAuth from "../../context/Auth/useAuth";

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';


// code referenced from a sample chatting feature app -- link : https://github.com/leopaul29/facebook-messenger-clone

//connect the firebase authentication to the chat component
const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();



export default function ChatComponent() {

  //firebase user
  const [user, loading, error] = useAuthState(auth);

  //get all the logged in user details in an object format (from mongoDB)
  const {userDetails } = useAuth();
  const obj = JSON.stringify(userDetails)
  const local_user = JSON.parse(obj)

  //get the email id from the logged in user object to sign in on the firebase user account using that parameter as email as password
  //shows a loading screen while the user gets signed in
  if(!user)
  {
    auth.signInWithEmailAndPassword(local_user.email,local_user.email);
    return (
      <div className='loadingScreen'>
        <TailSpin color="#00BFFF" height={80} width={80}/>
      </div>
    )
  }


  if (loading) {
    return (
      <div className='loadingScreen'>
        <TailSpin color="#00BFFF" height={80} width={80}/>
      </div>
    );
  }
  if (error) {
    return (
      <div className='loadingScreen'>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user) {
    return (
    <div className="Chat">
      <header>
        <h1>⚛️🔥💬 WELCOME TO CHAT ROOM</h1>
      </header>
      {<ChatRoom />}
    </div>
    );
  }

  return <></>
}





//the chat section which displays all the messages from the firebase account database
function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt','desc').limit(25);//to render only last 25 messages at a time

  const [messages] = useCollectionData(query, { idField: 'id' });
  
  const [formValue, setFormValue] = useState('');

  const {userDetails } = useAuth();
  const obj = JSON.stringify(userDetails)
  const user = JSON.parse(obj)

  const sendMessage = async (e) => {
    e.preventDefault();
  
    const { uid, photoURL } = auth.currentUser; 

    
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      name: user.name,
      photoURL
    })

    setFormValue('');
    
  }

  //to scroll to bottom by default and everytime the user sends a message
  const scrollToBottom = () => {
    dummy.current?.scrollIntoView({ behavior: "smooth" })
  }
  
  useEffect(() => {
    scrollToBottom()
  });

  //returning the textbox and the send button in form format
  return (
  <div className='chatWindow'>
    <div className='scrolldiv'>

      {messages && messages.reverse().map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </div>

    <form onSubmit={sendMessage} className='sendMessage'>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button className = "text-center" type="submit" disabled={!formValue}>Send</button>

    </form>
  </div>)
}


function ChatMessage(props) {
  
  const { text, uid, photoURL, name } = props.message; //extracting the message details

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'; //message check for formatting accordingly
  
  return (<>
    <div className={`message ${messageClass}`}>
      <a>{name}</a>
      <p>{text}</p>
    </div>
  </>)
}