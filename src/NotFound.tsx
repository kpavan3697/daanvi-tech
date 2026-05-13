import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="notfound-wrap">
      <div className="bg-effects">
        <div className="bg-orb orb-1" />
        <div className="bg-orb orb-2" />
        <div className="grid-overlay" />
      </div>

      <motion.div
        className="notfound-inner"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <motion.div
          className="notfound-code"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          404
        </motion.div>

        <h1 className="notfound-title">Page Not Found</h1>
        <p className="notfound-sub">
          Looks like this page wandered off into the edge network.<br />
          Let's get you back to base.
        </p>

        <div className="notfound-actions">
          <a href="/" className="btn-primary" style={{ textDecoration: 'none' }}>
            ← Back to Home
          </a>
          <a href="/#contact" className="notfound-link">
            Contact Us
          </a>
        </div>
      </motion.div>
    </div>
  )
}
