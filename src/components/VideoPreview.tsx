import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const VideoPreview = ({children}: any) => {
  const [isHovering, setIsHovering] = useState(false);

  const sectionRef = useRef(null); // reference for the container section
  const containRef = useRef(null); // reference for the inner content

  // handle mouse movement over the container
  const handleMouseMove = ({ clientX, clientY, currentTarget}: any) => {
    const rect = currentTarget.getBoundingClientRect(); // get dimension of the container

    const xOffset = clientX - (rect.left + rect.width / 2); // calculate x offset
    const yOffset = clientY - (rect.top + rect.height / 2); // calculate y offset

    if(isHovering) {
      // move the container slightly in the direction of the cursor
      gsap.to(sectionRef.current, {
        x: xOffset,
        y: yOffset,
        rotationY: xOffset / 2, // add 3D rotation effect
        rotationX: -yOffset / 2,
        transformPerspective: 500, // perspective for realistic 3D effect
        duration: 1,
        ease: 'power1.out'
      });

      // move the inner content in the opposite direction for a parallax effect
      gsap.to(containRef.current, {
        x: -xOffset,
        y: -yOffset,
        duration: 1,
        ease: 'power1.out'
      });
    }
  }
  
  useEffect(() => {
    // reset the position of content when hover ends
    if(!isHovering) {
      gsap.to(sectionRef.current, {
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        transformPerspective: 0, 
        duration: 1,
        ease: 'power1.out'
      });
      gsap.to(containRef.current, {
        x: 0,
        y: 0,
        duration: 1,
        ease: 'power1.out'
      });
    }
  }, [isHovering])

  return (
    <section 
      ref={sectionRef} 
      onMouseMove={handleMouseMove} 
      onMouseEnter={() => setIsHovering(true)} 
      onMouseLeave={() => setIsHovering(false)} 
      className='absolute z-50 size-full overflow-hidden rounded-lg' 
      style={{ perspective: '500px'}}
    >
      <div 
        ref={containRef}
        className="origin-center rounded-lg" 
        style={{ transformStyle: 'preserve-3d'}}
      >
        {children}
      </div>
    </section>
  )
}

export default VideoPreview