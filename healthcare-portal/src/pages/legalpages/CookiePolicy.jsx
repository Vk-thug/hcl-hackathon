import React from 'react'
import PortalNavbar from '../healthcareportal/PortalNavbar'
import Footer from '../../components/ui/Footer'


export default function CookiePolicy() {
    const effectiveDate = '2025-11-08'
return (
        
        <>
             <PortalNavbar/>

            <div className="max-w-4xl mx-auto px-4 py-8 text-left">

                <h1 className="text-3xl font-bold mb-4">Cookie Policy</h1>
                <p className="text-sm text-gray-600 mb-6">Effective Date: {effectiveDate}</p>


                <p className="mb-4">
                This Cookie Policy explains how <strong>HealthWell</strong> uses cookies and similar technologies
                to improve your browsing experience and ensure our services function effectively.
                </p>


                <h2 className="text-xl font-semibold mt-6 mb-2">1. What Are Cookies?</h2>
                <p className="mb-4">
                Cookies are small data files stored on your device when you visit a website. They help us
                remember your preferences, improve performance, and analyze site usage.
                </p>


                <h2 className="text-xl font-semibold mt-6 mb-2">2. Types of Cookies We Use</h2>
                <ul className="list-disc ml-6 mb-4">
                <li><strong>Essential Cookies:</strong> Required for the portal to function properly.</li>
                <li><strong>Analytics Cookies:</strong> Help us analyze traffic and user interactions.</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences and enhance usability.</li>
                </ul>


                <h2 className="text-xl font-semibold mt-6 mb-2">3. Managing Cookies</h2>
                <p className="mb-4">
                You can manage or disable cookies in your browser settings. Disabling essential cookies may
                affect website functionality.
                </p>


                <h2 className="text-xl font-semibold mt-6 mb-2">4. Updates to This Policy</h2>
                <p className="mb-4">
                We may update this Cookie Policy periodically. Any changes will be posted here with a new
                effective date.
                </p>


                <h2 className="text-xl font-semibold mt-6 mb-2">5. Contact Us</h2>
                <p className="mb-4">
                For questions regarding this Cookie Policy, contact us at: <strong>support@healthwell.example</strong>
                </p>
            </div>

            <Footer />
        </>
    )
}