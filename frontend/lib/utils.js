import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from 'axios';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/announcements`;


// // Fetch all announcements
// export const fetchAnnouncements = async (token) => {
//   const response = await axios.get(`${API_URL}/`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data;
// };

export const fetchAnnouncements = async (token) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/announcements`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching announcements:', error);
    throw error;
  }
};

// Add a new announcement
export const addAnnouncement = async (data, token) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/announcements/add`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Delete an announcement
export const deleteAnnouncement = async (id, token) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
