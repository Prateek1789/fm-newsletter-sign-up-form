import { useState, useEffect, useRef } from 'react'
import useEmailValidation from '../hooks/useEmailValidation'
import Validator from '../utils/validator'
import Images from '../assets/images/index'
import './form.css'

export const Form = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  let { validationState, errorMessage } = useEmailValidation(email, 1200);
  const inputRef = useRef(null);

  const getStyle = () => {
    switch(validationState) {
      case 'pending': return '';
      case 'valid': return 'text-green-500 border-green-500 bg-green-50';
      case 'invalid': return 'text-primary border-primary bg-red-100';
      default: return 'border-Grey';
    }
  }

  const handleSubmit =(e) => {
    e.preventDefault();

    const finalValidation = Validator.validateEmail(email);
    if (!finalValidation.isValid) {
      return
    }

    inputRef.current.value = '';
    onSubmit(finalValidation.isValid, email);
  }

  return (
    <article className='newsletter-card h-screen w-screen max-w-[26.875rem] bg-white grid grid-cols-1 grid-rows-[minmax(0rem,2fr)_3fr]'>
      <picture className='w-full h-full'>
        <source media='(min-width: 48rem)' srcSet={Images.bgTablet} />
        <source media='(min-width: 64rem)' srcSet={Images.bgDesktop} />
        <img 
            src={Images.bgMobile} 
            alt="Form Image" 
            className='w-full h-full object-cover object-bottom' />
      </picture>
      <section className='w-full h-full py-6 px-4 flex flex-col justify-between'>
        <div>
          <h1 className="heading text-2xl font-bold mb-2">Stay updated!</h1>
          <p className='text-sm'>Join 60,000+ product managers receiving monthly updates on:</p>
        </div>
        <ul className='flex flex-col gap-2'>
          <li>
            <img src={Images.listIcon} alt="" className='h-4 w-4'/>
            <p>Product discovery and building what matters</p>
          </li>
          <li>
            <img src={Images.listIcon} alt="" className='h-4 w-4'/>
            <p>Measuring to ensure updates are a success</p>
          </li>
          <li>
            <img src={Images.listIcon} alt="" className='h-4 w-4'/>
            <p>And much more!</p>
          </li>
        </ul>
        <form action="" className='flex flex-col gap-1'>
          <div className='flex justify-between'>
            <label htmlFor="user-email" className='font-bold text-xs'>Email Address:</label>
            { errorMessage && <span className={`validation-msg text-xs ${errorMessage ? 'text-primary' : ''}`}>{errorMessage}</span> }
          </div>
          <input 
                type="email" 
                ref={inputRef}
                name="user_email"
                id="user-email"
                onChange={(e) => setEmail(e.target.value)} 
                placeholder='email@company.com'
                className={`w-full h-12 border-[1px] rounded-lg mb-4 px-6 focus:outline-0 ${getStyle()}`}/>
          <button 
                type="submit" 
                onClick={(e) => handleSubmit(e)}
                className='w-full h-12 bg-Blue-800 text-White font-bold rounded-lg'>Subscribe to monthly newsletter</button>
        </form>
      </section>
    </article>
  )
}

export const SuccessModal = ({ shouldOpen, email }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (shouldOpen) {
      dialogRef.current.showModal();
    }
  }, [shouldOpen, email]);

  const closeModal = () => {
    if(dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <dialog ref={dialogRef} className='w-full h-full max-w-full max-h-full py-9 px-6 bg-White gap-6 open:flex open:flex-col justify-center'>
      <img src={Images.listIconSuccess} alt="" className='w-15 h-15 mb-6'/>
      <h2 className='text-[2.25rem] leading-10 font-bold text-Blue-800'>Thanks for subscribing!</h2>
      <p className='text-Blue-700'>A confirmation mail has been set to <strong>{email}</strong>. Please open it and click the button inside to confirm your subscription</p>
      <button type="button" 
              onClick={closeModal}
              className='w-full h-12 bg-Blue-800 text-White font-bold rounded-lg mt-auto'>Dismiss message</button>
    </dialog>
  )
}