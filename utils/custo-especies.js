import { vpl, fluxoDescontado, getRiquezaEspeciesMedia } from "./utils";
import { txDesconto, pibPerCapitaBr2020Dolar, temperaturaCelsius  } from "./globals";


// NÃO SERÁ USADO
export function custoTotalEspecies (
    hectareAfetadoComPeso,
    densidadeDemograficaMun,
    riquezaEspeciesMun,
    uf,
    txCambio
) {
    riquezaEspeciesMun || (riquezaEspeciesMun = getRiquezaEspeciesMedia(uf));
    if(!riquezaEspeciesMun) throw new Error("wrong input value: 'riquezaEspecieMun' or 'uf'");

    const custoEspeciesPorHaR$ = txCambio*(
        Math.exp(0.643*Math.log(densidadeDemograficaMun) + 1.655*Math.log(pibPerCapitaBr2020Dolar) - 0.234*temperaturaCelsius + 2.145*Math.log(riquezaEspeciesMun) - 20.85)
    );

    const entradas = fluxoDescontado(custoEspeciesPorHaR$, anos);

    return vpl(entradas, txDesconto) * hectareAfetadoComPeso;
}