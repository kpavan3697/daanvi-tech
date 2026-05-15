import LegalPage from './LegalPage'

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="14 May 2026"
      description="How Daanvi Technologies collects, uses, and protects personal data from contact-form enquiries, job applications, and site usage — aligned to India's DPDPA 2023 and the EU/UK GDPR."
    >
      <p>
        Daanvi Technologies Private Limited ("Daanvi", "we", "our") respects your privacy. This
        policy explains what personal data we collect when you use{' '}
        <a href="https://daanvitech.com">daanvitech.com</a>, why we collect it, and the rights
        you have over it. It is written to align with India's Digital Personal Data Protection
        Act, 2023 (DPDPA) and the EU/UK General Data Protection Regulation (GDPR), as
        applicable.
      </p>

      <h2>1. Who we are</h2>
      <p>
        Daanvi Technologies Private Limited is the data controller for personal data collected
        through this site. You can reach us at{' '}
        <a href="mailto:hello@daanvitech.com">hello@daanvitech.com</a> or at our Bangalore office.
      </p>

      <h2>2. What we collect</h2>
      <ul>
        <li>
          <strong>Contact form:</strong> name, email address, phone number, and the message you
          send us.
        </li>
        <li>
          <strong>Job applications:</strong> if you apply for a role, we collect your CV/resume
          and any details you choose to share. These are processed to evaluate your application
          and, with your consent, may be retained for future openings.
        </li>
        <li>
          <strong>Usage data:</strong> anonymised analytics about how visitors use the site
          (pages viewed, approximate location, device type). We may use cookies or similar
          technologies for this.
        </li>
      </ul>

      <h2>3. How we use it</h2>
      <ul>
        <li>To respond to your enquiry or evaluate a job application.</li>
        <li>To improve the site and our services.</li>
        <li>To comply with legal obligations.</li>
      </ul>
      <p>We do not sell your personal data and we do not share it for advertising purposes.</p>

      <h2>4. Sharing with third parties</h2>
      <p>We rely on a small number of processors who help us run the site:</p>
      <ul>
        <li>
          <strong>Formspree</strong> — receives contact form submissions on our behalf.
        </li>
        <li>
          Hosting and email providers used to operate{' '}
          <a href="https://daanvitech.com">daanvitech.com</a>.
        </li>
      </ul>
      <p>
        Each processor is contractually required to protect your data and to use it only for
        the purposes we specify.
      </p>

      <h2>5. How long we keep it</h2>
      <p>
        We keep enquiry data for as long as needed to respond to you and for a reasonable
        follow-up period. Job-application data is kept for up to 12 months after a hiring
        decision unless you ask us to delete it sooner.
      </p>

      <h2>6. Your rights</h2>
      <p>Depending on where you live, you may have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you.</li>
        <li>Ask us to correct or delete it.</li>
        <li>Withdraw consent or object to certain uses.</li>
        <li>Lodge a complaint with a supervisory authority.</li>
      </ul>
      <p>
        To exercise any of these rights, email{' '}
        <a href="mailto:hello@daanvitech.com">hello@daanvitech.com</a>. We will respond within
        the statutory timeframe applicable to your jurisdiction.
      </p>

      <h2>7. Security</h2>
      <p>
        We use reasonable technical and organisational measures to protect personal data. No
        method of transmission over the internet is 100% secure, but we work to minimise the
        risk.
      </p>

      <h2>8. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. Material changes will be reflected by an
        updated "Last updated" date at the top of this page.
      </p>

      <h2>9. Contact</h2>
      <p>
        Questions about this policy or your data? Write to us at{' '}
        <a href="mailto:hello@daanvitech.com">hello@daanvitech.com</a>.
      </p>

      <p className="legal-disclaimer">
        <strong>Note:</strong> this is a starter template. Please have it reviewed by qualified
        counsel before relying on it for production use.
      </p>
    </LegalPage>
  )
}