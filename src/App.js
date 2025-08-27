import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, updateDoc, collection, onSnapshot } from "firebase/firestore";
import Auth from "./Auth";
import Home from "./pages/Home"; // Import the Home component

function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);

  // Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch profile + jobs
  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setProfile(docSnap.data());
    };
    fetchProfile();

    const unsubscribeJobs = onSnapshot(collection(db, "jobs"), (snapshot) => {
      setJobs(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribeJobs();
  }, [user]);

  // Assign/remove jobs
  const assignJob = async (jobId) => {
    const jobRef = doc(db, "jobs", jobId);
    await updateDoc(jobRef, { userId: user.uid });
  };

  const removeJob = async (jobId) => {
    const jobRef = doc(db, "jobs", jobId);
    await updateDoc(jobRef, { userId: null });
  };

  // Show auth screen if not logged in
  if (!user) {
    return <Auth onAuth={() => {}} />;
  }

  // Filter jobs for the Home component
  const availableJobs = jobs.filter((job) => !job.userId);
  const assignedJobs = jobs.filter((job) => job.userId === user.uid);

  // Show Home component when logged in
  return (
    <Home
      profile={profile}
      availableJobs={availableJobs}
      assignedJobs={assignedJobs}
      assignJob={assignJob}
      removeJob={removeJob}
    />
  );
}

export default App;