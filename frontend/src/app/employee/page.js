"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from 'axios';
import {toast} from 'react-toastify';

export default function EmployeeLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalStep, setModalStep] = useState(1);
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordCriteria, setPasswordCriteria] = useState({
        length: false,
        uppercase: false,
        number: false,
        specialChar: false,
        lowercase: false,
    });
    const [otpTimer, setOtpTimer] = useState(60);
    const { login } = useAuth();

    useEffect(() => {
        let timer;
        if (modalStep === 2 && otpTimer > 0) {
            timer = setInterval(() => {
                setOtpTimer((prev) => prev - 1);
            }, 1000);
        } else if (otpTimer === 0) {
            alert("OTP expired. Please request a new OTP.");
            setModalStep(1);
            setOtp("");
            setOtpTimer(60);
        }
        return () => clearInterval(timer);
    }, [modalStep, otpTimer]);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (username && password) {
            try {
                await login({ username, password, rememberMe });
            } catch (error) {
                console.error("Login error:", error.message);
                toast("Login failed. Please check your credentials.");
            }
        } else {
            toast("Please enter both username and password.");
        }
    };

    const openForgotPasswordModal = () => {
        setIsModalOpen(true);
        setModalStep(1);
    };

    const closeForgotPasswordModal = () => {
        setIsModalOpen(false);
        setModalStep(1);
        setUsername("");
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
        setPasswordStrength(0);
        setPasswordCriteria({
            length: false,
            uppercase: false,
            number: false,
            specialChar: false,
            lowercase: false,
        });
        setOtpTimer(60);
    };

    const handleSendUsername = async () => {
        if (username) {
            try {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/email/sendotp`,
                    { username },
                    { withCredentials: true }
                );
                if (response.status !== 200) {
                    return alert("Error sending OTP. Please try again.");
                }
                setModalStep(2);
                setOtpTimer(60);
            } catch (error) {
                alert("Error sending OTP. Please try again.");
            }
        } else {
            alert("Please enter your username.");
        }
    };

    const handleVerifyOtp = async () => {
        if (otp) {
            try {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/user/verifyotp`,
                    { username, OTP: otp },
                    { withCredentials: true }
                );
                if (response.status !== 200) {
                    return alert("Invalid OTP");
                }
                setModalStep(3); 
            } catch (error) {
                alert("Invalid OTP. Please try again.");
            }
        } else {
            alert("Please enter the OTP.");
        }
    };

    const checkPasswordStrength = (password) => {
        let strength = 0;
        const criteria = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        };

        strength = Object.values(criteria).filter(value => value).length;
        
        setPasswordStrength(strength);
        setPasswordCriteria(criteria);
    };

    const handleResetPassword = async () => {
        if (newPassword && confirmPassword) {
            if (newPassword !== confirmPassword) {
                return alert("Passwords do not match. Please re-enter.");
            }
            if (passwordStrength < 4) {
                return alert("Password is not strong enough.");
            }
            try {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/user/resetpassword`,
                    { username, newpassword: newPassword },
                    { withCredentials: true }
                );
                if (response.status !== 200) {
                    return alert("Error resetting password. Please try again.");
                }
                alert("Password reset successfully.");
                closeForgotPasswordModal();
            } catch (error) {
                alert("Error resetting password. Please try again.");
            }
        } else {
            alert("Please enter both password fields.");
        }
    };

    const modalStyles = "w-full max-w-xs md:max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-lg";

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-green-100">
            <div className={modalStyles}>
                <h2 className="text-lg md:text-3xl font-bold text-center text-blue-700">Employee Login</h2>
                
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition duration-300 text-black"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="text-black w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition duration-300"
                            required
                        />
                    </div>
                    
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="mr-2 text-blue-500 focus:ring-blue-500"
                        />
                        <label className="text-gray-700">Remember me</label>
                    </div>

                    <div className="text-right">
                        <button type="button" onClick={openForgotPasswordModal} className="text-blue-600 hover:text-blue-700 transition duration-300">
                            Forgot password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 mt-6 text-base md:text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-lg hover:from-green-500 hover:to-blue-500 transition duration-300 shadow-md"
                    >
                        Login
                    </button>
                </form>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className={modalStyles}>
                        {modalStep === 1 && (
                            <>
                                <h2 className="text-lg text-black font-semibold mb-4">Enter your Username</h2>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full p-3 border border-gray-300 text-black rounded-lg mb-4"
                                    placeholder="Username"
                                />
                                <div className="flex justify-end space-x-2 mt-4">
                                    <button
                                        onClick={closeForgotPasswordModal}
                                        className="py-2 px-4 bg-gray-300 text-black rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSendUsername}
                                        className="py-2 px-4 bg-blue-600 text-white rounded-lg"
                                    >
                                        Send
                                    </button>
                                </div>
                            </>
                        )}
                        {modalStep === 2 && (
                            <>
                                <h2 className="text-lg font-semibold mb-4">Enter OTP</h2>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full p-3 border border-gray-300 text-black rounded-lg mb-4"
                                    placeholder="Enter OTP"
                                />
                                <p className="text-sm text-gray-500">OTP expires in: {otpTimer} seconds</p>
                                <div className="flex justify-end space-x-2 mt-4">
                                    <button
                                        onClick={closeForgotPasswordModal}
                                        className="py-2 px-4 bg-gray-300 text-black rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleVerifyOtp}
                                        className="py-2 px-4 bg-blue-600 text-white rounded-lg"
                                    >
                                        Verify OTP
                                    </button>
                                </div>
                            </>
                        )}
                        {modalStep === 3 && (
                            <>
                                <h2 className="text-lg text-black font-semibold mb-4">Reset Password</h2>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => {
                                        setNewPassword(e.target.value);
                                        checkPasswordStrength(e.target.value);
                                    }}
                                    className="w-full p-3 border border-gray-300 text-black rounded-lg mb-4"
                                    placeholder="New Password"
                                />
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full p-3 border border-gray-300 text-black rounded-lg mb-4"
                                    placeholder="Confirm New Password"
                                />
                                
                                {/* Password strength bar */}
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                                    <div
                                        className={`h-2.5 rounded-full ${
                                            passwordStrength === 1
                                                ? "bg-red-500"
                                                : passwordStrength === 2
                                                ? "bg-yellow-500"
                                                : passwordStrength >= 3
                                                ? "bg-green-500"
                                                : ""
                                        }`}
                                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                                    ></div>
                                </div>

                                {/* Password strength criteria checklist */}
                                <p className="text-sm font-medium text-gray-600">A strong password must contain:</p>
                                <ul className="text-sm space-y-1">
                                    <li className={`${passwordCriteria.length ? "text-green-600" : "text-red-600"}`}>
                                        {passwordCriteria.length ? "✓" : "✗"} At least 8 characters
                                    </li>
                                    <li className={`${passwordCriteria.uppercase ? "text-green-600" : "text-red-600"}`}>
                                        {passwordCriteria.uppercase ? "✓" : "✗"} At least 1 uppercase letter
                                    </li>
                                    <li className={`${passwordCriteria.lowercase ? "text-green-600" : "text-red-600"}`}>
                                        {passwordCriteria.lowercase ? "✓" : "✗"} At least 1 lowercase letter
                                    </li>
                                    <li className={`${passwordCriteria.number ? "text-green-600" : "text-red-600"}`}>
                                        {passwordCriteria.number ? "✓" : "✗"} At least 1 number
                                    </li>
                                    <li className={`${passwordCriteria.specialChar ? "text-green-600" : "text-red-600"}`}>
                                        {passwordCriteria.specialChar ? "✓" : "✗"} At least 1 special character
                                    </li>
                                </ul>

                                <div className="flex justify-end space-x-2 mt-4">
                                    <button
                                        onClick={closeForgotPasswordModal}
                                        className="py-2 px-4 bg-gray-300 text-black rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleResetPassword}
                                        className="py-2 px-4 bg-blue-600 text-white rounded-lg"
                                        disabled={passwordStrength < 5}
                                    >
                                        Reset Password
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}