import About from './components/About'
import Features from './components/Features'
import Hero from './components/Hero'

const App = () => {
  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      <Hero />
      <About />
      <Features />
    </main>
  )
}

export default App