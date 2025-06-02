import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div>
      <header style={{ background: '#007b5e', color: 'white', padding: '1rem' }}>
        <h1>Konectfundi</h1>
        <nav>
          <Link href="/">Home</Link> |{' '}
          <Link href="/book-service">Book Fundi</Link> |{' '}
          <Link href="/payment">Payment</Link> |{' '}
          <Link href="/fundi">Fundi Dashboard</Link> |{' '}
          <Link href="/admin">Admin</Link> |{' '}
          <Link href="/login">Login</Link>
        </nav>
      </header>
      <main style={{ padding: '1rem' }}>
        {children}
      </main>
    </div>
  );
}
