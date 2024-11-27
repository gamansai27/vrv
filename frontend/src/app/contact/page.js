"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import axios from 'axios';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [showForm, setShowForm] = useState(false); 
  const [showPopup, setShowPopup] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/email/customer', { formData});
  
      if (response.status === 200) {
        setShowPopup(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => {
          setShowPopup(false);
        }, 3000);
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleShowForm = () => {
    setShowForm(true); // Show the form when the button is clicked
  };

  return (
    <div className="min-h-screen bg-green-100"> {/* Light green background */}
      {/* Hero Section with Improved Background */}
      <div className="relative h-[50vh]">
        <Image
          src="/contactus.jpg"
          fill
          alt="Background image"
          style={{ objectFit: 'cover' }}
          className="fixed top-0 left-0 w-full h-[50vh] z-0"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center shadow-text z-10">
            Contact Us
          </h1>
        </div>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 bg-blue-50 py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-20">
            {/* Contact Information */}
            <div className="border p-6 md:p-12 rounded-lg shadow-lg bg-green-100"> {/* Light blue background */}
              <h2 className="text-2xl font-bold text-green-800 mb-8">Get in Touch</h2>
              <p className="text-base text-gray-600 mb-8">
                We are here to help and answer any questions you may have. We look forward to hearing from you.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-green-600 mr-4 mt-1" />
                  <div>
                    <p className="text-med text-gray-800">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
  <Mail className="w-6 h-6 text-green-600 mb-2 sm:mb-0" />
  <p className="text-sm sm:text-med text-gray-800 break-words">
    customercare@sheenaseeds.com
  </p>
</div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Address 1 */}
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-green-600 mr-4 mt-1" />
                <div>
                  <p className="text-med text-gray-800">
                    Factory:
                  </p>
                  <p className="text-med text-gray-800">
                    Near Goplaipalli Industrial Area,
                  </p>
                  <p className="text-med text-gray-800">
                    Narketpalli, Nalgonda Dt,
                  </p>
                  <p className="text-med text-gray-800">
                    Telangana State - 508 254.
                  </p>
                </div>
              </div>

              {/* Address 2 */}
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-green-600 mr-4 mt-1" />
                <div>
                  <p className="text-med text-gray-800">
                    Reg. Office:
                  </p>
                  <p className="text-med text-gray-800">
                    5-85/6, Plot No: 241,
                  </p>
                  <p className="text-med text-gray-800">
                    Laxma Reddy Palem (V),
                  </p>
                  <p className="text-med text-gray-800">
                    Pedda Ambarpet, Abdullapurmet (M),
                  </p>
                  <p className="text-med text-gray-800">
                    Ranga Reddy Dt, Telangana State.
                  </p>
                </div>
              </div>
            </div>

              </div>
            </div>

            {/* Button to Show the Form */}
            {!showForm && (
              <div className="border p-6 md:p-12 rounded-lg shadow-lg text-center cursor-pointer bg-blue-200 hover:bg-blue-300 transition duration-300" onClick={handleShowForm}> {/* Light blue background */}
                <h2 className="text-xl font-bold text-green-800">
                  Click here to send us a message
                </h2>
              </div>
            )}

            {/* Contact Form with Validation - Visible Only After Click */}
            {showForm && (
              <div className="border p-6 md:p-12 rounded-lg shadow-lg bg-blue-100"> {/* Light blue background */}
                <h2 className="text-2xl font-bold text-green-800 mb-8">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="text-med block text-gray-900 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-black text-black shadow-sm focus:border-green-500 focus:ring-green-500 py-3 px-4"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-med text-gray-900 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-black text-black shadow-sm focus:border-green-500 focus:ring-green-500 py-3 px-4"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-med text-gray-900 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-black text-black shadow-sm focus:border-green-500 focus:ring-green-500 py-3 px-4"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-med text-gray-900 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-black text-black shadow-sm focus:border-green-500 focus:ring-green-500"
                    ></textarea>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-3 rounded-lg text-lg transition duration-300"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success Popup Message */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-lg text-center animate-fadeIn">
            <div className="text-green-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-black">Message Submitted!</h2>
            <p className="text-gray-600">Thank you for reaching out to us.</p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}