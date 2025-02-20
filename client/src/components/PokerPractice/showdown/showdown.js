/**
 * 
 * 	Showdown functions/utilities
 * 
 * 
 */


import React from 'react';

const renderNetPlayerEarnings = (endChips, startChips) => {

	const netChipEarnings = (endChips - startChips);
	const win = (netChipEarnings > 0);
	const none = (netChipEarnings === 0);	

	return(
		<div className='player-showdown--earnings--container'>
			<div class={`player-showdown--earnings ${(win) ? ('positive') : (none) ? ('') : ('negative')}`}>
				{`${(win) ? ('+') : ('')}${netChipEarnings}`}
			</div>  
		</div>
	)
}

// I'm really unsure why, but sometimes this "glithces", and shows the messages two times
// this could be from the calculation of the sidepots, but I haven't reverse engineered it TODO ###########
const renderShowdownMessages = (showDownMessages) => {

    return showDownMessages.map((message, index) => {

		const { users, prize, rank } = message;

		if (users.length > 1) {

			return (
				<React.Fragment key={index}>
					<div className="message--container">
						<span className="message--user">
							{`${users.length} players `}
						</span>
						<span className="message--content">
							{`split the pot with a `}
						</span>
						<span className="message--rank">
							{`${rank}!`}
						</span>
					</div>
					{ 
						users.map(user => {
							return(
								<div key={index + user} class="message--container">
									<span className="message--player">
										{`${user} `}
									</span>
									<span className="message--content">
										{`takes `}
									</span>
									<span className="message--earnings">
										{`${prize} chips `}
									</span>
									<span className="message--content">
										{`from the pot.`}
									</span>
								</div>
							)
						})
					}
				</React.Fragment>
			)
		} 
		else if (users.length === 1) {

			return(
				<div key={index} className="message--container">
					<span className="message--player">
						{`${users[0]} `}
					</span>
					<span className="message--content">
						{`wins `}
					</span>
					<span className="message--earnings">
						{`${prize} chips `}
					</span>
					<span className="message--content">
						{`from the pot with a `}
					</span>
					<span className="message--rank">
						{`${rank}!`}
					</span>
				</div>
			)
		}
	})
}

export {
	renderShowdownMessages,
	renderNetPlayerEarnings
}

