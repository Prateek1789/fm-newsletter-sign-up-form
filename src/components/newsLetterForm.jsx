import { useState, useEffect, useRef } from 'react'
import useEmailValidation from '../hooks/useEmailValidation'
import Validator from '../utils/validator'
import Images from '../assets/images/index'
import './form.css'

export const Form = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [attemptedSub, setAttemptedSub] = useState(false);
  let { validationState, errorMessage } = useEmailValidation(email, attemptedSub, 1200);
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
    setAttemptedSub(true);

    if (validationState === 'valid') {
      onSubmit(email);
      inputRef.current.value = '';
      setEmail('');
      setAttemptedSub(false);
    }
  }

  return (
    <article className='newsletter-card h-screen w-screen max-w-[26.875rem] bg-white grid grid-cols-1 grid-rows-[minmax(0rem,2fr)_3fr] md:gap-6 md:p-6 lg:p-6 lg:pl-16 lg:gap-16 xl:pl-4 xl:gap-16'>
      <picture className='w-full h-full'>
        <source media="(min-width: 48rem)" srcSet={Images.bgTablet} type="image/svg+xml" />
        <source media="(min-width: 64rem)" srcSet={Images.bgDesktop} type="image/svg+xml" />
        <img 
            src={Images.bgMobile} 
            alt="Form Image" 
            type="image/svg+xml"
            className='w-full h-full object-cover object-bottom md:[grid-area:image] md:rounded-2xl' />
      </picture>
      <section className='w-full h-full py-6 px-4 flex flex-col justify-between md:[grid-area:form] md:!px-0 xl:!pl-12'>
        <div>
          <h1 className="heading text-2xl text-Blue-800 font-bold mb-2 xl:!text-[3.25rem]">Stay updated!</h1>
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
                className='w-full h-12 bg-Blue-800 text-White font-bold rounded-lg lg:cursor-pointer lg:hover:shadow-2xl lg:hover:shadow-red-400 lg:hover:transition-all lg:hover:duration-200'>Subscribe to monthly newsletter</button>
        </form>
      </section>
    </article>
  )
}

export const SuccessModal = ({ email, subCount }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (subCount > 0) dialogRef.current.showModal(); 
  }, [subCount]);

  const closeModal = () => {
    if(dialogRef.current) dialogRef.current.close();
  };

  return (
    <dialog ref={dialogRef} 
            className='w-full h-full max-w-full max-h-full py-9 px-6 bg-White gap-6 open:flex open:flex-col justify-center md:w-[34rem] md:h-[34rem] md:absolute md:top-1/2 md:left-1/2 md:-translate-y-1/2 md:-translate-x-1/2 md:rounded-4xl md:backdrop:bg-Blue-800 md:py-12 md:px-16 md:open:justify-start md:gap-8'>
      <img src={Images.listIconSuccess} alt="" className='w-15 h-15 mb-6 md:mb-0'/>
      <h2 className='text-[2.25rem] leading-10 font-bold text-Blue-800'>Thanks for subscribing!</h2>
      <p className='text-Blue-700'>A confirmation mail has been set to <strong>{email}</strong>. Please open it and click the button inside to confirm your subscription</p>
      <button type="button" 
              onClick={closeModal}
              className='w-full h-12 bg-Blue-800 text-White font-bold focus:outline-0 rounded-lg mt-auto md:mt-0 lg:cursor-pointer lg:hover:shadow-2xl lg:hover:shadow-red-400 lg:hover:transition-all lg:hover:duration-200'>Dismiss message</button>
    </dialog>
  )
}