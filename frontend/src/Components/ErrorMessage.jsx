import React from 'react'
import { Alert } from 'react-bootstrap'

const ErrorMessage = ({ variant = 'info', children }) => {
  return (
    <div className='my-3'>
      <Alert variant={variant}>
        <strong>{children}</strong>
      </Alert>
    </div>
  )
}

export default ErrorMessage
