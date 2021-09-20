import React, { useEffect } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Home = ({ history }) => {
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo')

    if (userInfo) {
      history.push('/MyNote')
    }
  }, [history])

  return (
    <Row className='vh-100 justify-content-center align-items-center text-center'>
      <Col md={12}>
        <div className='jumbotron'>
          <h1 className='display-2 fw-bold'>Welcome to Notebook</h1>
          <p className='lead'>One of The Safe place for all your notes</p>
          <Button as={Link} to='/Login' className='w-25'>
            <i className='fas fa-sign-in-alt'></i> Login
          </Button>{' '}
          <Button as={Link} to='/Register' className='w-25'>
            <i className='fas fa-registered'></i> SingUp
          </Button>
        </div>
      </Col>
    </Row>
  )
}

export default Home
