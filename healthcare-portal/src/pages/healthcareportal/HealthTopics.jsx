import React from 'react'
import PortalNavbar from './PortalNavbar'

function HealthTopics() {

     const topics = [
        {
        id: 1,
        title: 'Healthy Sleep Habits',
        description:
            'Quality sleep is essential for both physical and mental health. Learn effective bedtime routines, ideal sleep durations, and tips to reduce insomnia naturally.',
        icon: '😴',
        },
        {
        id: 2,
        title: 'Heart Health Awareness',
        description:
            'Understand the importance of heart health, early signs of cardiac risks, and the lifestyle changes that help prevent hypertension and cholesterol issues.',
        icon: '❤️',
        },
        {
        id: 3,
        title: 'Nutrition & Balanced Diet',
        description:
            'A balanced diet fuels your body and mind. Explore essential nutrients, healthy eating habits, and vegetarian meal ideas to support your wellness goals.',
        icon: '🥦',
        },
        {
        id: 4,
        title: 'Stress Management Techniques',
        description:
            'Stress can impact your immune system and sleep quality. Discover deep-breathing, yoga, and digital detox techniques for a calmer lifestyle.',
        icon: '🧘‍♂️',
        },
        {
        id: 5,
        title: 'Physical Activity & Fitness',
        description:
            'Regular exercise enhances heart function, strengthens muscles, and boosts mood. Find beginner-friendly workout routines to stay active daily.',
        icon: '🏃‍♀️',
        },
        {
        id: 6,
        title: 'Hydration & Detoxification',
        description:
            'Proper hydration supports kidney function, improves skin health, and boosts energy. Learn about the right water intake and natural detox practices.',
        icon: '💧',
        },
    ]

  return (
    <>
        <PortalNavbar/>

        <div className="max-w-6xl mx-auto px-4 py-10 text-left">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">Health Topics</h1>
            <p className="text-gray-600 mb-8">
                Explore essential health and wellness topics to improve your lifestyle, prevent diseases,
                and stay informed about modern healthcare practices.
            </p>

            {/* Topics grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {topics.map((topic) => (
                <div
                    key={topic.id}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300"
                >
                    <div className="text-4xl mb-4">{topic.icon}</div>
                    <h2 className="text-xl font-semibold mb-2 text-blue-700">
                    {topic.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4">{topic.description}</p>
                </div>
                ))}
            </div>

            {/* Bottom wellness reminder section */}
            <div className="mt-12 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-md">
                <h2 className="text-xl font-semibold text-blue-700 mb-2">
                Learn. Act. Prevent.
                </h2>
                <p className="text-gray-700 mb-4">
                Staying informed about your health is the first step toward prevention. Explore these
                topics regularly and take small steps toward long-term wellness.
                </p>
                <a
                href="/blog"
                className="inline-block px-5 py-2 bg-[#000] text-white rounded-md transition"
                >
                Explore Blog Articles
                </a>
            </div>
            </div>
        
    </>
  )
}

export default HealthTopics