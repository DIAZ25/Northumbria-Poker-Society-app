/*

	Action menu util

*/

// slider imports, made using react-compound slider
import React from 'react';
import Handle from "./Handle";
import Track from "./Track";
import { 
	Slider, 
	Rail, 
	Handles, 
	Tracks 
} from 'react-compound-slider'

// bet imports, used to display correct bet amounts on the slider
import { 
    determineMinBet
  } from "../../../utils/bet.js"

/* Slider styling and settings */

const sliderStyle = {
	position: 'relative',
	width: '100%',
	height: 80,
}
	
const railStyle = {
	position: 'absolute',
	width: '100%',
	height: 10,
	marginTop: 35,
	borderRadius: 5,
	backgroundColor: '#8B9CB6',
}

// Rendering the action button next, based on the selected bet value
const renderActionButtonText = (highBet, betInputValue, activePlayer) => {
	if ((highBet === 0) && (betInputValue === 0)) { 
		return 'Check'
	} 
	else if ((highBet === betInputValue)) {
		return 'Call'
	} 
	else if ((highBet === 0) && (betInputValue > highBet)) {
		return 'Bet'
	} 
	else if ((betInputValue < highBet) || (betInputValue === activePlayer.chips + activePlayer.bet)) {
		return 'All-In!'
	} 
	else if (betInputValue > highBet) {
		return 'Raise'
	} 
}

// Rendering action menu (>>>>>slider)
const renderActionMenu = (highBet, players, activePlayerIndex, phase, changeSliderInputFn) => {

	// determining the minimum/maximum bet to adequate display the slider extreme values
	// ##### I'm really unsure why, but the minBet sometimes bugs, this needs to be investigated ############################
	// maybe something related to the current app state?
	const min = determineMinBet(highBet, players[activePlayerIndex].chips, players[activePlayerIndex].bet)
	const max = players[activePlayerIndex].chips + players[activePlayerIndex].bet

	return(
		
		// first, we check if we are in one of the betting phases
		(phase === 'betting1' || phase === 'betting2' || phase === 'betting3' || phase === 'betting4') ? 

			// if the active player is a robot, we don't render the slider
			(players[activePlayerIndex].robot) ? null : (
				
					<React.Fragment>
						
						{ /* https://www.npmjs.com/package/react-compound-slider */}

						<Slider
							rootStyle={sliderStyle}
							domain={[min, max]}
							values={[min]}
							step={1}
							
							onChange={changeSliderInputFn}
							mode={2}
						>
						
							<Rail>
								{
									({ getRailProps }) => (
										<div style={railStyle} {...getRailProps()} />
									)
								}
							</Rail>
					
							<Handles>
								{ 
									({ handles, getHandleProps}) => (
										<div className='slider-handles'>
											{ 
												handles.map(handle => (
												
													<Handle
														key={handle.id}
														handle={handle}
														getHandleProps={getHandleProps}
													/>
												))
											}
										</div>
									)
								}
							</Handles>
					
							<Tracks right={false}>
								{
									({ tracks, getTrackProps }) => (
										<div className='slider-tracks'>
											{
												tracks.map(({ id, source, target }) => (
												
														<Track
															key={id}
															source={source}
															target={target}
															getTrackProps={getTrackProps}
														/>
													)
												)
											}
										</div>
									)
								}
							</Tracks>
						</Slider>
					</React.Fragment>
			) : null

	)
}

export {
    renderActionMenu,
    renderActionButtonText
}