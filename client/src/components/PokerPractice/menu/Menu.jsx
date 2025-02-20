/*
  Menu component, TODO -> complete bot amount, as well as min bet choice for the user
*/

import React from 'react';

import { cloneDeep } from 'lodash';

class Menu extends React.Component {

  onTrigger = (event) => {
    this.props.updateState(2)
    event.preventDefault();
  }

  handleBots = (changeEvent) => {
    this.props.updateNBots(changeEvent.target.value)
  }

  handleBets = (changeEvent) => {
    this.props.updateBet(changeEvent.target.value)
  }

  render() {
    return (
    
      <form className="poker-menu-container" onSubmit={this.onTrigger}>
        <div className='min-bet-radiobuttons'>
          <p>Please select the desired minimum bet</p>
        </div>
        <div className='min-bet-radiobuttons'>
          <div className="bet-radiobutton">
            <label>
              <input type="radio" value="10" onChange={this.handleBets} checked={this.props.selectedBet === '10'}/>
              10
            </label>
          </div>
          <div className="bet-radiobutton">
            <label>
              <input type="radio" value="20" onChange={this.handleBets} checked={this.props.selectedBet === '20'} />
              20
            </label>
          </div>
          <div className="bet-radiobutton">
            <label>
              <input type="radio" value="40" onChange={this.handleBets} checked={this.props.selectedBet === '40'} />
              40
            </label>
          </div>
        </div>
        <div className='number-bots-radiobuttons'>
          <p>Please select the desired number of bots</p>
        </div>
        <div className='number-bots-radiobuttons'>
          <div className="bot-radiobutton">
            <label>
              <input type="radio" value="4" onChange={this.handleBots} checked={this.props.selectedNBot === '4'}/>
              4
            </label>
          </div>
          <div className="bot-radiobutton">
            <label>
              <input type="radio" value="3" onChange={this.handleBots} checked={this.props.selectedNBot === '3'} />
              3
            </label>
          </div>
          <div className="bot-radiobutton">
            <label>
              <input type="radio" value="2" onChange={this.handleBots} checked={this.props.selectedNBot === '2'} />
              2
            </label>
          </div>
        </div>
        <button className="startgame--button" type="submit">Start game</button>
      </form>
    )
  }
}

export default Menu;