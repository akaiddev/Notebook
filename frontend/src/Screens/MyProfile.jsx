import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Image, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ErrorMessage from '../Components/ErrorMessage'
import Loader from '../Components/Loader'
import { updateProfile } from '../Redux/actions/userActions'
import Main from './Main'

const MyProfile = () => {
  const history = useHistory()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [photo, setPhoto] = useState()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [photoMessage, setPhotoMessage] = useState()

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdate = useSelector((state) => state.userUpdate)
  const { loading, error, success } = userUpdate

  useEffect(() => {
    if (!userInfo) {
      history.push('/')
    } else {
      setName(userInfo.name)
      setEmail(userInfo.email)
      setPhoto(userInfo.photo)
    }
  }, [history, userInfo])

  const postDetails = (photos) => {
    if (!photos) {
      setPhotoMessage('Please Select an Image')
    }

    setPhoto(null)

    if (photos.type === 'image/jpeg' || photos.type === 'image/png') {
      const data = new FormData()
      data.append('file', photos)
      data.append('upload_preset', 'notebook')
      data.append('cloud_name', 'abdurrahman')

      fetch('https://api.cloudinary.com/v1_1/abdurrahman/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPhoto(data.url.toString())
          console.log(photo)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      setPhotoMessage('Please Select an Image')
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(updateProfile({ name, email, password, photo }))
  }

  return (
    <Main title='MyProfile'>
      <Row>
        <Col xs={12} lg={6}>
          {loading && <Loader />}
          {success && <ErrorMessage variant='success'>Updated Successfully</ErrorMessage>}
          {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}

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
              <Form.Control
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            {photoMessage && <ErrorMessage variant='danger'>{photoMessage}</ErrorMessage>}
            <Form.Group controlId='formFile' className='mb-3'>
              <Form.Label>Upload Profile Picture </Form.Label>
              <Form.Control type='file' label='Upload Profile Picture' onChange={(e) => postDetails(e.target.files[0])} />
            </Form.Group>

            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </Col>

        <Col xs={12} lg={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Image src={photo} alt={name} className='profilePic' thumbnail height='350' />
        </Col>
      </Row>
    </Main>
  )
}

export default MyProfile
