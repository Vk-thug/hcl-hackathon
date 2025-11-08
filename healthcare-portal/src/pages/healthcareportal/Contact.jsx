import {useState} from 'react'
import PortalNavbar from './PortalNavbar'
import Footer from '../../components/ui/Footer'

function Contact() {

     const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })

    const [submitted, setSubmitted] = useState(false)

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault()
        // Here you can add API integration or email logic
        console.log('Form Data:', formData)
        setSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
    }

  return (

    
    <>
    <PortalNavbar/>
        <div className="max-w-3xl mx-auto px-4 py-10 text-left">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Contact Us</h1>
        <p className="text-gray-600 mb-8">
            Have a question, feedback, or need assistance? Fill out the form below and our team will get back to you soon.
        </p>

        {submitted && (
            <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            ✅ Your message has been sent successfully! We’ll get in touch shortly.
            </div>
        )}

        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md space-y-5"
        >
            <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
            </label>
            <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>

            <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
            </label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>

            <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Subject
            </label>
            <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What’s your message about?"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>

            <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
            </label>
            <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Type your message..."
                rows="5"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            </div>

            <button
            type="submit"
            className="w-full bg-[#3B82F6] text-white py-2 rounded-md hover:bg-blue-700 transition-all duration-200"
            >
            Send Message
            </button>
        </form>

        <div className="mt-10 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-md">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">Contact Details</h2>
            <p className="text-gray-700">
            <strong>Email:</strong> support@healthwell.example
            </p>
            <p className="text-gray-700">
            <strong>Phone:</strong> +91 98765 43210
            </p>
            <p className="text-gray-700">
            <strong>Address:</strong> 42, Wellness Street, Bengaluru, India
            </p>
        </div>
        </div>

        <Footer/>

    </>

    
  )
}

export default Contact