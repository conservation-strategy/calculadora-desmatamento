import { useContext } from "react";
import { Language, useCurrency } from "../context/provider";
import { formatCostNumber } from "../utils";

const DonutChartLegendItem = ( { cost, total, label, color, language } ) => {
  const percent = parseInt(cost / total * 100);
  const { currency } = useCurrency();
  return (
    <div className="flex items-begin gap-3 mb-2">
      <div className="h-4 min-h-4 w-4 min-w-4 mt-[6px]" style={{ backgroundColor: color }}></div>
      <div className="flex flex-col gap-1">
        <span className="font-[400] leading-[1.5rem]">
          {
            label === 'Restabelecimento do Potencial de Bioprospecção' ?
              <>Restabelecimento do Potencial <br /> de Bioprospecção</>
            : label === 'Perda de Produtos Madeireiros ou Não-Madeireiros' ?
              <>Perda de Produtos Madeireiros <br /> ou Não-Madeireiros</>
            : label === 'Perda de Oportunidades de Recreação' ?
              <>Perda de Oportunidades de <br /> Recreação  </>
            : label
          }
        </span>
        <span>{`${currency} ${formatCostNumber(cost)} (${percent}%)`}</span>
      </div>
    </div>
  );
}

const LegendDonutChart = ( { data, dataLabels, dataColors, open = false } ) => {
  const { language } = useContext(Language);

  const total = data.reduce((acc, curr) => acc + curr, 0);

  return (
    // <div className="flex gap-24 justify-center text-[1rem]">
    <div className={`flex max-[447px]:flex-col gap-24 max-[767px]:gap-12 max-[529px]:gap-8 max-[429px]:gap-2 max-[447px]:items-center justify-center text-[1rem] max-[547px]:text-sm duration-500 transition-opacity  ${open ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex flex-col gap-2">
        {
          data.map((value, index) => {
            if (index > 2) return null;
            return <DonutChartLegendItem 
              key={index} 
              cost={value} 
              total={total}
              label={dataLabels[index]} 
              color={dataColors[index]} 
              language={language}
            />
          })
        }
      </div>
      <div className="flex flex-col gap-2">
        {
          data.map((value, index) => {
            if (index <= 2) return null;
            return <DonutChartLegendItem 
              key={index} 
              cost={value} 
              total={total}
              label={dataLabels[index]} 
              color={dataColors[index]} 
              language={language}
            />
          })
        }
      </div>
    </div>
  );
};

export default LegendDonutChart;