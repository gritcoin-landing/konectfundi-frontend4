import { useRouter } from 'next/router';
import { useState } from 'react';

export default function BookService() {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    date: '',
    description: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        fundiId: id
      })
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('Booking successful! Please confirm payment.');
    } else {
      setMessage(data.message || 'Booking failed.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Book Fundi</h2>
      <form onSubmit={handleBooking}>
        <input name="name" placeholder="Your name" onChange={handleChange} /><br />
        <input name="phone" placeholder="Phone number" onChange={handleChange} /><br />
        <input name="location" placeholder="Location" onChange={handleChange} /><br />
        <input name="date" type="date" onChange={handleChange} /><br />
        <textarea name="description" placeholder="Describe the service needed" onChange={handleChange} /><br />
        <button type="submit">Book Now</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
