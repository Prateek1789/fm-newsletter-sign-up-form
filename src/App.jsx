import { useState } from 'react'
import './App.css'
import { Form } from './components/newsLetterForm'

function App() {
  const [userEmail, setUserEmail] = useState('');
  const [modalState, setModalState] = useState(false);

  const handleModal = (isValid, email) => {
    setUserEmail(email);
    setModalState(isValid);
  }

  return (
    <>
      <Form onSubmit = { handleModal } />
    </>
  )
}

export default App