export default async function handler(req, res) {
  console.log('revalidating...');
  try {
    const { secret } = req.query;

    if (secret !== process.env.REVALIDATION_SECRET) {
      return res.status(401).json({ message: 'Invalid secret' });
    }

    // Trigger a revalidation of the /api/dollarQuotation endpoint
    await res.revalidate('/api/dollarQuotation');

    return res.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}