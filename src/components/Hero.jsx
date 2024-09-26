import React from 'react'
import logo from '../assets/logo.svg'
import logo1 from '../assets/logo1.svg'
const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='flex justify-between items-center w-full mb-10 pt-3'>
      <img src={logo1} alt='ai_logo' className='w-28  object-contain'/>
      <button type='button' onClick={()=>window.open('https://github.com/pranavv444')} className='black_btn'>GitHub</button>
      </nav>
      <h1 className='head_text'>Summarize Articles <br className='max-md:hidden'/>
      <span className='orange_gradient'>Open AI GPT-4</span></h1>
      <h2 className='desc'>Simplify your article readings!!</h2>
    </header>
  )
}

export default Hero