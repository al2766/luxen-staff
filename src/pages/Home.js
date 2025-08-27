import React, { useState } from "react";
import Jobs from "./Jobs";
import Profile from "./Profile";

function Home({ profile, availableJobs, assignedJobs, assignJob, removeJob }) {
  const [activeTab, setActiveTab] = useState("jobs");

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow">
        <h1 className="text-2xl font-bold">Welcome, {profile?.name || "User"}</h1>
      </header>

      {/* Tabs */}
      <div className="flex bg-blue-500 text-white font-medium">
        <button
          onClick={() => setActiveTab("jobs")}
          className={`flex-1 py-3 text-center transition ${
            activeTab === "jobs" ? "bg-blue-700" : "hover:bg-blue-600"
          }`}
        >
          Jobs
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex-1 py-3 text-center transition ${
            activeTab === "profile" ? "bg-blue-700" : "hover:bg-blue-600"
          }`}
        >
          Profile
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === "jobs" && (
          <Jobs
            availableJobs={availableJobs}
            assignedJobs={assignedJobs}
            assignJob={assignJob}
            removeJob={removeJob}
          />
        )}
        {activeTab === "profile" && <Profile profile={profile} />}
      </div>
    </div>
  );
}

export default Home;
