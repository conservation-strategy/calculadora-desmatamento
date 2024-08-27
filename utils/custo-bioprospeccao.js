import { vpl, fluxoDescontadoComParcelaVariavel } from "./utils.js";
import { txDesconto, anos } from "./globals.js";

export function custoTotalBioprospeccao (
    hectareAfetadoComPeso,
    // valorDeImpacto,
    usoPosteriorDoSolo,
    legal
) {
    const custoPorHaBRL = 87;

    let entradas = [];
    const prcl = 
        usoPosteriorDoSolo === 'agricultura' ? .29
        : usoPosteriorDoSolo === 'pecuária' ? .22
        : undefined
    if(!prcl) throw new Error("invalid input: usoPosteriorDoSolo");

    if(legal) {
        for(let i=0; i<=anos; i++) {
            entradas.push(custoPorHaBRL * prcl);
        }
    } else {
        entradas = fluxoDescontadoComParcelaVariavel(custoPorHaBRL, anos, prcl)
    }
    // console.log(entradas);
    const _vpl = vpl(entradas, txDesconto);
    // console.log('vpl', _vpl);
    return  _vpl * hectareAfetadoComPeso;
}

// const r = custoTotalBioprospeccao(1, 'conservador', 'agricultura', true);
// console.log(r);

