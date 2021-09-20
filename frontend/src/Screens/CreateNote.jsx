import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from '../Components/ErrorMessage'
import Loader from '../Components/Loader'
import { createNoteAction } from '../Redux/actions/notesActions'
import Main from './Main'

const CreateNote = ({ history }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')

  const dispatch = useDispatch()

  const noteCreate = useSelector((state) => state.noteCreate)
  const { loading, error, notes } = noteCreate

  console.log(notes)

  const resetHandler = () => {
    setTitle('')
    setCategory('')
    setContent('')
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createNoteAction(title, content, category))
    if (!title || !content || !category) return

    resetHandler()
    history.push('/MyNote')
  }

  useEffect(() => {}, [])

  return (
    <Main title='Create a Note '>
      <Card>
        <Card.Header>Create a new Note</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler} className='mb-3'>
            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            <Form.Group controlId='title' className='mb-3'>
              <Form.Label>Title</Form.Label>
              <Form.Control type='title' value={title} placeholder='Enter the title' onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='content' className='mb-3'>
              <Form.Label>Content</Form.Label>
              <Form.Control as='textarea' value={content} placeholder='Enter the content' rows={4} onChange={(e) => setContent(e.target.value)} />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId='content' className='mb-3'>
              <Form.Label>Category</Form.Label>
              <Form.Control type='content' value={category} placeholder='Enter the Category' onChange={(e) => setCategory(e.target.value)} />
            </Form.Group>
            {loading && <Loader />}
            <Button type='submit' variant='primary'>
              Create Note
            </Button>
            <Button className='mx-2' onClick={resetHandler} variant='danger'>
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className='text-muted'>Creating on - {new Date().toLocaleDateString()}</Card.Footer>
      </Card>
    </Main>
  )
}

export default CreateNote
