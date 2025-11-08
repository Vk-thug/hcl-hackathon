import React from 'react'
import PortalNavbar from './PortalNavbar'
import { NavLink } from 'react-router'

function Services() {
    const services = [
    {
      id: 1,
      title: 'Preventive Health Checkups',
      description:
        'Schedule regular health checkups to detect potential conditions early. We provide reminders and personalized test packages based on age and gender.',
      icon: '🩺',
    },
    {
      id: 2,
      title: 'Wellness Tracking',
      description:
        'Monitor daily steps, calories, and sleep patterns. Our intelligent dashboard helps visualize your progress and stay consistent with your wellness goals.',
      icon: '📊',
    },
    {
      id: 3,
      title: 'Nutrition & Diet Plans',
      description:
        'Get personalized vegetarian or non-vegetarian meal plans curated by nutrition experts. Designed to meet your health goals such as weight gain, fitness, or better metabolism.',
      icon: '🥗',
    },
    {
      id: 4,
      title: 'Mental Health Support',
      description:
        'Track stress levels and access mindfulness resources. Get connected with certified counselors for emotional well-being and stress management.',
      icon: '🧘‍♀️',
    },
    {
      id: 5,
      title: 'Health Analytics Dashboard',
      description:
        'Visualize key health indicators such as blood pressure, sugar levels, and BMI trends. Stay informed and share reports with your healthcare provider.',
      icon: '📈',
    },
    {
      id: 6,
      title: 'Appointment Reminders',
      description:
        'Never miss a doctor’s visit again. Our reminder system ensures you stay compliant with preventive and follow-up appointments.',
      icon: '⏰',
    },
  ]

  return (
    <>
        <PortalNavbar/>

        <div className="max-w-6xl mx-auto px-4 py-10 text-left">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        Our Healthcare & Wellness Services
      </h1>
      <p className="text-gray-600 mb-8">
        At <strong>HealthWell</strong>, we’re committed to empowering you to lead a healthy lifestyle.
        Explore our preventive and wellness services designed to keep you healthy, informed, and motivated.
      </p>

      {/* Service cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h2 className="text-xl font-semibold mb-2 text-blue-700">
              {service.title}
            </h2>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </div>
        ))}
      </div>

      {/* CTA section */}
      <div className="mt-12 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-md">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">
          Want to start your wellness journey?
        </h2>
        <p className="text-gray-700 mb-4">
          Create your personalized health profile and explore tailored preventive care plans.
        </p>
        <NavLink
          href="/contact"
          className="inline-block px-5 py-2 bg-[#000] text-white rounded-md transition"
        >
          Contact Us
        </NavLink>
      </div>
    </div>
        
    </>
  )
}

export default Services