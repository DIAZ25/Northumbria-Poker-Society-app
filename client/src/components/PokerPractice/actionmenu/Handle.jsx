/*

  Handle component used to build the slider for the action menu (betting)
  Reference: https://sghall.github.io/react-compound-slider/#/
  
*/

import React from 'react';

function Handle({
  handle: { id, value, percent },
  getHandleProps
}) {
  return (

    <div style={{
      display: 'flex',
      justifyContent: 'center',
      marginBottom: -41,
      fontSize: '1.4em'
    }

    }>

      <div
        style={{
          left: `${percent}%`,
          position: 'absolute',
          marginLeft: -10,
          marginTop: 27,
          zIndex: 2,
          width: 25,
          height: 25,
          border: 0,
          textAlign: 'center',
          cursor: 'pointer',
          borderRadius: '50%',
          backgroundColor: '#2C4870',
          color: '#aaa',
        }}
        {...getHandleProps(id)}
      >
      </div>

      <div style={{
          display: 'flex',
          width: '5%',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1em 3em', 
          backgroundColor: '#1f2937',
          borderRadius: '.5em',
          marginBottom: 25,
          marginTop: -40,
          fontWeight: 'bold'
          }} >
            {value}
        </div>

    </div>

  )
}

export default Handle;