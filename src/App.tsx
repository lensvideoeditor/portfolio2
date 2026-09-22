import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, X, Check, ArrowUpRight, Send } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utilities ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function extractYouTubeID(url: string): string | null {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : null;
}

function extractYouTubeStartTime(url: string): number | null {
  const match = url.match(/[?&]t=(\d+)s?/);
  return match ? parseInt(match[1], 10) : null;
}

// --- Data ---
const PROJECTS = [
  {
    id: 1,
    title: 'Showreel',
    category: 'SHOWREEL',
    url: 'https://www.youtube.com/watch?v=B6zvpHDTkx0',
    thumbnail: 'https://img.youtube.com/vi/B6zvpHDTkx0/maxresdefault.jpg',
  },
  {
    id: 2,
    title: 'Commercial Edit',
    category: 'COMMERCIAL / MOTION',
    url: 'https://www.youtube.com/watch?v=zU8DXqImEl0&t=48s',
    thumbnail: 'https://img.youtube.com/vi/zU8DXqImEl0/maxresdefault.jpg',
  },
  {
    id: 3,
    title: 'Storytelling & VFX Edit',
    category: 'YOUTUBE / STORYTELLING',
    url: 'https://www.youtube.com/watch?v=XFGbz_eryEI&t=691s',
    thumbnail: 'https://img.youtube.com/vi/XFGbz_eryEI/maxresdefault.jpg',
  },
  {
    id: 4,
    title: 'Digital Dementia / Motion Edit',
    category: 'MOTION DESIGN / 3D',
    url: '/4.mp4?v=5',
    thumbnail: '/4.mp4?v=5',
  },
];

// --- Components ---

const FadeIn = ({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string; key?: React.Key }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: '-100px' }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);

const AppleTextReveal = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const words = text.split(" ");
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.02, delayChildren: delay } },
        hidden: {}
      }}
      className={cn("flex flex-wrap justify-center gap-x-[0.3em] gap-y-[0.1em]", className)}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 15, filter: 'blur(8px)' },
            visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } }
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

const BackgroundBlobs = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      {/* Top Left Blob */}
      <motion.div
        animate={{
          x: ['-10%', '10%', '-10%'],
          y: ['-10%', '10%', '-10%'],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-[120px]"
      />
      {/* Bottom Right Blob */}
      <motion.div
        animate={{
          x: ['10%', '-10%', '10%'],
          y: ['10%', '-10%', '10%'],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-500/5 dark:bg-purple-500/10 blur-[120px]"
      />
      {/* Middle Blob */}
      <motion.div
        animate={{
          x: ['-5%', '5%', '-5%'],
          y: ['5%', '-5%', '5%'],
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[30%] right-[20%] w-[40vw] h-[40vw] rounded-full bg-neutral-500/5 dark:bg-neutral-500/10 blur-[120px]"
      />
    </div>
  );
};

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[94%] sm:w-[98%] max-w-[1800px] flex items-center justify-between px-6 py-3 md:px-10 md:py-4 rounded-full bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-sm"
    >
      <div className="text-sm md:text-lg font-bold tracking-widest uppercase">LENS</div>
      <div className="flex items-center gap-4 sm:gap-8 md:gap-12">
        <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest uppercase text-neutral-500 dark:text-neutral-400">
          <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors duration-150">Home</a>
          <a href="#work" className="hover:text-neutral-900 dark:hover:text-white transition-colors duration-150">Work</a>
        </div>
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
          <a 
            href="https://t.me/lensvideoeditor" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-neutral-900 dark:text-white hover:opacity-70 transition-opacity"
          >
            CONTACT
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

const VideoModal = ({ url, onClose }: { url: string; onClose: () => void }) => {
  const videoId = extractYouTubeID(url);
  const startTime = extractYouTubeStartTime(url);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Снижаем громкость для первого видео (20% от максимума)
      if (url === '/1.mp4') {
        videoRef.current.volume = 0.2;
      } else {
        videoRef.current.volume = 1.0;
      }
    }
  }, [url]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-neutral-950/90 backdrop-blur-sm"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-150"
        >
          <X size={24} />
        </button>
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {videoId ? (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}${startTime ? `&start=${startTime}` : ''}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <video
              ref={videoRef}
              src={url}
              className="w-full h-full object-contain bg-black"
              autoPlay
              loop
              controls
              playsInline
            />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function App() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('lensvideoeditor@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email', err);
    }
  };

  return (
    <div className="min-h-screen relative bg-transparent dark:bg-transparent text-neutral-950 dark:text-white transition-colors duration-500 selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-900">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover pointer-events-none z-[-2]"
        src="/BlackBG.mp4"
      />

      <Navbar />

      <main className="pt-24 sm:pt-32 pb-24 px-4 sm:px-6 md:px-12 max-w-[1600px] mx-auto">
        {/* Hero Section */}
        <section className="min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-center items-center text-center mb-16">
          <FadeIn className="w-full flex flex-col items-center justify-center">
            <h1 className="w-full text-[10vw] sm:text-[8vw] md:text-[6vw] leading-[0.85] font-light tracking-tight mb-6 flex flex-col items-center text-center">
              <span>editing with</span>
              <span className="text-neutral-400 dark:text-neutral-500 translate-x-[0.66vw]">intention.</span>
            </h1>
          </FadeIn>
        </section>

        {/* Projects Grid */}
        <section id="work" className="mb-24 sm:mb-40 scroll-mt-32">
          <FadeIn className="w-full flex items-center justify-center gap-4 mb-8 sm:mb-12 opacity-60">
            <div className="h-px w-8 sm:w-24 bg-neutral-400 dark:bg-neutral-600"></div>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">MY PROJECTS</span>
            <div className="h-px w-8 sm:w-24 bg-neutral-400 dark:bg-neutral-600"></div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            {PROJECTS.map((project, index) => (
              <FadeIn key={project.id} delay={index * 0.1}>
                <div 
                  className="group cursor-pointer"
                  onClick={() => setActiveVideo(project.url)}
                >
                  <div className="relative aspect-video overflow-hidden rounded-[2rem] bg-neutral-100 dark:bg-neutral-900">
                    {project.thumbnail.match(/\.(mp4|webm|ogg)(\?.*)?$/i) ? (
                      <video
                        src={project.thumbnail}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/90 text-black flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out backdrop-blur-sm">
                        <Play size={24} className="ml-1" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Statement Section */}
        <section className="py-16 sm:py-24 md:py-32 max-w-3xl mx-auto text-center flex flex-col items-center px-4 sm:px-0">
          <AppleTextReveal 
            text="Hi, I'm Nikita." 
            className="text-xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-6 sm:mb-8"
          />
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="w-16 sm:w-24 h-0.5 bg-neutral-900 dark:bg-white mb-8 sm:mb-12" 
          />
          <AppleTextReveal 
            text="I specialize in visuals where every element serves a unified vision. My approach is defined by a focus on clarity. I create a clean visual language that directly enhances how your brand is perceived." 
            className="text-base sm:text-xl md:text-2xl leading-relaxed font-sans font-normal tracking-tight text-neutral-600 dark:text-neutral-400"
            delay={0.2}
          />
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="py-16 sm:py-24 px-4 sm:px-6 md:px-12">
        <div className="max-w-screen-xl mx-auto flex flex-col items-center text-center">
          <FadeIn className="w-full flex flex-col items-center justify-center">
            <h2 className="w-full text-[8vw] sm:text-[6vw] md:text-[4vw] leading-[0.85] font-light tracking-tight mb-12 sm:mb-16 flex flex-col items-center text-center">
              <span>let's create</span>
              <span className="text-neutral-400 dark:text-neutral-500 translate-x-[0.3vw]">impact.</span>
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.2} className="w-full">
            <div className="flex items-center justify-center gap-8 sm:gap-12 mb-20">
              <a href="https://x.com/lensvideoeditor" target="_blank" rel="noopener noreferrer" className="text-neutral-700 hover:text-neutral-950 dark:text-neutral-500 dark:hover:text-white transition-all duration-300 hover:scale-110">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </a>
              <div className="w-px h-8 bg-neutral-400 dark:bg-neutral-800"></div>
              <a href="https://t.me/lensvideoeditor" target="_blank" rel="noopener noreferrer" className="text-neutral-700 hover:text-neutral-950 dark:text-neutral-500 dark:hover:text-white transition-all duration-300 hover:scale-110">
                <Send size={28} strokeWidth={1.5} className="-ml-1" />
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.3} className="w-full flex flex-col items-center">
            <button
              onClick={handleCopyEmail}
              className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors duration-300"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span
                    key="copied"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="block"
                  >
                    COPIED TO CLIPBOARD!
                  </motion.span>
                ) : (
                  <motion.span
                    key="email"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="block"
                  >
                    LENSVIDEOEDITOR@GMAIL.COM
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </FadeIn>

          <FadeIn delay={0.4} className="w-full mt-16 sm:mt-24">
            <p className="text-[10px] text-neutral-500 dark:text-neutral-700 font-medium tracking-wider text-left select-none pl-2 sm:pl-0">
              © 2026 lens editor. All rights reserved.
            </p>
          </FadeIn>
        </div>
      </footer>

      {/* Video Modal */}
      {activeVideo && (
        <VideoModal url={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </div>
  );
}
