import React, { useEffect } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'

const NotFound = () => {
  const history = useHistory()
  useEffect(() => {
    setTimeout(() => {
      history.push('/')
    }, 3000)
  }, [history])
  return (
    <Row className='vh-100 justify-content-center align-items-center text-center'>
      <Col sm={12}>
        <div className='jumbotron'>
          <div className='display-1'>
            <i className='fas fa-exclamation-triangle'></i>
          </div>
          <h1 className='display-4'>404 Oops! This Page Could Not Be Found</h1>
          <p className='lead'>SORRY BUT THE PAGE YOU ARE LOOKING FOR DOES NOT EXIST, HAVE BEEN REMOVED. NAME CHANGED OR IS TEMPORARILY UNAVAILABLE</p>

          <p className='lead'>
            <Button as={Link} to='/'>
              <i className='fas fa-arrow-left'></i> Home
            </Button>
          </p>
        </div>
      </Col>
    </Row>
  )
}

export default NotFound
