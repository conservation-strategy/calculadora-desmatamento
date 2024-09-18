import { Roboto, Roboto_Condensed } from 'next/font/google';
import { RiArticleFill, RiBarChart2Fill, RiBarChartBoxFill, RiInformationLine } from "react-icons/ri";
import DownloadPDFButton from "./DownloadPDFButton";
import { costsOverExchangeRate, formatCostNumber, formatDateToBrazilianStandard } from '../utils';
import { useContext, useEffect, useRef, useState } from 'react';
import BarsData from './BarsData';
import HighlightedCost from './HighlightedCost';
import DetailedInfoRectangle from './DetailedInfoRectangle';
import TableOutputData from './TableOutputData';
import StackBarsData from './StackBarsData';
import DetailedInfoEnvironmentCost from './DetailedInfoEnvironmentCost';
import styles from '../styles/Results.module.css';
import DoughnutChartStatic from './DoughnutChartStatic';
import { ENGLISH, Language, currencies, useCurrency } from '../context/provider';
import TableInputData from './TableInputData';
import { ClickAwayListener, Tooltip } from '@mui/material';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import VisibilityTrigger from './VisibilityTrigger';
import CurrencyToggle from './CurrencyToggle';
import Currency from './Currency';

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
    <div className='flex max-w-42ch [@media(max-width:900px)]:max-w-full'>
      <p className={`text-base text-pretty tracking-wide leading-relaxed border-l border-[#6E6E6E] pl-4 mt-4 text-[#3D3D3D] ${roboto.className}`}>{children}</p>
    </div>
  )
}

const InfoRectangle = ({ city, uf, ha, description }) => {
  return (
    <div 
      className='flex w-full max-w-2xl bg-transparent text-[#203C26] rounded-[0.3rem] p-12 text-base sm:text-lg font-medium border border-[#d3d3d3] max-sm:p-10 max-[442px]:p-7'
      style={{ boxShadow: 'rgba(100, 100, 111, 0.05) 0px 7px 29px 0px' }}
    >
      <div className="w-full flex flex-col gap-8 whitespace-nowrap">
        <div className="h-auto flex flex-col gap-3 border-b border-[#d3d3d3] pb-4 lg:flex-row lg:justify-between">
          <span className={`${robotoCondensed.className} opacity-80 max-md:whitespace-normal`}>
          {city && uf ? description.city : description.location}
          </span>
          <span className={`${roboto.className} font-medium opacity-90 max-md:whitespace-normal`}>
            {city && uf ? `${city} / ${uf}` : description.amazon}
          </span>
        </div>
        <div className="flex flex-col gap-3 border-b border-[#d3d3d3] pb-4 md:flex-row md:justify-between">
          <span className={`${robotoCondensed.className} opacity-80 max-md:whitespace-normal`}>
            {description.area}
          </span>
          <span className={`${roboto.className} font-medium opacity-90 max-md:whitespace-normal`}>
            {`${ha} ha`}
          </span>
        </div>
      </div>
    </div>
  )
}

const CompleteInfoRectangle = ({ city, uf, ha, description }) => {
  return (
    <div 
      className='flex w-full max-w-2xl bg-transparent text-[#203C26] p-8 border border-[#d3d3d3] text-base sm:text-lg font-medium max-sm:p-6'
    >
      <div className="w-full flex flex-col gap-8 whitespace-nowrap">
        <div className="h-auto flex flex-col gap-3 border-b border-[#d3d3d3] pb-4 lg:flex-row lg:justify-between">
          <span className={`${robotoCondensed.className} opacity-80 max-md:whitespace-normal`}>
          {city && uf ? description.city : description.location}
          </span>
          <span className={`${roboto.className} font-medium opacity-90 max-md:whitespace-normal`}>
            {city && uf ? `${city} / ${uf}` : description.amazon}
          </span>
        </div>
        <div className="flex flex-col gap-3 border-b border-[#d3d3d3] pb-4 md:flex-row md:justify-between">
          <span className={`${robotoCondensed.className} opacity-80 max-md:whitespace-normal`}>
            {description.area}
          </span>
          <span className={`${roboto.className} font-medium opacity-90 max-md:whitespace-normal`}>
            {`${ha} ha`}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Results({ custos, inputData, quotation }) {
  const { custoTotal, custosDeRecuperacao, custosAmbientais, custoDeOportunidade } = custos;
  const { content, language } = useContext(Language);
  const { results } = content;
  const { setLanguageBlocker, currency, setCurrency, exchangeRate } = useCurrency();
  const [loaded, setLoaded] = useState(false);
  const [currentBarHeights, setCurrentBarHeights] = useState({
    recoverCost: 0,
    environmentCost: 0,
    opportunityCost: 0,
  });
  const [currentURL, setCurrentURL] = useState('');
  const [isCurrencyInfoOpen, setIsCurrencyInfoOpen] = useState(false);

  console.log('[Results] currency', currency);

  useEffect(() => {
    setLanguageBlocker();
  },[]);

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

  const handleChangeCurrency = () => {
    if (currency === currencies.real) setCurrency(currencies.dollar);
    else setCurrency(currencies.real);
  }
  
  const toggleContainer = () => {
    setIsCurrencyInfoOpen(!isCurrencyInfoOpen);
  };

  return (
    <div id="results" className="flex flex-col items-center w-full bg-white max-[500px]:px-8 px-14"> 
      {/* <div className="max-w-screen-sm md:max-w-screen-2xl py-10 flex items-center justify-between w-full max-[530px]:flex-col max-[530px]:gap-14 max-[530px]:items-start"> */}
      <div className="max-w-screen-sm md:max-w-screen-2xl py-10 pb-10 flex items-start justify-between gap-6 w-full max-[530px]:pb-6 max-[530px]:flex-col-reverse max-[530px]:gap-14 max-[530px]:items-start">
        <div className='flex flex-col gap-12'>
          <h1 className={`font-bold gap-4 items-center`}>
              <span className="pl-5 border-l-[6px] border-darkGreen text-darkGreen text-2xl min-[375px]:text-[1.75rem] min-[430px]:text-3xl">{results.heading}</span>
          </h1>
          {/* <div className='px-6 w-full'>
            <Currency currency={currency} onCurrencyChange={handleChangeCurrency} quotation={quotation} />
          </div> */}
        </div>
        <div className="max-[530px]:w-full flex items-center ">
          <DownloadPDFButton data={{  custos: costsOverExchangeRate(custos, exchangeRate), inputData, currentBarHeights, currentURL, currency, quotation }} language={language} />
        </div>
      </div>

      <div className='flex justify-start px-6 w-full max-[375px]:px-0'>
        <Currency currency={currency} onCurrencyChange={handleChangeCurrency} quotation={quotation} />
      </div>
      
      <div className="px-6 pb-10 max-[530px]:pt-10 max-[375px]:px-0 pt-8 flex flex-col items-center gap-20 [@media(max-width:900px)]:gap-10 w-full">
        <div className='max-w-screen-sm md:max-w-[1480px] flex flex-col gap-8 w-full [@media(max-width:900px)]:gap-6'>
          {/* botao de moeda */}
          {/* <button className='p-4 border bg-black text-white w-fit bottom-0 left-0 fixed' onClick={handleChangeCurrency}>
            {currency === currencies.real ? currencies.dollar : currencies.real}
          </button> */}
          {/* --------------- */}
          <ClickAwayListener onClickAway={() => setIsCurrencyInfoOpen(false)}>
            <VisibilityTrigger targetElementId="results" excludentElementId="currency-box">
              <div className="w-fit bottom-10 left-0 fixed z-30">
                <div className="flex items-end">
                  <div
                    className={`${roboto.className} flex flex-col gap-3 bg-gray-200 rounded-t-[6px] text-darkGreen px-4 py-3 rounded-l-md transition-all duration-300 transform ${
                      isCurrencyInfoOpen ? 'translate-x-0' : '-translate-x-48'
                    }`}
                  >
                    <p>{results.currency.intro}</p>
                    <CurrencyToggle onCurrencyChange={handleChangeCurrency} currency={currency} />
                  </div>
                  <button
                    className={`bg-[#47605C] text-white border-none p-2 cursor-pointer rounded-r-md flex items-center justify-center w-7 h-10 transition-all duration-300 transform ${
                      isCurrencyInfoOpen ? 'translate-x-0' : '-translate-x-[173.422px]'
                    }`}
                    onClick={toggleContainer}
                  >
                    {/* <span className="pl-2 text-lg">{isCurrencyInfoOpen ? '←' : '→'}</span> */}
                    <span className="">{isCurrencyInfoOpen ? <IconChevronLeft /> : <IconChevronRight />}</span>
                  </button>
                </div>
              </div>
            </VisibilityTrigger>
          </ClickAwayListener>

          <SectionSubtitle>{results.section_1.heading}</SectionSubtitle>
          <div className='flex justify-between gap-20 w-full [@media(max-width:900px)]:flex-col-reverse [@media(max-width:900px)]:gap-10'>
            <div className='flex flex-col gap-6 w-full min-w-32ch max-w-45ch [@media(max-width:900px)]:max-w-full'>
              <SectionBodyText>
                {results.section_1.intro.parts[0] + ' '}
                {!inputData.valoresMedios
                  ? results.section_1.intro.mun + ' ' + inputData.city + ` (${inputData.uf})` 
                  : results.section_1.intro.amazon
                }
                {results.section_1.intro.parts[1]}
              </SectionBodyText>
              <HighlightedCost color='red' cost={custoTotal/exchangeRate} currency={currency} justifyLeft={true}/>
              <SectionBodyComment>{results.section_1.description.parts[0]}{custosDeRecuperacao ? ' '+results.section_1.description.conditional : ''} {results.section_1.description.parts[2]}</SectionBodyComment>
            </div>
            <div className='w-full max-w-xl [@media(max-width:900px)]:hidden [@media(max-width:900px)]:max-w-full place-content-center'>
              <InfoRectangle city={inputData.city} uf={inputData.uf} ha={inputData.ha} description={results.section_1.info_rectangle} />
            </div>
          </div>
        </div>
        <div className='max-w-screen-sm md:max-w-[1480px] py-10 flex w-full'>
          <div className='flex flex-col gap-12 justify-center w-full'>
            <div className='flex flex-col gap-8 [@media(max-width:900px)]:gap-6 justify-center'>
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
            <div className={`flex justify-center pt-10 max-[844px]:pt-0 border border-transparent border-b-[#d3d3d3]`}>
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
        <div className='max-w-screen-sm md:max-w-[1480px] flex flex-col gap-8 [@media(max-width:900px)]:gap-6 justify-begin w-full my-10'>
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
        <div className='max-w-screen-sm md:max-w-[1480px] flex flex-col gap-8 justify-begin w-full'>
          <SectionSubtitle>{results.table.heading}</SectionSubtitle>
          <div className='w-full flex flex-col gap-6'>
            <h4 className={`font-bold text-xl ${robotoCondensed.className}`}>{results.table.input_heading}</h4>
            {/* <div className='hidden w-full max-w-xl [@media(max-width:900px)]:block [@media(max-width:900px)]:max-w-full place-content-center'> */}
                {/* <CompleteInfoRectangle city={inputData.city} uf={inputData.uf} ha={inputData.ha} description={results.section_1.info_rectangle} /> */}
            {/* </div> */}
            <TableInputData 
              data={{
                city: inputData.city,
                uf: inputData.uf,
                location: results.section_1.info_rectangle.amazon,
                ha: inputData.ha,
                app: inputData.app,
                recreacao: inputData.recreacao,
                usoPosterior: inputData.usoPosterior,
                legal: inputData.legal,
                restauracao: inputData.restauracao,
              }}
            />
          </div>
          <div className='w-full flex flex-col gap-6 mt-4'>
            <h4 className={`font-bold text-xl ${robotoCondensed.className}`}>{results.table.output_heading}</h4>
            <TableOutputData 
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
      </div>
      <div className="max-w-screen-sm md:max-w-screen-2xl py-10 flex items-center justify-end w-full max-[530px]:justify-center">
        <div className="max-[530px]:w-full flex items-center">
          <DownloadPDFButton data={{ custos: costsOverExchangeRate(custos, exchangeRate), inputData, currentBarHeights, currentURL, currency, quotation }} language={language} />
        </div>
      </div>
      {/* <div id="staticChart" >
          <DoughnutChartStatic />
      </div> */}
      {/* <div id='test-chart' style={{ opacity: 0, zIndex: -1, position: 'absolute', bottom: 0, left: 0, pointerEvents: 'none' }}> */}
      {
        loaded &&
        <div style={{ display: 'flex', opacity: 0, zIndex: -1, position: 'absolute', bottom: 0, left: 0, pointerEvents: 'none', width: '50px', height: '50px', overflow: 'hidden' }}>
          <div id='doghnut-chart'>
            <DoughnutChartStatic data={custos.custosAmbientais} />
          </div>
        </div>
      }
    </div>
  )
}
