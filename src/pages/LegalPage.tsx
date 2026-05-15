import { motion } from 'framer-motion'
import { useEffect } from 'react'
import type { ReactNode } from 'react'

type Props = {
  title: string
  updated: string
  description: string
  children: ReactNode
}

export default function LegalPage({ title, updated, description, children }: Props) {
  useEffect(() => {
    const prevTitle = document.title
    const descTag = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const prevDesc = descTag?.content ?? ''
    document.title = `${title} — Daanvi Technologies`
    if (descTag) descTag.content = description
    return () => {
      document.title = prevTitle
      if (descTag) descTag.content = prevDesc
    }
  }, [title, description])

  return (
    <div className="legal-wrap">
      <div className="bg-effects">
        <div className="bg-orb orb-1" />
        <div className="bg-orb orb-2" />
        <div className="grid-overlay" />
      </div>

      <header className="legal-header container">
        <a href="/" className="legal-brand">
          <img src="/logo.png" className="legal-logo" alt="Daanvi Technologies" width="1024" height="301" />
        </a>
        <a href="/" className="legal-back">← Back to Home</a>
      </header>

      <motion.main
        className="legal-main container"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <span className="legal-eyebrow">Legal</span>
        <h1 className="legal-title">{title}</h1>
        <p className="legal-updated">Last updated: {updated}</p>
        <div className="legal-body">{children}</div>
      </motion.main>

      <footer className="legal-footer container">
        <p>© 2026 Daanvi Technologies Private Limited.</p>
        <div className="legal-footer-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/#contact">Contact</a>
        </div>
      </footer>
    </div>
  )
}