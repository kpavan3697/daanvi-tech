import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import './index.css'

type JobStatus = 'active' | 'inactive' | 'closed'
type Job = {
  title: string
  dept: string
  type: string
  tag: string
  status: JobStatus
  experience?: string
  technologies?: string[]
  responsibilities?: string[]
  applyUrl?: string
}

const t = {
  home: 'Home',
  services: 'Services',
  about: 'About',
  clients: 'Sectors',
  careers: 'Careers',
  contact: 'Contact',
  hero: 'Engineering the Enterprise Technology of the AI Era',
  sub: 'Daanvi Technologies operates at the intersection of AI, connected systems, and modern software engineering — building intelligent platforms across AI Systems, Web & Mobile, IoT, and enterprise IT services for the next generation of businesses.'
}

const services = [
  {
    title: 'AI Systems',
    img: '/services/ai-systems.jpg',
    desc: 'Autonomous agents and deep-domain AI built for high-impact industries — from multi-step enterprise workflows to purpose-built systems for healthcare, financial services, and manufacturing.',
  },
  {
    title: 'Web & Mobile Development',
    img: '/services/web-mobile.jpg',
    desc: 'Custom web applications, mobile apps, and SaaS products built with modern stacks — from MVP to production-ready at startup speed.',
  },
  {
    title: 'IoT & Connected Systems',
    img: '/services/iot.jpg',
    desc: 'IoT platforms, embedded firmware, and connected device systems — real-time telemetry, device management, and field-grade reliability for industrial and consumer deployments.',
  },
  {
    title: 'IT Outsourcing',
    img: '/services/it-outsourcing.jpg',
    desc: 'Dedicated engineering teams and offshore development pods — skilled talent that plugs into your workflow from day one to deliver end-to-end.',
  }
]

const stats = [
  { value: '2026', label: 'Year Founded' },
  { value: '4', label: 'Core Services' },
  { value: '9', label: 'Domain Categories' },
  { value: '75+', label: 'Industry Domains' }
]

const sectorGroups = [
  {
    category: 'Enterprise & Business Systems',
    icon: '🏢',
    desc: 'The operational backbone of modern organizations — ERPs, CRMs, HRMS, and workflow automation engineered to scale across teams and geographies.',
    sectors: ['ERP Systems', 'CRM Platforms', 'HRMS Solutions', 'Business Automation', 'Workflow Automation', 'Enterprise Portals', 'Accounting Systems', 'Document Management']
  },
  {
    category: 'Banking & Financial Systems',
    icon: '🏦',
    desc: 'Core banking, payments, lending, and risk platforms built for regulated environments — secure, auditable, and ready for real transaction volume.',
    sectors: ['Core Banking Systems', 'FinTech Platforms', 'Digital Payments', 'Insurance Technology', 'Trading Platforms', 'Risk & Compliance Systems', 'Lending Platforms', 'Wealth Management Systems']
  },
  {
    category: 'AI & Data Engineering',
    icon: '🤖',
    desc: 'Generative AI, agentic systems, and data pipelines that turn raw signals into intelligent, production-grade decisions across the enterprise.',
    sectors: ['Generative AI Applications', 'Agentic AI Systems', 'Machine Learning Pipelines', 'Deep Learning Systems', 'Computer Vision', 'Natural Language Processing', 'Predictive Analytics', 'Recommendation Engines', 'Data Engineering', 'Business Intelligence']
  },
  {
    category: 'Cloud, Storage & Infrastructure',
    icon: '☁️',
    desc: 'Cloud-native architectures, distributed systems, and high-performance storage — engineered for reliability, elasticity, and cost efficiency at scale.',
    sectors: ['Cloud Computing Platforms', 'Cloud Migration', 'Distributed Systems', 'Data Lakes', 'Data Warehousing', 'Big Data Platforms', 'High-Performance Storage Systems', 'Backup & Disaster Recovery', 'DevOps Automation', 'Kubernetes & Microservices']
  },
  {
    category: 'Web, Mobile & SaaS',
    icon: '💻',
    desc: 'Modern web, mobile, and SaaS products built end-to-end — from frontend craft to backend APIs and everything users actually feel.',
    sectors: ['Web Applications', 'Mobile Applications', 'Progressive Web Apps', 'SaaS Platforms', 'E-Commerce Systems', 'Frontend Engineering', 'Backend Engineering', 'API Development', 'Cross-Platform Apps']
  },
  {
    category: 'Education & Knowledge Systems',
    icon: '🎓',
    desc: 'EdTech platforms, learning management, and assessment systems designed for measurable outcomes and engaged learners across all formats.',
    sectors: ['EdTech Platforms', 'Learning Management Systems', 'Online Learning Platforms', 'Virtual Classrooms', 'Assessment Systems', 'Skill Development Platforms', 'Corporate Training Systems']
  },
  {
    category: 'Healthcare & Life Sciences',
    icon: '🏥',
    desc: 'Hospital systems, telemedicine, diagnostics, and EHR platforms built with clinical precision and the compliance posture healthcare demands.',
    sectors: ['Hospital Management Systems', 'Telemedicine Platforms', 'Medical Diagnostics Software', 'Electronic Health Records (EHR)', 'Pharmaceutical Systems', 'Biotech Platforms', 'Health Monitoring Systems']
  },
  {
    category: 'IoT & Embedded Engineering',
    icon: '📡',
    desc: 'From smart factories to consumer devices and sensor fleets — the industrial and consumer verticals where embedded engineering meets real-world reliability at scale.',
    sectors: ['Industrial IoT', 'Consumer IoT', 'Embedded Systems', 'IoT Platforms', 'Device Management', 'Real-Time Monitoring', 'Sensor Networks', 'Smart Manufacturing Systems']
  },
  {
    category: 'Industry-Specific Platforms',
    icon: '🌐',
    desc: 'Retail, logistics, real estate, travel, media, telecom, and public-sector platforms tailored to the workflows each industry actually runs on.',
    sectors: ['Retail Systems', 'Supply Chain & Logistics', 'Real Estate Technology', 'Travel & Hospitality Systems', 'Media & Entertainment Platforms', 'Telecom Platforms', 'Energy & Utilities Systems', 'Government & Public Sector Systems', 'Agriculture Technology (AgriTech)']
  }
]

const steps = [
  { num: '01', icon: '🔍', title: 'Discover', desc: 'We deep-dive into your business goals, pain points, and technical landscape to define the right problem.' },
  { num: '02', icon: '🏗️', title: 'Architect', desc: 'We design scalable, secure, and future-proof solutions tailored precisely to your requirements.' },
  { num: '03', icon: '⚡', title: 'Build', desc: 'Our engineers deliver with precision and speed using agile methodologies and modern best practices.' },
  { num: '04', icon: '🚀', title: 'Scale', desc: 'We continuously monitor, optimize, and evolve your solution as your business grows and changes.' }
]

const whyUs = [
  {
    icon: '🎯',
    title: 'Skin in the Game',
    desc: 'We are building our company while helping you build better systems. We are not focused on billing hours — we are focused on delivering results. Your pilot becomes our proof of capability, which means we are deeply invested in making it successful.'
  },
  {
    icon: '🔬',
    title: 'Technical Depth, Not Buzzwords',
    desc: 'Every solution we build is grounded in real engineering expertise, not marketing language. Our strongest capabilities are in AI — including agents, retrieval systems, evaluations, fine-tuning, and production-grade deployments. We focus on building systems that are reliable, scalable, and measurable in real-world environments.'
  },
  {
    icon: '🤝',
    title: 'You Shape the Product',
    desc: 'Our early clients are collaborators, not just customers. Your real-world challenges directly influence what we build and improve. Early partners receive closer collaboration, preferential pricing, faster iteration cycles, and the opportunity to shape long-term product direction.'
  }
]

const navIds = ['home', 'services', 'about', 'clients', 'careers', 'contact']

// ── Replace with your Formspree form ID from https://formspree.io ──
const FORMSPREE_ID = 'mvzyzpey'
export default function App() {
  const [theme, setTheme] = useState('dark')
  const [menuOpen, setMenuOpen] = useState(false)
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null)
  const [showTop, setShowTop] = useState(false)
  const [scrollPct, setScrollPct] = useState(0)
  const [activeSection, setActiveSection] = useState<string>('home')

  // Contact form
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [, setTouched] = useState<Record<string, boolean>>({})

  // Cookie banner
  const [cookieOk, setCookieOk] = useState(() => {
    try { return localStorage.getItem('cookie_ok') === '1' } catch { return false }
  })

  const [jobs, setJobs] = useState<Job[]>([])

  useEffect(() => {
    let cancelled = false
    fetch('careers.json', { cache: 'no-cache' })
      .then(r => r.json())
      .then((data: { jobs: Job[] }) => { if (!cancelled) setJobs(data.jobs ?? []) })
      .catch(() => { if (!cancelled) setJobs([]) })
    return () => { cancelled = true }
  }, [])

  // ── Apply modal ──────────────────────────────────────────────
  const [applyJob, setApplyJob] = useState<Job | null>(null)
  const [applyForm, setApplyForm] = useState({ name: '', email: '', phone: '', pitch: '' })
  const [applyErrors, setApplyErrors] = useState<Record<string, string>>({})
  const [applyStatus, setApplyStatus] = useState<'idle' | 'loading'>('idle')
  const [applySubmitError, setApplySubmitError] = useState<string>('')
  const [listening, setListening] = useState(false)
  const recognitionRef = useRef<any>(null)
  const pitchBaseRef = useRef<string>('')

  const openApply = (job: Job) => {
    setApplyJob(job)
    setApplyForm({ name: '', email: '', phone: '', pitch: '' })
    setApplyErrors({})
    setApplyStatus('idle')
    setApplySubmitError('')
  }
  const closeApply = () => {
    if (recognitionRef.current) { try { recognitionRef.current.stop() } catch {} }
    setListening(false)
    setApplyJob(null)
  }

  useEffect(() => {
    if (!applyJob) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeApply() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [applyJob])

  const validateApply = () => {
    const errs: Record<string, string> = {}
    if (!applyForm.name.trim()) errs.name = 'Name is required'
    const email = applyForm.email.trim()
    if (!email) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email'
    const phone = applyForm.phone.trim()
    const phoneDigits = phone.replace(/\D/g, '')
    if (!phone) errs.phone = 'Mobile number is required'
    else if (phoneDigits.length < 7 || phoneDigits.length > 15) errs.phone = 'Enter a valid mobile number'
    const pitch = applyForm.pitch.trim()
    if (!pitch) errs.pitch = 'Tell us why you are a great fit'
    else if (pitch.length < 30) errs.pitch = 'Please write at least 30 characters'
    return errs
  }

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setApplySubmitError('')
    const errs = validateApply()
    setApplyErrors(errs)
    if (Object.keys(errs).length > 0) return
    if (!applyJob) return
    setApplyStatus('loading')
    try {
      const payload = {
        _subject: `Job Application: ${applyJob.title}`,
        position: applyJob.title,
        department: applyJob.dept,
        name: applyForm.name.trim(),
        email: applyForm.email.trim(),
        phone: applyForm.phone.trim(),
        message: applyForm.pitch.trim(),
      }
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({} as any))
      if (!res.ok) {
        const reason = Array.isArray(data?.errors) && data.errors.length
          ? data.errors.map((er: any) => er.message).filter(Boolean).join(' • ')
          : (data?.error || `Submission failed (HTTP ${res.status}).`)
        throw new Error(reason)
      }
      setApplyStatus('idle')
      setToast({ msg: '✅ Application sent — we\'ll be in touch soon.', ok: true })
      setTimeout(() => setToast(null), 4000)
      closeApply()
    } catch (err: any) {
      setApplyStatus('idle')
      setApplySubmitError(err?.message || 'Could not submit application. Please try again.')
    }
  }

  const toggleListening = () => {
    const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SR) {
      setToast({ msg: 'Voice input is not supported in this browser.', ok: false })
      setTimeout(() => setToast(null), 3500)
      return
    }
    if (listening) {
      try { recognitionRef.current?.stop() } catch {}
      setListening(false)
      return
    }
    const rec = new SR()
    rec.continuous = true
    rec.interimResults = true
    rec.lang = 'en-US'
    pitchBaseRef.current = applyForm.pitch
    rec.onresult = (event: any) => {
      let finalText = ''
      let interim = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) finalText += transcript
        else interim += transcript
      }
      if (finalText) {
        pitchBaseRef.current = (pitchBaseRef.current + ' ' + finalText).replace(/\s+/g, ' ').trim()
      }
      const combined = (pitchBaseRef.current + (interim ? ' ' + interim : '')).replace(/\s+/g, ' ').trimStart()
      setApplyForm(f => ({ ...f, pitch: combined }))
    }
    rec.onerror = () => setListening(false)
    rec.onend = () => setListening(false)
    recognitionRef.current = rec
    try {
      rec.start()
      setListening(true)
    } catch {
      setListening(false)
    }
  }

  const particles = useMemo(() =>
    Array.from({ length: 22 }, (_, i) => ({
      id: i,
      left: `${(i * 4.7) % 100}%`,
      delay: `${(i * 0.85) % 8}s`,
      duration: `${9 + (i * 0.6) % 10}s`
    })), [])

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 500)
      const doc = document.documentElement
      const scrolled = doc.scrollTop || document.body.scrollTop
      const total = doc.scrollHeight - doc.clientHeight
      setScrollPct(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy: track which section is currently in view
  useEffect(() => {
    const sections = navIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the largest intersection ratio that's currently intersecting
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveSection(visible[0].target.id)
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const navLabels = [t.home, t.services, t.about, t.clients, t.careers, t.contact]

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Full name is required'
        if (value.trim().length < 2) return 'Name must be at least 2 characters'
        return ''
      case 'email':
        if (!value.trim()) return 'Email address is required'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address'
        return ''
      case 'phone': {
        if (!value.trim()) return 'Contact number is required'
        const digits = (value.match(/\d/g) || []).length
        if (digits < 7 || digits > 15) return 'Enter a valid phone number'
        if (!/^[+\d\s\-().]+$/.test(value.trim())) return 'Enter a valid phone number'
        return ''
      }
      case 'message':
        if (!value.trim()) return 'Message is required'
        if (value.trim().length < 10) return 'Message must be at least 10 characters'
        return ''
      default: return ''
    }
  }

  const handleField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    // Clear error as user types after a failed submit
    if (errors[name]) setErrors(err => ({ ...err, [name]: validateField(name, value) }))
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    // Validate all required fields
    const allTouched = { name: true, email: true, phone: true, message: true }
    const allErrors = {
      name:    validateField('name',    form.name),
      email:   validateField('email',   form.email),
      phone:   validateField('phone',   form.phone),
      message: validateField('message', form.message),
    }
    setTouched(t => ({ ...t, ...allTouched }))
    setErrors(err => ({ ...err, ...allErrors }))
    if (Object.values(allErrors).some(e => e)) return
    setFormStatus('loading')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setFormStatus('success')
        setForm({ name: '', email: '', phone: '', subject: '', message: '' })
        setErrors({})
        setTouched({})
      } else {
        throw new Error('Submit failed')
      }
    } catch {
      setFormStatus('error')
      setToast({ msg: ' Something went wrong. Please try again.', ok: false })
      setTimeout(() => setToast(null), 4000)
    }
  }

  const acceptCookies = () => {
    try { localStorage.setItem('cookie_ok', '1') } catch {}
    setCookieOk(true)
  }

  return (
    <MotionConfig reducedMotion="user">
    <div className="app">
      {/* ── SCROLL PROGRESS BAR ─────────────────────────────────── */}
      <div className="scroll-progress" style={{ width: `${scrollPct}%` }} />

      {/* Animated background orbs + grid */}
      <div className="bg-effects">
        <div className="bg-orb orb-1" />
        <div className="bg-orb orb-2" />
        <div className="bg-orb orb-3" />
        <div className="grid-overlay" />
      </div>

      {/* Floating particles */}
      <div className="particles" aria-hidden="true">
        {particles.map((p) => (
          <div key={p.id} className="particle"
            style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration }} />
        ))}
      </div>

      {/* ── MOBILE MENU OVERLAY ─────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {navLabels.map((label, i) => (
              <motion.a
                key={i}
                href={`#${navIds[i]}`}
                className={`mobile-link${activeSection === navIds[i] ? ' active' : ''}`}
                aria-current={activeSection === navIds[i] ? 'page' : undefined}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                {label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <header className="header">
        <div className="container nav">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="logo-wrap"
          >
            <img src="/logo.png" className="logo" alt="Daanvi Technologies" width="800" height="235" />
          </motion.div>

          <nav>
            {navLabels.map((label, i) => (
              <motion.a key={i} href={`#${navIds[i]}`}
                className={`nav-link${activeSection === navIds[i] ? ' active' : ''}`}
                aria-current={activeSection === navIds[i] ? 'page' : undefined}
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.45 }}>
                {label}
              </motion.a>
            ))}
          </nav>

          <div className="header-right">
            <button
              className="theme-toggle"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.svg key="sun" className="theme-icon"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.35 }}>
                    <circle cx="12" cy="12" r="5"/>
                    <line x1="12" y1="1" x2="12" y2="3"/>
                    <line x1="12" y1="21" x2="12" y2="23"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    <line x1="1" y1="12" x2="3" y2="12"/>
                    <line x1="21" y1="12" x2="23" y2="12"/>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                  </motion.svg>
                ) : (
                  <motion.svg key="moon" className="theme-icon"
                    viewBox="0 0 24 24" fill="currentColor"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.35 }}>
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </motion.svg>
                )}
              </AnimatePresence>
            </button>
            <button
              className="hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
            >
              <span className={`h-line${menuOpen ? ' open' : ''}`} />
              <span className={`h-line${menuOpen ? ' open' : ''}`} />
              <span className={`h-line${menuOpen ? ' open' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section id="home" className="hero container">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="hero-content"
        >
          <h1>{t.hero}</h1>
          <p>{t.sub}</p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>Explore Services <span className="btn-arrow">→</span></button>
            <button className="secondary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Contact Us</button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: 'easeOut' }}
          className="hero-visual"
        >
          <div className="orbit orbit-ring-1"><div className="orbit-dot dot-cyan" /></div>
          <div className="orbit orbit-ring-2"><div className="orbit-dot dot-blue" /></div>
          <div className="orbit orbit-ring-3"><div className="orbit-dot dot-purple" /></div>
          <div className="hero-core">
            <div className="core-glow" />
            <img src="/logo.png" className="hero-logo" alt="Daanvi" width="800" height="235" />
          </div>
          <div className="float-badge badge-ai"> AI Systems</div>
          <div className="float-badge badge-cloud"> Web & Mobile</div>
          <div className="float-badge badge-iot"> IoT</div>
          <div className="float-badge badge-sec"> IT Outsourcing</div>
        </motion.div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────────────── */}
      <motion.div className="stats-bar"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <div className="container stats-inner">
          {stats.map((s, i) => (
            <motion.div key={i} className="stat-item"
              initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.14, duration: 0.55 }}>
              <span className="stat-num">{s.value}</span>
              <span className="stat-lbl">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── SERVICES ───────────────────────────────────────────── */}
      <section id="services" className="section container">
        <motion.div className="section-header"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="section-tag">What We Build</span>
          <h2>Our Services</h2>
          <p className="section-sub">Four focused areas where our team has genuine technical depth and a clear point of view</p>
        </motion.div>
        <div className="grid">
          {services.map((item, i) => (
            <motion.div key={i} className="card"
              initial={{ opacity: 0, y: 90, scale: 0.92, rotateX: 8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                delay: i * 0.14,
                type: 'spring',
                stiffness: 80,
                damping: 16,
                mass: 0.9
              }}
              whileHover={{
                y: -18,
                scale: 1.025,
                transition: { type: 'spring', stiffness: 260, damping: 20 }
              }}
              style={{ transformPerspective: 1200 }}>
              <div className="card-img-wrap">
                <img src={item.img} className="card-img" alt={item.title} loading="lazy" width="1000" height="667" />
              </div>
              <div className="card-body">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <div className="card-shimmer" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── HOW WE WORK ────────────────────────────────────────── */}
      <section className="section process-section">
        <div className="container">
          <motion.div className="section-header"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span className="section-tag">Our Process</span>
            <h2>How We Work</h2>
            <p className="section-sub">A proven methodology that turns ideas into enterprise-grade solutions</p>
          </motion.div>

          <div className="process-grid">
            {steps.map((step, i) => (
              <motion.div key={i} className="process-step"
                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.65 }}>
                <div className="step-num">{step.num}</div>
                <div className="step-icon-wrap">
                  <span className="step-icon">{step.icon}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────────────── */}
      <section id="about" className="section">
        <div className="about-split container">
          <motion.div className="about-img-wrap"
            initial={{ opacity: 0, x: -70 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9 }}>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=80&auto=format&fit=crop"
              className="about-img" alt="Daanvi Technologies Team" loading="lazy"
              width="700" height="467" />
            <div className="about-img-badge">
              <span> </span>
              <div>
                <strong>Early Stage</strong>
                <small>Founded 2026 · Bangalore</small>
              </div>
            </div>
          </motion.div>

          <motion.div className="about-text"
            initial={{ opacity: 0, x: 70 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.2 }}>
            <span className="section-tag">Who We Are</span>
            <h2>A Startup With a Clear Technical Bet</h2>
            <p className="about-desc">
              Daanvi Technologies is an early-stage startup founded in Bangalore in 2026. We have no
              clients yet — and we are completely open about that. What we do have is a focused technical
              thesis, a small team of engineers who have worked deeply in AI and industrial systems, and
              a clear view of the problems we want to solve.
            </p>
            <p className="about-desc">
              We build across four focused areas — AI Systems, Web & Mobile Development,
              IoT & Connected Systems, and IT Outsourcing — starting with healthcare,
              financial services, and manufacturing in India, where the problems are real,
              the market is large, and good software is still scarce. If you have a
              problem in these spaces, we want to talk.
            </p>
            <div className="about-features">
              {['AI Systems', 'Web & Mobile Ready', 'IoT-Enabled', 'Outsourcing'].map((f, i) => (
                <div key={i} className="feature-chip">✓ {f}</div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WHY PARTNER WITH US ────────────────────────────────── */}
      <section className="section container">
        <motion.div className="section-header"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="section-tag">Why Work With Us</span>
          <h2>Why Be Our First Client</h2>
          <p className="section-sub">We may not have a long client list yet — and that can actually work in your favor</p>
        </motion.div>

        <div className="why-grid">
          {whyUs.map((item, i) => (
            <motion.div key={i} className="why-card"
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.65 }}
              whileHover={{ y: -8 }}>
              <div className="why-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>


      {/* ── SECTORS ────────────────────────────────────────────── */}
      <section id="clients" className="section container">
        <motion.div className="section-header"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="section-tag">Where We Build</span>
          <h2>Domains & Industries We Build For</h2>
          <p className="section-sub">9 domain categories and 75+ industry verticals where we apply our four core services — AI Systems, Web & Mobile, IoT, and engineering teams — to ship production-grade software across enterprise, regulated industries, and modern software platforms.</p>
        </motion.div>

        <div className="sector-groups-grid">
          {sectorGroups.map((group, i) => (
            <motion.div key={i} className="sector-group-card"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.55 }}
              whileHover={{ y: -6 }}>
              <div className="sgc-header">
                <span className="sgc-icon">{group.icon}</span>
                <div className="sgc-header-text">
                  <h3 className="sgc-title">{group.category}</h3>
                  <span className="sgc-count">{group.sectors.length} domains</span>
                </div>
              </div>
              <div className="sgc-body">
                <p className="sgc-desc">{group.desc}</p>
                <div className="sgc-chips">
                  {group.sectors.map((s, j) => (
                    <span key={j} className="sgc-chip">{s}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────────── */}
      <section className="cta-banner">
        <div className="cta-bg-glow" />
        <div className="container">
          <motion.div className="cta-inner"
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="section-tag">Let's Work Together</span>
            <h2>Be Our First Client</h2>
            <p>We are looking for one or two organisations willing to work closely with us on a real problem. In return you get dedicated engineering attention, transparent pricing, and a say in what we build.</p>
            <div className="cta-buttons">
              <button className="btn-primary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Start a Conversation <span className="btn-arrow">→</span></button>
              <button className="cta-secondary" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>See Our Services</button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CAREERS ────────────────────────────────────────────── */}
      <section id="careers" className="section container">
        <motion.div className="section-header"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="section-tag">Join Our Team</span>
          <h2>Careers</h2>
          <p className="section-sub">We're hiring engineers who want to build real AI Systems, Web & Mobile, and IoT — and lead client delivery pods</p>
        </motion.div>
        <div className="jobs">
          {jobs.length === 0 && (
            <p className="section-sub" style={{ textAlign: 'center' }}>No open positions right now — check back soon.</p>
          )}
          {jobs.map((job, i) => {
            const isActive = job.status === 'active'
            const isClosed = job.status === 'closed'
            const hasDetails = !!(job.experience || job.technologies?.length || job.responsibilities?.length)
            return (
              <motion.div key={i} className={`job job-${job.status}${hasDetails ? ' job-has-details' : ''}`}
                initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.6 }}
                tabIndex={hasDetails ? 0 : undefined}>
                <div className="job-row">
                  <div className="job-info">
                    <div className="job-meta">
                      <span className="job-dept">{job.dept}</span>
                      <span className="job-tag">{job.tag}</span>
                      {job.status === 'inactive' && <span className="job-status-pill job-status-inactive">Paused</span>}
                      {isClosed && <span className="job-status-pill job-status-closed">Closed</span>}
                    </div>
                    <h3>{job.title}</h3>
                    <p>{job.type}</p>
                  </div>
                  <div className="job-row-right">
                    {hasDetails && (
                      <span className="job-chevron" aria-hidden="true">▾</span>
                    )}
                    {isActive ? (
                      <button className="btn-apply" type="button" onClick={() => openApply(job)}>
                        Apply Now →
                      </button>
                    ) : (
                      <button className="btn-apply" disabled aria-disabled="true">
                        {isClosed ? 'Closed' : 'Apply Now →'}
                      </button>
                    )}
                  </div>
                </div>
                {hasDetails && (
                  <div className="job-details-wrap" aria-hidden="false">
                    <div className="job-details" role="region" aria-label={`Details for ${job.title}`}>
                      <div className="job-details-grid">
                        {job.experience && (
                          <div className="job-details-block">
                            <span className="job-details-label">Experience</span>
                            <span className="job-details-value">{job.experience}</span>
                          </div>
                        )}
                        {job.technologies && job.technologies.length > 0 && (
                          <div className="job-details-block">
                            <span className="job-details-label">Technologies</span>
                            <div className="job-tech-chips">
                              {job.technologies.map((tech, ti) => (
                                <span key={ti} className="job-tech-chip">{tech}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      {job.responsibilities && job.responsibilities.length > 0 && (
                        <div className="job-details-block">
                          <span className="job-details-label">Roles & Responsibilities</span>
                          <ul className="job-resp-list">
                            {job.responsibilities.map((r, ri) => (
                              <li key={ri}>{r}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ── CONTACT ────────────────────────────────────────────── */}
      <section className="section container">
        <motion.div className="section-header"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span id="contact" className="section-tag">Get In Touch</span>
          <h2>Contact Us</h2>
          <p className="section-sub">Tell us about your project and we'll get back within 24 hours.</p>
        </motion.div>

        <motion.div className="contact-split"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>

          {/* ── Left info panel ── */}
          <div className="contact-info">
            <div>
              <h3>Let's Build Something Together</h3>
              <p>We're an early-stage startup actively looking for our first clients. Reach out — we'd love to hear about your problem.</p>
            </div>
            <div className="ci-items">
              <div className="ci-item">
                <span className="ci-icon">📧</span>
                <div>
                  <span className="ci-label">Email</span>
                  <span className="ci-value">hello@daanvitech.com</span>
                </div>
              </div>
              <div className="ci-item">
                <span className="ci-icon">📞</span>
                <div>
                  <span className="ci-label">Phone</span>
                  <span className="ci-value">+91 99641 15577</span>
                </div>
              </div>
              <div className="ci-item">
                <span className="ci-icon">📍</span>
                <div>
                  <span className="ci-label">Location</span>
                  <span className="ci-value">Bangalore, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right form ── */}
          <div className="contact-form-wrap">
            <form onSubmit={handleSend} noValidate>
              <div className="contact-row">
                <div className="field-group">
                  <label>Full Name <span className="req">*</span></label>
                  <input name="name" placeholder="John Smith"
                    value={form.name} onChange={handleField}
                    className={errors.name ? 'input-error' : ''}
                    disabled={formStatus === 'loading'} />
                  {errors.name && <span className="field-error">{errors.name}</span>}
                </div>
                <div className="field-group">
                  <label>Email Address <span className="req">*</span></label>
                  <input name="email" type="email" placeholder="you@company.com"
                    value={form.email} onChange={handleField}
                    className={errors.email ? 'input-error' : ''}
                    disabled={formStatus === 'loading'} />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>
              </div>
              <div className="contact-row">
                <div className="field-group">
                  <label>Contact Number <span className="req">*</span></label>
                  <input name="phone" type="tel" placeholder="+91 XXXXX XXXXX"
                    value={form.phone} onChange={handleField}
                    className={errors.phone ? 'input-error' : ''}
                    disabled={formStatus === 'loading'} />
                  {errors.phone && <span className="field-error">{errors.phone}</span>}
                </div>
                <div className="field-group">
                  <label>Subject</label>
                  <input name="subject" placeholder="What's this about?"
                    value={form.subject} onChange={handleField}
                    disabled={formStatus === 'loading'} />
                </div>
              </div>
              <div className="field-group">
                <label>Message <span className="req">*</span></label>
                <textarea name="message" placeholder="Briefly describe what you need help with..."
                  value={form.message} onChange={handleField}
                  className={errors.message ? 'input-error' : ''}
                  disabled={formStatus === 'loading'} />
                {errors.message && <span className="field-error">{errors.message}</span>}
              </div>
              <button
                className={`btn-primary contact-btn${formStatus === 'loading' ? ' btn-loading' : formStatus === 'success' ? ' btn-success' : ''}`}
                type="submit" disabled={formStatus === 'loading' || formStatus === 'success'}>
                {formStatus === 'loading'
                  ? <><span className="btn-spinner" /> Sending…</>
                  : formStatus === 'success'
                  ? <>✅ Message sent! We'll be in touch soon.</>
                  : <>Send Message <span className="btn-arrow">→</span></>}
              </button>

              <AnimatePresence>
                {formStatus === 'success' && (
                  <motion.div
                    className="form-status form-status-success" role="status"
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <strong>Thanks — your message is on its way.</strong>
                    <span>We'll reply within 24 hours.</span>
                  </motion.div>
                )}
                {formStatus === 'error' && (
                  <motion.div
                    className="form-status form-status-error" role="alert"
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <strong>We couldn't send your message.</strong>
                    <span>Please try again, or email us at hello@daanvitech.com.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            {/* Brand col */}
            <div className="footer-col brand-col">
              <img src="/logo.png" className="logo" alt="Daanvi" width="800" height="235" />
              <p className="footer-tagline">Building the Next Generation of Intelligent Solutions.</p>
              <div className="social-links">
                <a href="https://www.linkedin.com/company/daanvi-technologies-private-limited/about/?viewAsMember=true" className="social-btn" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="https://x.com/Daanvitech" className="social-btn" aria-label="Twitter / X" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://github.com/daanvitech" className="social-btn" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
                </a>
              </div>
            </div>

            {/* Company col */}
            <div className="footer-col">
              <h4>Company</h4>
              <a href="#about">About Us</a>
              <a href="#careers">Careers</a>
              <a href="#">Blog</a>
              <a href="#contact">Contact</a>
            </div>

            {/* Services col */}
            <div className="footer-col">
              <h4>Services</h4>
              <a href="#services">AI Systems</a>
              <a href="#services">Web & Mobile Development</a>
              <a href="#services">IoT & Connected Systems</a>
              <a href="#services">IT Outsourcing</a>
            </div>

            {/* Contact col */}
            <div className="footer-col">
              <h4>Contact</h4>
              <p className="footer-contact-item"> hello@daanvitech.com</p>
              <p className="footer-contact-item"> Bangalore, India</p>
              <p className="footer-contact-item"> +91 99641 15577</p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 Daanvi Technologies Private Limited. All rights reserved.</p>
            <div className="footer-legal">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── SCROLL TO TOP ───────────────────────────────────────── */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            className="scroll-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.15 }}
            aria-label="Scroll to top"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── APPLY MODAL ─────────────────────────────────────────── */}
      <AnimatePresence>
        {applyJob && (
          <motion.div className="apply-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onMouseDown={(e) => { if (e.target === e.currentTarget) closeApply() }}>
            <motion.div className="apply-modal" role="dialog" aria-modal="true" aria-labelledby="apply-title"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ duration: 0.25 }}>
              <button className="apply-close" type="button" onClick={closeApply} aria-label="Close">×</button>
              <div className="apply-header">
                <span className="section-tag">{applyJob.dept}</span>
                <h3 id="apply-title">Apply: {applyJob.title}</h3>
                <p>{applyJob.type}</p>
              </div>
              <form className="apply-form" onSubmit={handleApplySubmit} noValidate>
                <div className="field-group">
                  <label>Full Name <span className="req">*</span></label>
                  <input
                    type="text"
                    value={applyForm.name}
                    onChange={(e) => setApplyForm(f => ({ ...f, name: e.target.value }))}
                    className={applyErrors.name ? 'input-error' : ''}
                    placeholder="Jane Doe"
                    disabled={applyStatus === 'loading'} />
                  {applyErrors.name && <span className="field-error">{applyErrors.name}</span>}
                </div>
                <div className="field-group">
                  <label>Email <span className="req">*</span></label>
                  <input
                    type="email"
                    value={applyForm.email}
                    onChange={(e) => setApplyForm(f => ({ ...f, email: e.target.value }))}
                    className={applyErrors.email ? 'input-error' : ''}
                    placeholder="you@example.com"
                    disabled={applyStatus === 'loading'} />
                  {applyErrors.email && <span className="field-error">{applyErrors.email}</span>}
                </div>
                <div className="field-group">
                  <label>Mobile Number <span className="req">*</span></label>
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={applyForm.phone}
                    onChange={(e) => setApplyForm(f => ({ ...f, phone: e.target.value }))}
                    className={applyErrors.phone ? 'input-error' : ''}
                    placeholder="+91 XXXXX XXXXX"
                    disabled={applyStatus === 'loading'} />
                  {applyErrors.phone && <span className="field-error">{applyErrors.phone}</span>}
                </div>
                <div className="field-group">
                  <label>Why are you a great fit for this role? <span className="req">*</span></label>
                  <div className="apply-pitch-wrap">
                    <textarea
                      rows={6}
                      value={applyForm.pitch}
                      onChange={(e) => { pitchBaseRef.current = e.target.value; setApplyForm(f => ({ ...f, pitch: e.target.value })) }}
                      className={applyErrors.pitch ? 'input-error' : ''}
                      placeholder="Share relevant experience, projects, and what excites you about this role…"
                      disabled={applyStatus === 'loading'} />
                    <button
                      type="button"
                      className={`apply-mic${listening ? ' listening' : ''}`}
                      onClick={toggleListening}
                      aria-label={listening ? 'Stop voice input' : 'Start voice input'}
                      title={listening ? 'Stop voice input' : 'Speak to fill the field'}>
                      {listening ? '⏹ Stop' : '🎙 Speak'}
                    </button>
                  </div>
                  {applyErrors.pitch && <span className="field-error">{applyErrors.pitch}</span>}
                </div>
                {applySubmitError && (
                  <div className="apply-submit-error" role="alert">
                    <strong>Submission failed.</strong> {applySubmitError}
                  </div>
                )}
                <div className="apply-actions">
                  <button type="button" className="apply-cancel" onClick={closeApply} disabled={applyStatus === 'loading'}>Cancel</button>
                  <button type="submit" className="btn-apply" disabled={applyStatus === 'loading'}>
                    {applyStatus === 'loading' ? 'Sending…' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── TOAST ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {toast && (
          <motion.div className={`toast${toast.ok ? '' : ' toast-error'}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.35 }}>
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── COOKIE BANNER ───────────────────────────────────────── */}
      <AnimatePresence>
        {!cookieOk && (
          <motion.div className="cookie-banner"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}>
            <div className="cookie-text">
              <span className="cookie-icon"> </span>
              <p>
                We use cookies to improve your experience and analyse site performance.
                By continuing to browse you agree to our{' '}
                <a href="/privacy" className="cookie-link">Privacy Policy</a>.
              </p>
            </div>
            <div className="cookie-actions">
              <button className="cookie-decline" onClick={() => setCookieOk(true)}>
                Decline
              </button>
              <button className="cookie-accept" onClick={acceptCookies}>
                Accept All
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </MotionConfig>
  )
}