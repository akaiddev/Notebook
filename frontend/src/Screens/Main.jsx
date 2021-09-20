import React from 'react'
import { Col, Row } from 'react-bootstrap'

const Main = ({ title, children }) => {
  return (
    <Row>
      <Col>
        {title && (
          <>
            <h1 className='display-5 mt-2'>{title}</h1>
            <hr />
          </>
        )}
        {children}
      </Col>
    </Row>
  )
}

export default Main
