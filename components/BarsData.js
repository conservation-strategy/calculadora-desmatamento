import { forwardRef, useEffect, useRef, useState } from "react";
import HighlightedCost from "./HighlightedCost";
import { Roboto_Condensed } from "next/font/google";
import { RiInformationLine } from "react-icons/ri";
import { Tooltip } from "@mui/material";

const robotoCondensed = Roboto_Condensed({
  weight: ['300', '400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});


const BarLabel = ({ children }) => {
  return (
    <div className="w-full flex border-barLabelBorderColor border-t pt-2">
      <span className={`text-barLabelColor tracking-wide text-sm ${robotoCondensed.className}`}>{children}</span>
    </div>
  )
}

const BarContainer = forwardRef(({ cost, label, className }, ref) => {
  return (
    <div 
      ref={ref}
      className={`py-4 px-6 w-full flex flex-col gap-1 justify-between items-start text-barLabelColor font-sans text-lg transition-[height] duration-500 ease-in-out ${className}`}
    >
      <HighlightedCost cost={cost} size='small' color='black' />
      <BarLabel>{label}</BarLabel>
    </div>
  );
});

export default function BarsData({ custosDeRecuperacao, custosAmbientais, custoDeOportunidade }) {
  const [minHeight, setMinHeight] = useState(0);
  const recuperacaoRef = useRef(null);
  const ambientaisRef = useRef(null);
  const oportunidadeRef = useRef(null);
  // const lineRef = useRef(null);
  // const [lineTop, setLineTop] = useState(0);

  const data = [custosDeRecuperacao, custosAmbientais, custoDeOportunidade];
  const maxHeight = 350; // Maximum height in pixels
  const maxValue = Math.max(...data, 0.01);
  const scaleFactor = maxHeight / maxValue;
  const scaledHeights = data.map(value => value * scaleFactor);
  
  const tooltipText = 'O custo de oportunidade da pecuária foi incluído como um dado externo para fins de comparação. Esse custo permite contextualizar os impactos financeiros do desmatamento em relação a uma alternativa econômica comum na região.';
  console.log('[BarsData] data', data);
  console.log('[BarsData] scaledHeights', scaledHeights);

  useEffect(() => {
    if (recuperacaoRef.current && ambientaisRef.current && oportunidadeRef.current) {
      setMinHeight(Math.max(recuperacaoRef.current.scrollHeight, ambientaisRef.current.scrollHeight, oportunidadeRef.current.scrollHeight));
    }
  }, []);
  
  useEffect(() => {
    if (minHeight && recuperacaoRef.current && ambientaisRef.current && oportunidadeRef.current) {
      // const minHeight = Math.max(recuperacaoRef.current.scrollHeight, ambientaisRef.current.scrollHeight, oportunidadeRef.current.scrollHeight);
      // const minHeight = 100;
      // console.log('[BarsData] minHeight', minHeight);
      console.log('[BarsData] minHeight', minHeight);
      const additionalHeight = 20; // Additional height for low value bars
      const hasZeroValue = scaledHeights.some(value => value === 0);
      const adaptedScaledHeights = scaledHeights.map(value => {
        if (hasZeroValue && (value > 0 && value < maxHeight)) {
          return Math.max(value, minHeight + additionalHeight);
        }
        return value;
      });
      console.log('[BarsData] adaptedScaledHeights', adaptedScaledHeights);
      console.log('[BarsData] Math.max(scaledHeights[2]', Math.max(scaledHeights[2]));
      console.log('[BarsData] oportunidadeRef.current.scrollHeight', oportunidadeRef.current.scrollHeight);
      recuperacaoRef.current.style.height = `${Math.max(adaptedScaledHeights[0], recuperacaoRef.current.scrollHeight)}px`;
      ambientaisRef.current.style.height = `${Math.max(adaptedScaledHeights[1], ambientaisRef.current.scrollHeight)}px`;
      oportunidadeRef.current.style.height = `${Math.max(adaptedScaledHeights[2], oportunidadeRef.current.scrollHeight)}px`;

      // Set the line position
      // const contentTop = oportunidadeRef.current.offsetTop;
      // setLineTop(contentTop);
    }
  }, [scaledHeights, minHeight]);

  return (
    <div className={`relative w-full max-w-5xl flex gap-12 justify-center items-end h-[350px] p-5`}>
      {/* <div 
        ref={lineRef}
        className="absolute left-0 right-0 border-t border-dashed border-black mx-4 transition-[height] duration-500 ease-in-out"
        style={{ top: `${lineTop}px` }}
      ></div> */}

      <BarContainer 
        ref={recuperacaoRef}
        cost={custosDeRecuperacao}
        label="Valor estimado em custos de recuperação"
        className={custosDeRecuperacao < custosAmbientais ? 'bg-lowValueColor' : 'bg-highValueColor'}
      />
      <BarContainer 
        ref={ambientaisRef}
        cost={custosAmbientais}
        label="Valor estimado em custos ambientais"
        className={custosDeRecuperacao > custosAmbientais ? 'bg-lowValueColor' : 'bg-highValueColor'}
      />

      {/* <div ref={oportunidadeRef} className="py-4 pl-4 w-full min-h-[100px] bg-transparent flex flex-col justify-begin items-center text-barLabelColor font-sans text-lg transition-[height] duration-500 ease-in-out">
        <div className="flex flex-col gap-2 border-black border border-dashed p-4">
          <HighlightedCost cost={custoDeOportunidade} size='x-small' color='black' />
          <span className="text-barLabelColor font-sans font-bold text-sm">Custo de oportunidade da pecuária/soja</span>
        </div>
      </div> */}
      <div ref={oportunidadeRef} className="relative border-black border border-dashed py-4 px-6 w-full bg-transparent flex flex-col gap-1 justify-between items-start text-barLabelColor font-sans text-lg transition-[height] duration-500 ease-in-out">
        <Tooltip 
          title={tooltipText} 
          componentsProps={{
            tooltip: {
              sx: {
                px: 2,
                py: 1.5,
                letterSpacing: '0.3px',
                textWrap: 'pretty',
                borderRadius: '8px',  // Rounded corners
                fontSize: '0.9rem',  // Adjust this value as needed
                // backgroundColor: 'white',
                // color: 'black',    // Ensure text is visible on white background
                // '& .MuiTooltip-arrow': {
                //   color: 'white'   // Make arrow match the background if you're using it
                // }
              }
            }
          }}
        >
          {/* <div className="absolute top-[-1.5rem] left-full ml-2 text-[1.5rem] text-gray-500 cursor-pointer"> */}
          <div className="absolute top-[-5px] left-full ml-2 text-[1.4rem] text-gray-500 cursor-pointer">
            <RiInformationLine />
          </div>
        </Tooltip>
        <HighlightedCost cost={custoDeOportunidade} size='small' color='black' />
        <BarLabel>Custo de oportunidade da pecuária</BarLabel>
      </div>
    </div>
  )
}