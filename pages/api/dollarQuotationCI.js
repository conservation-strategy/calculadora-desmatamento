export default async function handler(req, res) {
    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    try {
      console.log('Fetching quotation from CI...');
      const rawUrl = 'https://raw.githubusercontent.com/conservation-strategy/CI-calculadora-desmatamento/main/api/success.json';
  
      const response = await fetch(rawUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();

      const r = {
        fallback: false,
        value: (data.value[0].cotacaoCompra + data.value[0].cotacaoVenda) / 2,
        date: data.value[0].dataHoraCotacao
      }
      
      res.status(200).json(r);
    } catch (error) {
      console.error('Error fetching CI data:', error);
      res.status(500).json({ message: 'Error fetching CI data' });
    }
  }