/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, Instagram, Twitter, Mail, ChevronDown } from 'lucide-react';

import { modelData } from './data/persona';

const SECTIONS = [
  { id: 'hero', title: 'DANNEY' },
  { id: 'profile', title: 'PROFILE' },
  { id: 'digitals', title: 'POLAROIDS' },
  { id: 'portfolio', title: 'PORTFOLIO' },
];

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-art-bg text-art-ink selection:bg-art-accent selection:text-white">
      {/* Main Layout Container */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* Left Sidebar (Desktop) */}
        <aside className="hidden lg:flex w-20 border-r art-border flex-col justify-between items-center py-12 sticky top-0 h-screen">
          <button onClick={() => scrollToSection('hero')} className="font-display text-2xl -rotate-90 tracking-tighter">BOOK</button>
          <div className="text-vertical text-[10px] tracking-[0.4em] text-art-muted uppercase">
            <a href="http://www.instagram.com/danneyescobar">INSTAGRAM</a> &mdash; <a href="http://www.tiktok.com/@danneyescobar_">TIKTOK</a>
          </div>
        </aside>

        {/* Mobile Nav */}
        <nav className="lg:hidden flex justify-between items-center p-6 border-b art-border bg-art-bg/80 backdrop-blur-md sticky top-0 z-50">
          <button onClick={() => scrollToSection('hero')} className="font-display text-xl tracking-tighter">Danney's Book</button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              className="fixed inset-0 z-[60] bg-art-ink text-white flex flex-col items-center justify-center space-y-8"
            >
              <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6">
                <X size={32} />
              </button>
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="text-4xl font-serif italic"
                >
                  {section.title}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Center Content Area */}
        <main className="flex-1 w-full relative overflow-hidden">
          {/* Hero Section */}
          <section 
            id="hero"
            className="relative min-h-[80vh] lg:h-screen flex flex-col justify-center px-8 lg:px-16 py-20 overflow-hidden"
          >
            <div className="relative z-10 lg:max-w-[60%]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-art-accent text-1 tracking-[0.5em] font-bold uppercase mb-6"
              >
                Modelo
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-7xl md:text-[100px] font-serif italic leading-[0.85] tracking-tighter mb-12"
              >
                {modelData.profile.firstName} <br /> {modelData.profile.lastName}.
              </motion.h1>
              
              {/* Stats Grid - Oculto en móviles, visible desde tablets (md) */}
              <div className="hidden md:grid grid-cols-2 lg:grid-cols-1 gap-5 max-w-2xl border-t art-border pt-10">
              <div>
                <div className="text-[18px] uppercase tracking-widest text-art-muted mb-1">Altura</div>
                <div className="text-sm font-semibold">{modelData.measurements.Estatura}</div>
              </div>
              <div>
                <div className="text-[18px] uppercase tracking-widest text-art-muted mb-1">Busto</div>
                <div className="text-sm font-semibold">{modelData.measurements.Busto}</div>
              </div>
              <div>
                <div className="text-[18px] uppercase tracking-widest text-art-muted mb-1">Cintura</div>
                <div className="text-sm font-semibold">{modelData.measurements.Cintura}</div>
              </div>
              <div>
                <div className="text-[18px] uppercase tracking-widest text-art-muted mb-1">Caderas</div>
                <div className="text-sm font-semibold">{modelData.measurements.Caderas}</div>
              </div>
            </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 1 }}
              className="relative mt-12 mx-auto w-full max-w-[320px] md:absolute md:bottom-0 md:right-0 md:mt-0 md:max-w-none md:w-[400px] lg:w-[450px] xl:w-[550px] aspect-[3/4] shadow-2xl md:z-0 overflow-hidden"
            >
              <img 
                src={modelData.images.hero} 
                alt="Danney Noir"
                className="w-full h-full object-cover grayscale"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Botón Mobile - Visible solo en móviles */}
            <button 
              onClick={() => scrollToSection('profile')} 
              className="md:hidden mt-8 group flex items-center space-x-3 text-xs tracking-[0.2em] uppercase font-bold text-art-ink border-b border-art-ink pb-2 w-max hover:text-art-muted transition-colors"
            >
            <span>Ver Medidas Completas</span>
            <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </section>

          {/* Stats Section */}
          {/* Profile & Experience Section */}
          <section id="profile" className="py-20 px-8 lg:px-16 border-t art-border">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
              
              {/* Columna Izquierda: Datos Duros */}
              <div className="md:col-span-7">
                <span className="text-1 tracking-[0.5em] font-bold text-art-accent uppercase block mb-6">Perfin Profesional</span>
                <h2 className="text-6xl md:text-8xl font-serif italic tracking-tighter mt-4">Informacion.</h2>
                
                {/* Título Principal */}
                <div className="mb-12">
                  <h3 className="text-2xl md:text-4xl font-bold italic mb-4 mt-8 tracking-tight text-art-gold/90">
                    Reconocimientos</h3>
                  {modelData.experience.titles.map((title, idx) => (
                    <p key={idx} className="text-l md:text-xl tracking-tight text-art-ink/70">• <a href="https://www.instagram.com/p/DUN6jXtjrnW/?hl=es&img_index=1">{title}</a></p>
                  ))}
                </div>

                {/* Grid de Medidas Físicas */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8 mb-8 border-t border-b art-border py-12">
                  {Object.entries(modelData.measurements).map(([key, value]) => (
                    <div key={key}>
                      <h4 className="text-s tracking-[0.3em] uppercase font-bold text-art-muted mb-2">{key}</h4>
                      <p className="text-3xl font-serif italic text-art-ink">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Experiencia de Marcas */}
                <div>
                  <h3 className="text-2xl md:text-4xl font-bold italic mb-8 tracking-tight text-art-ink/90">
                    Colaboraciones Seleccionadas</h3>
                  <div className="flex flex-wrap gap-3">
                    {modelData.experience.clients.map((client, idx) => (
                      <span key={idx} className="px-4 py-2 text-s border art-border rounded-full text-art-muted uppercase tracking-widest">
                        {client}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Columna Derecha: Booking y Redes (Social Reach) */}
              <div className="md:col-span-5">
                <div className="sticky top-32 p-12 bg-art-ink text-white space-y-10">
                  <div>
                    <h3 className="text-3xl font-serif italic mb-2">Digital Reach</h3>
                    <p className="text-sm text-white/60 leading-relaxed mb-6">
                      Audiencia activa y consolidada para campañas comerciales.
                    </p>
                    <div className="space-y-4">
                      <a href={modelData.social.tiktok.link} target="_blank" rel="noreferrer" className="flex justify-between items-center border-b border-white/20 pb-4 group">
                        <span className="text-xs uppercase tracking-widest group-hover:text-art-accent transition-colors">TikTok</span>
                        <span className="font-serif italic text-xl">{modelData.social.tiktok.followers}</span>
                      </a>
                      <a href={modelData.social.instagram.link} target="_blank" rel="noreferrer" className="flex justify-between items-center border-b border-white/20 pb-4 group">
                        <span className="text-xs uppercase tracking-widest group-hover:text-art-accent transition-colors">Instagram</span>
                        <span className="font-serif italic text-xl">{modelData.social.instagram.followers}</span>
                      </a>
                    </div>
                  </div>

                  <div className="space-y-4 pt-6">
                    <a 
                      href="https://wa.me/59175847572?text=Hola,%20quisiera%20contactar%20a%20Danney%20Escobar%20para%20un%20proyecto"
                      target="_blank"
                      rel="noreferrer"
                      className="block text-center w-full bg-art-accent text-white py-5 text-[10px] tracking-[0.3em] font-bold uppercase hover:brightness-110 transition-all"
                    >
                      CONTACTAR A DANNEY
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Digitals Section */}
          <section 
            id="digitals"
            className="py-20 px-8 lg:px-16 border-t art-border"
          >
            <div className="mb-20">
              <span className="text-1 tracking-[0.5em] font-bold text-art-accent uppercase">Crudo & Natural</span>
              <h2 className="text-6xl md:text-8xl font-serif italic tracking-tighter mt-4">Polaroids.</h2>
              <p className="text-art-muted mt-6 max-w-md">Polaroids sin editar, tomadas con luz natural, para su revisión por la agencia.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {modelData.images.digitals.map((src, idx) => (
                <div key={idx} className="aspect-[3/4] overflow-hidden bg-art-ink/5">
                  <img 
                    src={src} 
                    alt={`Digital ${idx}`}
                    className="w-full h-full object-cover grayscale"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </section>

                    {/* Portfolio Section */}
          <section 
            id="portfolio"
            className="py-20 px-8 lg:px-16 border-t art-border"
          >
            <div className="mb-20">
              <span className="text-1 tracking-[0.5em] font-bold text-art-accent uppercase">Portfolio</span>
              <h2 className="text-6xl md:text-8xl font-serif italic tracking-tighter mt-4">Sesiones Fotográficas.</h2>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
              {modelData.images.portfolio.map((src, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="break-inside-avoid group cursor-pointer overflow-hidden bg-art-ink/5"
                >
                  <a href="https://www.instagram.com/danneyescobar/" target="_blank" rel="noopener noreferrer">
                    <img 
                      src={src} 
                      alt={`Portfolio ${idx}`}
                      className="w-full h-auto group-hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </a>
                </motion.div>
              ))}
            </div>
          </section>


          {/* Footer */}
          {/* Footer */}
          <footer className="py-20 px-8 lg:px-16 border-t art-border bg-art-bg">
            <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-8 text-[10px] tracking-[0.3em] text-art-ink/80 uppercase">
              
              {/* Copyright Estilo Editorial */}
              <p className="text-center md:text-left leading-relaxed">
                © {new Date().getFullYear()} Noir By Arandia <br className="md:hidden" /> ALL RIGHTS RESERVED.
              </p>
              
              {/* Redes Sociales del Fotógrafo/Desarrollador */}
              <div className="flex space-x-8">
                <a href="https://instagram.com/perezarandia" target="_blank" rel="noreferrer" className="hover:text-art-accent transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="https://x.com/12Dan1998" target="_blank" rel="noreferrer" className="hover:text-art-accent transition-colors">
                  <Twitter size={18} />
                </a>
                <a href="mailto:dan1998.27.12@gmail.com" className="hover:text-art-accent transition-colors">
                  <Mail size={18} />
                </a>
              </div>

              {/* Firma y Botón para Móviles */}
              <div className="flex flex-col items-center md:items-end gap-5">
                <p>Designed & Developed by Daniel Pérez</p>
                <a 
                  href="https://wa.me/59175847572?text=Hola%20Daniel,%20me%20encanta%20tu%20trabajo.%20Quiero%20cotizar%20un%20proyecto."
                  target="_blank"
                  rel="noreferrer"
                  className="bg-art-accent text-white px-8 py-4 text-[10px] tracking-widest font-bold uppercase hover:brightness-110 transition-all text-center w-full md:w-auto"
                >
                  Obten tú portfolio digital
                </a>
              </div>

            </div>
          </footer>
        </main>

        {/* Right Details Panel (Desktop) */}
        <section className="hidden lg:flex w-[400px] bg-art-ink text-white p-16 flex-col justify-between sticky top-0 h-screen">
          <nav>
            <ul className="space-y-6 text-right">
              {SECTIONS.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`text-xs tracking-[0.2em] uppercase transition-all ${activeSection === section.id ? 'opacity-100 border-b-2 border-art-accent pb-1' : 'opacity-40 hover:opacity-70'}`}
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Lead Gen - DuskNoir Studio */}
            <div className="pt-12 border-t border-white/10">
              <div className="flex items-center mb-4">
                <div className="w-2 h-2 bg-art-gold rounded-full mr-3"></div>
                <h3 className="text-xl font-serif italic text-white/90">Digital Comp Card</h3>
              </div>
              <p className="text-xs text-white/50 leading-relaxed mb-8">
                Diseño web editorial y arquitectura de portafolios para talentos de la industria.
              </p>
              
              <a 
                href="https://wa.me/59175847572?text=Hola%20Daniel,%20me%20interesa%20un%20Digital%20Comp%20Card%20como%20el%20de%20Danney" 
                target="_blank" 
                rel="noreferrer"
                className="block w-full bg-art-gold text-white py-4 text-center text-xs tracking-widest font-bold uppercase hover:brightness-110 transition-all"
              >
                OBTÉN TU PORTAFOLIO
              </a>
              
              <p className="text-[9px] tracking-widest uppercase text-white/30 text-center pt-5">
                Powered by Daniel Perez Arandia - Web Developer & Designer
              </p>
            </div>
        </section>

      </div>
    </div>
  );
}

