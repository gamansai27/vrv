"use client";
import { MessageCircle, LogOut, Edit, User2Icon } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const [userObj, setUserObj] = useState(null);
  const { logout, user } = useAuth();

  useEffect(() => {
    if (user) {
      setUserObj(user);
      console.log("User object:", user);
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 to-blue-200 flex items-center justify-center p-4">
      <div className="max-w-3xl mx-auto rounded-3xl relative overflow-visible">
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden px-5">
          <div className="flex justify-between p-6">
            <button className="bg-teal-100 hover:bg-teal-200 text-teal-700 rounded-full px-4 py-2 flex items-center gap-2">
              Edit Details
              <Edit size={20} />
            </button>
            <button
              className="bg-red-100 hover:bg-red-200 text-red-500 rounded-full px-4 py-2 flex items-center gap-2"
              onClick={handleLogout}
            >
              Logout
              <LogOut size={20} />
            </button>
          </div>
          <div className="flex justify-center">
            <div className="bg-slate-50 text-black w-32 h-32 rounded-full border-4 border-slate-50 overflow-hidden flex justify-center items-center shadow-md">
              {/* Placeholder for user profile image */}
              <User2Icon size={75} />
            </div>
          </div>
          {/* Profile Content */}
          <div className="pb-4 text-center px-4">
            {userObj ? (
              <>
                <h1 className="text-xl md:text-2xl font-semibold text-gray-700 mb-1">{userObj.name}</h1>
                <div className="space-y-2 mb-8 text-base font-light text-start">
                  <p className="text-slate-500"><span className="font-semibold text-slate-600">Email Address:</span> {userObj.username}</p>
                  <p className="text-slate-500"><span className="font-semibold text-slate-600">Phone Number:</span> {userObj.phonenumber}</p>
                  <p className="text-slate-500"><span className="font-semibold text-slate-600">Employee Role:</span> {userObj.role.toUpperCase()}</p>
                </div>
              </>
            ) : (
              <p>Loading user data...</p> // Or any other loading message or spinner
            )}
            <div className="w-full flex justify-center">
              <button className="bg-blue-400 hover:bg-blue-500 text-white rounded-full px-4 py-2 flex items-center gap-2 self-center">
                <MessageCircle size={20} />
                Message Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
