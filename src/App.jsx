import { useState } from 'react'
import './App.css'
import Images from './assets/images/index'

function App() {

  return (
    <>
      <article className='newsletter-card h-screen w-screen bg-white grid grid-cols-1 grid-rows-[minmax(0rem,2fr)_3fr]'>
        <picture className='w-full h-full min-h-0'>
          <source media='(min-width: 48rem)' srcSet={Images.bgTablet} />
          <source media='(min-width: 64rem)' srcSet={Images.bgDesktop} />
          <img 
              src={Images.bgMobile} 
              alt="Form Image" 
              className='w-full h-full object-cover object-[0rem_-1rem] ' />
        </picture>
        <section className='w-full h-full py-8 px-4'>
          <h1 className="heading text-4xl font-bold">Stay Updated!</h1>
          <p>Join 60,000+ product managers receiving monthly updates on:</p>
          <form action="" className='flex flex-col gap-2'>
            <label htmlFor="user-email" className='font-bold text-sm'>Email Address:</label>
            <span className='validation-msg'>Valid Email</span>
            <input 
                  type="email" 
                  name="user_email" 
                  id="user-email" 
                  placeholder='email@company.com'
                  className='w-full h-14 border-[1px] rounded-lg border-Grey mb-4 px-6'/>
            <button type="submit" className='w-full h-14 bg-Blue-800 rounded-lg text-White font-bold'>Subscribe to monthly newsletter</button>
          </form>
        </section>
      </article>
    </>
  )
}

export default App
