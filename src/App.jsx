import { useState } from 'react'
import './App.css'
import { Form, SuccessModal } from './components/newsLetterForm'

function App() {
  const [userEmail, setUserEmail] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleModal = (isValid, email) => {
    if (!isValid) return;
    
    setUserEmail(email);
    setIsValid(true);
  }

  return (
    <>
      <Form onSubmit = { handleModal } />
      <SuccessModal shouldOpen={isValid} email={userEmail} />
    </>
  )
}

export default App