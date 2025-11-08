import Footer from '../../components/ui/Footer'
import PortalNavbar from '../healthcareportal/PortalNavbar'

export default function TermsConditions() {
const effectiveDate = '2025-11-08'
return (
    <>
        <PortalNavbar/>
        <div className="max-w-4xl mx-auto px-4 py-8 text-left">
            <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
            <p className="text-sm text-gray-600 mb-6">Effective Date: {effectiveDate}</p>

            <p className="mb-4">
            By accessing or using the <strong>HealthWell</strong> portal, you agree to comply with these
            Terms and Conditions. Please read them carefully before using our services.
            </p>


            <h2 className="text-xl font-semibold mt-6 mb-2">1. Acceptance of Terms</h2>
            <p className="mb-4">
            Your use of our website or app constitutes acceptance of these Terms. If you do not agree,
            please discontinue use immediately.
            </p>


            <h2 className="text-xl font-semibold mt-6 mb-2">2. Service Use</h2>
            <p className="mb-4">
            The services provided by HealthWell are for informational and educational purposes only.
            They are not a substitute for professional medical advice or treatment.
            </p>


            <h2 className="text-xl font-semibold mt-6 mb-2">3. User Responsibilities</h2>
            <ul className="list-disc ml-6 mb-4">
            <li>Provide accurate information during registration.</li>
            <li>Maintain confidentiality of login credentials.</li>
            <li>Use the portal responsibly and legally.</li>
            </ul>


            <h2 className="text-xl font-semibold mt-6 mb-2">4. Limitation of Liability</h2>
            <p className="mb-4">
            HealthWell is not responsible for any damages resulting from the use or inability to use the
            platform or any reliance on health-related content.
            </p>


            <h2 className="text-xl font-semibold mt-6 mb-2">5. Governing Law</h2>
            <p className="mb-4">
            These Terms are governed by applicable laws in your jurisdiction. Any disputes will be handled
            in accordance with local law.
            </p>


            <h2 className="text-xl font-semibold mt-6 mb-2">6. Contact</h2>
            <p className="mb-4">For legal inquiries, contact us at: <strong>legal@healthwell.example</strong></p>
            <Footer/>
        </div>
    </>
)
}