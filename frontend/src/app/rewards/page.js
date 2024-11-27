"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";

export default function Home() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [registerForm, setRegisterForm] = useState({
    fullName: "",
    firmName: "",
    phoneNumber: "",
    email: "",
    dateOfBirth: "",
    address: "",
    loyaltyCardNumber: "",
    password: "",
  });

  const [loginForm, setLoginForm] = useState({
    emailOrPhone: "",
    password: "",
  });

  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const isRegisterFormValid = Object.values(registerForm).every(
    (value) => value.trim() !== ""
  );

  const isLoginFormValid =
    loginForm.emailOrPhone.trim() !== "" && loginForm.password.trim() !== "";

  const closeModal = () => {
    setShowRegisterModal(false);
    setShowLoginModal(false);
  };

  // Animation variants for the modal
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start bg-cover bg-center"
      style={{
        backgroundImage: "url('/loyalty.jpeg')",
      }}
    >
      <h1 className="mt-5 px-4 py-20 text-5xl font-extrabold text-yellow-200">
        Claim Loyalty Rewards
      </h1>
      <div className="flex flex-col space-y-6 mt-8">
        <button
          onClick={() => setShowRegisterModal(true)}
          className="px-12 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition relative group w-64 text-center"
        >
          <span className="group-hover:translate-x-[-10px] group-hover:mr-4 transition-all">
            Register
          </span>
          <span className="absolute right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
            →
          </span>
        </button>
        <button
          onClick={() => setShowLoginModal(true)}
          className="px-12 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition relative group w-64 text-center"
        >
          <span className="group-hover:translate-x-[-10px] group-hover:mr-4 transition-all">
            Login
          </span>
          <span className="absolute right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
            →
          </span>
        </button>
      </div>

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <motion.div
            className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-xl relative"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-black transition"
            >
              <IoClose size={24} />
            </button>
            <h2 className="text-xl font-bold mb-4 text-yellow-700 text-center">Let's get you enrolled</h2>
            <form>
              <div className="flex space-x-4 mb-4">
                <div className="w-1/2">
                  <label className="block text-gray-700 font-semibold mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={registerForm.fullName}
                    onChange={handleRegisterInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-opacity-75 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700 font-semibold mb-1">
                    Firm/Store Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firmName"
                    value={registerForm.firmName}
                    onChange={handleRegisterInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-opacity-75 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  />
                </div>
              </div>
              <div className="flex space-x-4 mb-4">
                <div className="w-1/2">
                  <label className="block text-gray-700 font-semibold mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={registerForm.phoneNumber}
                    onChange={handleRegisterInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-opacity-75 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700 font-semibold mb-1">
                    Email ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={registerForm.email}
                    onChange={handleRegisterInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-opacity-75 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  />
                </div>
              </div>
              {[
                { label: "Date Of Birth", name: "dateOfBirth", type: "date" },
                { label: "Address", name: "address", type: "text" },
                { label: "Loyalty Card Number", name: "loyaltyCardNumber", type: "text" },
                { label: "Password", name: "password", type: "password" },
              ].map(({ label, name, type }) => (
                <div key={name} className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-1">
                    {label} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={registerForm[name]}
                    onChange={handleRegisterInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-opacity-75 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  if (isRegisterFormValid) {
                    alert("Registered successfully!");
                    closeModal();
                  } else {
                    alert("Please fill in all fields.");
                  }
                }}
                className={`w-full py-3 mt-4 font-bold text-white rounded-lg ${
                  isRegisterFormValid
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Submit
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <motion.div
            className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md relative"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-black transition"
            >
              <IoClose size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center text-black">Login</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-1">
                  Email ID / Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="emailOrPhone"
                  value={loginForm.emailOrPhone}
                  onChange={handleLoginInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-opacity-75 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>
              <div className="mb-4 relative">
                <label className="block text-gray-700 font-semibold mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  value={loginForm.password}
                  onChange={handleLoginInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-opacity-75 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
                <span
                  onClick={() => setPasswordVisible((prev) => !prev)}
                  className="absolute right-4 top-10 cursor-pointer text-gray-600"
                >
                  {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (isLoginFormValid) {
                    alert("Logged in successfully!");
                    closeModal();
                  } else {
                    alert("Please fill in all fields.");
                  }
                }}
                className={`w-full py-3 mt-4 font-bold text-white rounded-lg ${
                  isLoginFormValid
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Login
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}