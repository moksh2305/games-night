'use client';

import { motion, Variants } from 'framer-motion';

export default function AnimatedPillars() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div style={{ marginTop: '5rem', marginBottom: '4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Why Join AYSG?</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>More than just a games night. A movement to build real community.</p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}
      >
        <motion.div variants={item} className="glass-panel" style={{ padding: '2.5rem 2rem', textAlign: 'center', borderRadius: '24px', borderTop: '2px solid var(--neon-purple)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at top, rgba(167,139,250,0.1), transparent)', zIndex: 0 }}></div>
          <i className='bx bx-group' style={{ fontSize: '3.5rem', color: 'var(--neon-purple)', marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}></i>
          <h3 style={{ marginBottom: '1rem', position: 'relative', zIndex: 1 }}>Meet New People</h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', position: 'relative', zIndex: 1 }}>Expand your circle and connect with like-minded youth in a safe, moderated environment.</p>
        </motion.div>

        <motion.div variants={item} className="glass-panel" style={{ padding: '2.5rem 2rem', textAlign: 'center', borderRadius: '24px', borderTop: '2px solid var(--electric-pink)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at top, rgba(244,114,182,0.1), transparent)', zIndex: 0 }}></div>
          <i className='bx bx-joystick' style={{ fontSize: '3.5rem', color: 'var(--electric-pink)', marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}></i>
          <h3 style={{ marginBottom: '1rem', position: 'relative', zIndex: 1 }}>Fun & Games</h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', position: 'relative', zIndex: 1 }}>Enjoy exciting activities, from high-stakes Mafia rounds to nostalgic board games.</p>
        </motion.div>

        <motion.div variants={item} className="glass-panel" style={{ padding: '2.5rem 2rem', textAlign: 'center', borderRadius: '24px', borderTop: '2px solid var(--indigo-blue)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at top, rgba(96,165,250,0.1), transparent)', zIndex: 0 }}></div>
          <i className='bx bx-heart' style={{ fontSize: '3.5rem', color: 'var(--indigo-blue)', marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}></i>
          <h3 style={{ marginBottom: '1rem', position: 'relative', zIndex: 1 }}>Build Real Connections</h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', position: 'relative', zIndex: 1 }}>Turn casual interactions into meaningful, lifelong friendships outside of the digital world.</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
