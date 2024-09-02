import { Roboto, Roboto_Condensed } from 'next/font/google';
import { RiArticleFill, RiBarChart2Fill, RiBarChartBoxFill } from "react-icons/ri";
import DownloadPDFButton from "./DownloadPDFButton";
import { formatCostNumber } from '../utils';
import { useContext, useEffect, useRef, useState } from 'react';
import BarsData from './BarsData';
import HighlightedCost from './HighlightedCost';
import DetailedInfoRectangle from './DetailedInfoRectangle';
import TableData from './TableData';
import StackBarsData from './StackBarsData';
import DetailedInfoEnvironmentCost from './DetailedInfoEnvironmentCost';
import styles from '../styles/Results.module.css';
import DoughnutChartStatic from './DoughnutChartStatic';
import { Language } from '../context/provider';

const roboto = Roboto({
  weight: ['300', '400', '500','700'],
  subsets: ['latin'],
})

const robotoCondensed = Roboto_Condensed({
  weight: ['300', '400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

const SectionSubtitle = ({ children }) => {
  return (
    <h3 className={`font-bold text-2xl lg:text-3xl ${robotoCondensed.className}`}>{children}</h3>
  )
}

const SectionBodyText = ({ children, className }) => {
  return (
    // <p className={`text-lg tracking-wide ${roboto.className}`}>{children}</p>
    <div className={`flex max-w-65ch ${className}`}>
      <p className={`text-lg tracking-wide ${roboto.className}`}>{children}</p>
    </div>
  )
}

const SectionBodyComment = ({ children }) => {
  return (
    <div className='flex max-w-42ch'>
      <p className={`text-base text-pretty tracking-wide leading-relaxed border-l border-[#6E6E6E] pl-4 mt-4 text-[#3D3D3D] ${roboto.className}`}>{children}</p>
    </div>
  )
}

const InfoRectangle = ({ city, uf, ha, description }) => {
  return (
    <div 
      className='flex w-full max-w-2xl bg-transparent text-[#203C26] rounded-[0.3rem] p-12 text-lg font-medium border border-[#d3d3d3] [@media(max-width:586px)]:p-10 [@media(max-width:442px)]:p-6'
      style={{ boxShadow: 'rgba(100, 100, 111, 0.05) 0px 7px 29px 0px' }}
    >
      <div className="w-full flex flex-col gap-8 whitespace-nowrap">
        <div className="h-auto flex flex-wrap justify-between border-b border-[#d3d3d3] pb-4">
          <span className={`${robotoCondensed.className} opacity-80`}>
          {city && uf ? description.city : description.location}
          </span>
          <span className={`${roboto.className} font-medium opacity-90`}>
            {city && uf ? `${city} / ${uf}` : description.amazon}
          </span>
        </div>
        <div className="flex justify-between border-b border-[#d3d3d3] pb-4">
          <span className={`${robotoCondensed.className} opacity-80`}>
            {description.area}
          </span>
          <span className={`${roboto.className} font-medium opacity-90`}>
            {`${ha} ha`}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Results({ custos, inputData }) {
  const { custoTotal, custosDeRecuperacao, custosAmbientais, custoDeOportunidade } = custos;
  
  const { content, language } = useContext(Language);
  const { results } = content;

  const [loaded, setLoaded] = useState(false);
  const [currentBarHeights, setCurrentBarHeights] = useState({
    recoverCost: 0,
    environmentCost: 0,
    opportunityCost: 0,
  });
  const [currentURL, setCurrentURL] = useState('');
  // to-do: get from context
  const isBrasil = true;

  useEffect(() => {
    setLoaded(true);

    if (window) {
      const url = window.location.hostname;
      // take only main domain
      setCurrentURL(url);
    }
  }, []);

  const handleBarHeightsChange = (newBarHeights) => {
    setCurrentBarHeights(newBarHeights);
  }
  
  return (
    <div id="results" className="flex flex-col w-full bg-white"> 
      {/* <div className="px-8 py-10 flex items-center justify-between w-full mt-40 border-t-8 border-black"> */}
      <div className="max-[500px]:px-8 px-14 py-10 flex items-center justify-between w-full max-[530px]:flex-col max-[530px]:gap-4 max-[530px]:items-start">
        {/* <div className="flex items-center gap-4 text-[#5A8A70] text-2xl md:text-2xl font-bold ">
          <RiBarChart2Fill />
          <h3 className="font-bold text-2xl ">{results.heading}</h3>
        </div> */}
        <h1 className={`font-bold gap-4 items-center`}>
              <span className="pl-5 border-l-[6px] border-darkGreen text-darkGreen text-2xl min-[375px]:text-[1.75rem] min-[430px]:text-3xl min-[375px]:eading-[2.5rem]">{results.heading}</span>
        </h1>
        <div className="flex items-center">
          <DownloadPDFButton data={{ custos, inputData, currentBarHeights, isBrasil, currentURL }} language={language} />
        </div>
      </div>
      {/* <div className="px-[4.5rem] py-10 flex flex-col gap-12 w-full"> */}
      {/* <div className="px-8 py-10 flex flex-col gap-24 w-full max-w-[1200px] mx-auto"> */}
      <div className="px-8 pb-10 pt-16 flex flex-col gap-20 w-full">
        <div className='flex flex-col gap-8 w-full max-w-[1200px] mx-auto'>
          <SectionSubtitle>{results.section_1.heading}</SectionSubtitle>
          <div className='flex justify-between gap-20 w-full [@media(max-width:900px)]:flex-col'>
            <div className='flex flex-col gap-6 w-full min-w-32ch max-w-45ch'>
              <SectionBodyText>
                {results.section_1.intro.parts[0] + ' '}
                {!inputData.valoresMedios
                  ? results.section_1.intro.mun + ' ' + inputData.city + ` (${inputData.uf})` 
                  : results.section_1.intro.amazon
                }
                {results.section_1.intro.parts[1]}
              </SectionBodyText>
              <HighlightedCost color='red' cost={custoTotal} justifyLeft={true}/>
              <SectionBodyComment>{results.section_1.description.parts[0]}{custosDeRecuperacao ? ' '+results.section_1.description.conditional : ''} {results.section_1.description.parts[2]}</SectionBodyComment>
            </div>
            <div className='w-full max-w-xl place-content-center'>
              <InfoRectangle city={inputData.city} uf={inputData.uf} ha={inputData.ha} description={results.section_1.info_rectangle} />
            </div>
          </div>
        </div>
        {/* <div className='py-10 flex w-full bg-gray-100 max-w-[100vw] '> */}
        <div className='py-10 flex w-full max-w-[100vw]'>
          <div className='flex flex-col gap-12 justify-center w-full max-w-[1200px] mx-auto'>
            <div className='flex flex-col gap-6 justify-center'>
              <SectionSubtitle>{results.section_2.heading}</SectionSubtitle>
              <SectionBodyText className='max-w-55ch'>
                {results.section_2.description.intro + ' '}
                <span className='font-semibold'>{results.section_2.description.names[0]}</span>
                {' ' + results.section_2.description.conjunction + ' '}
                <span className='font-semibold'>{results.section_2.description.names[1] + '.'}</span>
              </SectionBodyText>
              {/* <p className={`max-w-[70ch] text-sm text-pretty tracking-wide text-[#3D3D3D] ${roboto.className}`}>
                O custo de oportunidade da pecuária foi incluído como um dado externo para fins de comparação. Esse custo permite contextualizar os impactos financeiros do desmatamento em relação a uma alternativa econômica comum na região.
              </p> */}

            </div>
            {/* <div className={`flex justify-center pt-10 | ${styles.linePatternHorizontal}`}> */}
            {/* <div className={`flex justify-center pt-10 bg-gray-100`}> */}
            <div className={`flex justify-center pt-10 border border-transparent border-b-[#d3d3d3]`}>
              {/* <BarsData 
                custosDeRecuperacao={custosDeRecuperacao} 
                custosAmbientais={custosAmbientais.total}
                custoDeOportunidade={custoDeOportunidade}
              /> */}
              <StackBarsData 
                custosDeRecuperacao={custosDeRecuperacao} 
                custosAmbientais={custosAmbientais.total}
                custoDeOportunidade={custoDeOportunidade}
                isLegal={inputData?.legal}
                onBarHeightsChange={handleBarHeightsChange}
                description={results.section_2.chart}
                usoPosterior={inputData.usoPosterior}
              />
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-10 justify-begin w-full max-w-[1200px] mx-auto my-10'>
          <SectionSubtitle>{results.section_3.heading}</SectionSubtitle>
          <DetailedInfoEnvironmentCost 
            className={`${roboto.className} ${robotoCondensed.className}`}
            data={custosAmbientais}
            description={results.section_3}
          />
          {/* <DetailedInfoRectangle 
            className={`${roboto.className} ${robotoCondensed.className}`}
            data={custosAmbientais}
          /> */}
        </div>
        <div className='flex flex-col gap-10 justify-begin w-full max-w-[1200px] mx-auto'>
          <SectionSubtitle>Resumo dos resultados</SectionSubtitle>
          <TableData 
            data={{
              custosDeRecuperacao,
              custosAmbientais,
              custoDeOportunidade,
              custoTotal,
              inputData
            }}
            description={results.table}
          />
        </div>
      </div>
      <div className="px-8 py-10 flex items-center justify-end w-full border-b-8 border-black max-[530px]:justify-center">
        <div className="flex items-center">
          <DownloadPDFButton data={{ custos, inputData, currentBarHeights, isBrasil, currentURL }} language={language} />
        </div>
      </div>
      {/* <div id="staticChart" >
          <DoughnutChartStatic />
      </div> */}
      {/* <div id='test-chart' style={{ opacity: 0, zIndex: -1, position: 'absolute', bottom: 0, left: 0, pointerEvents: 'none' }}> */}
      {
        loaded &&
        <div style={{ display: 'flex', opacity: 0, zIndex: -1, position: 'absolute', bottom: 0, left: 0, pointerEvents: 'none' }}>
          <div id='doghnut-chart'>
            <DoughnutChartStatic data={custos.custosAmbientais} />
          </div>
        </div>
      }
    </div>
  )
}
