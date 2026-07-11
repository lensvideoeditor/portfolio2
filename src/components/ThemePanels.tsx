import React, { useState } from 'react';
import { Moon } from 'lucide-react';
import { motion } from 'framer-motion';

// --- Shared Tooltip Component ---
const Tooltip = ({ text, children, position = "top" }: { text: string, children: React.ReactNode, position?: "top" | "bottom" | "left" | "right", key?: React.Key }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && (
        <motion.div 
          initial={{ opacity: 0, y: position === 'top' ? 5 : -5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`absolute z-50 px-2 py-1 text-xs font-mono text-green-400 bg-gray-900 border border-green-900 rounded shadow-lg pointer-events-none whitespace-nowrap
            ${position === 'top' ? 'bottom-full mb-2' : ''}
            ${position === 'bottom' ? 'top-full mt-2' : ''}
            ${position === 'left' ? 'right-full mr-2' : ''}
            ${position === 'right' ? 'left-full ml-2' : ''}
          `}
        >
          {text}
        </motion.div>
      )}
    </div>
  );
};

// --- Panel 1: Default Minimal Dark ---
export const MinimalDarkPanel = () => {
  return (
    <div className="relative w-full h-full min-h-[300px] bg-[#1a1525] rounded-xl overflow-hidden shadow-2xl border border-gray-800 flex flex-col group">
      <div className="absolute top-2 left-2 text-[10px] font-mono text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">THEME: DEFAULT MINIMAL DARK</div>
      
      {/* Header Area */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-gray-800/50 bg-[#1a1525]/80 backdrop-blur-sm mt-8">
        {/* Logo */}
        <Tooltip text="font-family: 'Inter', sans-serif">
          <div className="text-xl font-semibold tracking-wide text-gray-100 font-sans">
            LENS
          </div>
        </Tooltip>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          {['HOME', 'WORK', 'CONTACT'].map((item) => (
            <Tooltip key={item} text={`nav-link: ${item.toLowerCase()}`}>
              <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors font-sans">
                {item}
              </a>
            </Tooltip>
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-6">
          {/* Swatches */}
          <Tooltip text="component: ThemeSelector" position="bottom">
            <div className="flex items-center gap-2 bg-gray-900/50 p-1.5 rounded-full border border-gray-800">
              <button className="w-4 h-4 rounded-full bg-purple-500 hover:scale-110 transition-transform"></button>
              <button className="w-4 h-4 rounded-full bg-blue-500 hover:scale-110 transition-transform"></button>
              <button className="w-4 h-4 rounded-full bg-emerald-500 hover:scale-110 transition-transform"></button>
              <button className="w-4 h-4 rounded-full bg-rose-500 hover:scale-110 transition-transform"></button>
            </div>
          </Tooltip>
          
          {/* Moon Icon */}
          <Tooltip text="icon: Moon (lucide)" position="bottom">
            <button className="text-gray-400 hover:text-white transition-colors">
              <Moon size={20} />
            </button>
          </Tooltip>
        </div>
      </div>
      
      {/* Body placeholder to show layout */}
      <div className="flex-1 p-8">
        <div className="w-1/3 h-4 bg-gray-800/50 rounded mb-4"></div>
        <div className="w-2/3 h-4 bg-gray-800/50 rounded"></div>
      </div>
    </div>
  );
};

// --- Panel 2: Skeuomorphic Industrial ---
export const SkeuomorphicPanel = () => {
  return (
    <div className="relative w-full h-full min-h-[300px] bg-brushed-aluminum rounded-xl overflow-hidden shadow-2xl border-4 border-gray-400 flex flex-col group">
      <div className="absolute top-2 left-2 text-[10px] font-mono text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">THEME: SKEUOMORPHIC INDUSTRIAL</div>
      
      {/* Header Area */}
      <div className="flex items-center justify-between px-8 py-6 border-b-2 border-gray-500 shadow-md mt-8 bg-gradient-to-b from-gray-200 to-gray-400">
        {/* Logo */}
        <Tooltip text="style: embossed-steel">
          <div className="text-2xl font-roboto text-embossed-steel uppercase">
            LENS
          </div>
        </Tooltip>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          {['HOME', 'WORK', 'CONTACT'].map((item) => (
            <Tooltip key={item} text={`btn-recessed: ${item.toLowerCase()}`}>
              <button className="px-4 py-2 text-xs font-bold font-roboto btn-recessed rounded">
                {item}
              </button>
            </Tooltip>
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-6">
          {/* Swatches */}
          <Tooltip text="style: heavy-metal-toggles" position="bottom">
            <div className="flex items-center gap-3 p-2 bg-gray-300 rounded shadow-inner border border-gray-400">
              <button className="w-5 h-5 rounded-sm toggle-metal hover:brightness-110 active:shadow-inner"></button>
              <button className="w-5 h-5 rounded-sm toggle-metal hover:brightness-110 active:shadow-inner"></button>
              <button className="w-5 h-5 rounded-sm toggle-metal hover:brightness-110 active:shadow-inner"></button>
              <button className="w-5 h-5 rounded-sm toggle-metal hover:brightness-110 active:shadow-inner"></button>
            </div>
          </Tooltip>
          
          {/* Moon Icon */}
          <Tooltip text="icon: sculpted-brass" position="bottom">
            <button className="icon-brass hover:brightness-125 transition-all active:translate-y-[1px]">
              <Moon size={24} fill="currentColor" />
            </button>
          </Tooltip>
        </div>
      </div>
      
      {/* Body placeholder */}
      <div className="flex-1 p-8">
        <div className="w-1/3 h-4 bg-gray-400/50 rounded shadow-inner mb-4"></div>
        <div className="w-2/3 h-4 bg-gray-400/50 rounded shadow-inner"></div>
      </div>
    </div>
  );
};

// --- Panel 3: Cyberpunk Neon ---
export const CyberpunkPanel = () => {
  return (
    <div className="relative w-full h-full min-h-[300px] bg-neon-grid rounded-xl overflow-hidden shadow-[0_0_30px_rgba(255,0,255,0.2)] border border-fuchsia-900 flex flex-col group">
      <div className="absolute top-2 left-2 text-[10px] font-mono text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity">THEME: CYBERPUNK NEON</div>
      
      {/* Header Area */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-cyan-900/50 mt-8 bg-black/60 backdrop-blur-md">
        {/* Logo */}
        <Tooltip text="font-family: 'Orbitron', text-shadow: neon">
          <div className="text-2xl font-orbitron font-bold text-neon-blue tracking-widest">
            LENS
          </div>
        </Tooltip>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <Tooltip text="color: electric-blue"><a href="#" className="text-sm font-orbitron font-medium text-neon-blue hover:text-white transition-colors">HOME</a></Tooltip>
          <Tooltip text="color: purple"><a href="#" className="text-sm font-orbitron font-medium text-neon-purple hover:text-white transition-colors">WORK</a></Tooltip>
          <Tooltip text="color: magenta"><a href="#" className="text-sm font-orbitron font-medium text-neon-magenta hover:text-white transition-colors">CONTACT</a></Tooltip>
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-6">
          {/* Swatches */}
          <Tooltip text="style: pulsing-light-sources" position="bottom">
            <div className="flex items-center gap-4 p-2 border border-fuchsia-900/50 bg-black/50 rounded">
              <button className="w-3 h-3 bg-cyan-400 text-cyan-400 swatch-pulsing"></button>
              <button className="w-3 h-3 bg-fuchsia-500 text-fuchsia-500 swatch-pulsing" style={{ animationDelay: '0.2s' }}></button>
              <button className="w-3 h-3 bg-purple-500 text-purple-500 swatch-pulsing" style={{ animationDelay: '0.4s' }}></button>
              <button className="w-3 h-3 bg-yellow-400 text-yellow-400 swatch-pulsing" style={{ animationDelay: '0.6s' }}></button>
            </div>
          </Tooltip>
          
          {/* Moon Icon */}
          <Tooltip text="style: segmented-digital" position="bottom">
            <button className="text-cyan-400 hover:text-white transition-colors">
              <Moon size={22} className="icon-segmented" />
            </button>
          </Tooltip>
        </div>
      </div>
      
      {/* Body placeholder */}
      <div className="flex-1 p-8">
        <div className="w-1/3 h-4 bg-cyan-900/40 border border-cyan-900/50 mb-4"></div>
        <div className="w-2/3 h-4 bg-fuchsia-900/40 border border-fuchsia-900/50"></div>
      </div>
    </div>
  );
};

// --- Panel 4: Vintage Serif Print ---
export const VintagePanel = () => {
  return (
    <div className="relative w-full h-full min-h-[300px] bg-aged-paper rounded-xl overflow-hidden shadow-2xl border-8 border-[#d4c4a8] flex flex-col group">
      <div className="absolute top-2 left-2 text-[10px] font-mono text-[#8a2828] opacity-0 group-hover:opacity-100 transition-opacity">THEME: VINTAGE SERIF PRINT</div>
      
      {/* Header Area */}
      <div className="flex items-center justify-between px-8 py-6 border-b-2 border-[#5a1818] mt-8 mx-4 border-etched">
        {/* Logo */}
        <Tooltip text="font-family: 'Playfair Display', style: woodcut">
          <div className="text-3xl font-playfair font-bold text-woodcut tracking-widest">
            LENS
          </div>
        </Tooltip>

        {/* Navigation */}
        <nav className="flex items-center gap-10">
          {['HOME', 'WORK', 'CONTACT'].map((item) => (
            <Tooltip key={item} text={`font: classic-serif`}>
              <a href="#" className="text-sm font-playfair font-semibold text-[#5a1818] hover:text-[#8a2828] transition-colors tracking-widest">
                {item}
              </a>
            </Tooltip>
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-8">
          {/* Swatches */}
          <Tooltip text="style: engraved-wax-seals" position="bottom">
            <div className="flex items-center gap-3">
              <button className="w-6 h-6 swatch-wax-seal hover:scale-105 transition-transform"></button>
              <button className="w-6 h-6 swatch-wax-seal hover:scale-105 transition-transform" style={{ filter: 'hue-rotate(45deg)' }}></button>
              <button className="w-6 h-6 swatch-wax-seal hover:scale-105 transition-transform" style={{ filter: 'hue-rotate(90deg)' }}></button>
              <button className="w-6 h-6 swatch-wax-seal hover:scale-105 transition-transform" style={{ filter: 'hue-rotate(180deg)' }}></button>
            </div>
          </Tooltip>
          
          {/* Moon Icon */}
          <Tooltip text="style: celestial-chart-engraving" position="bottom">
            <button className="hover:scale-110 transition-transform">
              <Moon size={24} className="icon-celestial" />
            </button>
          </Tooltip>
        </div>
      </div>
      
      {/* Body placeholder */}
      <div className="flex-1 p-8 mx-4">
        <div className="w-1/3 h-1 border-t-2 border-b-2 border-[#5a1818]/30 mb-6"></div>
        <div className="w-2/3 h-1 border-t border-[#5a1818]/20"></div>
      </div>
    </div>
  );
};
