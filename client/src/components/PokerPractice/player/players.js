/*

	Managing players util

*/

// uuid user to identificate the user/bots
import { v1 as uuid } from 'uuid';

// imports for handling bets and phase shifts 
import { 
	handlePhaseShift, 
	reconcilePot, 
	anteUpBlinds, 
	determineBlindIndices 
} from '../../../utils/bet.js';

// dealing cards
import { 
	dealMissingCommunityCards, 
	showDown, 
	generateDeckOfCards, 
	shuffle, 
	dealPrivateCards 
} from '../card/cards.js';

const axios = require('axios')

// testing with nBots for main menu, not used at the moment
const generateTable = async (nBots) => {

	// user data
	const users = [{
		id: uuid(), // ID
		name: 'You', 
		cards: [], // private cards
		showDownHand: {
			hand: [],
			descendingSortHand: [], 
		},
		chips: 20000, // initial amount of chips 
		roundStartChips: 20000, // handling chips amounts at the end/start of each turn
		roundEndChips: 20000,
		currentRoundChipsInvested: 0, // round investment
		bet: 0, // bet amount 
		betReconciled: false, // whether the bet amount reconciled with the pot or not 
		folded: false, //folder
		allIn: false, // if all in'd
		canRaise: true, // if the user can raise
		stackInvestment: 0, // total investment 
		robot: false // used to manage players switches with the other AI users
	}];

	// generating random name for the bot + its data
	const response = await axios.get(`https://randomuser.me/api/?results=` + nBots + `&nat=gb`);

	// bots
	response.data.results
		.map(user => {
			const randomizedChips = Math.floor(Math.random() * (20000 - 18000)) + 18000; // random amount of chips
			return ({
				id: uuid(),
				name: `${user.name.first.charAt(0).toUpperCase()}${user.name.first.slice(1)}`, // converting names
				cards: [], // private cards
				chips: randomizedChips,
				roundStartChips: randomizedChips,
				roundEndChips: randomizedChips,
				currentRoundChipsInvested: 0, // round investment 
				showDownHand: {
					hand: [],
					descendingSortHand: [],
				},
				bet: 0, // bet amount
				betReconciled: false, //..
				folded: false, //..
				allIn: false, //..
				robot: true, // player is an AI
				canRaise: true, //..
				stackInvestment: 0, //..
			})
		})
		.forEach(user => users.push(user)) // adding each user to the users list

	return users // returning the players data 
}

// making sure that the players take one turn each, and at the end 
// the index returns to the "starting" position (overflow)
const handleOverflowIndex = (currentIndex, incrementBy, arrayLength, direction) => {
	
	switch (direction) {
		case('up'): {
			return (
				(currentIndex + incrementBy) % arrayLength
			)
		}
		case('down'): { // an attempt to perform anti clockwise turns, not used yet
			return (
				((currentIndex - incrementBy) % arrayLength) + arrayLength 
			)
		}
		default: throw Error("Attempted to overfow index on unfamiliar direction");
	}
}

// determine the phase starting player, until a valid player is found
// recursion -> used to find next active player
// no recursion -> find first active player (big blind + 1)
const determinePhaseStartActivePlayer = (state, recursion = false) => {
	if (!recursion) {
		state.activePlayerIndex = handleOverflowIndex(state.blindIndex.big, 1, state.players.length, 'up');
	} 
	else if (recursion) {
		state.activePlayerIndex = handleOverflowIndex(state.activePlayerIndex, 1, state.players.length, 'up');
	}

	if (state.players[state.activePlayerIndex].folded) { // if player folded, next player
		return determinePhaseStartActivePlayer(state, true)
	}

	if (state.players[state.activePlayerIndex].chips === 0) { // if player has no more chips, next player
		return determinePhaseStartActivePlayer(state, true)
	}

	return state
}

// determing next active player
const determineNextActivePlayer = (state) => {

	state.activePlayerIndex = handleOverflowIndex(state.activePlayerIndex, 1, state.players.length, 'up');
	const activePlayer = state.players[state.activePlayerIndex];

	const allButOnePlayersAreAllIn = (state.numPlayersActive - state.numPlayersAllIn === 1);

	if (state.numPlayersActive ===  1) {
		console.log("Only one player active, skipping to showdown.")
		return(showDown(reconcilePot(dealMissingCommunityCards(state))));
	}

	if (activePlayer.folded) {
		console.log("Current player index is folded, going to next active player.")
		return determineNextActivePlayer(state);
	}

	if (
		allButOnePlayersAreAllIn &&
		!activePlayer.folded &&
		activePlayer.betReconciled
	) {
		return(showDown(reconcilePot(dealMissingCommunityCards(state))));
	}

	if (activePlayer.chips === 0) { // if player has no chips 

		if (state.numPlayersAllIn === state.numPlayersActive) {
			return(showDown(reconcilePot(dealMissingCommunityCards(state)))); // all players all in'd 
		} 
		else if (allButOnePlayersAreAllIn && activePlayer.allIn) {
			return(showDown(reconcilePot(dealMissingCommunityCards(state))));
		} 
		else {
			return determineNextActivePlayer(state);
		}
	}

	// player is reconciled with the pot, round betting cycle complete, proceeding to the next round
	if (activePlayer.betReconciled) {
		return handlePhaseShift(state);
	}

	return state
}

// passing the chip at the end of each round, until a valid player is found
const passDealerChip = (state) => {
	
	state.dealerIndex = handleOverflowIndex(state.dealerIndex, 1, state.players.length, 'up');

	const nextDealer = state.players[state.dealerIndex]
	if (nextDealer.chips === 0) {
		return passDealerChip(state)
	}

	return filterBrokePlayers(state, nextDealer.name);
}

/* 

	action is initiated on the first betting round by the first player to the left of the blinds. 
 	on all subsequent betting rounds, the action begins with the first active player to the left of the button.

*/
const filterBrokePlayers = (state, dealerID) => {

	// checking if the user lost, if he did no reason to keep the game going
	if(state.players[0].name === 'You' && state.players[0].chips === 0) {
		state.lost = true
		return state 
	}

	// keeping only the players who are still effectively in game
	state.players = state.players.filter(player => player.chips > 0);

	// assigning new dealer index
	const newDealerIndex = state.players.findIndex(player => player.name === dealerID)
	state.dealerIndex = newDealerIndex

	// this var needs to be further investigated, most likely incorrect
	// action should proceed to the left of the blinds
	// ----- if there are two people, is it the small blind?
	state.activePlayerIndex = newDealerIndex 

	if (state.players.length === 1) { // one player left
		return state
	} 
	else if (state.players.length === 2) {
		
		// need to refine rules for who goes first when 2 players are left TODO
		state.blindIndex.small = newDealerIndex;
		state.blindIndex.big = handleOverflowIndex(newDealerIndex, 1, state.players.length, 'up');
		state.players = anteUpBlinds(state.players, { bigBlindIndex: state.blindIndex.big, smallBlindIndex: state.blindIndex.small }, state.minBet).map(player => ({
			...player,
			cards:[],
			showDownHand: {
				hand: [],
				descendingSortHand: [],
			},
			roundStartChips: player.chips + player.bet,
			currentRoundChipsInvested: 0,
			betReconciled: false,
			folded: false,
			allIn: false,
		}))
		state.numPlayersAllIn = 0;
		state.numPlayersFolded = 0;
		state.numPlayersActive = state.players.length;
	} 
	else {

		const blindIndicies = determineBlindIndices(newDealerIndex, state.players.length);
		state.blindIndex = {
        	big: blindIndicies.bigBlindIndex,
        	small: blindIndicies.smallBlindIndex,
      	}

		state.players = anteUpBlinds(state.players, blindIndicies, state.minBet).map(player => ({
			...player,
			cards: [],
			showDownHand: {
				hand: [],
				descendingSortHand: [],
			},
			roundStartChips: player.chips + player.bet,
			currentRoundChipsInvested: 0,
			betReconciled: false,
			folded: false,
			allIn: false,
		}))

		state.numPlayersAllIn = 0; // May need to alter this is big/small blind brings a player all in
		state.numPlayersFolded = 0;
		state.numPlayersActive = state.players.length;
	}

	return dealPrivateCards(state) // dealing private cards
}

// beginning next round
const beginNextRound = (state) => {

	// resetting all important fields 
	state.communityCards = [];
	state.sidePots = [];
	state.playerHierarchy = [];
	state.showDownMessages = [];

	// shuffling deck for optimal card randomisation
	state.deck = shuffle(generateDeckOfCards()) 

	// resetting bets
	state.highBet = 20;
	state.betInputValue = 20;
	state.minBet = 20; 

	// unmounting all cards so react can re-trigger animations
	const { players } = state;
	const clearPlayerCards = players.map(player => ({...player, cards: player.cards.map(card => {})})) 
	state.players = clearPlayerCards;

	// finaly, passing the deal chip, next player
	return passDealerChip(state) 
}

// checking if a player won, this was already done above, however for some reason I could not figure it out 
// a way to properly make the Win component pop up, most likely related to the app state not updating? TODO
const checkWin = players => {
	return (players.filter(player => player.chips > 0).length === 1)
}


export { 
	generateTable, 
	handleOverflowIndex, 
	determineNextActivePlayer, 
	determinePhaseStartActivePlayer, 
	beginNextRound, 
	checkWin
}