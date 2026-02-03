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

function App() {
  return (
    <ErrorBoundary>
      <SmoothScroll>
        <div className="bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-white selection:text-slate-950 relative">
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
        </div>
      </SmoothScroll>
    </ErrorBoundary>
  );
}

export default App;
