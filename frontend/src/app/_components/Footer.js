import { Facebook, Twitter, Instagram, Linkedin, Youtube, Phone, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center space-y-4 md:space-y-6">
          {/* Company Logo and Name */}
          <div className="flex items-center justify-center">
            <Link href="/" className="flex items-center group">
              <Image src="/logo.png" height={80} width={200} style={{ objectFit: 'cover', height:135 }} alt="Company Logo" />
            </Link>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-20 text-center">
            <div className="w-full sm:w-auto mb-4 sm:mb-0">
              <h3 className="text-lg font-semibold text-primary mb-3 md:mb-4 uppercase tracking-wider">Contact Us</h3>
              <ul className="space-y-2 md:space-y-3">
                <li>
                    <div className="flex flex-row gap-2 justify-center">
                      <Mail className="w-5 h-5"/>
                      <Link href="#" className="hover:text-white transition-colors duration-300">customercare@sheenaseeds.com</Link>
                    </div>
                </li>
                <li>
                    <div className="flex flex-row gap-2 justify-center">
                      <Phone className="w-5 h-5"/>
                      <Link href="#" className="hover:text-white transition-colors duration-300">+91 9999999999</Link>
                    </div>
                </li>
              </ul>
            </div>

            <div className="w-full sm:w-auto mb-4 sm:mb-0">
              <h3 className="text-lg font-semibold text-primary mb-3 md:mb-4 uppercase tracking-wider">Company</h3>
              <ul className="space-y-2 md:space-y-3">
                <li><Link href="#" className="hover:text-white transition-colors duration-300">Certifications</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</Link></li>
              </ul>
            </div>

            <div className="w-full sm:w-auto">
              <h3 className="text-lg font-semibold text-primary mb-3 md:mb-4 uppercase tracking-wider">Helpful Links</h3>
              <ul className="space-y-2 md:space-y-3">
                <li><Link href="#" className="hover:text-white transition-colors duration-300">About Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors duration-300">FAQs</Link></li>
              </ul>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center space-x-6 pt-2 md:pt-0">
            <Link href="#" className="text-gray-400 hover:text-blue-700 transition-colors duration-300">
              <Facebook className="h-8 w-8 md:h-10 md:w-10" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-red-600 transition-colors duration-300">
              <Youtube className="h-8 w-8 md:h-10 md:w-10" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
              <Instagram className="h-8 w-8 md:h-10 md:w-10" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
              <Linkedin className="h-8 w-8 md:h-10 md:w-10" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>

          {/* Copyright */}
          <div className="w-full pt-4 pb-4 border-t border-gray-800">
            <p className="text-sm text-center text-gray-500">&copy; 2024 Company Name. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}