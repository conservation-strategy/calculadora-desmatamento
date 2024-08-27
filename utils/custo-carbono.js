import { vpl, fluxoDescontadoComParcelaVariavel } from "./utils.js";
import { txDesconto } from "./globals.js";

// const carbonoPorHaPastagem = 16.2;
const custoCarbonoPorCo2USD = 15;
const anos = 30;
const imposto = 0.3; // imposto, certificação e auditoria

export function custoTotalCarbono (
    hectareAfetadoComPeso,
    carbonoporHaVegetaçãoNativaPrimáriaAmazonia,
    usoPosteriorDoSolo,
    legal,
    txCambio
) {
    const carbonoPorHaPastagemOuAgricultura = 
        usoPosteriorDoSolo === 'agricultura' ? 1.65 
        : usoPosteriorDoSolo === 'pecuária' ? 16.2 
        : undefined;
    if(!carbonoPorHaPastagemOuAgricultura) throw new Error('invalid argument: usoPosteriorDoSolo');
    const saldoCarbonoPorHa = (carbonoporHaVegetaçãoNativaPrimáriaAmazonia - carbonoPorHaPastagemOuAgricultura) / 30;
    // console.log('qtde carbono', saldoCarbonoPorHa)
    let entradas = [];
    let prcl = 
        usoPosteriorDoSolo === 'agricultura' ? .97
        : usoPosteriorDoSolo === 'pecuária' ? .93
        : undefined;
    if(!prcl) throw new Error('invalid argument: usoPosteriorDoSolo');

    if(legal) {
        for(let i=0; i<=anos; i++) {
            entradas.push(saldoCarbonoPorHa * custoCarbonoPorCo2USD * prcl);
        }
    } else {
        entradas = fluxoDescontadoComParcelaVariavel(saldoCarbonoPorHa * custoCarbonoPorCo2USD, anos, prcl );
    }
    // console.log('entradas', entradas)
    const _vpl = vpl(entradas, txDesconto)
    // console.log('vpl', _vpl)
    return _vpl * txCambio * (1 - imposto) * hectareAfetadoComPeso;
}

// const v = custoTotalCarbono(1, 392, 'pecuária', true);
// console.log(v);