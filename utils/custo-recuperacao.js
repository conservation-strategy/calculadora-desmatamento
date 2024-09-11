
const capacidadeCargaCaminhaoNumeroMudas = 2700;
const mudasSuperficiePorHa = 1667;
const custoTrasporteMudasPorKm = 1.6;
const kmRodadoPorLitro = 2.5;
const precoLitroDiesel = 6.167;
const salarioMedioMotorista = 2.22;


export function custoTotalRecSuperficialComFrete (
    hectareAfetado,
    restauracao,
    distanciaDesmatamentoCentroUrbanoFrete
) {
    console.log('restauracao' , restauracao);
    const precoSuperficialSoloPorHa = restauracao === 'natural' ? 14690 : restauracao === 'direta' ? 23400 : undefined;
    if(precoSuperficialSoloPorHa === undefined) {
        throw new Error('Valor de impacto inválido');
    }
    const custoSuperficialSoloSemFrete = precoSuperficialSoloPorHa * hectareAfetado;
    // console.log('custo sem frete', custoSuperficialSoloSemFrete)

    const numeroCaminhoesRecupSuperficialMudas = (hectareAfetado*mudasSuperficiePorHa) / capacidadeCargaCaminhaoNumeroMudas < 1
        ? 1
        : Math.ceil((hectareAfetado*mudasSuperficiePorHa) / capacidadeCargaCaminhaoNumeroMudas);
    // console.log('numero caminhoes',numeroCaminhoesRecupSuperficialMudas);

    const custoFreteMudaSuperficialTotal = distanciaDesmatamentoCentroUrbanoFrete * custoTrasporteMudasPorKm;
    // console.log('custo transporte total', custoFreteMudaSuperficialTotal);
    
    // console.log('qtdeLitrosDieselConsumidoRecSuperficial', distanciaDesmatamentoCentroUrbanoFrete / kmRodadoPorLitro);
    const custoCombustívelFreteRecSuperficial = precoLitroDiesel * (distanciaDesmatamentoCentroUrbanoFrete / kmRodadoPorLitro);
    // console.log('custo combustivel', custoCombustívelFreteRecSuperficial);
    const custoFretecomMotoristaRecSuperficial = salarioMedioMotorista * distanciaDesmatamentoCentroUrbanoFrete;
    // console.log('CUSTO com motorista', custoFretecomMotoristaRecSuperficial);
    const custoTotalFreteSuperficialIdaeVolta = (custoFretecomMotoristaRecSuperficial + custoCombustívelFreteRecSuperficial + custoFreteMudaSuperficialTotal) * 2;
    // console.log('custo ida e volta', custoTotalFreteSuperficialIdaeVolta)
    // console.log('custo total caminhoes', custoTotalFreteSuperficialIdaeVolta*numeroCaminhoesRecupSuperficialMudas);
    const custoTotalFreteRecSuperficialFinal = custoTotalFreteSuperficialIdaeVolta * numeroCaminhoesRecupSuperficialMudas * hectareAfetado;
    // console.log('custo total frete', custoTotalFreteRecSuperficialFinal)

    return custoSuperficialSoloSemFrete + custoTotalFreteRecSuperficialFinal
}

// const v = custoTotalRecSuperficialComFrete(
//     1,
//     'conservador',
//     100.835290995657
// )
// console.log(v)