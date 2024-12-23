import { useEffect, useRef } from 'react'
import clsx from 'clsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger)

const AnimatedTittle = ({ title, containerClass }: any) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: '100 bottom',
          end: 'center bottom',
          toggleActions: 'play none none reverse'
        },
      });

      titleAnimation.to(
        '.animated-word',
        {
          opacity: 1,
          transform: 'translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)',
          ease: 'power2.inOut',
          stagger: 0.02,
        },
        0
      );
    }, containerRef)

    return () => ctx.revert(); // clean up on unmount
  }, []);
  return (
    <div ref={containerRef} className={clsx('animated-tittle', containerClass)}>
      {title.split('<br />').map((line: any, index: any) => (
        <div 
          key={index} 
          className='flex-center max-w-full flex-wrap gap-2 px-16 md:gap-3'
        >
          {line.split(" ").map((word: any, idx: any) => (
            <span 
              key={idx}
              className='animated-word'
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default AnimatedTittle