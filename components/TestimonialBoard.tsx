'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { addTestimonial } from '@/app/actions';

export default function TestimonialBoard({ initialTestimonials }: { initialTestimonials: any[] }) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // We rely on server action revalidation to fetch new testimonials,
  // but we can also optimistically update the UI or just let Next.js refresh the prop.

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('content', content);
    
    await addTestimonial(formData);
    setContent('');
    setIsSubmitting(false);
  }

  return (
    <div style={{ marginTop: '5rem', marginBottom: '5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>What People Say</h2>
          <p style={{ color: 'var(--text-muted)' }}>Real stories from the AYSG community.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <AnimatePresence>
          {initialTestimonials.map((t, i) => (
            <motion.div 
              key={t.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.1, type: 'spring' }}
              className="glass-panel" 
              style={{ padding: '2rem', borderRadius: '24px', borderLeft: '4px solid var(--neon-purple)', position: 'relative' }}
            >
              <i className='bx bxs-quote-alt-left' style={{ fontSize: '2rem', color: 'var(--neon-purple)', marginBottom: '1rem', opacity: 0.5 }}></i>
              <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', color: 'var(--text-main)', fontSize: '1.05rem', lineHeight: '1.6' }}>"{t.content}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(45deg, var(--neon-purple), var(--electric-pink))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.95rem' }}>{t.name}</h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', borderRadius: '24px', background: 'rgba(255,255,255,0.02)' }}>
        <h3 style={{ marginBottom: '1rem' }}>Share Your Experience</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem' }}>
          <input 
            type="text" 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="I came for the games, stayed for the people..." 
            style={{ flex: 1, padding: '1rem 1.5rem', borderRadius: '100px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--glass-border)', color: 'white' }}
            disabled={isSubmitting}
          />
          <button type="submit" className="btn btn-primary glow" style={{ borderRadius: '100px', padding: '0 2rem' }} disabled={isSubmitting}>
            {isSubmitting ? 'Posting...' : 'Post'}
          </button>
        </form>
      </div>
    </div>
  );
}
