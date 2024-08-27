import data from '../../data/dados-municipio.json';

export default function handler(req, res) {
  const { uf } = req.query;

  if (!uf) {
    return res.status(400).json({ error: 'UF parameter is required' });
  }

  const filteredMunicipios = data
    .filter(entry => entry.UF === uf)
    .map(entry => entry.Município);

  res.status(200).json(filteredMunicipios);
}