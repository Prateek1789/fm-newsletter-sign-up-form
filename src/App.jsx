import { useState } from 'react'
import './App.css'
import { Form, SuccessModal } from './components/newsLetterForm'

function App() {
  const [userEmail, setUserEmail] = useState('');
  const [submissionCount, setSubmissionCount] = useState(0);

  const handleModal = (email) => {
    if (!email) return;
    
    setUserEmail(email);
    setSubmissionCount(prev => prev + 1);
  }

  return (
    <main>
      <Form onSubmit = { handleModal } />
      <SuccessModal email={userEmail} subCount={submissionCount} />
    </main>
  )
}

export default App