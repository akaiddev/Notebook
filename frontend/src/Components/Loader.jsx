import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <div className='my-5'>
      <Spinner
        animation='border'
        variant='info'
        role='status'
        style={{
          width: '80px',
          height: '80px',
          margin: 'auto',
          display: 'block',
        }}
      >
        <span className='sr-only'>Loading...</span>
      </Spinner>
    </div>
  )
}

export default Loader
