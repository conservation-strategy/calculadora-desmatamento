import { vpl, fluxoDescontadoComParcelaVariavel } from "./utils.js";
import { pibPerCapitaBrasil2024Dolar, txDesconto, anos } from "./globals.js";

export function custoTotalAssoreamento (
    hectareAfetadoComPeso,
    usoPosteriorDoSolo,
    legal,
    txCambio
) {
    const custoPorHaBRL = txCambio*(
        Math.exp(13.32*Math.log(pibPerCapitaBrasil2024Dolar) - 65.64 - 0.623*Math.log(pibPerCapitaBrasil2024Dolar)**2)
    );
    // if(!custoPorHaBRL) throw new Error("wrong input value: 'valorDeImpacto'");

    let entradas = [];
    const prcl = usoPosteriorDoSolo === 'agricultura' ? 0.73 : usoPosteriorDoSolo === 'pecuária' ? 0.75 : undefined;
    if(!prcl) throw new Error('invalid input: usoPosteriorDoSolo');
    if(legal) {
        for(let i=0; i<=anos; i++) {
            entradas.push(custoPorHaBRL * prcl);
        }
    } else {
        entradas = fluxoDescontadoComParcelaVariavel(custoPorHaBRL, anos, prcl);
    }
    return vpl(entradas, txDesconto) * hectareAfetadoComPeso;
}

// const teste = () => {
//     const v = Math.exp(13.32*Math.log(pibPerCapitaBrasil2024Dolar) - 65.64 - 0.623*Math.log(pibPerCapitaBrasil2024Dolar)**2)
//     console.log(v);
// }

// teste();