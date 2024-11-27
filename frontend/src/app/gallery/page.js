"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";

const featuredVideos = [
  {
    id: 1,
    type: "Theme",
    title: "Sheena Seeds Theme 2023",
    src: "https://drive.google.com/file/d/1iKJBBTjsShoKz7RPYeMpCPppGBi3Q8Tx/view",
    thumbnail: "/placeholder.svg?height=720&width=1280",
  },
  {
    id: 2,
    type: "Theme1",
    title: "Neon 9 - Watermelon Trailer 2023",
    src: "https://example.com/theme2023.mp4",
    thumbnail: "/placeholder.svg?height=720&width=1280",
  },
];

const videos = [
  {
    id: 3,
    type: "Trailer",
    title: "Sheena Seeds Trailer 2022",
    src: "https://example.com/video1.mp4",
    thumbnail: "/placeholder.svg?height=360&width=640",
  },
  {
    id: 4,
    type: "Documentary",
    title: "Hybrid Maize Documentary - Sheena Seeds",
    src: "https://example.com/video2.mp4",
    thumbnail: "/placeholder.svg?height=360&width=640",
  },
];

export default function Gallery() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[50vh]">
        <Image
          src="/gallery.jpg"
          fill
          alt="Background image"
          style={{ objectFit: "cover" }}
          className="brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
            Sheena Seeds Gallery
          </h1>
        </div>
      </div>

      {/* Featured Videos */}
      <div className="max-w-7xl mx-auto px-4 py-5 bg-white">
        <h2 className="text-3xl font-bold text-green-800 mt-7 mb-3 text-center">
          Featured Videos
        </h2>
        <div className="grid grid-cols-1 gap-8">
          {featuredVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative aspect-video">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <button
                  onClick={() => setSelectedVideo(video)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity hover:bg-opacity-75"
                >
                  <Play className="w-24 h-24 text-white" />
                </button>
              </div>
              <div className="p-4">
                <span className="text-sm font-semibold text-green-600">
                  {video.type}
                </span>
                <h3 className="text-lg font-semibold mt-1">{video.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* More Videos */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-green-800 mb-8">More Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative aspect-video">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <button
                  onClick={() => setSelectedVideo(video)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity hover:bg-opacity-75"
                >
                  <Play className="w-16 h-16 text-white" />
                </button>
              </div>
              <div className="p-4">
                <span className="text-sm font-semibold text-green-600">
                  {video.type}
                </span>
                <h3 className="text-lg font-semibold mt-1">{video.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{selectedVideo.title}</h3>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="relative aspect-video">
              <video
                src={selectedVideo.src}
                controls
                className="absolute inset-0 w-full h-full"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}