import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from '../Components/ErrorMessage'
import Loader from '../Components/Loader'
import { deleteNoteAction, updateNoteAction } from '../Redux/actions/notesActions'
import Main from './Main'

const UpdateNote = ({ match, history }) => {
  const [title, setTitle] = useState()
  const [content, setContent] = useState()
  const [category, setCategory] = useState()
  const [date, setDate] = useState('')

  const dispatch = useDispatch()

  const noteUpdate = useSelector((state) => state.noteUpdate)
  const { loading, error } = noteUpdate

  const noteDelete = useSelector((state) => state.noteDelete)
  const { loading: loadingDelete, error: errorDelete } = noteDelete

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteNoteAction(id))
    }
    history.push('/MyNote')
  }

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/notes/${match.params.id}`)

      setTitle(data.title)
      setContent(data.content)
      setCategory(data.category)
      setDate(data.updatedAt)
    }

    fetching()
  }, [match.params.id, date])

  const resetHandler = () => {
    setTitle('')
    setCategory('')
    setContent('')
  }

  const updateHandler = (e) => {
    e.preventDefault()
    dispatch(updateNoteAction(match.params.id, title, content, category))
    if (!title || !content || !category) return

    resetHandler()
    history.push('/MyNote')
  }

  return (
    <Main title='Edit Note'>
      <Card>
        <Card.Header>Edit your Note</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loader />}
            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            {errorDelete && <ErrorMessage variant='danger'>{errorDelete}</ErrorMessage>}
            <Form.Group controlId='title' className='mb-3'>
              <Form.Label>Title</Form.Label>
              <Form.Control type='title' placeholder='Enter the title' value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='content' className='mb-3'>
              <Form.Label>Content</Form.Label>
              <Form.Control as='textarea' placeholder='Enter the content' rows={4} value={content} onChange={(e) => setContent(e.target.value)} />
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
              <Form.Control type='content' placeholder='Enter the Category' value={category} onChange={(e) => setCategory(e.target.value)} />
            </Form.Group>
            {loading && <Loader />}
            <Button variant='primary' type='submit'>
              Update Note
            </Button>
            <Button className='mx-2' variant='danger' onClick={() => deleteHandler(match.params.id)}>
              Delete Note
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className='text-muted'>Updated on - {date.substring(0, 10)}</Card.Footer>
      </Card>
    </Main>
  )
}

export default UpdateNote
