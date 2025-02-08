import React, { useState } from 'react'
import Orologo from '../../assets/orologo.png'
import FormFields from './FormFields'
import { useNavigate } from 'react-router-dom'
const FormSec = () => {

const [email,setEmail] = useState()
const [password,setPassword] = useState()
const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://oro24world.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-app-id': 'KYCTY', 
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.status === 'Success') {
        localStorage.setItem('authToken', data.token);
        navigate('/dashboard'); 
      } else {
        alert('Invalid login credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className='w-[485px] h-[528px] form-box rounded-[8px] flex flex-col items-center justify-center'>
      <img src={Orologo} alt='orologo'  />
<div className='flex flex-col justify-center items-center '>


      <FormFields handleSubmit={handleSubmit} setEmail={setEmail} setPassword={setPassword}/>
<div className='w-full flex items-start mt-4'>
      <p className=' text-xs low'>Want to be a partner with ORO24? <span className='purple-text font-bold'>Register Now</span></p>
      </div>
      </div>
    </div>
  )
}

export default FormSec
