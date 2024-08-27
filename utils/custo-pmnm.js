import { vpl, fluxoDescontado, fluxoPeriodico5Anos, fluxoPeriodico5AnosDescontado, fluxoDescontadoComParcelaVariavel, fluxoPeriodico5AnosDescontadoComParcelaVariavel } from "./utils.js";
import { txDesconto, anos } from "./globals.js";


export const custoTotalPMNM = (
    hectareAfetadoComPeso,
    rentMadeira,
    rentProdutosNaoMadeireiros,
    legal
) => {
    
    // const precoDescontadoR$porHa = precoR$porM3 - custoOperacionalR$porHa;
        
    let entradasNaoMadeireiros = [];
    let entradasMadeireiros = [];
    if(legal) {
        for(let i=0; i<=anos; i++) {
            entradasNaoMadeireiros.push(rentProdutosNaoMadeireiros);
        }
        entradasMadeireiros = fluxoPeriodico5Anos(rentMadeira, anos);
    } else {
        // entradasNaoMadeireiros = fluxoDescontado(rentProdutosNaoMadeireiros, anos);
        entradasNaoMadeireiros = fluxoDescontadoComParcelaVariavel(rentProdutosNaoMadeireiros, anos, 1);
        // entradasMadeireiros = fluxoPeriodico5AnosDescontado(rentMadeira, anos);
        entradasMadeireiros = fluxoPeriodico5AnosDescontadoComParcelaVariavel(rentMadeira, anos, 1);
    }

    const _vpl_NM = vpl(entradasNaoMadeireiros, txDesconto);
    const _vpl_M = vpl(entradasMadeireiros, txDesconto);
    return [_vpl_NM*hectareAfetadoComPeso,  _vpl_M * hectareAfetadoComPeso]
}

// const rentNaoMadeiraAutazes = 72.23;
// const rentMadeiraAutazes = 55.82;

// const [nao_madeira, madeira] = custoTotalPMNM(1, rentMadeiraAutazes, rentNaoMadeiraAutazes, false);
// console.log('madeira', madeira, 'ñ madeira', nao_madeira)

// const entradas = fluxoPeriodico5Anos(7.3, 30);
// console.log('length', entradas.length);
// const _vpl = vpl(entradas, 0.03);
// console.log('vpl', _vpl);