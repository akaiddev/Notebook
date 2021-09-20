import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ErrorMessage from '../Components/ErrorMessage'
import Loader from '../Components/Loader'
import { login } from '../Redux/actions/userActions'
import Main from './Main'

const Login = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)

  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      history.push('/MyNote')
    }
  }, [userInfo, history])

  const submitHandler = async (e) => {
    e.preventDefault()

    dispatch(login(email, password))
  }

  return (
    <Main title='LOGIN'>
      {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler} className='pb-3'>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Row>
          <Col>
            New Writter ? <Link to='/Register'>Register Now</Link>
          </Col>
        </Row>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </Main>
  )
}

export default Login
