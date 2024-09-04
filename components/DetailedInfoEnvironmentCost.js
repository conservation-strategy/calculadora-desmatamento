import { Box, Tab, Tabs } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Roboto,Roboto_Condensed } from "next/font/google";
import DonutChart from "./DonutChart";
import HighlightedCost from "./HighlightedCost";
import { ClickHand } from "../utils/customIcons/ClickHand";
import { Language, ENGLISH, useCurrency } from "../context/provider";
import { formatCostNumber } from "../utils";

const roboto = Roboto({
  weight: ['300', '400', '500','700'],
  subsets: ['latin'],
})

const dataColors = ['#639DE3', '#FF8C00', '#5A8A70', '#EA6557', '#6D213C'];

const translateLabelPT_EN = {
  'Restabelecimento do Potencial de Bioprospecção': 'Bioprospecting Cost',
  'Perda de Sequestro de Carbono': 'Carbon Cost',
  'Erosão e Assoreamento': 'Erosion Cost',
  'Perda de Produtos Madeireiros ou Não-Madeireiros': 'Timber and Non-Timber Cost',
  'Perda de Oportunidades de Recreação': 'Recreation Cost',
}

const translateLabelEN_PT = {
  'Bioprospecting Cost': 'Restabelecimento do Potencial de Bioprospecção',
  'Carbon Cost': 'Perda de Sequestro de Carbono',
  'Erosion Cost': 'Erosão e Assoreamento',
  'Timber and Non-Timber Cost': 'Perda de Produtos Madeireiros ou Não-Madeireiros',
  'Recreation Cost': 'Perda de Oportunidades de Recreação',
}

const infoLabelDictionaryPT = {
  'Restabelecimento do Potencial de Bioprospecção': {
    title: 'Restabelecimento do Potencial de Bioprospecção',
    body: 'Custos para restaurar o potencial da floresta em fornecer novos compostos biológicos com valor comercial e medicinal.',
    color: 'rgba(99, 157, 227, 0.3)',
  },
  'Perda de Sequestro de Carbono': {
    title: 'Perda de Sequestro de Carbono',
    body: 'Impacto na capacidade da floresta de capturar e armazenar carbono, contribuindo para as mudanças climáticas.',
    color: 'rgba(255, 140, 0, 0.3)',
  },
  'Erosão e Assoreamento': {
    title: 'Erosão e Assoreamento',
    body: 'Danos causados pela perda de solo e sedimentação dos corpos d\'água, afetando a qualidade e disponibilidade de recursos hídricos.',
    color: 'rgba(90, 138, 112, 0.3)',
  },
  'Perda de Produtos Madeireiros ou Não-Madeireiros': {
    title: 'Custo de oportunidade de produção de produtos madeireiros ou não madeireiros',
    body: 'Redução na disponibilidade de recursos naturais, como borracha, castanha e madeira que a floresta proporciona à sociedade.',
    color: 'rgba(234, 101, 83, 0.3)',
  },
  'Perda de Oportunidades de Recreação': {
    title: 'Perda de Oportunidades de Recreação',
    body: 'Redução nas oportunidades de atividades recreativas e turísticas que a floresta proporciona.',
    color: 'rgba(109, 33, 60, 0.3)',
  },
}

const infoLabelDictionaryEN = {
  'Bioprospecting Cost': {
    title: 'Loss of Future Potential with Bioprospecting',
    body: "Deforestation results in the loss of the forest's future potential to provide new biological compounds with commercial and medicinal value.",
    color: 'rgba(99, 157, 227, 0.3)',
  },
  'Carbon Cost': {
    title: 'Loss of Carbon Sequestration',
    body: 'Impact on the forest\'s ability to capture and store carbon, contributing to climate change.',
    color: 'rgba(255, 140, 0, 0.3)',
  },
  'Erosion Cost': {
    title: 'Erosion and Siltation',
    body: 'Damage caused by soil loss and sedimentation in water bodies, impacting the quality and availability of water resources.',
    color: 'rgba(90, 138, 112, 0.3)',
  },
  'Timber and Non-Timber Cost': {
    title: 'Opportunity Cost of Producing Timber or Non-Timber Products',
    body: 'Reduction in the availability of natural resources, such as rubber, nuts, and timber that the forest provides to society.',
    color: 'rgba(234, 101, 83, 0.3)',
  },
  'Recreation Cost': {
    title: 'Loss of Recreational Opportunities',
    body: 'Reduction in the recreational and tourism activities that the forest provides.',
    color: 'rgba(109, 33, 60, 0.3)',
  },
}

const SliceBodyText = ({ title, body }) => {
  // console.log('[SliceBodyText] title', title);
  // console.log('[SliceBodyText] body', body);

  return (
    <div className="flex flex-col gap-2">
      <p className="tracking-wide font-medium text-lg">
        {title}
      </p>
      <p className="tracking-wide font-normal text-sm text-[#3D3D3D]">
        {body}
      </p>
  </div>
  )
}

// to-do: trocar a altura fixa h-[216px] por uma altura máxima responsiva, levando em conta a largura da janela
const SliceInfo = ({ info, open, description }) => {
  const { language } = useContext(Language);
  const { currency, exchangeRate } = useCurrency();

  // console.log('[SliceInfo] info', info);

  // console.log ('[SliceInfo] info.label', info?.label);

  // const sliceBodyText = 
  //   language === ENGLISH
  //   ? (
  //     info?.label === 'Carbon Cost' 
  //     ? infoLabelDictionaryEN[info?.label]?.body + ` The amount of carbon lost is: ${<span className="font-[500]">{info?.extraCarbonValue}</span>} tons of CO2.`
  //     : infoLabelDictionaryEN[info?.label]?.body
  //   )
  //   : (
  //     info?.label === 'Perda de Sequestro de Carbono' 
  //     ? <span>{infoLabelDictionaryPT[info?.label]?.body}<br />{' Quantidade de carbono perdida: '}<span className="font-[500]">{info?.extraCarbonValue}</span>{' toneladas de CO2.'}</span>
  //     : infoLabelDictionaryPT[info?.label]?.body
  //   );
  const carbonExtraInfo = 
    language === ENGLISH
    ? <div className="mt-2 pl-3 border-l-2 border-[#CBA888] flex flex-col gap-2">
        <span className="font-[400]">Amount of carbon lost:</span>
        <span className="font-[600] text-xl">{formatCostNumber(info?.extraCarbonValue)}&nbsp;<span className="font-[400] text-sm">tons of CO2.</span></span>
      </div>
    : <div className="mt-2 pl-3 border-l-2 border-[#CBA888] flex flex-col gap-2">
        <span className="font-[400]">Quantidade de carbono perdida:</span>
        <span className="font-[600] text-xl">{formatCostNumber(info?.extraCarbonValue)}&nbsp;<span className="font-[400] text-sm">toneladas de CO2.</span></span>
      </div>;

  return (
    <>
      <div className={`w-full relative flex flex-col justify-begin min-[901px]:h-[216px]`}>
      {/* <div className={`w-full relative flex flex-col justify-begin`}> */}
        {
          !open &&
          <div className={`absolute top-0 left-0 w-full flex flex-row gap-4 bg-[#D9D9D9] p-8 opacity-50`}>
            <div className="flex justify-center items-center">
              <ClickHand size='28' color='#3D3D3D' />
            </div>
            <div className="flex flex-col gap-2">
              <p className="hidden max-[768px]:block tracking-wide font-medium text-base max-[324px]:text-sm text-[#333333]">
                {description.lines_mobile[0]}
              </p>
              <p className="hidden max-[768px]:block tracking-wide font-normal text-sm text-[#3D3D3D]">
                {description.lines_mobile[1]}
              </p>
              <p className="block max-[768px]:hidden tracking-wide font-medium text-base text-[#333333]">
                {description.lines[0]}
              </p>
              <p className="block max-[768px]:hidden tracking-wide font-normal text-sm text-[#3D3D3D]">
                {description.lines[1]}
              </p>
            </div>
          </div>
        }
        <div 
          className={`
            w-full flex flex-col gap-4 p-8 transition-opacity ${open ? 'pointer-events-auto opacity-100 mb-8' : 'pointer-events-none opacity-0 h-[195px] max-[558px]:h-[225px] max-[423px]:h-[256px]'}
          `}
          style={{
            backgroundColor: language === ENGLISH
              ? infoLabelDictionaryEN[info?.label]?.color ?? (infoLabelDictionaryEN[translateLabelPT_EN[info?.label]]?.color ?? '#D9D9D9') // the second part solves a bug when the language changes while there is a slice info rendered
              : (infoLabelDictionaryPT[info?.label]?.color ?? (infoLabelDictionaryPT[translateLabelEN_PT[info?.label]]?.color ?? '#D9D9D9')),
            boxShadow: open ? 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' : 'none',
          }}
        >
          <SliceBodyText 
            title={
              language === ENGLISH
                ? infoLabelDictionaryEN[info?.label]?.title ?? infoLabelDictionaryEN[translateLabelPT_EN[info?.label]]?.title // the second part solves a bug when the language changes while there is a slice info rendered
                : infoLabelDictionaryPT[info?.label]?.title ?? infoLabelDictionaryPT[translateLabelEN_PT[info?.label]]?.title
            }
            body={
              language === ENGLISH
                ? infoLabelDictionaryEN[info?.label]?.body ?? infoLabelDictionaryEN[translateLabelPT_EN[info?.label]]?.body // same here
                : infoLabelDictionaryPT[info?.label]?.body ?? infoLabelDictionaryPT[translateLabelEN_PT[info?.label]]?.body
            }
          />
          {/* <div className="flex flex-col gap-2">
            <p className="tracking-wide font-medium text-lg">
              {
                language === ENGLISH
                  ? infoLabelDictionaryEN[info?.label]?.title
                  : infoLabelDictionaryPT[info?.label]?.title
              }
            </p>
            <p className="tracking-wide font-normal text-sm text-[#3D3D3D]">
              {
                language === ENGLISH
                  ? infoLabelDictionaryEN[info?.label]?.body
                  : infoLabelDictionaryPT[info?.label]?.body
              }
            </p>
          </div> */}
          <HighlightedCost cost={info?.value/exchangeRate} currency={currency} justifyLeft={true} />
          {
            info?.label === 'Carbon Cost' || info?.label === 'Perda de Sequestro de Carbono'
            && <div className='tracking-wide font-normal text-sm text-[#3D3D3D]'>{carbonExtraInfo}</div>
          }
        </div>
      </div>
    </>
  )
}

export default function DetailedInfoEnvironmentCost({ className, data, description }) {
  const { language } = useContext(Language);
  const { exchangeRate } = useCurrency();

  // const [value, setValue] = useState(0);
  const [currentTab, setCurrentTab] = useState(0);
  const [currentSliceInfo, setCurrentSliceInfo] = useState(null);
  const [hoveredSlice, setHoveredSlice] = useState(null);
  const [selectedSlice, setSelectedSlice] = useState(null);

  useEffect(() => {
    if (selectedSlice) {
      setCurrentSliceInfo(selectedSlice);
    } else if (hoveredSlice) {
      setCurrentSliceInfo(hoveredSlice);
    }
  }, [selectedSlice, hoveredSlice]);

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleSliceHover = (sliceInfo) => {
    setHoveredSlice(sliceInfo);
  }

  const handleSliceSelection = (sliceInfo) => {
    setSelectedSlice(sliceInfo);
  }

  let costData = [data.custoBiopros, data.custoCarbono, data.custoAssoreamento, data.custoMadeireiroOuNaoMadeireiro, data.custoRecreacao];
  const processedCostData = costData.map(value => Math.round((value/exchangeRate)));

  return (
    // <div className={`w-full flex flex-col gap-4 bg-detailedInfoRectColor rounded-lg px-8 py-6 text-lg font-medium text-black ${className}`}>
    <div className={`w-full flex bg-transparent rounded-lg text-lg font-medium text-black ${className}`}>
      <div className={`w-full flex gap-20 justify-between font-light ${roboto.className} max-[900px]:flex-col`}>
        <div className="min-[900px]:w-[75ch] max-w-[75ch] flex flex-col gap-10">
          <p className="text-pretty tracking-wide leading-[170%] font-normal text-base">
            {description.detailed_info.description} 
          </p>
          <div className={'h-full w-full flex flex-col justify-begin items-center'}>
            <SliceInfo info={{...currentSliceInfo, extraCarbonValue: data?.carbonoToneladas || 0}} open={hoveredSlice || selectedSlice} description={description.slice_info}/>
          </div>
        </div>
        <div className="w-full max-w-1/2 flex justify-center items-center mt-[-5rem]">
          <DonutChart
            key={`donut-chart-lang-${language}`}
            data={processedCostData} 
            dataLabels={description.data_labels}
            dataColors={dataColors}
            onSliceHover={handleSliceHover}
            onSliceSelection={handleSliceSelection}
          />
        </div>
      </div>
    </div>
  )
}