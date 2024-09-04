import { dadosMediosMun } from "./globals.js";

export const fluxoPeriodico5Anos = (fluxo, periodo) => {
    if(typeof fluxo !== 'number' || typeof periodo !== 'number')
        throw new Error('wrong type input');
    const parcelas = [0, fluxo];
    for(let i=2; i<=periodo; i++) {
        if((i - 1) % 5 === 0) {
            parcelas.push(fluxo);
        } else {
            parcelas.push(0);
        }
    }
    return parcelas;
}


export const fluxoDescontado = (fluxo, periodo) => {
    if(typeof fluxo !== 'number' || typeof periodo !== 'number')
        throw new Error('wrong type input');
    const parcelas = [];
    for (let i=0; i<=periodo; i++) {
        parcelas.push(fluxo * (1 - (1/37.5)*i))
    }
    return parcelas;
}
// const res = fluxoDescontado(1, 30);
// console.log(res);

export const fluxoDescontadoComParcelaVariavel = (fluxo, periodo, primeiraParcela) => {
    if(typeof fluxo !== 'number' || typeof periodo !== 'number' || typeof primeiraParcela !== 'number')
        throw new Error('wrong type input');
    if(primeiraParcela > 1) throw new Error('input primeiraParcela must be <= 1');
    const parcelas = [];
    for(let i=0; i<=periodo; i++) {
        parcelas.push(fluxo * (primeiraParcela - (primeiraParcela/periodo)*i))
    }
    return parcelas
}
// const r = fluxoDescontadoComParcelaVariavel(1, 30, 1);
// console.log(r);

export const fluxoPeriodico5AnosDescontado = (fluxo, periodo) => {
    if(typeof fluxo !== 'number' || typeof periodo !== 'number')
        throw new Error('wrong type input');
    const parcelas = [0, fluxo * (1 - (1/37.5))];
    for(let i=2; i<=periodo; i++) {
        if((i - 1) % 5 === 0) {
            parcelas.push(fluxo * (1 - (1/37.5)*i));
        } else {
            parcelas.push(0);
        }
    }
    return parcelas;
}

export const fluxoPeriodico5AnosDescontadoComParcelaVariavel = (fluxo, periodo, primeiraParcela) => {
    if(typeof fluxo !== 'number' || typeof periodo !== 'number' || typeof primeiraParcela !== 'number')
        throw new Error('wrong type input');
    if(primeiraParcela > 1) throw new Error('input primeiraParcela must be <= 1');
    const parcelas = [0, fluxo*(primeiraParcela - primeiraParcela/periodo)]
    for(let i=2; i<=periodo; i++) {
        if((i - 1) % 5 === 0) {
            parcelas.push(fluxo*(primeiraParcela - (primeiraParcela/periodo)*i));
        } else {
            parcelas.push(0);
        }
    }
    return parcelas;
}
// const r = fluxoPeriodico5AnosDescontadoComParcelaVariavel(1, 30, 1);
// console.log(r);


export const vpl = (entradas, txDesconto) => {
    if(!entradas.length || typeof txDesconto !== 'number')
        throw new Error('wrong type input');
    let v = 0;
    for(let i=0; i<entradas.length; i++) {
        v += entradas[i]/(1+txDesconto)**i;
    }
    return v;
}

export const PMT = (rate, nper, pv, fv, type) => {
    /*
     * rate   - interest rate per month
     * nper   - number of periods (months)
     * pv   - present value
     * fv   - future value
     * type - when the payments are due:
     *        0: end of the period, e.g. end of month (default)
     *        1: beginning of period
     */
    let pmt, pvif;

    fv || (fv = 0);
    type || (type = 0);

    if (rate === 0)
      return -(pv + fv) / nper;

    pvif = Math.pow(1 + rate, nper);
    pmt = - rate * (pv * pvif + fv) / (pvif - 1);

    if (type === 1)
      pmt /= (1 + rate);
    return pmt;
}

export const getRiquezaEspeciesMedia = (uf) => {
    return (
        uf === 'RO' ? 33
        : uf === 'AC' ? 125
        : uf === 'AM' ? 93
        : uf === 'RR' ? 92
        : uf === 'PA' ? 40
        : uf === 'AP' ? 117
        : uf === 'TO' ? 11
        : uf === 'MA' ? 20
        : uf === 'MT' ? 89
        : undefined
    )
}

export function getUFList(data) {
    const ufSet = new Set(data.map(entry => entry.UF));
    return Array.from(ufSet).sort();
}

export function getMunicipioList(data, uf) {
    return data
    .filter(entry => entry.UF === uf)
    .map(entry => entry.Município).sort();
}

export function getDadosMediosMun() {
    return dadosMediosMun
}

export function formatCostNumber(number) {
    // Round to 2 decimal places
    let roundedNumber = Math.round(number * 100) / 100;

    // Convert to string and split into integer and decimal parts
    let [integerPart, decimalPart = ''] = roundedNumber.toString().split('.');

    // Add thousand separators to integer part
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Ensure decimal part has 2 digits
    decimalPart = decimalPart.padEnd(2, '0');

    // Combine parts with comma as decimal separator
    // return `${integerPart}.${decimalPart}`;
    return `${integerPart}`;
}

export function formatCurrencyNoDecimals(currency, number) {
    const rounded = Math.round(number);
    const formatted = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${currency} ${formatted}`;
}

export function formatDate(locale, website) {
    const date = new Date(Date.now());
    
    if (locale === 'pt-BR') {
      const options = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
      const formatter = new Intl.DateTimeFormat('pt-BR', options);
      const parts = formatter.formatToParts(date);
      
      const formattedDate = parts.map(part => {
        if (part.type === 'month') return part.value.charAt(0).toUpperCase() + part.value.slice(1);
        if (part.type === 'literal' && part.value === ':') return part.value;
        return part.value;
      }).join('');
  
      return `${formattedDate} | ${website}`;
    } else {
      const options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      const formattedDate = formatter.format(date);
      
      return `${formattedDate}  |  ${website}`;
    }
  }
  
  export function formatDateToBrazilianStandard(date) {
    // Ensure the input is a valid Date object
    const inputDate = new Date(date);
    
    // Check if the date is valid
    if (isNaN(inputDate.getTime())) {
      return 'Invalid Date';
    }
  
    // Get day, month, and year
    const day = inputDate.getDate().toString().padStart(2, '0');
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
    const year = inputDate.getFullYear();
  
    // Return the formatted date
    return `${day}/${month}/${year}`;
  }