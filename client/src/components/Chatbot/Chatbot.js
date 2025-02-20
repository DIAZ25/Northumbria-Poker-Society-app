import { Widget, addResponseMessage } from 'react-chat-widget';
import React, {useEffect, useState } from 'react'
import Answers from './Answers';
import Utterances from './Utterances';
import Alternatives from './Alternatives';
import 'react-chat-widget/lib/styles.css';
import botIcon from "../../botIcon.png"
import "./../../app.css"
import useAuth from "../../context/Auth/useAuth";
import axios from "axios";
import { useLocation } from 'react-router-dom';
/* Random joke API URL */
const jokeURL = "https://api.chucknorris.io/jokes/random";

function Chatbot () {

const [winner, setWinner] = useState('');


/* immediately run function to fetch data from the back end */
useEffect(() => {
  async function fetchMyAPI() {
    const response = await axios.get('https://nupokersociety.herokuapp.com/api/chatbot/findWinner');
    setWinner(response.data)
  }

  fetchMyAPI()
}, [])

  /* Innitial greeting message from the bot */
  
  
  useEffect(() => {
    
    addResponseMessage(`Hi I'm pokerBot. Can I help you? 
     - for command list type 'help'`);
  }, []);

  /* Getting user details */

  const {userDetails} = useAuth();
        
    /* main function handling users message and responses */

   const handleNewUserMessage = async (newMessage) => {

    let product;

    /* Text sanitizing of white spaces and more */

      let text = newMessage.toLowerCase().replace(/[^\w\s\d]/gi, "");
      text = text
        .replace(/ a /g, " ")
        .replace(/whats/g, "what is")
        .replace(/please /g, "")
        .replace(/ please/g, "")
        .replace(/ the/g, "")
        .replace(/ the /g, "")
        .replace(/the /g, "")
        .replace(/r u/g, "are you");


        /* Queries with a specific response */

        if((text === "help")||(text === "Help")){
        
         
         addResponseMessage(`You can try:
          When is the next game,
          How many wins I have,
          How much is buy-in,
          List of poker hands,
          Who is the top player,
          Value of chips,
          joke
         `);
          return;
          }

          if((((text.includes("when is"))||(text.includes("When is")))&&((text.includes("game"))||((text.includes("next game")))))){
        
            
           addResponseMessage(`Next game is on Tuesday 23th at 19:00pm in TR3`);
            return;
            }  

            if((((text.includes("where is"))||(text.includes("Where is")))&&((text.includes("TR"))||((text.includes("tr")))))){
        
             
             addResponseMessage(`TR stands for training room and is located in Student union building on the ground floor`);
              return;
              } 
              
              if((((text.includes("who is"))||(text.includes("Who is")))&&((text.includes("best player"))||((text.includes("top player")))))){
        
                
               addResponseMessage(winner[0].name);
                return;
                } 

                if((((text.includes("how much"))||(text.includes("How much")))&&((text.includes("buy in"))||((text.includes("buy-in")))))){
        
                  
                 addResponseMessage(`Buy in: £2.50
                 re-buy: £1.50 (available for first hour)`);
                  return;
                  } 

                if((((text.includes("value"))||(text.includes("Value")))&&(text.includes("chips")))){
        
                  
                 addResponseMessage(`Chip value
                 white: 10
                 red: 20
                 green: 50
                 blue: 100
                 black: 500
                 `);
                  return;
                  } 

                if((((text.includes("list"))||(text.includes("List")))&&(text.includes("hands")))){
        
                  
                 addResponseMessage(`From highest to lowest
                 1. Royal Flush 
                 2. Straight Flush 
                 3. Four of a kind 
                 4. Full house 
                 5. Flush 
                 6. Straight 
                 7. Three of a kind 
                 8. Two pair 
                 9. One pair 	
                 10. High card`);
                  return;
                  } 
	
           /* connecting to the joke API and removing quotes from the respnse */ 

        if(text.includes("joke")){
          const response = await fetch(jokeURL);
          const joke = await response.json();
          product = JSON.stringify(joke.value);
          product = product.slice(1, -1);
          addResponseMessage(product);
          return;
      }


        /* Queries requiring response from the userDetails object from the database */

      if(text.includes("wins i")||text.includes("my wins")||text.includes("many wins")||text.includes("wins do")){
        
        let obj = JSON.stringify(userDetails)
         let user = JSON.parse(obj)
          product = user.wins
       addResponseMessage(`You have ${product} wins`);
        return;
        }
        if(text.includes("losses i")||text.includes("my losses")){
        
          let obj = JSON.stringify(userDetails)
         let user = JSON.parse(obj)
          product = user.losses
         addResponseMessage(`You have ${product} losses`);
          return;
          }
          if(text.includes("my email")){
         let obj = JSON.stringify(userDetails)
         let user = JSON.parse(obj)
          product = user.email
           addResponseMessage(`Your email is ${product}`);
            return;
            }   
            if(text.includes("hello pokerbot")){
        
              let obj = JSON.stringify(userDetails)
              let user = JSON.parse(obj)
                product = user.name
             addResponseMessage(`Hello ${product}, how can I help?`);
              return;
              }
              if(text.includes("my name")){
        
                let obj = JSON.stringify(userDetails)
               let user = JSON.parse(obj)
               product = user.name
               addResponseMessage(`Your name is ${product}`);
                return;
                } 
    

           /* if the users query not included in any of the if statements above
               then compare the query with Utterances array 
           */     
         if (compare(Utterances, Answers, text)) {

          product = compare(Utterances, Answers, text);
        } 
        /* if query still not found response with random value from Alternative array */
        else {
           console.log(Alternatives.length)
          product = Alternatives[Math.floor(Math.random() * Alternatives.length)];
        }
        addResponseMessage(product);
     }
   

/* search for random answer form Answers array corresponding to th Utterances */

function compare(utterancesArray, answersArray, string) {
  let reply;
  let replyFound = false;
  for (let x = 0; x < utterancesArray.length; x++) {
    for (let y = 0; y < utterancesArray[x].length; y++) {
      if (utterancesArray[x][y] === string) {
        let replies = answersArray[x];
        reply = replies[Math.floor(Math.random() * replies.length)];
        replyFound = true;
        break;
      }
    }
    if (replyFound) {
      break;
    }
  }
  return reply;
}



// this code makes sure that the bot doesn't rerender every
// time the user goes from one page and back to the newsfeed page

const location = useLocation();

let path = location.pathname

let chatBot;

if (path ==="/newsfeed") {
  chatBot = (
    <div className="block"> 
    <Widget
    className="hidden"
      handleNewUserMessage={handleNewUserMessage}
      profileAvatar={botIcon}
      title="PokerBOT"
      subtitle="Ask me about the Poker Society"
      showCloseButton={true}
    />
  </div>
  )
}
    return (

      <>
      {chatBot}
      <div className="hidden"> 
        <Widget
        className="hidden"
          handleNewUserMessage={handleNewUserMessage}
          profileAvatar={botIcon}
          title="PokerBOT"
          subtitle="Ask me about the Poker Society"
          showCloseButton={true}
        />
      </div>
      </>
    );
}

export default Chatbot;
