import { vpl, fluxoDescontadoComParcelaVariavel } from "./utils.js";
import { pibPerCapitaBrasil2024Dolar, temperaturaCelsius, txDesconto, anos } from "./globals.js";

export function custoTotalRecreacao (
    hectareAfetadoComPeso,
    densidadeDemograficaMun,
    riquezaEspeciesMun,
    legal,
    txCambio
) {
    // riquezaEspeciesMun || (riquezaEspeciesMun = getRiquezaEspeciesMedia(uf));
    if(
        !riquezaEspeciesMun ||
        !densidadeDemograficaMun
    ) throw new Error("missing data: 'riquezaEspecieMun' or 'densidadeDemograficaMun'");

    const custoPorHaUSD = Math.exp(
        0.562*Math.log(densidadeDemograficaMun) + 0.566*Math.log(pibPerCapitaBrasil2024Dolar) + 0.0178*temperaturaCelsius + 1.133*Math.log(riquezaEspeciesMun) - 8.375
    );
    
    const custoPorHaBRL = custoPorHaUSD * txCambio;
    // console.log('custo por Ha BRL', custoPorHaBRL)
    let entradas = [];
    if(legal) {
        for(let i=0; i<=anos ; i++) {
            entradas.push(custoPorHaBRL);
        }
    } else {
        // entradas = fluxoDescontado(custoPorHaBRL, anos);
        entradas = fluxoDescontadoComParcelaVariavel(custoPorHaBRL, anos, 1);
    }
    
    return vpl(entradas, txDesconto) * hectareAfetadoComPeso;
}
