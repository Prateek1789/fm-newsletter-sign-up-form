import { useState } from 'react'
import useEmailValidation from '../hooks/useEmailValidation'
import './form.css'
import Images from '../assets/images/index'

export const Form = () => {
    const [email, setEmail] = useState('');
    const {validationState, errorMessage } = useEmailValidation(email, 1200);

    function getStyle() {
        switch(validationState) {
            case 'pending': return 'text-amber-400 border-amber-400';
            case 'valid': return 'text-green-500 border-green-500 bg-green-50';
            case 'invalid': return 'text-primary border-primary bg-red-100';
            default: return 'border-Grey';
        }
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
                  name="user_email"
                  id="user-email"
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder='email@company.com'
                  className={`w-full h-12 border-[1px] rounded-lg mb-4 px-6 focus:outline-0 ${getStyle()}`}/>
            <button type="submit" className='w-full h-12 bg-Blue-800 rounded-lg text-White font-bold'>Subscribe to monthly newsletter</button>
          </form>
        </section>
      </article>
    )
}

export const SuccessDialogue = () => {
    return (
        <h1>Hello world</h1>
    )
}