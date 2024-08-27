'use client'
import Head from "next/head";
import dynamic from "next/dynamic";
// import Chart from "react-apexcharts";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });



export function AreaChart () {
    const options = {
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
     },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: 'left'
      },
      title: {
        text: 'Area',
        style: {
            fontSize: '24px',
        }
      }
    };
    const series = [
        {
            name: "series-1",
            data: [30, 40, 45, 50, 49, 60, 70, 91]
        },
        {
            name: "series-1",
            data: [15, 26, 37, 88, 66, 54, 89, 101]
        }
    ]

    return (
        <div className="max-w-lg w-full">
            <Chart
            options={options}
            series={series}
            type='area'
            width='100%'
            />
        </div>
    )
}

export function BarChart () {
    const options = {
        // chart: {
        //     id: "basic-bar"
        // },
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        },
        dataLabels: {
            enabled: false
        },
        title: {
            text: 'Barra',
            style: {
                fontSize: '24px',
            }
        }
    }
    const series = [
        {
            name: "series-1",
            data: [30, 40, 45, 50, 49, 60, 70, 91]
        },
        {
            name: "series-1",
            data: [15, 26, 37, 88, 66, 54, 89, 101]
        }
    ]

    return (
        <div className="max-w-lg w-full ">
            <Chart
            options={options}
            series={series}
            type='bar'
            width='100%'
            />
        </div>
    )   
}

export function DonutChart () {
    const options = {
        // series: [30, 40, 45, 50, 49],
        chartOptions: {
            labels: ['a', 'b', 'c', 'd', 'e']
        },
        title: {
            text: 'Rosca',
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
        labels: ['a', 'b', 'c', 'd', 'e']
    }

    return (
        <div className="max-w-lg w-full ">
            <Chart
            options={options}
            series={[30,40,45,50,49]}
            type='donut'
            width='80%'
            />
        </div>
    )   
}