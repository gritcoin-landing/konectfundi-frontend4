import { useState } from 'react';

export default function PaymentPage() {
  const [paid, setPaid] = useState(false);
  const [commission, setCommission] = useState(0);
  const [amount, setAmount] = useState('');

  const handlePayment = (e) => {
    e.preventDefault();
    const value = parseFloat(amount);
    if (isNaN(value)) return alert("Enter valid amount");
    const commissionValue = value * 0.07;
    setCommission(commissionValue.toFixed(2));
    setPaid(true);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Mock Mobile Payment</h2>
      <form onSubmit={handlePayment}>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        /><br />
        <button type="submit">Pay Now</button>
      </form>

      {paid && (
        <div style={{ marginTop: '1rem' }}>
          <p>✅ Payment Successful</p>
          <p>📉 Konectfundi Commission: <strong>{commission} TZS</strong></p>
          <p>🎉 Fundi will be paid the remaining amount after service completion.</p>
        </div>
      )}
    </div>
  );
}
