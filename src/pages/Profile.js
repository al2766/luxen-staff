import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

function Profile({ profile }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    bankName: "",
    accountName: "",
    sortCode: "",
    accountNumber: "",
    availability: {
      Monday: { from: "", to: "" },
      Tuesday: { from: "", to: "" },
      Wednesday: { from: "", to: "" },
      Thursday: { from: "", to: "" },
      Friday: { from: "", to: "" },
      Saturday: { from: "", to: "" },
      Sunday: { from: "", to: "" },
    },
  });

  // Load existing data when profile is passed from App
  useEffect(() => {
    if (profile) {
      setFormData((prev) => ({
        ...prev,
        ...profile,
        availability: profile.availability || prev.availability, // keep default if missing
      }));
    }
  }, [profile]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvailabilityChange = (day, type, value) => {
    setFormData((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: { ...prev.availability[day], [type]: value },
      },
    }));
  };

  const handleSave = async () => {
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);

      // Merge profile data into Firestore
      await setDoc(userRef, formData, { merge: true });

      alert("Profile saved successfully ✅");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile ❌");
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Section */}
      <div className="p-4 border rounded bg-gray-50">
        <h2 className="font-semibold text-lg mb-2">Profile Details</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="tel"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <input
        type="date"
        placeholder="Date of Birth"
        value={formData.dateOfBirth || ""}
        onChange={(e) => handleChange("dateOfBirth", e.target.value)}
        className="w-full p-2 border rounded mb-2"
        />

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>

      {/* Bank Section */}
      <div className="p-4 border rounded bg-gray-50">
        <h2 className="font-semibold text-lg mb-2">Bank Details</h2>
        <input
          type="text"
          placeholder="Bank Name"
          value={formData.bankName}
          onChange={(e) => handleChange("bankName", e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="Account Holder Name"
          value={formData.accountName}
          onChange={(e) => handleChange("accountName", e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="Sort Code"
          value={formData.sortCode}
          onChange={(e) => handleChange("sortCode", e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="Account Number"
          value={formData.accountNumber}
          onChange={(e) => handleChange("accountNumber", e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>

      {/* Availability Section */}
      <div className="p-4 border rounded bg-gray-50">
        <h2 className="font-semibold text-lg mb-2">Availability</h2>
        {Object.keys(formData.availability).map((day) => (
          <div key={day} className="flex items-center space-x-2 mb-2">
            <span className="w-20">{day}</span>
            <input
              type="time"
              value={formData.availability[day].from}
              onChange={(e) =>
                handleAvailabilityChange(day, "from", e.target.value)
              }
              className="p-2 border rounded"
            />
            <span>-</span>
            <input
              type="time"
              value={formData.availability[day].to}
              onChange={(e) =>
                handleAvailabilityChange(day, "to", e.target.value)
              }
              className="p-2 border rounded"
            />
          </div>
        ))}
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>

      {/* Log Out */}
      <div className="text-right">
        <button
          onClick={() => signOut(auth)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Profile;
