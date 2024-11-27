'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, ChevronUp, Search, ClipboardCheck, Rocket, Lightbulb } from 'lucide-react'

const categories = [
  {
    title: "Focus Area",
    content: [
      "Gene-enhancement to develop superior recombinants and new product varieties",
      "Develop superior trait-specific hybrid varieties in mandate crops",
      "Incorporate nutritional qualities to develop resistance to major biotic and abiotic stress factors",
      "Introduce and Outsource trait specific novel-gene hybrids",
      "Creation of utmost value for Indian farmers facing global competition"
    ]
  },
  {
    title: "Genetic Resources",
    content: [
      "Extensive collection of germplasm to support research of diverse crop varieties",
      "Intensive evaluation of germplasm to ensure defense against input traits such as biotic (living organisms) and abiotic (physical and chemical) stress factors"
    ]
  },
  {
    title: "Infrastructure",
    content: [
      "Modern, state-of-the-art seed conditioning plant",
      "Wide area testing centers representing different Agro-climatic zones",
      "Well developed research and development farms"
    ]
  },
  {
    title: "Research and Development",
    content: [
      "Multi-disciplinary crop improvement teams comprising of plant breeders, entomologists, plant pathologists, Bio-technologists, seed technologists and agronomists",
      "Effective gene-enhancement programs to develop trait-specific genetic material",
      "Extensive hybridization programs to develop and continuously evaluate high potential hybrids",
      "Diverse bio-technology programs that support conventional as well as traditional breeding"
    ]
  },
  {
    title: "Human Resources",
    content: [
      "Marketing operations lead by management professionals with 15-20 years of experience in reputable Multi-National Corporations",
      "Highly qualified, dedicated and experienced research scientists with international reputation",
      "Well qualified and experienced plant breeders, seed technologists for seed production and quality assurance",
      "Diverse workforce consisting of experienced as well as young professionals"
    ]
  },
  {
    title: "Mandate Crops",
    content: [
      "Maize",
      "Okra",
      "Chilli",
      "Watermelon",
      "Gourds"
    ]
  }
]

const seedBullets = [
  { icon: <Search className="w-6 h-6" />, text: "Study - Conduct studies to explore genetic variations that deliver incremental benefits to seed varieties." },
  { icon: <ClipboardCheck className="w-6 h-6" />, text: "Evaluate - Assess new varieties alongside existing crops to ensure top-quality seeds reach the market." },
  { icon: <Rocket className="w-6 h-6" />, text: "Execute - Accelerate time-to-market and support the market execution of the latest crop varieties." },
  { icon: <Lightbulb className="w-6 h-6" />, text: "Develop - Gather market feedback to continuously improve our products and processes." },
]

export default function AboutUs() {
  const [expandedCard, setExpandedCard] = useState(null)
  const toggleCard = (index) => {
    if (expandedCard === index) {
      setExpandedCard(null)
    } else {
      setExpandedCard(index)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[50vh]">
        <Image
          src="/aboutus.jpg"
          fill
          alt="Background image"
          style={{ objectFit: "cover" }}
          className="brightness-50" // Darkens the image
        />
        {/* Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center shadow-text">
            About Sheena Seeds
          </h1>
        </div>
      </div>

      {/* About Us Section */}
      <section className="max-w-5xl mx-auto px-4 py-5 bg-white">
        <h2 className="text-3xl font-bold text-green-800 mb-3 text-center">
          Our Story
        </h2>
        <p className="text-base text-gray-700 text-justify mb-8">
          Sheena Biotech Private Limited (Sheena Seeds) is a fast-growing seed
          company in India providing superior quality seeds of both Hybrid and
          Research varieties to the farming community. We are actively involved
          in seed production of Fruits, Vegetables, Commercial and Cash crops
          using high-quality growth genes at our newly constructed facilities
          equipped with the latest technology available. We actively engage
          Subject Matter Experts (SMEs), Scientists with extensive experience
          and invest in research and development (R&D) efforts to enhance our
          gene bank and continue to provide seeds that benefit our farming
          community.
        </p>
      </section>

      {/* Vision and Mission Section */}
      <section className="bg-green-100 text-white py-16">
        <div className="max-w-6xl mx-auto px-2 md:px-4">
          <div className="grid md:grid-cols-2 gap-40">
            <div className="bg-green-800 hover:scale-105 hover:shadow-xl hover:bg-green-700 text-white p-6 rounded-xl shadow-lg transition duration-300">
              <h2 className="text-center text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-center text-base">
                With our products, we aim to address major crop growth
                challenges in India through innovative, research-driven seed
                solutions, ensuring excellence and leadership in the
                agricultural market.
              </p>
            </div>
            <div className="bg-green-800 hover:scale-105 hover:shadow-xl hover:bg-green-700 text-white p-6 rounded-lg shadow-lg transition duration-300">
              <h2 className="text-center text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-center text-base">
                To deliver high-quality seeds with optimal genetic potential,
                supporting sustainable farming and the prosperity of Indian
                farmers. Our values help guide us in fulfilling our mission
                successfully.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEED Section */}
      <section className="max-w-4xl mx-auto px-4 pt-16 pb-2">
        <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">
          S
          <span className="text-xl font-normal text-green-800 mb-8 text-center">
            tudy
          </span>{" "}
          E
          <span className="text-xl font-normal text-green-800 mb-8 text-center">
            valuate
          </span>{" "}
          E
          <span className="text-xl font-normal text-green-800 mb-8 text-center">
            xecute
          </span>{" "}
          D
          <span className="text-xl font-normal text-green-800 mb-8 text-center">
            evelop
          </span>
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {seedBullets.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md"
            >
              <div className="bg-blue-100 p-3 rounded-full text-blue-700 text-base">
                {item.icon}
              </div>
              <span className="text-gray-800 text-med font-medium">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Category Cards Section */}
      <h2 className="text-3xl font-bold text-green-800 mt-10 text-center">
        What Defines Us
      </h2>
      <section className="w-full px-4 py-16 bg-green-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-green-600 rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:bg-green-700 border-2 hover:shadow-3xl transform hover:scale-105"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4 border-b-2 border-white pb-2">
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="text-white mr-2 text-med">•</span>
                      <span className="text-white text-med">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}