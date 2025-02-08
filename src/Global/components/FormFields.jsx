import React from 'react'

const FormFields = ({handleSubmit,setPassword,setEmail}) => {
  return (
    <div className='mt-8 text-center flex flex-col items-center justify-center'>
      <input type="email" placeholder='Please Enter Your Email' className='input-new outline-0 w-[387px] mb-3 h-[42px] rounded-[3px] '   onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder='Enter Password' className='input-new outline-0 w-[387px] mb-3 h-[42px] rounded-[3px] '   onChange={(e) => setPassword(e.target.value)} />
   <div className='flex flex-col w-full mt-2'>

<div class="flex w-full  gap-2 items-center mb-[5px] text-xs">
  <input type="checkbox" id="remember-me" />
  <label for="show-password">Show Password</label>
</div>
<div class="flex w-full  gap-2 items-center mb-[5px] text-xs">
  <input  className='text-orig' type="checkbox"  id="remember-me" />
  <label className='text-orig' for="remember-me">Remember me</label>
</div>
   </div>

   <button onClick={handleSubmit} className='w-[387px] mt-4 h-[48px] btn-submit font-bold text-md text-white rounded-[3px] border '>Sign In</button>
    </div>
  )
}

export default FormFields
