import { FaDiscord, FaMedium, FaTwitter, FaYoutube } from "react-icons/fa"

const socialLinks = [
  { href: '', icon: <FaDiscord /> },
  { href: '', icon: <FaTwitter /> },
  { href: '', icon: <FaYoutube /> },
  { href: '', icon: <FaMedium /> },
]

const Footer = () => {
  return (
    <footer className="w-screen bg-[#5542ff] py-4 text-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">

        <p className="text-center text-sm font-light md:text-left">
          @Nova 2025. All rights reserved
        </p>

        <div className="flex justify-center gap-4 md:justify-start">
          {socialLinks.map((link, index) => (
            <a 
              href={link.href} 
              key={index} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition-colors duration-500 ease-in-out hover:text-white"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <a 
          href="#privacy-policy"
          className="text-center text-sm font-light hover:underline md:text-right"
        >
          Privacy Policy
        </a>

      </div>
    </footer>
  )
}

export default Footer