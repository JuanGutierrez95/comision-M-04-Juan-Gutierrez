import React from 'react'
import RegisterUserForm from '../Form/RegisterUserForm'
import { Card } from 'react-bootstrap'

const RegisterUser = () => {
  return (
    <Card.Body>
      <RegisterUserForm />
    </Card.Body>
  )
}

export default RegisterUser