/*

  Track component used to build the slider for the action menu (betting)
  Reference: https://sghall.github.io/react-compound-slider/#/
  
*/

import React from 'react';

function Track ({ source, target, getTrackProps }) {
  return(
    <div
    style={{
        position: 'absolute',
        height: 10,
        zIndex: 1,
        marginTop: 32,
        backgroundColor: '#546C91',
        borderRadius: 5,
        cursor: 'pointer',
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
    }}
    {...getTrackProps()}
    />
  )
}
  
export default Track;