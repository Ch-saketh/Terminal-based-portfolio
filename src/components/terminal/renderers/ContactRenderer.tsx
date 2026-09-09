import React, { useState } from 'react';
import { profileData } from '../../../content/profile';
import { Github, Linkedin, Mail, Twitter, Key, Send, CheckCircle2, Phone } from 'lucide-react';
import { SectionHeader } from '../SectionHeader';
import styles from './Renderers.module.css';

export const ContactRenderer: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      // Create mailto fallback link for zero backend requirement
      const mailtoUrl = `mailto:${profileData.email}?subject=Message from ${encodeURIComponent(name)} (SAKETH.OS)&body=${encodeURIComponent(
        `From: ${name} <${email}>\n\nMessage:\n${message}`
      )}`;
      window.open(mailtoUrl, '_blank');
    }, 600);
  };

  return (
    <div className={styles.contactContainer}>
      <SectionHeader
        badge="COMMUNICATION RELAY"
        title="GET IN TOUCH"
        subtitle="Direct contact channels, social profiles, and email messaging relay"
        path="saketh@portfolio:~/contact"
      />

      <div className={styles.contactLinksGrid}>
        <a href={`mailto:${profileData.email}`} className={styles.contactLinkCard}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Mail size={16} color="#10b981" />
            <span>Email</span>
          </div>
          <span className={styles.usageText}>{profileData.email}</span>
        </a>

        <a href="tel:+919392345156" className={styles.contactLinkCard}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Phone size={16} color="#10b981" />
            <span>Phone</span>
          </div>
          <span className={styles.usageText}>+91-9392345156</span>
        </a>

        <a
          href={profileData.github}
          target="_blank"
          rel="noreferrer"
          className={styles.contactLinkCard}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Github size={16} color="#06b6d4" />
            <span>GitHub</span>
          </div>
          <span className={styles.usageText}>@Ch-saketh</span>
        </a>

        <a
          href={profileData.linkedin}
          target="_blank"
          rel="noreferrer"
          className={styles.contactLinkCard}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Linkedin size={16} color="#3b82f6" />
            <span>LinkedIn</span>
          </div>
          <span className={styles.usageText}>saketh-chokkapu</span>
        </a>

        {profileData.twitter && (
          <a
            href={profileData.twitter}
            target="_blank"
            rel="noreferrer"
            className={styles.contactLinkCard}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Twitter size={16} color="#38bdf8" />
              <span>Twitter/X</span>
            </div>
            <span className={styles.usageText}>@saketh_dev</span>
          </a>
        )}
      </div>

      <div
        style={{
          fontSize: 'var(--text-xs)',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }}
      >
        <Key size={14} color="#f59e0b" />
        <span>
          GPG Fingerprint: <code>{profileData.gpgKeyFingerprint}</code>
        </span>
      </div>

      {status === 'sent' ? (
        <div
          style={{
            padding: '12px',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid #10b981',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          <CheckCircle2 size={16} color="#10b981" />
          <span style={{ fontSize: 'var(--text-xs)', color: '#34d399' }}>
            Transmission initiated via email client relay. Thank you for reaching out!
          </span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <div
            style={{
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              color: 'var(--accent-secondary)'
            }}
          >
            &gt; Quick Message Dispatch
          </div>
          <input
            type="text"
            placeholder="Your Name / Identifier"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.formInput}
            required
          />
          <input
            type="email"
            placeholder="Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.formInput}
            required
          />
          <textarea
            placeholder="Enter transmission payload / project inquiry..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className={styles.formTextarea}
            required
          />
          <button type="submit" disabled={status === 'sending'} className={styles.submitBtn}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Send size={12} /> {status === 'sending' ? 'Transmitting...' : 'Send Transmission'}
            </span>
          </button>
        </form>
      )}
    </div>
  );
};
