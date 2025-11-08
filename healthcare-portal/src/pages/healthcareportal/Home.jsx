import React from 'react'
import PortalNavbar from './PortalNavbar'
import Footer from '../../components/ui/Footer';

const articles = [
  {
    id: 1,
    title: "5 Morning Habits for Better Mental Health",
    excerpt:
      "Start your day with these mindful habits that boost focus and reduce stress...",
    image:
      "https://images.unsplash.com/photo-1552650272-b8a34e21bc4b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1335",
  },
  {
    id: 2,
    title: "The Power of Hydration",
    excerpt:
      "Staying hydrated isn’t just about quenching thirst—it’s key to overall health...",
    image:
      "https://images.unsplash.com/photo-1678356717973-f2177782388a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
  },
  {
    id: 3,
    title: "Top 10 Foods for a Strong Immune System",
    excerpt:
      "Boost your body’s natural defense with these nutrient-rich foods...",
    image:
      "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    title: "How to Improve Sleep Quality Naturally",
    excerpt:
      "Discover science-backed tips for deeper, more restorative sleep...",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    title: "The Benefits of Daily Walking",
    excerpt:
      "A simple 30-minute walk a day can transform your physical and mental health...",
    image:
      "https://plus.unsplash.com/premium_photo-1682090420277-0d7ba9e03e23?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740",
  },
];

function Home() {
  return (
    <>
    
        <PortalNavbar/>

        <div className="min-h-screen bg-gray-50 py-10 px-5">
            <div className="max-w-6xl mx-auto text-center mb-10">
                <h1 className="text-4xl font-bold text-teal-700 mb-2">
                Healthy Living Blog
                </h1>
                <p className="text-gray-600">
                Simple tips and advice to help you live a balanced, healthy life.
                </p>
            </div>

            {/* Article Cards */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                <div
                    key={article.id}
                    className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col"
                >
                    <img
                    src={article.image}
                    alt={article.title}
                    className="rounded-xl h-48 w-full object-cover mb-4"
                    />
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {article.title}
                    </h2>
                    <p className="text-gray-600 mb-4 flex-grow">{article.excerpt}</p>
                    <button className="bg-teal-600 text-white rounded-lg px-4 py-2 hover:bg-teal-700 transition">
                    Read Article
                    </button>
                </div>
                ))}
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default Home