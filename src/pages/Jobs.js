import React from "react";

function Jobs({ availableJobs, assignedJobs, assignJob, removeJob }) {
  return (
    <div>
      {/* Available Jobs */}
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Available Jobs</h2>
      <div className="space-y-4 mb-6">
        {availableJobs.length === 0 ? (
          <p className="text-gray-500">No jobs available right now.</p>
        ) : (
          availableJobs.map((job) => (
            <div key={job.id} className="p-4 border rounded shadow-sm bg-gray-50">
              <p className="font-medium">{job.name}</p>
              <p className="text-sm text-gray-600">{job.address}</p>
              <p className="text-sm text-gray-600">{job.rooms}</p>
              <p className="text-sm text-gray-600">Add-ons: {job.addons}</p>
              <p className="text-sm text-gray-600">
                {job.date} at {job.time}
              </p>
              <p className="text-sm font-semibold text-blue-600">${job.price}</p>
              <button
                onClick={() => assignJob(job.id)}
                className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Assign to Me
              </button>
            </div>
          ))
        )}
      </div>

      {/* Assigned Jobs */}
      <h2 className="text-xl font-semibold mb-4 text-gray-800">My Assigned Jobs</h2>
      <div className="space-y-4">
        {assignedJobs.length === 0 ? (
          <p className="text-gray-500">You have no assigned jobs.</p>
        ) : (
          assignedJobs.map((job) => (
            <div key={job.id} className="p-4 border rounded shadow-sm bg-green-50">
              <p className="font-medium">{job.name}</p>
              <p className="text-sm text-gray-600">{job.address}</p>
              <p className="text-sm text-gray-600">{job.rooms}</p>
              <p className="text-sm text-gray-600">Add-ons: {job.addons}</p>
              <p className="text-sm text-gray-600">
                {job.date} at {job.time}
              </p>
              <p className="text-sm font-semibold text-green-600">${job.price}</p>
              <button
                onClick={() => removeJob(job.id)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remove Job
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Jobs;
