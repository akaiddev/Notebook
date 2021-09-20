import React from 'react'
import { Button, Container, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { logout } from '../Redux/actions/userActions'

const Header = ({ setSearch }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())

    history.push('/')
  }
  return (
    <Navbar bg='light' variant='light' expand='lg' className='shadow-sm'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          <i className='fas fa-book-open'></i> NodeBook
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='m-auto'>
            {userInfo && (
              <Form className='d-flex'>
                <FormControl type='search' placeholder='Search' className='mr-2' onChange={(e) => setSearch(e.target.value)} />
                <Button variant='primary'>
                  <i className='fas fa-search'></i>
                </Button>
              </Form>
            )}
          </Nav>
          {userInfo ? (
            <Nav>
              <Nav.Link as={Link} to='/MyNote'>
                <i className='fas fa-book-open'></i> My Notes
              </Nav.Link>

              <NavDropdown title={userInfo?.name} id='basic-nav-dropdown'>
                <NavDropdown.Item as={Link} to='/Profile'>
                  <i className='fas fa-user'></i> My Profile
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandler}>
                  <i className='fas fa-sign-out-alt'></i> Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link as={Link} to='/Login'>
                <i className='fas fa-sign-in-alt'></i> Login
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
