import { useContext } from "react";
import { ENGLISH, Language } from "../context/provider";
import { formatCostNumber } from "../utils";

const StackBarLegendItem = ( { cost, total, label, color, language } ) => {
  const percent = parseInt(cost / total * 100);
  return (
    <div className="flex items-begin gap-3">
      <div className={`h-4 min-h-4 w-4 min-w-4 mt-[6px] ${color === 'low' ? 'bg-lowValueColor' : 'bg-highValueColor'}`}></div>
      <div className="flex flex-col gap-1">
        <span className="font-[500] leading-[1.5rem] tracking-wide">
          {label}
        </span>
        <span className="font-[400] leading-[1.5rem] tracking-wide">
          {language === ENGLISH ? `${cost} (${percent}%)` : `R$ ${formatCostNumber(cost)} (${percent}%)`}
        </span>
      </div>
    </div>
  );
}

const LegendStackBar = ( { data, dataLabels, dataColors } ) => {
  const { language } = useContext(Language);

  const total = data.reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="flex justify-center text-[1rem]">
      <div className="flex flex-col gap-4">
        {
          data.map((value, index) => {
            return (
              <StackBarLegendItem 
                key={index} 
                cost={value} 
                total={total}
                label={dataLabels[index]} 
                color={dataColors[index]} 
                language={language}
              />
            )
          })
        }
      </div>
    </div>
  );
};

export default LegendStackBar;