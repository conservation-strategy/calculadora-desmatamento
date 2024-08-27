import data from '../../data/dados-municipio.json';

export default function handler(req, res) {
  const { municipio } = req.query;

  if (!municipio) {
    return res.status(400).json({ error: 'Municipio parameter is required' });
  }

  const entry = data.find(entry => entry.Município === municipio);

  if (!entry) {
    return res.status(404).json({ error: 'Municipio not found' });
  }

  res.status(200).json(entry);
}