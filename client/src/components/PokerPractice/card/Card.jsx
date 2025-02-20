/* 

  Card component 
  Used for visible cards (displaying rank and suit) - face up

*/

import React from 'react';

// Return card suit (Diamond, Heart, Club, Spade - unicode)

const getUnicodeSuit = (suit) => {
	switch(suit) {
		case('Heart'): return '\u2665';
		case('Diamond'): return '\u2666';
		case('Spade'): return '\u2660';
		case('Club'): return '\u2663';
		default: throw Error('Unfamiliar String Recieved in Suit Unicode Generation');
	}
}

// Passing props to component
const Card = (props) => {

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
      key={`${suit} ${cardFace}`} // key (suit + rank) - for all the game logic
      className={`playing-card cardIn ${(applyFoldedClassname ? ' folded' : '')}`} 
      style={{animationDelay: `${(applyFoldedClassname) ?  0 : animationDelay}ms`}}>
        
        <div className='card-styling' // "inside" of the card (rank and suit)
          style={{color: `${(suit === 'Diamond' || suit === 'Heart') ? 'red' : 'black'}`}}>
            <div className='card-styling-suit-top-left'>
              {`${getUnicodeSuit(suit)}`} { /* top suit */ }
            </div>
            <div className='card-styling-rank '>
              {`${cardFace}`} { /* card rank */ }
            </div>
            <div className='card-styling-suit-bottom-right'>
              {`${getUnicodeSuit(suit)}`} { /* top suit */ }
            </div>
        </div>
    </div>
  )
}

export default Card;