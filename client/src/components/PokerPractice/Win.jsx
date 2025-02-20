/*

    Rendering end game screen - player wins

*/

import React from 'react';

class Win extends React.Component {
    render() {
        return (
            <div className='winner-div' onSubmit={() => this.props.updateState()}> 
                <p> Congratulations! </p>
                <p> You win! </p>
                <form >
                    <button className="showdown--nextRound--button" type="submit">Play again</button>
                </form>
            </div>
        )
    }
}

export default Win;