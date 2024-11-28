import React, { useState } from 'react'
import githublogo from "../assets/githublogo.png";

const Nav = () => {

  function goTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <nav className='p-4 sm:sticky top-0 z-10 w-full bg-zinc-800 flex justify-between items-center text-white'>
      <div className="logo font-bold sm:text-xl sm:ml-14 cursor-pointer" onClick={goTop}><span>&lt;Cipher<span className='text-amber-300'>Nest</span>/&gt;</span></div>
      <a href='https://github.com/ExcitingTuber?tab=repositories' target='_blank' className='flex sm:mr-16' title='github'>
        <img src={githublogo} alt="github" className='h-6 pl-6 pr-2'/>Contact us
      </a>
    </nav>
  )
}

export default Nav
