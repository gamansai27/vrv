import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { AuthProvider } from '../context/AuthContext';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const metadata = {
  title: "Sheena Seeds",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className="bg-white">
        <AuthProvider>
        <Navbar/>
        <ToastContainer/>
        {children}
        <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}