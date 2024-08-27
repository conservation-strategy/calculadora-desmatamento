import data from '../../data/dados-municipio.json';

export default function handler(req, res) {
  const uniqueUFs = getUniqueUFs(data);
  res.status(200).json(uniqueUFs);
}

function getUniqueUFs(data) {
  const ufSet = new Set(data.map(entry => entry.UF));
  return Array.from(ufSet);
}