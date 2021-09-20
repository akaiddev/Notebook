import React, { useEffect } from 'react'
import { Accordion, Badge, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ErrorMessage from '../Components/ErrorMessage'
import Loader from '../Components/Loader'
import { deleteNoteAction, listNotes } from '../Redux/actions/notesActions'
import Main from './Main'

const MyNotes = ({ history, search }) => {
  const dispatch = useDispatch()

  const noteList = useSelector((state) => state.noteList)
  const { loading, error, notes } = noteList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const noteCreate = useSelector((state) => state.noteCreate)
  const { success: createSuccess } = noteCreate

  const noteUpdate = useSelector((state) => state.noteUpdate)
  const { success: successUpdate } = noteUpdate

  const noteDelete = useSelector((state) => state.noteDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = noteDelete

  const deleteHandler = (id) => {
    if (window.confirm('Are You Sure Delete This?')) {
      dispatch(deleteNoteAction(id))
    }
  }

  // const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(search.toLowerCase()))

  console.log(notes)

  useEffect(() => {
    dispatch(listNotes())
    if (!userInfo) {
      history.push('/')
    }
  }, [dispatch, userInfo, history, createSuccess, successUpdate, successDelete])

  return (
    <Main title={`Welcome Back  ${userInfo && userInfo.name}`}>
      <Button variant='primary' as={Link} to='CreateNote'>
        <i className='fas fa-plus-circle'></i> Create New Notes
      </Button>

      {errorDelete && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
      {loadingDelete && <Loader />}

      {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
      {loading && <Loader />}

      {notes &&
        notes.reverse().map((note) => (
          <Accordion key={note._id}>
            <Card className='my-3'>
              <Card.Header className='d-flex'>
                <span style={{ color: 'black', textDecoration: 'none', flex: 1, cursor: 'pointer', alignSelf: 'center', fontSize: 18 }}>
                  <Accordion.Header>{note.title}</Accordion.Header>
                </span>

                <div>
                  <Button as={Link} to={`/Note/${note._id}`} variant='outline-info'>
                    <i className='fas fa-edit'></i>
                  </Button>{' '}
                  <Button variant='outline-danger' onClick={() => deleteHandler(note._id)}>
                    <i className='fas fa-trash-alt'></i>
                  </Button>
                </div>
              </Card.Header>
              <Accordion.Body>
                <Card.Body>
                  <Badge variant='success'>Category - {note.category}</Badge>

                  <blockquote className='blockquote my-2'>
                    <p> {note.content} </p>
                    <footer className='blockquote-footer'>
                      Created on <cite title='Source Title'>{note.createdAt.substring(0, 10)}</cite>
                    </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Body>
            </Card>
          </Accordion>
        ))}
    </Main>
  )
}

export default MyNotes
