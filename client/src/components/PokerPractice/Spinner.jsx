/*

  Rendering spinning logo

*/

import React from 'react';

import spinnerlogo from '../../assets/spinner.svg'

const Spinner = props => {
  return (
    <div className="loading-container">
        <div className="spinner-container">
            <img src={spinnerlogo} alt="Loading..."></img>
        </div>
    </div>
  )
}

export default Spinner;