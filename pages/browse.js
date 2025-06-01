import { useEffect, useState } from 'react';

export default function BrowseFundis() {
  const [fundis, setFundis] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fundi`)
      .then(res => res.json())
      .then(data => setFundis(data));
  }, []);

  const filtered = fundis.filter(f => f.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Browse Fundis</h2>
      <input
        type="text"
        placeholder="Search by category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filtered.map(fundi => (
          <li key={fundi._id}>
            <h4>{fundi.name} - {fundi.category}</h4>
            <p>{fundi.description}</p>
            <p>Rating: {fundi.rating || 'Not rated yet'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
