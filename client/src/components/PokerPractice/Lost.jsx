/*

    Rendering end game screen - player loses

*/

import React from 'react';

class Lost extends React.Component {
    render() {
        return (
            <div className='loser-div' onSubmit={() => this.props.updateState()}> 
                <p> That's unfortunate! </p>
                <p> You lost! </p>
                <form >
                    <button className="showdown--nextRound--button" type="submit">Play again</button>
                </form>
            </div>
        )
    }
}

export default Lost;