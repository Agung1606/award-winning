import React from 'react'

type Props = {}

const About = (props: Props) => {
  return (
    <div id='about' className='w-screen min-h-screen'>

      <div className='relative mb-8 mt-36 flex flex-col items-center gap-5'>
        <p className='font-general text-sm uppercase md:text-[10px]'>
          Welcome to Zentry
        </p>
        <div>
          Disc<b>o</b>ver the world's <br /> largest shared <b>a</b>dvanture
        </div>
        <div className='about-subtext'>
          <p>The Game of Games begins-your life, now an epic MMORPG</p>
          <p className='text-gray-500'>
            Zentry unites every player from countless games and platforms, both
            digital and physical, into a unified Play Economy
          </p>
        </div>
      </div>

    </div>
  )
}

export default About