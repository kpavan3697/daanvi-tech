import LegalPage from './LegalPage'

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="14 May 2026"
      description="The terms that govern your use of daanvitech.com — intellectual property, submissions, disclaimers, limitations of liability, and governing law."
    >
      <p>
        These terms govern your use of{' '}
        <a href="https://daanvitech.com">daanvitech.com</a> ("the site"), operated by Daanvi
        Technologies Private Limited ("Daanvi", "we", "our"). By using the site, you agree to
        these terms.
      </p>

      <h2>1. Use of the site</h2>
      <p>
        You may browse the site for personal and lawful business purposes. You agree not to use
        it in any way that could damage, disable, or impair the site, or interfere with
        another user's enjoyment of it.
      </p>

      <h2>2. Intellectual property</h2>
      <p>
        All content on this site — text, graphics, logos, code, and design — is the property of
        Daanvi Technologies or its licensors and is protected by Indian and international
        intellectual-property laws. You may not reproduce, distribute, or create derivative
        works without our prior written permission.
      </p>

      <h2>3. Submissions</h2>
      <p>
        When you contact us, submit a job application, or share any information through the
        site, you confirm that the information is accurate and that you have the right to share
        it. We handle submissions in line with our{' '}
        <a href="/privacy">Privacy Policy</a>.
      </p>

      <h2>4. No professional advice</h2>
      <p>
        Content on this site is provided for general information only and does not constitute
        professional, legal, financial, or engineering advice. Any engagement with Daanvi for
        services will be governed by a separate written agreement.
      </p>

      <h2>5. Third-party links</h2>
      <p>
        The site may link to external websites that we do not control. We are not responsible
        for the content or practices of those sites.
      </p>

      <h2>6. Disclaimers</h2>
      <p>
        The site is provided on an "as is" and "as available" basis. To the maximum extent
        permitted by law, we disclaim all warranties, express or implied, including
        merchantability, fitness for a particular purpose, and non-infringement.
      </p>

      <h2>7. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, Daanvi will not be liable for any indirect,
        incidental, special, or consequential damages arising out of or in connection with your
        use of the site.
      </p>

      <h2>8. Changes to these terms</h2>
      <p>
        We may update these terms from time to time. Continued use of the site after changes
        are posted means you accept the revised terms.
      </p>

      <h2>9. Governing law</h2>
      <p>
        These terms are governed by the laws of India. Any dispute will be subject to the
        exclusive jurisdiction of the courts at Bangalore, Karnataka.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions about these terms? Write to us at{' '}
        <a href="mailto:hello@daanvitech.com">hello@daanvitech.com</a>.
      </p>

      <p className="legal-disclaimer">
        <strong>Note:</strong> this is a starter template. Please have it reviewed by qualified
        counsel before relying on it for production use.
      </p>
    </LegalPage>
  )
}