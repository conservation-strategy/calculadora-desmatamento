import { useState, useEffect } from 'react';

export default function Home() {
  return (
    <div style={{ backgroundColor: '#ffffff'}}>
      <DollarQuotation />
    </div>
  );
}


function DollarQuotation() {
  const [quotation, setQuotation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchQuotation() {
      try {
        const response = await fetch('/api/dollarQuotation');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('data', data);
        setQuotation(data);
      } catch (e) {
        setError('Failed to fetch dollar quotation');
      } finally {
        setLoading(false);
      }
    }
    console.log('RENDER')

    fetchQuotation();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!quotation) return <p>No quotation data available</p>;

  return (
    <div>
      <h2>Dollar Quotation</h2>
      <pre>{JSON.stringify(quotation, null, 2)}</pre>
    </div>
  );
}