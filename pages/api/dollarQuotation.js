
export default async function handler(req, res) {
  try {
    let data;
    let _fallback = false;
    try {
      console.log('Fetching primary API data...');
      data = await fetchDollarQuotation();

      if(data.data.value) {
        if(data.data.value.length === 0) {
          const _date = new Date();
          for(let i=0; i<2; i++) {
            _date.setDate(_date.getDate() - 1);
            console.log(`Fetching primary API data for date: ${_date}`);
            data = await fetchDollarQuotation(_date);
            if(data.data.value && data.data.value.length > 0) break
          }
        }
      }
      if(!data.data.value || data.data.value.length === 0) {
        _fallback = true;
        console.log('Primary API returned empty data, trying fallback API...');
        data = await fetchDollarQuotation(new Date(), _fallback);
      }
    } catch (error) {
      if(!_fallback) {
        console.log('Primary API returned error:', error.message);
        console.log('trying fallback API...')
        data = await fetchDollarQuotation(new Date(), true);
      } else {
        throw new Error('Fallback API failed:', error.message)
      }
    }
    console.log(data);
    
    const now = new Date();
    const spTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
    const nextUpdate = new Date(spTime);
    nextUpdate.setHours(13, 30, 0, 0);
    if (spTime >= nextUpdate) nextUpdate.setDate(nextUpdate.getDate() + 1);
    
    const maxAge = Math.floor((nextUpdate - spTime) / 1000);

    const response = data.fallback
      ? {
        fallback: data.fallback,
        value: data.data.response.rates.BRL,
        date: data.data.response.date
      }
      : {
        fallback: data.fallback,
        value: (data.data.value[0].cotacaoCompra + data.data.value[0].cotacaoVenda) / 2,
        date: data.data.value[0].dataHoraCotacao
      }


    res.setHeader('Cache-Control', `public, s-maxage=${maxAge}, stale-while-revalidate, stale-if-error`);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching dollar quotation:", error);
    res.setHeader('Cache-Control', 'public, max-age=60, stale-if-error=600');
    res.status(500).json({ error: 'Failed to fetch dollar quotation', message: error.message });
  }
}

async function fetchDollarQuotation(date=new Date(), fallback=false) {
  let apiUrl;

  if(fallback) {
    const baseUrl = 'https://api.currencybeacon.com/v1/latest';
    const queryParams = new URLSearchParams({
      'api_key': `${process.env.API_KEY}`,
      'base': 'USD',
      'symbols': 'BRL'
    });
    apiUrl = `${baseUrl}?${queryParams}`;
  } else {
    // const now = new Date();
    const formattedDate = date.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      timeZone: 'America/Sao_Paulo'
    }).split('/').join('-');

    const baseUrl = 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata';
    const endpoint = 'CotacaoDolarDia(dataCotacao=@dataCotacao)';
    const queryParams = new URLSearchParams({
      '@dataCotacao': `'${formattedDate}'`,
      '$top': '1',
      '$format': 'json',
      '$select': 'cotacaoCompra,cotacaoVenda,dataHoraCotacao'
    });

    apiUrl = `${baseUrl}/${endpoint}?${queryParams}`;
  }
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return {
    fallback,
    data: await response.json()
  };
}

// DEFAULT RESPONSE EXAMPLE
// {
//   "fallback": false,
//   "data": {
//     "@odata.context": "https://was-p.bcnet.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata$metadata#_CotacaoDolarDia(cotacaoCompra,cotacaoVenda,dataHoraCotacao)",
//     "value": [
//         {
//             "cotacaoCompra": 5.4231,
//             "cotacaoVenda": 5.4237,
//             "dataHoraCotacao": "2024-08-19 13:10:28.41"
//         }
//     ]
//   }
// }

//  FALLBACK RESPONSE EXAMPLE
// {
//   "fallback": true,
//   "data": {
//     "meta": {
//       "code": 200,
//       "disclaimer": "Usage subject to terms: https://currencybeacon.com/terms"
//     },
//     "response": {
//       "date": "2024-08-19T17:32:42Z",
//       "base": "USD",
//       "rates": {
//         "BRL": 5.39795639
//       }
//     },
//     "date": "2024-08-19T17:32:42Z",
//     "base": "USD",
//     "rates": {
//       "BRL": 5.39795639
//     }
//   }
// }