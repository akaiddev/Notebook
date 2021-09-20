import React from 'react'
import { Container } from 'react-bootstrap'

const Footer = () => {
  return (
    <Container className='py-2 border-top text-center'>
      <p>
        <i className='fab fa-staylinked'></i> <strong> NodeBook &copy; {new Date().getFullYear()} All Rights Reserved.</strong>
      </p>
      <h6>
        <i className='fab fa-envira'></i> Design & Development by <i className='fas fa-heart'></i> Abdur Rahman Akaid
      </h6>
    </Container>
  )
}

export default Footer
