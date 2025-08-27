// src/components/Auth.js
import React, { useState } from "react";
import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Auth({ onAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
const [dateOfBirth, setDateOfBirth] = useState("");


  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save staff profile in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: `${firstName} ${lastName}`.trim(), // ✅ Save as full name
        lastName,
        phone,
        email,
        dateOfBirth,
        createdAt: new Date(),
      });

      onAuth();
    } catch (err) {
      alert(err.message);
    }
  };

  const logIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onAuth();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md transition-all">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
        {isSignUp ? "Create Account" : "Welcome Back"}
      </h1>
      <p className="text-center text-gray-500 mb-6">
        {isSignUp
          ? "Sign up to join the staff portal"
          : "Log in to access your account"}
      </p>

      {/* Show extra fields only in Sign Up */}
      {isSignUp && (
        <>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full mb-3 p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full mb-3 p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full mb-3 p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="w-full mb-3 p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </>
      )}

      {/* Always show Email + Password */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-3 p-2 border rounded focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-4 p-2 border rounded focus:ring-2 focus:ring-blue-500"
      />

      {/* Submit button */}
      <button
        onClick={isSignUp ? signUp : logIn}
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        {isSignUp ? "Sign Up" : "Log In"}
      </button>

      {/* Toggle link */}
      <p className="mt-6 text-center text-gray-600">
        {isSignUp ? "Already have an account?" : "Don’t have an account?"}{" "}
        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-blue-600 font-medium hover:underline"
        >
          {isSignUp ? "Log In" : "Sign Up"}
        </button>
      </p>
    </div>
  </div>
);

}
