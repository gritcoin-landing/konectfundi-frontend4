import { useEffect, useState } from 'react';

export default function FundiDashboard() {
  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return setError('Not logged in');

    // Fetch fundi profile
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fundi/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(() => setError('Failed to load profile'));

    // Fetch assigned jobs
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/bookings/fundi`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(() => setError('Failed to load jobs'));
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Fundi Dashboard</h2>
      {profile ? (
        <div>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Skills:</strong> {profile.skills?.join(', ')}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}

      <h3>Assigned Jobs</h3>
      <ul>
        {jobs.length > 0 ? jobs.map((job, i) => (
          <li key={i}>
            {job.description} - {job.location} ({job.date})
          </li>
        )) : <p>No jobs yet.</p>}
      </ul>
    </div>
  );
}
