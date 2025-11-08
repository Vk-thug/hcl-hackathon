// src/pages/legal/PrivacyPolicy.jsx
import PortalNavbar from '../healthcareportal/PortalNavbar'
import Footer from '../../components/ui/Footer'



export default function PrivacyPolicy() {
  const effectiveDate = '2025-11-08' // update as needed
  return (
    <>
      <PortalNavbar/>
      <div title="Privacy Policy" className="flex justify-center px-6 py-10">
        <section className="max-w-3xl w-full space-y-4 text-left">
          <p className="text-sm text-gray-600">Effective date: {effectiveDate}</p>

          <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

          <h2 className="text-lg font-semibold">1. Overview</h2>
          <p>
            This Privacy Policy explains how <strong>HealthWell</strong> ("we", "us", "our")
            collects, uses, discloses, and protects information, including Protected Health
            Information (PHI), when you access our website, mobile applications, or services
            (collectively, the "Services").
          </p>

          <h2 className="text-lg font-semibold">2. Scope & HIPAA</h2>
          <p>
            If we act as a Covered Entity or Business Associate under the Health Insurance
            Portability and Accountability Act (HIPAA), we will handle PHI in accordance with
            HIPAA Privacy and Security Rules. This policy summarizes technical, administrative,
            and physical safeguards we maintain to protect PHI. This policy does not replace
            contractual agreements (e.g., Business Associate Agreements) or legal obligations.
          </p>

          <h2 className="text-lg font-semibold">3. Information We Collect</h2>
          <ul className="list-disc ml-6 text-gray-700">
            <li><strong>Account data:</strong> name, email, username.</li>
            <li><strong>Health & wellness data:</strong> sleep records, steps, vitals, symptoms — only data you choose to provide.</li>
            <li><strong>Device & usage:</strong> device identifiers, IP address, logs, analytics.</li>
            <li><strong>Communications:</strong> messages, survey responses, and support requests.</li>
          </ul>

          <h2 className="text-lg font-semibold">4. How We Use Information</h2>
          <p>
            We use information to provide and improve the Services, personalize experience,
            enable care coordination (when authorized), send notifications, and comply with
            legal obligations. For PHI, we apply the HIPAA standards of minimum necessary use,
            and process PHI only as permitted by you or as required by law.
          </p>

          <h2 className="text-lg font-semibold">5. Lawful Disclosures</h2>
          <p>
            We do not sell PHI. We may disclose PHI as permitted by HIPAA, such as:
          </p>
          <ul className="list-disc ml-6 text-gray-700">
            <li>To health care providers you authorize for treatment or coordination of care.</li>
            <li>To our service providers (Business Associates) bound by contract and confidentiality.</li>
            <li>When required by law, court order, or to respond to a government request.</li>
          </ul>

          <h2 className="text-lg font-semibold">6. Security Measures</h2>
          <p>
            We maintain administrative, physical, and technical safeguards to protect PHI.
            These include, but are not limited to:
          </p>
          <ul className="list-disc ml-6 text-gray-700">
            <li><strong>Access controls:</strong> role-based access, unique IDs, least privilege.</li>
            <li><strong>Encryption:</strong> TLS for data in transit; encryption at rest for sensitive data stores where feasible.</li>
            <li><strong>Audit & logging:</strong> logs and monitoring of access and changes to PHI.</li>
            <li><strong>Data minimization:</strong> limiting collection and retention to what is necessary.</li>
            <li><strong>Vulnerability management:</strong> regular patching, security testing, and risk assessments.</li>
            <li><strong>Incident response:</strong> documented procedures to investigate and remediate security incidents and breaches.</li>
          </ul>

          <h2 className="text-lg font-semibold">7. Breach Notification</h2>
          <p>
            In the event of a breach of unsecured PHI, we will follow applicable breach notification
            requirements, including notifying affected individuals and regulatory authorities
            as required by law. Where HIPAA applies, we will meet HIPAA breach notification timelines
            and procedures (including notification to HHS when required).
          </p>

          <h2 className="text-lg font-semibold">8. Data Retention and Deletion</h2>
          <p>
            We retain information only as long as necessary to provide Services and to comply with
            legal obligations. You may request deletion of your account and PHI subject to legal
            and contractual retention obligations. Deletion requests are processed in accordance
            with our retention policies and applicable law.
          </p>

          <h2 className="text-lg font-semibold">9. Your Rights</h2>
          <p>
            Depending on applicable law and our role (Covered Entity/Business Associate), you may
            have rights to:
          </p>
          <ul className="list-disc ml-6 text-gray-700">
            <li>Access and obtain a copy of your PHI.</li>
            <li>Request correction or amendment of PHI.</li>
            <li>Request restrictions on certain uses/disclosures (subject to applicable law).</li>
            <li>Receive an accounting of disclosures.</li>
          </ul>
          <p className="text-sm text-gray-600">
            To exercise rights, please contact us using the contact details below. We may require
            verification of identity before processing requests.
          </p>

          <h2 className="text-lg font-semibold">10. Third-Party Services & Business Associates</h2>
          <p>
            We may engage vendors (Business Associates) to provide services (e.g., hosting, analytics).
            These parties are contractually required to implement safeguards and to only process PHI
            per our instructions and applicable law (Business Associate Agreement).
          </p>

          <h2 className="text-lg font-semibold">11. International Transfers</h2>
          <p>
            If data is transferred or stored outside your country, we will apply safeguards and
            comply with applicable cross-border data transfer laws. When HIPAA applies, we will ensure
            contractual protections with any international subprocessors handling PHI.
          </p>

          <h2 className="text-lg font-semibold">12. Minors</h2>
          <p>
            We do not knowingly collect or retain PHI for children under the age of 13 without
            parental consent. For minors, parental or legal guardian authorization may be required.
          </p>

          <h2 className="text-lg font-semibold">13. Changes to This Policy</h2>
          <p>
            We may update this Policy. If changes are material, we will notify users by posting a
            revised effective date and, where required, with direct notice.
          </p>

          <h2 className="text-lg font-semibold">14. Contact Us</h2>
          <p>
            For privacy questions, to exercise your rights, or to report a privacy/security concern,
            contact: <strong>privacy@healthwell.example</strong>
          </p>

          <h2 className="text-lg font-semibold">15. Legal & Compliance Review</h2>
          <p className="text-sm text-gray-600">
            This policy is a template for developers and product teams. It does not constitute legal
            advice. Consult your legal, compliance, or privacy officer to adapt this policy to your
            organization and to ensure it meets HIPAA, state law, and other regulatory requirements.
          </p>
        </section>
      </div>

      <Footer/>
    </>
  )
}
