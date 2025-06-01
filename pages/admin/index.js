import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [fundis, setFundis] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return setError('Admin not logged in');

    // Fetch users
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(() => setError('Failed to load users'));

    // Fetch fundis
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fundi`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setFundis(data))
      .catch(() => setError('Failed to load fundis'));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Admin Dashboard</h2>
      {error && <p>{error}</p>}

      <h3>All Users</h3>
      <ul>
        {users.map((user, i) => (
          <li key={i}>{user.name} - {user.email}</li>
        ))}
      </ul>

      <h3>All Fundis</h3>
      <ul>
        {fundis.map((fundi, i) => (
          <li key={i}>{fundi.name} - {fundi.phone}</li>
        ))}
      </ul>
    </div>
  );
}
