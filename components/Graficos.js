import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });


export default function Graficos({
    custos,
    legal
}) {
    console.log('custos prop', custos)
    const optionsBar = {
        xaxis: { 
            categories: [`custo total ${legal? 'legal' : 'ilegal'}`]
        },
        dataLabels: { enabled: false },
        title: {
            text: 'Custo Total Desmatamento',
            style: {
                fontSize: '24px'
            }
        }
    }
    const optionsDonut = {
        // series: [30, 40, 45, 50, 49],
        chartOptions: {
            labels: [
                'BioProspecção',
                'Carbono',
                'Cultural / Especies',
                'Erosão Assoreamento',
                'Recreação',
                'Produtos madereiros e não-madereiros',
                'Recuperação da camada superficial do solo'            
            ]
        },
        title: {
            text: 'Custos por Área',
            style: {
                fontSize: '24px',
            }
        },
        responsive: [
            {
                breakpoint: 375,
                options: {
                    dataLables: {
                        enabled: false
                    },
                    legend: {
                        show: false
                    }
                }
            }
        ],
        labels: [
            'BioProspecção',
            'Carbono',
            // 'Cultural / Especies',
            'Erosão Assoreamento',
            'Produtos madeireiros',        
            'Produtos não-madeireiros',
            'Recreação',
            'Recuperação da camada superficial do solo'
        ]
    }
    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="w-full max-w-lg">
                <Chart 
                options={optionsBar}
                series={[{
                    name: 'custo total',
                    data: [custos.custoTotal]
                }]}
                type='bar'
                width='100%'
                />
            </div>
            <div className="w-full max-w-lg">
                <Chart
                options={optionsDonut}
                series={[
                    custos.custoBiopros,
                    custos.custoCarbono,
                    // custos.custoEspecies,
                    custos.custoAssoreamento,
                    custos.custoMadeireiro,
                    custos.custoNaoMadeireiro,
                    custos.custoRecreacao,
                    custos.custoRecup,
                    // 1,2,3,4,5,6,7
                ]}
                type="donut"
                width='100%'
                />
            </div>
        </div>
    )
}