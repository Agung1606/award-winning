import { TiLocationArrow } from "react-icons/ti"
import Button from "./Button"
import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";
import gsap from "gsap";
import clsx from "clsx";

const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const NavBar = () => {
  // state for toggling audio and visual indicator
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  // refs for audio and navigation container
  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // toggle audio and visual indicator
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  }

  useEffect(() => {
    if(isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying])

  useEffect(() => {
    if(currentScrollY === 0) {
      // topmost position: show navbar without floating nav
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      // scrolling down: hide navbar and apply floating nav
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      // scrolling up: show navbar with floating nav
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav")
    }
    setLastScrollY(currentScrollY);
  }, [lastScrollY, currentScrollY])

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2
    });
  }, [isNavVisible])
  return (
    <div ref={navContainerRef} className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6">
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          {/* Logo and product button */}
          <div className="flex items-center gap-7">
            <img src="img/logo.png" alt="logo" className="w-10" />
            <Button 
              id="product-button"
              title="Product"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>
          {/* Navigation links and audio button */}
          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <a 
                  key={index} 
                  href={`#${item.toLowerCase()}`} 
                  className="nav-hover-btn"
                >
                  {item}
                </a>
              ))}
            </div>
            <button onClick={toggleAudioIndicator} className="ml-10 flex items-center space-x-0.5">
              <audio 
                ref={audioElementRef}
                src="audio/loop.mp3" 
                className="hidden" 
                loop 
              />
              {[1, 2, 3, 4].map((bar) => (
                <div 
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isIndicatorActive
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default NavBar