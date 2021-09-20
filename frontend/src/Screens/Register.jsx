import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import ErrorMessage from '../Components/ErrorMessage'
import Loader from '../Components/Loader'
import { register } from '../Redux/actions/userActions'
import Main from './Main'

const Register = () => {
  const history = useHistory()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [photo, setPhoto] = useState('https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg')

  const [message, setMessage] = useState(null)
  const [photoMessage, setPhotoMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  useEffect(() => {
    if (userInfo) {
      history.push('/MyNote')
    }
  }, [userInfo, history])

  const submitHandler = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Password Do Not Match')
    } else {
      dispatch(register(name, email, password, photo))
    }
  }

  const postDetails = (photo) => {
    if (!photo) {
      setPhotoMessage('Please Select an Image')
    }

    setPhoto(null)

    if (photo.type === 'image/jpeg' || photo.type === 'image/png') {
      const data = new FormData()
      data.append('file', photo)
      data.append('upload_preset', 'notebook')
      data.append('cloud_name', 'abdurrahman')

      fetch('https://api.cloudinary.com/v1_1/abdurrahman/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setPhoto(data.url.toString())
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      setPhotoMessage('Please Select an Image')
    }
  }

  return (
    <Main title='REGISTER'>
      {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
      {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler} className='pb-3'>
        <Form.Group className='mb-3' controlId='formBasicName'>
          <Form.Label>Full Name</Form.Label>
          <Form.Control type='text' placeholder='Enter Full Name' value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicConfirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </Form.Group>

        {photoMessage && <ErrorMessage variant='danger'>{photoMessage}</ErrorMessage>}
        <Form.Group controlId='formFile' className='mb-3'>
          <Form.Label>Upload Profile Picture </Form.Label>
          <Form.Control type='file' label='Upload Profile Picture' onChange={(e) => postDetails(e.target.files[0])} />
        </Form.Group>

        <Row>
          <Col>
            Already Registered ? <Link to='/Login'>Go Login</Link>
          </Col>
        </Row>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </Main>
  )
}

export default Register
