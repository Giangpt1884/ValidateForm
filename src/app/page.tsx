'use client';

import { useState } from 'react';
import ManualForm from '@/components/ManualForm/ManualForm';
import LibraryForm from '@/components/LibraryForm/LibraryForm';
import { Sparkles, Code2 } from 'lucide-react';
import styles from './page.module.css';

export default function Home() {
  const [mode, setMode] = useState<'manual' | 'library'>('manual');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Form Validation Demo</h1>
        <p>Simple demonstration of manual and library-based validation in Next.js</p>
        
        <div className={styles.toggleWrapper}>
          <button 
            onClick={() => setMode('manual')}
            className={`${styles.toggleBtn} ${mode === 'manual' ? styles.active : ''}`}
          >
            <Code2 size={18} /> Manual
          </button>
          <button 
            onClick={() => setMode('library')}
            className={`${styles.toggleBtn} ${mode === 'library' ? styles.active : ''}`}
          >
            <Sparkles size={18} /> Library
          </button>
        </div>
      </header>

      <div className={styles.content}>
        {mode === 'manual' ? <ManualForm /> : <LibraryForm />}
      </div>

      <footer className={styles.footer}>
        Built by <strong>GPT</strong>
      </footer>
    </div>
  );
}
