import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { title: 'Inicio', id: 'hero' },
  { title: 'El Libro', id: 'featured-book' },
  { title: 'Archivo Poético', id: 'latest-poems' },
  { title: 'Contacto', id: 'contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleScroll = (id) => {
    setIsOpen(false); 
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 600); 
  };

  return (
    <>
      {/* 1. BARRA DE NAVEGACIÓN FIJA */}
      <header className="fixed top-0 left-0 w-full p-6 md:p-12 z-40 flex justify-between items-center pointer-events-none mix-blend-difference text-[#e5e5e0]">
        
        {/* Logo - Eliminado el N.L. pero se mantiene el área de clic invisible para volver al inicio */}
        <div 
          className="pointer-events-auto cursor-pointer flex items-center h-8 w-16" 
          onClick={() => handleScroll('hero')}
          aria-label="Volver al inicio"
        >
          <span className="sr-only">Inicio</span>
        </div>

        {/* Botón de Menú */}
        <button 
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto group flex items-center gap-4 cursor-pointer"
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold group-hover:opacity-70 transition-opacity">
            Menú
          </span>
          <div className="w-8 h-[2px] bg-[#e5e5e0] group-hover:w-12 transition-all duration-300"></div>
        </button>
      </header>

      {/* 2. OVERLAY DEL MENÚ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#050505] text-[#e5e5e0] flex flex-col"
          >
            
            <div className="w-full p-6 md:p-12 flex justify-between items-center">
              <span className="font-sans text-[10px] uppercase tracking-[0.4em] opacity-50">
                Navegación
              </span>
              <button 
                onClick={() => setIsOpen(false)}
                className="group flex items-center gap-4 cursor-pointer"
              >
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] opacity-60 group-hover:opacity-100 transition-opacity">
                  Cerrar
                </span>
                <div className="w-10 h-10 rounded-full border border-[#2a2a2a] flex items-center justify-center group-hover:border-[#e5e5e0] transition-colors">
                  <span className="text-xs font-light">✕</span>
                </div>
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center px-6 md:px-24">
              <nav className="flex flex-col gap-6 md:gap-10">
                {navLinks.map((link, i) => (
                  <motion.div 
                    key={link.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <button 
                      onClick={() => handleScroll(link.id)}
                      className="group flex items-center gap-8 text-left"
                    >
                      {/* Número indicador con animación de deslizamiento */}
                      <span className="font-sans text-[10px] uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-500">
                        0{i + 1}
                      </span>
                      {/* Tipografía brutalista: Uppercase, tracking apretado, cursiva al hacer hover */}
                      <span className="font-serif text-5xl md:text-7xl lg:text-[7rem] uppercase text-[#444] group-hover:text-[#e5e5e0] group-hover:italic transition-all duration-500 tracking-tighter leading-none">
                        {link.title}
                      </span>
                    </button>
                  </motion.div>
                ))}
              </nav>
            </div>

            <div className="w-full p-6 md:p-12 flex justify-between items-end border-t border-[#1a1a1a]">
              <div className="flex flex-col gap-2">
                <span className="font-sans text-[9px] uppercase tracking-[0.3em] opacity-50">Redes</span>
                <a href="#" className="font-sans text-xs uppercase tracking-widest hover:text-[#cbfb45] transition-colors">Instagram ↗</a>
              </div>
              <span className="font-sans text-[9px] uppercase tracking-[0.4em] opacity-30 text-right">
                Natalia Lara <br/> © {new Date().getFullYear()}
              </span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}