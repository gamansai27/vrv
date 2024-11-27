import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Calendar, FileText } from 'lucide-react'

const updates = [
  {
    id: 'maize-token-advance-booking-2020',
    title: 'Maize Token Advance Booking Scheme for KHARIF 2020 For MP and CG',
    date: '2020-05-15',
    summary: 'New booking scheme for Maize tokens in Madhya Pradesh and Chhattisgarh for the KHARIF 2020 season.'
  },
  {
    id: 'new-hybrid-rice-variety-2021',
    title: 'Double Cross Maize Token Advance Booking Scheme for KHARIF 2020 For MP and CG',
    date: '2021-03-10',
    summary: 'New booking scheme for Maize tokens in Madhya Pradesh and Chhattisgarh for the KHARIF 2020 season.'
  },
]

export default function RecentUpdates() {
  return (
    <div className="min-h-screen bg-white">
         <div className="relative h-[30vh] bg-green-800 mt-20">
           <div className="absolute inset-0 flex items-center justify-center">
             <h1 className="text-white text-4xl md:text-6xl font-bold text-center shadow-text">
               Recent Updates
             </h1>
           </div>
         </div> 

      {/* Updates Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {updates.map((update) => (
            <Link href={`/recent-updates/${update.id}`} key={update.id} className="group">
              <div className="bg-blue-100 rounded-xl shadow-md p-6 transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-xl border border-green-800 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-green-600 font-semibold flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {update.date}
                    </span>
                    <FileText className="w-6 h-6 text-green-500" />
                  </div>
                  <h2 className="text-lg font-semibold text-green-800 group-hover:text-green-600 transition-colors duration-300 mb-3">
                    {update.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{update.summary}</p>
                </div>
                <div className="flex items-center justify-end mt-4">
                  <span className="text-green-600 group-hover:text-green-500 transition-colors duration-300 flex items-center">
                    Read more
                    <ChevronRight className="ml-1 w-5 h-5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}