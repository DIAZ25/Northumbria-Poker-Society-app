/*
  Showdown component

  Used to show the player data (name and cards) during the showdown (end of the round)
  Manages only the player's PRIVATE hand!
*/

import React from 'react';
import Card from '../card/Card';

// getting cards data for rendering 
const getCards = (cards) => {
  return cards.map((card, index) => {
    const cardData = {...card, animationDelay: 0}
    return <Card key={index} cardData={cardData} />
  })
}

const PlayerShowdown = (props) => {
  const {
    name, // name of the player
    cards // cards of the player
  } = props;

  return (
    <div className="player-showdown-entity--container">
      <div className="player-showdown-info--container">
        <h5 className="player-showdown-info--name">
            {`${name}`}
        </h5>
      </div>
      <div class="player-showdown--privateCards">
        <h5 class="player-showdown--cards--heading">
          Hand
        </h5>
        <div class="player-showdown--cards">
          { getCards(cards) }
        </div>    
      </div>
    </div>
  )
}

export default PlayerShowdown;