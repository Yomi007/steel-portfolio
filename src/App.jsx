import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Skills from './components/Skills';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import ErrorBoundary from './components/ErrorBoundary';
import SmoothScroll from './components/SmoothScroll';
import MusicPlayer from './components/MusicPlayer';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <SmoothScroll>
          <div className="bg-stone-50 dark:bg-stone-950 min-h-screen text-stone-700 dark:text-stone-300 font-sans selection:bg-amber-500 selection:text-white relative">
            <ParticleBackground />
            <Navbar />
            <main>
              <Hero />
              <Projects />
              <Skills />
              <Testimonials />
              <About />
              <Contact />
            </main>
            <Footer />
            <MusicPlayer />
          </div>
        </SmoothScroll>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
