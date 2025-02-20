/* 

  Hidden card component 
  Used for non-visible cards - displaying cover - face down

*/

import React from 'react';

// Passing props to component (arguments)
const HiddenCard = (props) => {

  // assigning props to const card value
  const {
    cardData: {
      suit, // suit
      cardFace, // rank 
      animationDelay // animation settings
    },
    applyFoldedClassname // once folded, apply different styling (e.g., animate, turn around, etc...)
  } = props;

  // return card component
  return(

    <div // div displaying single card
      key={`${suit} ${cardFace}`} // key (suit + rank) for all the game logic
      className={`playing-card cardIn robotcard${(applyFoldedClassname ? ' folded' : '')}`} 
      style={{animationDelay: `${(applyFoldedClassname) ?  0 : animationDelay}ms`}}>
    </div>
  )
}

export default HiddenCard;