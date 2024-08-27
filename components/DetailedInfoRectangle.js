import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { Roboto,Roboto_Condensed } from "next/font/google";
import DonutChart from "./DonutChart";
import HighlightedCost from "./HighlightedCost";
import { ClickHand } from "../utils/customIcons/ClickHand";

const robotoCondensed = Roboto_Condensed({
  weight: ['300', '400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

const roboto = Roboto({
  weight: ['300', '400', '500','700'],
  subsets: ['latin'],
})

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3, px: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const LabelTitleDictionary = {
  'Custo Bioprospecção': 'Restabelecimento do Potencial de Bioprospecção',
  'Custo Carbono': 'Perda de Sequestro de Carbono',
  'Custo Erosão': 'Erosão e Assoreamento',
  'Custo Madeireiro': 'Perda de Produtos Madeireiros',
  'Custo Não-Madeireiro': 'Perda de Produtos Não-Madeireiros',
  'Custo Recreação': 'Perda de Oportunidades de Recreação',
};

const LabelBodyDictionary = {
  'Custo Bioprospecção': 'Custos para restaurar o potencial da floresta em fornecer novos compostos biológicos com valor comercial e medicinal.',
  'Custo Carbono': 'Impacto na capacidade da floresta de capturar e armazenar carbono, contribuindo para as mudanças climáticas.',
  'Custo Erosão': 'Danos causados pela perda de solo e sedimentação dos corpos d\'água, afetando a qualidade e disponibilidade de recursos hídricos.',
  'Custo Madeireiro': 'Redução na disponibilidade de madeira que a floresta fornece.',
  'Custo Não-Madeireiro': 'Redução na disponibilidade de recursos naturais, como frutos, resinas e outros produtos que a floresta fornece.',
  'Custo Recreação': 'Redução nas oportunidades de atividades recreativas e turísticas que a floresta proporciona.',
};

// to-do: trocar a altura fixa h-[216px] por uma altura máxima responsiva, levando em conta a largura da janela
const SliceInfo = ({ info, open }) => {
  return (
    <>
      
      <div className={`relative flex flex-col justify-begin h-[216px]`}>
        {
          !open &&
          <div className={`absolute top-0 left-0 w-full flex flex-row gap-4 bg-[#D9D9D9] p-8 opacity-50`}>
            <div className="flex justify-center items-center">
              <ClickHand size='28' color='#3D3D3D' />
            </div>
            <div className="flex flex-col gap-2">
              <p className="tracking-wide font-medium text-base text-[#333333]">
                Passe o mouse sobre o gráfico para ver mais detalhes sobre cada custo.
              </p>
              <p className="tracking-wide font-normal text-sm text-[#3D3D3D]">
                Dica: clique em uma fatia para fixar um valor e compará-lo com os demais.
              </p>
            </div>
          </div>
        }
        <div className={`w-full flex flex-col gap-4 bg-[#D9D9D9] p-8  transition-opacity ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}>
          <div className="flex flex-col gap-2">
            <p className="tracking-wide font-medium text-lg">{LabelTitleDictionary[info?.label]}</p>
            <p className="tracking-wide font-normal text-sm text-[#3D3D3D]">{LabelBodyDictionary[info?.label]}</p>
          </div>
          <HighlightedCost cost={info?.value} />
        </div>
      </div>
    </>
  )
}

export default function DetailedInfoRectangle({ className, data }) {
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

  return (
    <div className={`w-full flex flex-col gap-4 bg-detailedInfoRectColor rounded-lg px-8 py-6 text-lg font-medium text-black ${className}`}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={currentTab} 
          onChange={handleChange} 
          aria-label="basic tabs example"
          sx={{
            '&.MuiTabs-root .MuiTabs-indicator': {
              backgroundColor: 'black',
            },
            '&.MuiTabs-root .Mui-selected': {
              color: 'black',
              // fontWeight: '500',
            },
            '&.MuiTabs-root .MuiButtonBase-root': {
              // fontWeight: 'bold',
              fontFamily: robotoCondensed.style.fontFamily,
              fontSize: '1.2rem',
              textTransform: 'none',
            },
            // '&.MuiTabs-root .MuiButtonBase-root:first-child': {
            //   paddingLeft: '0.5rem',
            // }

          }}
        >
          <Tab label="Perda de serviços ambientais" disableRipple {...a11yProps(0)} />
          <Tab label="Custos de recuperação" disableRipple {...a11yProps(1)} />
          {/* <Tab label="Item Three" disableRipple {...a11yProps(2)} /> */}
        </Tabs>
      </Box>
      <CustomTabPanel value={currentTab} index={0} sx={{ pl: 0 }}>
        <div className={`w-full flex gap-20 justify-between font-light ${roboto.className}`}>
          <div className="w-full max-w-1/2 flex flex-col gap-10 justify-between">
            <p className="text-pretty tracking-wide leading-relaxed font-normal text-base">
              Com os valores estimados podemos analisar os custos ambientais do desmatamento na Amazônia, que englobam diversas áreas críticas. Esses custos incluem a perda de potencial para a bioprospecção, o impacto negativo na capacidade da floresta de capturar e armazenar carbono, a erosão e sedimentação dos corpos d'água, e a redução na disponibilidade de recursos madeireiros e não madeireiros. Além disso, o desmatamento afeta as oportunidades de recreação e turismo na região. O cálculo desses custos é fundamental para compreender a magnitude dos danos ambientais e reforçar a necessidade de estratégias eficazes de conservação e recuperação.
            </p>
            <SliceInfo info={currentSliceInfo} open={hoveredSlice || selectedSlice} />
          </div>
          <div className="w-full max-w-1/2 flex justify-center items-center">
            <DonutChart 
              data={[data.custoBiopros, data.custoCarbono, data.custoAssoreamento, data.custoMadeireiroOuNaoMadeireiro, data.custoRecreacao]} 
              dataLabels={[
                'Custo Bioprospecção', 
                'Custo Carbono', 
                'Custo Erosão', 
                'Custo Madeireiro ou Não-Madeireiro', 
                'Custo Recreação', 
              ]}
              onSliceHover={handleSliceHover}
              onSliceSelection={handleSliceSelection}
            />
          </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={currentTab} index={1}>
        <div className={`h-[590px] w-full flex gap-20 justify-between font-light ${roboto.className}`}>
          <div className="w-full max-w-1/2 flex flex-col gap-10 justify-between">
            <p className="text-balance tracking-wide leading-relaxed font-light text-base">
              {/* São os custos associados à recuperação das áreas desmatadas na Amazônia. Esses custos incluem a restauração da camada superficial do solo e outras intervenções necessárias para reestabelecer o equilíbrio ecológico e a funcionalidade do ambiente. Esses investimentos são essenciais para mitigar os danos causados pelo desmatamento e garantir a sustentabilidade a longo prazo das áreas afetadas. */}
              Em construção
            </p>
          </div>
          <div className="w-full max-w-1/2 flex justify-center items-center">
            {/* <DonutChart 
              data={[17979.74, 566054.97, 306106.77, 64043.12, 14691.91, 74641.55]} 
              dataLabels={[
                'Custo Bioprocessamento', 
                'Custo Carbono', 
                'Custo Erosão', 
                'Custo Madeireiro', 
                'Custo Não Madeireiro', 
                'Custo Recreação', 
              ]}
              onSliceHover={handleSliceHover}
              onSliceSelection={handleSliceSelection}
            /> */}
          </div>
        </div>
      </CustomTabPanel>
    </div>
  )
}