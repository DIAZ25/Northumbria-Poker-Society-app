/*
*
*   Main for the Poker Practice Game.
*   Please note that the following subsystem has been built 
*   using the work done by Mikhail Maslyuk as a foundation.
*
*   Reference: https://github.com/Mikhail-MM
*/

// imports
import React, { Component } from "react";

// styling
import "./PokerPractice.css"; 

// components
import Spinner from '../../components/PokerPractice/Spinner'; // loading logo
import Menu from "../../components/PokerPractice/menu/Menu"; // Menu
import Win from "../../components/PokerPractice/Win"; // Win - End screen
import Lost from "../../components/PokerPractice/Lost"; // Loss - End screen 
import Card from "../../components/PokerPractice/card/Card"; // Card 
import Player from "../../components/PokerPractice/player/Player"; // Player 
import PlayerShowdown from "../../components/PokerPractice/showdown/PlayerShowdown"; // Player - Showdown phase
import Navbar from "../../components/Navbar/Navbar";

// utilities 

// showdown -> end of the round screen
import {
  renderShowdownMessages, // end game messages (e.g., who wins how much)
  renderNetPlayerEarnings // rendering net earings
} from '../../components/PokerPractice/showdown/showdown'


import { 
  generateDeckOfCards, // generating the deck of cards
  shuffle, // shuffling
  dealPrivateCards, // dealing private cards to each player
} from '../../components/PokerPractice/card/cards.js';


import { 
  generateTable, // generating table
  beginNextRound, // beginning next round
  checkWin // checking win or loss
} from '../../components/PokerPractice/player/players.js';


import { 
  determineBlindIndices,  // determine 
  anteUpBlinds, 
  determineMinBet, // determine 
  handleBet, // determine 
  handleFold,  // determine 
} from '../../utils/bet.js';

import {
  handleAI as handleAIUtil
} from '../../utils/ai.js'; // determine 

// rendering (action menu slider + buttons)
import {
  renderActionMenu,
  renderActionButtonText
} from "../../components/PokerPractice/actionmenu/actionmenu.js"

import { cloneDeep } from 'lodash';


class PokerPractice extends Component {

  // Setting initial state of the app (clean one, so we can reset it at the end of the game e.g., play again)
  clean_state = {
    loading: true, // loading 
    menu: "none", // workaround to show an initial menu (currently working on feedback provided)
    maxNBots: 4, // TODO: ADD OPTION FOR USER IN MENU TO SELECT THE NUMBER OF BOTS
    selectedNBot: '4',
    selectedBet: '20',
    lost: null, // whether the user lost or not
    winnerFound: null, // no winner at the start
    players: null, // players
    numPlayersActive: null, // how many players are playing
    numPlayersFolded: null, // how many players folded
    numPlayersAllIn: null, // how many plaers all in'd
    activePlayerIndex: null, // active player idx
    dealerIndex: null, // dealer idx
    blindIndex: null, // blind player idx
    deck: null, // round deck
    communityCards: [], // community cards
    pot: null, // pot amount
    highBet: null, // high bet, calculated from minbet
    betInputValue: null, // how much a player is betting
    sidePots: [], // store side pots, in case there are any
    minBet: 20, // min bet
    phase: 'loading', // initial phase
    playerHierarchy: [], // each player cards' ranking, sorted
    showDownMessages: [], // end of round messages
    playActionMessages: [], // action pop ups
    playerAnimationSwitchboard: { // animating turns
      0: {isAnimating: false, content: null},
      1: {isAnimating: false, content: null},
      2: {isAnimating: false, content: null},
      3: {isAnimating: false, content: null},
      4: {isAnimating: false, content: null},
      5: {isAnimating: false, content: null}
    }
  }

  // Used to control the flow of the game 
  state = this.clean_state

  cardAnimationDelay = 0;

  async componentDidMount() {

    const players = await generateTable(this.state.maxNBots);
    const dealerIndex = Math.floor(Math.random() * Math.floor(players.length));
    const blindIndicies = determineBlindIndices(dealerIndex, players.length);
    const playersBoughtIn = anteUpBlinds(players, blindIndicies, this.state.minBet);
    const imageLoaderRequest = new XMLHttpRequest();

    imageLoaderRequest.addEventListener("load", e => {
        this.setState({
          loading: false,
          menu: "startmenu"
        })
    });

    imageLoaderRequest.addEventListener("error", e => {
        console.log(`${e.type}`);
        console.log(e);
    });

    imageLoaderRequest.open("GET", "./assets/pokerpractice/cards/card-back.svg");
    imageLoaderRequest.send();

    this.setState(prevState => ({
      // loading: false,
      players: playersBoughtIn,
      numPlayersActive: players.length,
      numPlayersFolded: 0,
      numPlayersAllIn: 0,
      activePlayerIndex: dealerIndex,
      dealerIndex,
      blindIndex: {
        big: blindIndicies.bigBlindIndex,
        small: blindIndicies.smallBlindIndex,
      },
      deck: shuffle(generateDeckOfCards()),
      pot: 0,
      highBet: prevState.minBet,
      betInputValue: prevState.minBet,
      phase: 'initialDeal',
    }))

  }

  // "Main" render 
  render() {
    return (
      
      <div className="PokerPractice">
        <Navbar/>
        <div className='poker-table--wrapper'> 
          { 
            (this.state.loading) ? <Spinner/> : 
            (this.state.winnerFound) ? <Win updateState={this.restartHandler}/> :
            (this.state.lost) ? <Lost updateState={this.restartHandler}/> :
            (this.state.menu === "startmenu") ? <Menu updateBet={this.betHandler} updateNBots={this.botHandler} selectedBet={this.state.selectedBet} selectedNBot={this.state.selectedNBot} updateState={this.menuHandler}/> :
            this.renderGame()
          }
        </div>
      </div>
    );
  }
  
  // THESE TWO MUST BE FIXED, THEY ALTER THE STATE DIRECTLY (NOT GOOD)
  menuHandler = (menuData) => {
    // TODO ADD MENU OPTIONS (N BOTS, MIN BET) - 
    this.state.nBots = parseInt(menuData)
    this.state.menu = "show"
    this.runGameLoop()
  }
  
  botHandler = (option) => {
    this.state.selectedNBot = option

    //console.log(this.state.selectedNBot)
  }
  
  betHandler = (option) => {
    this.state.selectedBet = option

    //console.log(this.state.selectedBet)
  }

  restartHandler = () => {
    this.state = this.clean_state
    this.setState = {
      menu: "none"
    }
  }

  // Running the game 
  runGameLoop = () => {
    // Dealing private cards (start of the game)
    const newState = dealPrivateCards(cloneDeep(this.state))
    // Bot turns if first turn isn't the user
    this.setState(newState, () => {
      if((this.state.players[this.state.activePlayerIndex].robot) && (this.state.phase !== 'showdown')) {
        setTimeout(() => {
          this.handleAI()
        }, 3000)
      }
    })
  }

  // Rendering the game
  renderGame = () => {

    const { highBet, players, activePlayerIndex, phase } = this.state;

    return (
      <div className='poker-app--background'>
        {/* Displaying the table */}
        <div className="poker-table--container">
          { (this.state.menu === 'show') && this.renderBoard() }
          <div className='community-card-container' >
            { (this.state.menu === 'show') && this.renderCommunityCards() }
          </div>
          <div className='pot-container'>
            <h4> { (this.state.menu === 'show') && `Pot amount: ${this.state.pot}`} </h4>
          </div>
        </div>
        { (this.state.phase === 'showdown') && this.renderShowdown() } 

        <div className='game-action-bar' >


          {/* if state isn't loading, draw action bar */}
          {/* further internal checks to draw it only when it's the user's turn to bet */}
          <div className='slider-boi'> 
            { (!this.state.loading) && (this.state.menu === 'show')
            && renderActionMenu(highBet, players, activePlayerIndex, phase, this.handleBetInputChange)}
          </div>
          
          <div className='action-buttons'>
            { (this.state.menu === 'show') && this.renderActionButtons() }
          </div>

        </div>
      </div>
    )
  }

  // creating the board
  renderBoard = () => {
    const { 
      players,
      activePlayerIndex,
      dealerIndex,
      clearCards,
      phase,
      playerAnimationSwitchboard
    } = this.state;
    
    // reverse players array for the sake of taking turns counter-clockwise.
    const reversedPlayers = players.reduce((result, player, index) => {
      
      const isActive = (index === activePlayerIndex);
      const hasDealerChip = (index === dealerIndex);

      result.unshift(
          <Player
            key={index}
            arrayIndex={index}
            isActive={isActive}
            hasDealerChip={hasDealerChip}
            player={player}
            clearCards={clearCards}
            phase={phase}
            playerAnimationSwitchboard={playerAnimationSwitchboard}      
            endTransition={this.popAnimationState}
          />
      )
      return result
    }, []);
    return reversedPlayers.map(component => component);
  }

  // Rendering community cards (during each stage of the game as well as the showdown)
  // if showdown -> no animation for the cards
  renderCommunityCards = (noAnimation) => {

    return this.state.communityCards.map((card, index) => {

      let cardData = {...card};

      if (noAnimation) {
        cardData.animationDelay = 0;
      }
      
      return(
        <Card key={index} cardData={cardData}/>
      );
    });

  }

  // handling bet input changes (slider)
  handleBetInputChange = (val, min, max) => {
    if (val === '') val = min
    if (val > max) val = max
      this.setState({
        betInputValue: parseInt(val, 10),
      });
  }
  
  // animation 
  pushAnimationState = (index, content) => {
    const newAnimationSwitchboard = Object.assign(
      {}, 
      this.state.playerAnimationSwitchboard,
      {[index]: {isAnimating: true, content}}     
    )

    this.setState({playerAnimationSwitchboard: newAnimationSwitchboard});
  }

  // removing animation 
  popAnimationState = (index) => {

    const persistContent = this.state.playerAnimationSwitchboard[index].content;

    const newAnimationSwitchboard = Object.assign(
      {}, 
      this.state.playerAnimationSwitchboard,
      {[index]: {isAnimating: false, content: persistContent}}     
    )

    this.setState({playerAnimationSwitchboard: newAnimationSwitchboard});
  }

  // handling AI 
  handleAI = () => {

    const {playerAnimationSwitchboard, ...appState} = this.state;
    const newState = handleAIUtil(cloneDeep(appState), this.pushAnimationState)

    this.setState({

      ...newState,
      betInputValue: newState.minBet
    }, () => {
      
      if((this.state.players[this.state.activePlayerIndex].robot) && (this.state.phase !== 'showdown')) {
        
        setTimeout(() => {
          this.handleAI()
        }, 1200)
      }
    })
  }

  // rendering rank tie 
  renderRankTie = (rankSnapshot) => {

    return rankSnapshot.map(player => {
      return this.renderRankWinner(player);
    })
  }

  // rendering rank winer 
  renderRankWinner = (player) => {

    const { name, bestHand, handRank } = player;
    const playerStateData = this.state.players.find(statePlayer => statePlayer.name === name);
    
    return (

      <div className="player-showdown--entity" key={name}>
        <PlayerShowdown
          name={name}
          cards={playerStateData.cards}
          //roundEndChips={playerStateData.roundEndChips}
          //roundStartChips={playerStateData.roundStartChips}
        />
        <div className="player-showdown--besthand--container">
          <h5 className="player-showdown--besthand--heading">
            Best hand
          </h5>
          <div className='player-showdown--besthand--cards' style={{alignItems: 'center'}}>
            {
              bestHand.map((card, index) => {

                // reset Animation Delay
                const cardData = {...card, animationDelay: 0}
                return <Card key={index} cardData={cardData}/>
              })
            }
          </div>
        </div>
        <div className="showdown-handrank--container">
          <div className="showdown-handrank-label">
            {handRank}
          </div>
        </div>
        {/* rendering player net earnings*/}
        {renderNetPlayerEarnings(playerStateData.roundEndChips, playerStateData.roundStartChips)}
      </div>

    )
  }

  // rendering best hand, checking for ties as well
  renderBestHands = () => {

    const { playerHierarchy } = this.state;

    return playerHierarchy.map(rankSnapshot => {
      const tie = Array.isArray(rankSnapshot);
      return tie ? this.renderRankTie(rankSnapshot) : this.renderRankWinner(rankSnapshot);
    })
  }

  // handling next round
  handleNextRound = () => {
    
    this.setState({clearCards: true})
    const newState = beginNextRound(cloneDeep(this.state))

    // Check win condition
    if(checkWin(newState.players)) {
      this.setState({ winnerFound: true })
      return;
    }
    
    this.setState(newState, () => {
      if((this.state.players[this.state.activePlayerIndex].robot) && (this.state.phase !== 'showdown')) {
        setTimeout(() => this.handleAI(), 1200)
      }
    })
  }

  // rendering action buttons 
  renderActionButtons = () => {

    const { highBet, players, activePlayerIndex, phase, betInputValue } = this.state
    const min = determineMinBet(highBet, players[activePlayerIndex].chips, players[activePlayerIndex].bet)
    const max = players[activePlayerIndex].chips + players[activePlayerIndex].bet

    return ((players[activePlayerIndex].robot) || (phase === 'showdown')) ? null : (

      <React.Fragment>
        <button className='fold-button' onClick={() => this.handleFold()}>
          Fold
        </button>
        <button className='action-button' onClick={() => this.handleBetInputSubmit(betInputValue, min, max)}>
          {renderActionButtonText(highBet, betInputValue, players[activePlayerIndex])}
        </button>
      </React.Fragment>

    )
  }

  // handling fold
  handleFold = () => {

    const {playerAnimationSwitchboard, ...appState} = this.state
    const newState = handleFold(cloneDeep(appState));

    this.setState(newState, () => {
      
      if((this.state.players[this.state.activePlayerIndex].robot) && (this.state.phase !== 'showdown')) {
        
        setTimeout(() => {
          this.handleAI()
        }, 1200)
      }
    })
  }

  // if the active player is the AI, we call its util 
  handleBetInputSubmit = (bet, min, max) => {

    const {playerAnimationSwitchboard, ...appState} = this.state;
    const { activePlayerIndex } = appState;

    this.pushAnimationState(activePlayerIndex, `${renderActionButtonText(this.state.highBet, this.state.betInputValue, this.state.players[this.state.activePlayerIndex])} ${(bet > this.state.players[this.state.activePlayerIndex].bet) ? (bet) : ""}`);;
    const newState = handleBet(cloneDeep(appState), parseInt(bet, 10), parseInt(min, 10), parseInt(max, 10));

    this.setState(newState, () => {
      
      if((this.state.players[this.state.activePlayerIndex].robot) && (this.state.phase !== 'showdown')) {
        
        setTimeout(() => {
          this.handleAI()
        }, 1200)
      }
    });
  }

  // Rendering the end of the round screen
  // contains:
  //    - showdown messages (who wins, and how much) 
  //    - community cards
  //    - best hands, in strength order
  //    - next round button 
  renderShowdown = () => {
    return(
      <>
  
      <div className='showdown-container--wrapper'>
        <h5 className="showdown-container--title">
          Round complete!
        </h5>
        <div className="showdown-container--messages">
          { renderShowdownMessages(this.state.showDownMessages)}
        </div>
        <h5 className="showdown-container--community-card-label">
          Community cards
        </h5>
        <div className='showdown-container--community-cards'>
          { this.renderCommunityCards(true) }
        </div>
        <button className="showdown--nextRound--button" onClick={() => this.handleNextRound()}> NEXT ROUND </button> 
        { this.renderBestHands() }
      </div>
      </>
    )
  }
}

export default PokerPractice;