/* 

  Player component (user OR bot)
    - Each player data 
    - Needs Card (or HiddenCard) component (based on whether he's the user or the bot)
    - Also displays the player action box (using CSSTransition)

*/

import React from 'react';
import Card from '../card/Card'; 
import HiddenCard from '../card/HiddenCard';
import { CSSTransition } from 'react-transition-group';

// button/dealer chip
// Reference: https://www.flaticon.com/free-icon/dealer-badge_107572
import dealerChip from "../../../assets/chip.svg";

// Player init
const Player = (props) => {
  
  const {
    arrayIndex, // index in the array of players
    playerAnimationSwitchboard, // animations management
    endTransition,
    hasDealerChip,
    isActive, // if active
    phase, // curent phase of the game
    clearCards, 
    
    player: { // settings
      robot,
      folded,
      cards,
      name,
      chips,
      bet
    }
  } = props;

  // rendering player's cards
  const renderPlayerCards = () => {
    
    let applyFoldedClassname;

    if (folded || clearCards) {
      applyFoldedClassname = true
    }

    // if player is a robot, hidden card instead of card component
    if (robot) {
      
      return cards.map((card, index)=> {

        if (phase !== 'showdown') {

          return(
            <HiddenCard key={index} cardData={card} applyFoldedClassname={applyFoldedClassname}/>
          );
        } 
        else {
          
          // Reset Animation Delay
          const cardData = {...card, animationDelay: 0}
          return(
            <Card key={index} cardData={cardData} applyFoldedClassname={applyFoldedClassname}/>
          );
        }
      });
    }
    else { // else return card component, visile card 

      return cards.map((card, index) => {
        return(
          <Card key={index} cardData={card} applyFoldedClassname={applyFoldedClassname}/>
        );
      });
    }
  }

  // animations
  const ifAnimating = (playerBoxIndex) => { 

    if (playerAnimationSwitchboard[playerBoxIndex].isAnimating) {
      return true;
    } 
    else {
      return false;
    }
  }

  return (
    
    <div className={`p${arrayIndex}`}>

      { /* Player action box*/}
      <CSSTransition /* Transition component */
          in={ifAnimating(arrayIndex)}
          timeout={{
              appear: 0,
              enter: 0,
              exit: 1250,
              }}
          classNames="transitionable-actionBox" 
          onEntered={() => endTransition(arrayIndex)}
      >
          <div className="actionBox"> { /* displaying action message */}
          {`${playerAnimationSwitchboard[arrayIndex].content}`}
          </div>
      </CSSTransition>

      {/* displaying player cards */}
      <div className='centered-flex-row abscard'>
        { renderPlayerCards() }
      </div>

      {/* Player entity container (name, amount of chips, how much he bet)*/}
      <div className="player-entity--container">
        <div>
          <h5 className={`player-info--name${(isActive ? ' activePlayer' : '')}`} style={{'fontSize': (name.length < 14) ? 12 : 10}}>
            {`${name}`}
          </h5>
          <div className="player-info--stash--container">
            <h5>{`Chips: ${chips}`}</h5>
          </div>
          <div className="player-info--bet--container">
            <h5>{`Bet: ${bet}`}</h5>
          </div>
          { /* draw dealer chip if the player has it -> need to separate it? */ } 
          {hasDealerChip && 
                <div className="dealer-chip-icon-container">
                  <img src={dealerChip} alt="Dealer Chip"/>
                </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Player;