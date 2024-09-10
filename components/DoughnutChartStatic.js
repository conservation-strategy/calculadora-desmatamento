import React, { useEffect, useRef, useState } from 'react';
import { PieChart, Pie, Cell, Sector, ResponsiveContainer } from 'recharts';
import { formatCurrencyNoDecimals } from '../utils';
import { useCurrency } from '../context/provider';

const COLORS = ['#639DE3', '#FF8C00', '#5A8A70', '#EA6557', '#6D213C'];

const RADIAN = Math.PI / 180

const colorsKV = {
  'Custo Bioprospecção': '#639DE3',
  'Custo Carbono': '#FF8C00',
  'Custo Erosão': '#5A8A70',
  'Custo Madeireiro ou Não-Madeireiro': '#EA6557',
  'Custo Recreação': '#6D213C',
}

const customLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  payload,
  percent,
  colors,
  percentValue,
  valueConverted
}) => {
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'
  // const percentValue = parseInt(percent * 100)

  console.log('[DoughnutChartStatic] colors', colors)
  console.log('[DoughnutChartStatic] percentValue', percentValue)
  console.log('[DoughnutChartStatic] payload.name', payload.name)

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill={`${colors[payload.name]}`}
        fontWeight={600}
        fontSize={14}
      >
        {/* {
          payload.name === 'Custo Madeireiro ou Não-Madeireiro' ?
            <>
              <tspan x={ex + (cos >= 0 ? 1 : -1) * 12} dy="0">Custo Madeireiro ou</tspan>
              <tspan x={ex + (cos >= 0 ? 1 : -1) * 12} dy="1rem">Não-Madeireiro{` (${percentValue}%)`}</tspan>
            </> 
          :  
            `${payload.name} (${percentValue}%)`
        } */}
        {`${percentValue}%`}
      </text>
      {/* <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={20}
        textAnchor={textAnchor}
        fontSize={14}
        fill="#999"
      >
        {`${valueConverted} (${percentValue}%)`}
      </text> */}
    </g>
  )
}

export default function DoughnutChartStatic({ data }) {
  const [chartSize, setChartSize] = useState({ width: 400, height: 400 });
  const chartRef = useRef(null);
  const { currency, exchangeRate } = useCurrency();

  const custosData = [
    { name: 'Custo Bioprospecção', value: data.custoBiopros },
    { name: 'Custo Carbono', value: data.custoCarbono },
    { name: 'Custo Erosão', value: data.custoAssoreamento },
    { name: 'Custo Madeireiro ou Não-Madeireiro', value: data.custoMadeireiroOuNaoMadeireiro},
    { name: 'Custo Recreação', value: data.custoRecreacao },
  ];

  console.log('[DoughnutChartStatic] data', data)

  const percentData = {
    'Custo Bioprospecção': data.custoBiopros / data.total,
    'Custo Carbono': data.custoCarbono / data.total,
    'Custo Erosão': data.custoAssoreamento / data.total,
    'Custo Madeireiro ou Não-Madeireiro': data.custoMadeireiroOuNaoMadeireiro / data.total,
    'Custo Recreação': data.custoRecreacao / data.total,
  }

  // useEffect(() => {
  //   if (chartRef.current) {
  //     const svg = chartRef.current.querySelector('svg');
  //     if (svg) {
  //       const g = svg.querySelector('g.recharts-layer.recharts-pie');
  //       if (g) {
  //         const { width, height } = g.getBoundingClientRect();
  //         setChartSize({ width: width, height: height });
  //       }
  //     }
  //   }
  // }, [data]);

  const outerRadius = Math.min(chartSize.width, chartSize.height) / 3;
  const innerRadius = outerRadius * 0.5;

  return (
    <div ref={chartRef} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <PieChart  width={500} height={400}>
        <Pie
          id="pie-element"
          data={custosData}
          cx={"50%"}
          cy={"50%"}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          isAnimationActive={false}
          label={(props) =>
            customLabel({
              ...props,
              colors: colorsKV,
              percentValue: parseInt(percentData[props.name] * 100),
              valueConverted: formatCurrencyNoDecimals(currency, Number(props.value) / exchangeRate),
            })
          }
        >
          {custosData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colorsKV[entry.name]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}
