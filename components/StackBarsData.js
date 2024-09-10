import { forwardRef, use, useEffect, useRef, useState } from "react";
import HighlightedCost from "./HighlightedCost";
import { Roboto_Condensed } from "next/font/google";
import { RiInformationLine } from "react-icons/ri";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import styles from '../styles/StackBarsData.module.css';
import LegendStackBar from "./LegendStackBar";
import { useCurrency } from "../context/provider";

const robotoCondensed = Roboto_Condensed({
  weight: ['300', '400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

// PROX PASSOS:
// 1. Fazer estado de hover das barras do custo estimado: mostra porcentagem dentro da barra
// 2. Testar com valores reais
// 3. Colocar cores

const TOOLTIP_WIDTH = 200;

const BarLabel = ({ children, isZeroCost = false, isRec = false, isEnv = false }) => {
  console.log('BarLabel - isZeroCost', isZeroCost);
  console.log('BarLabel - isRec', isRec);
  
  return (
    // w-full flex border-barLabelBorderColor border-t pt-2 
    // <div className={`
    //     border-barLabelBorderColor
    //     ${isRec ? 'border-recValueColor' : ''}
    //     ${isEnv ? 'border-envValueColor' : ''}
    //   `}>
    <div>
      {/* <span className={`
          text-barLabelColor tracking-wide text-sm inline-flex flex-wrap 
          ${robotoCondensed.className} 
          ${isRec ? 'text-recValueColor' : ''}
          ${isEnv ? 'text-envValueColor' : ''}
        `}>
        {children}
      </span> */}
      <span className={`
          text-barLabelColor tracking-wide text-sm inline-flex flex-wrap [@media(max-width:844px)]:text-xs
          ${robotoCondensed.className} 
        `}>
        {children}
      </span>
      {/* {
        (isZeroCost && isRec) &&
        <Tooltip title="O custo de recuperação é zero para desmatamento legal" placement="top">
          <RiInformationLine />
        </Tooltip>
      } */}

    </div>
    // </div>
  )
}

// to-do: deixar a largura das barras responsivas
const OpportunityBarContainer = forwardRef(({ cost, label, className, isOpCost = false, description, usoPosterior }, ref) => {
  const uso = usoPosterior === "pecuária" ? description.usos[0] : description.usos[1];
  const { currency, exchangeRate } = useCurrency();
  return (
      <div className="flex flex-col gap-8">
        <div className={`relative flex flex-col gap-1 items-end border-r border-[#a6a6a6] pr-3 ${styles.oportunityBar}`}>
          <span className={`text-barLabelColor tracking-wide text-base ${robotoCondensed.className} [@media(max-width:844px)]:text-sm text-right`}>{description.title + ' ' + uso}</span>
          <HighlightedCost cost={cost/exchangeRate} currency={currency} size='small' />
          <Tooltip 
            title={description.tooltip.parts[0] + ' ' + uso + ' ' + description.tooltip.parts[1]}
            componentsProps={{
              tooltip: {
                sx: {
                  px: 2,
                  py: 1.5,
                  letterSpacing: '0.3px',
                  textWrap: 'pretty',
                  borderRadius: '8px',  
                  fontSize: '0.9rem',
                  backgroundColor: 'rgba(252, 252, 255, 1)',
                  color: 'black',
                  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                }
              }
            }}
            enterTouchDelay={100}
          >
          <div className="absolute top-0 left-full ml-2 max-[339px]:ml-1 text-[1.4rem] text-gray-500 cursor-pointer">
            <RiInformationLine className={styles.tooltipIcon}/>
          </div>
        </Tooltip>
        </div>
        <div className={`flex gap-3 w-full ${isOpCost ? 'flex-row-reverse justify-end' : 'flex-row justify-start'}`}>
          {/* <div className="relative w-full w-min-[310px]">
            <div className="absolute top-[-40px] left-0">
            <HighlightedCost cost={cost} size='small' color='black' />
            </div>
            <BarLabel>{label}</BarLabel>
          </div> */}
          <div 
            ref={ref}
            // className={`${styles.linePattern} | w-[280px] w-max-[280px] h-min-[30px] py-4 px-6 flex flex-col gap-1 justify-between items-start text-barLabelColor font-sans text-lg transition-[height] duration-500 ease-in-out ${className}`}
            className={`${styles.oportunityBar} h-min-[10px] flex flex-col gap-1 justify-between items-start text-barLabelColor font-sans text-lg transition-[height] duration-500 ease-in-out ${className}`}
          >
            {/* <HighlightedCost cost={cost} size='small' color='black' /> */}
            {/* <BarLabel>{label}</BarLabel> */}
            {/* <div className="absolute top-0 left-[-12px] w-[16px]">
              lalala
            </div> */}
            
          </div>
        </div>
      </div>
  );
});

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip 
    {...props} 
    classes={{ popper: className }} 
    PopperProps={{
      disablePortal: true,
      sx: {
        zIndex: 9,
        '@media(max-width:529px)': {
          display: 'none',
        },
      },
      placement: 'left',
      modifiers: [
        // {
        //   name: 'preventOverflow',
        //   enabled: true,
        //   options: {
        //     altAxis: true,
        //     altBoundary: true,
        //     tether: false,
        //     rootBoundary: 'document',
        //     padding: 8,
        //   },
        // },
        {
          name: 'flip',
          enabled: false,
        },
        // {
        //   name: 'computeStyles',
        //   options: {
        //     gpuAcceleration: false,
        //     roundOffsets: false,
        //     adaptive: false,
        //   },
        // },
        // {
        //   name: 'offset',
        //   options: {
        //     offset: [0, -10], // Adjust these values as needed
        //   },
        // },
      ],
    }} 
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    // backgroundColor: '#d3d3d3',
    // color: '#d3d3d3',
    maxWidth: TOOLTIP_WIDTH,
    fontSize: theme.typography.pxToRem(12),
    transition: 'background-color 0.3s ease',
    // border: '1px solid #dadde9',
  },
}));

const TooltipContent = ({ label, cost, currency, isRec, isEnv }) => {
  console.log('isZeroCost', cost >= 0 && cost < 0.01);
  return (
    <div className="flex flex-col gap-2 p-2 items-begin [@media(max-width:768px)]:max-w-[130px]">
      <BarLabel isZeroCost={cost >= 0 && cost < 0.01} isRec={isRec} isEnv={isEnv}>{label}</BarLabel>
      <HighlightedCost cost={cost} currency={currency} size='text-[1.4rem] [@media(max-width:844px)]:text-[1.25rem] [@media(max-width:844px)]:text-base' />
    </div>
  );
}

const EnvironmentBarContainer = forwardRef(({ cost, costPercent, label, color }, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  const { currency, exchangeRate } = useCurrency();
  return (
    <CustomTooltip 
      open 
      arrow 
      placement="left"
      slotProps={{
        popper: {
          strategy: 'fixed',
          modifiers: [
            {
              name: 'flip',
              enabled: false,
            },
            {
              name: 'preventOverflow',
              enabled: false,
            },
          ],
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={<TooltipContent label={label} cost={cost/exchangeRate} currency={currency} isEnv={true} />}
      sx={{ 
        '& .MuiTooltip-tooltip .MuiTooltip-arrow': { 
          color: isHovered ? 'var(--envValueTooltipHoverColor)' : 'var(--envValueTooltipColor)',
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        },
        '& .MuiTooltip-tooltip': {
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
          backgroundColor: isHovered ? 'var(--envValueTooltipHoverColor)' : 'var(--envValueTooltipColor)',
        }
      }} 
    >
      <div 
        ref={ref}
        className={`${styles['stackBar']} | w-[280px] w-max-[280px] h-min-[10px] flex flex-col gap-1 justify-center items-center text-barLabelColor font-sans text-lg transition-[height] duration-500 ease-in-out ${color === 'low' ? 'bg-lowValueColor' : 'bg-highValueColor'}`} // ${isHovered ? 'bg-envValueTooltipHoverColor' : 'bg-envValueColor'}`}
      >
        {
          costPercent > 0.01 &&
          <span className={`${robotoCondensed.className} text-center font-bold text-3xl text-envPercentValueColor`}>{`${parseInt(costPercent)}%`}</span>
        }
      </div>
    </CustomTooltip>
  );
});

const RecoverBarContainer = forwardRef(({ cost, costPercent, label, color }, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  const{ currency, exchangeRate } = useCurrency();

  return (
    <CustomTooltip 
      open 
      arrow 
      placement="left"
      disableInteractive
      // disableHoverListener
      slotProps={{
        popper: {
          strategy: 'fixed',
          modifiers: [
            {
              name: 'flip',
              enabled: false,
            },
            {
              name: 'preventOverflow',
              enabled: false,
            },
          ],
        },
      }}
      title={<TooltipContent label={label} cost={cost/exchangeRate} currency={currency} isRec={true} />}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{ 
        '& .MuiTooltip-tooltip .MuiTooltip-arrow': { 
          color: isHovered ? 'var(--recValueTooltipHoverColor)' : 'var(--recValueTooltipColor)',
          // transition: 'color 0.3s ease', 
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        },
        '& .MuiTooltip-tooltip': {
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
          backgroundColor: isHovered ? 'var(--recValueTooltipHoverColor)' : 'var(--recValueTooltipColor)',
          // cursor: 'pointer',
          // transition: 'all 0.3s ease',
        },
        // '& .MuiTooltip-tooltip:hover': {
        //   backgroundColor: 'blue',
        // },
        // '& .MuiTooltip-tooltip:hover .MuiTooltip-arrow': {
        //   color: 'blue',
        // }
      }} 
    >
      <div 
        ref={ref}
        className={`${styles['stackBar']} | w-[280px] w-max-[280px] h-min-[10px] flex flex-col gap-1 justify-center items-center text-barLabelColor font-sans text-lg transition-[height] duration-500 ease-in-out ${color === 'low' ? 'bg-lowValueColor' : 'bg-highValueColor'}`}
      >
        {
          costPercent > 0.01 &&
          <span className={`${robotoCondensed.className} text-center font-bold text-3xl text-recPercentValueColor`}>{`${parseInt(costPercent)}%`}</span>
        }
      </div>
    </CustomTooltip>
  );
});

const StackBarsContainer = ({ children, cost, description }) => {
  const { currency, exchangeRate } = useCurrency();
  return (
    <div className="flex flex-col items-end gap-8 ml-tooltip-width max-[529px]:ml-0">
      <div className="w-full flex flex-col items-end border-r border-[#a6a6a6] pr-3 gap-1 [@media(max-width:844px)]:max-w-[150px]">
        <span className={`text-barLabelColor tracking-wide text-base ${robotoCondensed.className} [@media(max-width:844px)]:text-sm text-right`}>{description}</span>
        <HighlightedCost cost={cost/exchangeRate} currency={currency}  size='small' />
      </div>
      <div className="w-full h-auto h-max-[700px] flex flex-col gap-0 items-end">
        {children}
      </div>
    </div>
  )
}

export default function StackBarsData({ 
  custosDeRecuperacao, 
  custosAmbientais, 
  custoDeOportunidade, 
  isLegal,
  onBarHeightsChange,
  description,
  usoPosterior
}) {
  // const [minHeight, setMinHeight] = useState(null);
  const recuperacaoRef = useRef(null);
  const ambientaisRef = useRef(null);
  const oportunidadeRef = useRef(null);
  // const lineRef = useRef(null);
  // const [lineTop, setLineTop] = useState(0);
  const [data, setData] = useState([custosDeRecuperacao, custosAmbientais, custoDeOportunidade]);
  const { currency, exchangeRate } = useCurrency();

  // useEffect(() => {
  //   if (recuperacaoRef.current && ambientaisRef.current && oportunidadeRef.current) {
  //     setMinHeight(Math.max(recuperacaoRef.current.scrollHeight, ambientaisRef.current.scrollHeight, oportunidadeRef.current.scrollHeight));
  //   }
  // }, []);

  useEffect(() => {
    const newData = [custosDeRecuperacao, custosAmbientais, custoDeOportunidade];
    setData(newData);
  }, [custosDeRecuperacao, custosAmbientais, custoDeOportunidade]);
  
  useEffect(() => {
    const custosTotal = custosDeRecuperacao + custosAmbientais;

    const minHeight = 20;
    const maxHeight = 350; // Maximum height in pixels
    // const maxValue = Math.max(...data, 0.01);
    const scaleFactor = maxHeight / custosTotal;
    const scaledHeights = data.map(value => value * scaleFactor);

    console.log('[StackBarsData] data', data);
    console.log('[StackBarsData] scaledHeights', scaledHeights);

    if (recuperacaoRef.current && ambientaisRef.current && oportunidadeRef.current) {
      // const minHeight = Math.max(recuperacaoRef.current.scrollHeight, ambientaisRef.current.scrollHeight, oportunidadeRef.current.scrollHeight);
      // const minHeight = 100;
      // console.log('[StackBarsData] minHeight', minHeight);
      console.log('[StackBarsData] minHeight', minHeight);
      const additionalHeight = 20; // Additional height for low value bars
      const hasZeroValue = scaledHeights.some(value => value === 0 || (value > 0 && value < 0.01));
      const adaptedScaledHeights = scaledHeights.map(value => {
        if (hasZeroValue && (value > 0.01 && value < maxHeight)) {
          return Math.max(value, minHeight + additionalHeight);
        } else if (value >= 0 && value < 0.01) {
          return minHeight;
        }
        return value;
      });
      // console.log('[StackBarsData] adaptedScaledHeights', adaptedScaledHeights);
      // console.log('[StackBarsData] Math.max(scaledHeights[2]', Math.max(scaledHeights[2]));
      // console.log('[StackBarsData] oportunidadeRef.current.scrollHeight', oportunidadeRef.current.scrollHeight);
      const finalScaledHeights = adaptedScaledHeights.map(value => Math.max(value, minHeight));
      recuperacaoRef.current.style.height = `${Math.max(adaptedScaledHeights[0], minHeight)}px`;
      ambientaisRef.current.style.height = `${Math.max(adaptedScaledHeights[1], minHeight)}px`;
      oportunidadeRef.current.style.height = `${Math.max(adaptedScaledHeights[2], minHeight)}px`;
      
      console.log('[StackBarsData] finalScaledHeights', finalScaledHeights);

      onBarHeightsChange({
        recoverCost: finalScaledHeights[0],
        environmentCost: finalScaledHeights[1],
        opportunityCost: finalScaledHeights[2],
      });
      // Set the line position
      // const contentTop = oportunidadeRef.current.offsetTop;
      // setLineTop(contentTop);
    }
  }, [data]);

  const custosTotal = custosDeRecuperacao + custosAmbientais;
  const custosDeRecuperacaoPercent = custosDeRecuperacao / custosTotal * 100;
  const custosAmbientaisPercent = custosAmbientais / custosTotal * 100;
  console.log('[StackBarsData] custosDeRecuperacaoPercent', custosDeRecuperacaoPercent);
  console.log('[StackBarsData] custosAmbientaisPercent', custosAmbientaisPercent);

  return (
    <div className="flex flex-col gap-12 justify-center">
      <div className="hidden max-[529px]:flex py-4 px-6 border border-[#d3d3d3]">
        <LegendStackBar 
          data={[Math.round(custosDeRecuperacao/exchangeRate), Math.round(custosAmbientais/exchangeRate)]}
          currency={currency}
          dataLabels={[
            (
              isLegal ?
                description.tooltips[0] + description.legal
              :
                description.tooltips[0] + ":"
            ),
            description.tooltips[1]
          ]}
          dataColors={[
            custosDeRecuperacao < custosAmbientais ? 'low' : 'high',
            custosDeRecuperacao > custosAmbientais ? 'low' : 'high'
          ]}
        />
      </div>
      <div className={`w-full flex gap-24 justify-center items-end ${styles.globalVars} max-[634px]:gap-8 max-[900px]:gap-12`}>
        <StackBarsContainer cost={custosTotal} description={description.stack}>
          <RecoverBarContainer 
            ref={recuperacaoRef}
            cost={custosDeRecuperacao}
            costPercent={custosDeRecuperacaoPercent}
            label={ 
              isLegal ?
                description.tooltips[0] + description.legal
              :
                description.tooltips[0] + ":"
            }
            // className={custosDeRecuperacao < custosAmbientais ? 'bg-lowValueColor' : 'bg-highValueColor'}
            color={custosDeRecuperacao < custosAmbientais ? 'low' : 'high'}
          />
          <EnvironmentBarContainer 
            ref={ambientaisRef}
            cost={custosAmbientais}
            costPercent={custosAmbientaisPercent}
            label={description.tooltips[1]}
            // className={custosDeRecuperacao > custosAmbientais ? 'bg-lowValueColor' : 'bg-highValueColor'}
            color={custosDeRecuperacao > custosAmbientais ? 'low' : 'high'}
          />
        </StackBarsContainer>
        <OpportunityBarContainer 
          ref={oportunidadeRef}
          cost={custoDeOportunidade/exchangeRate}
          usoPosterior={usoPosterior}
          label="Custo de oportunidade da pecuária"
          isOpCost={true}
          className={'bg-optValueColor'}
          description={description.opportunity}
        />
      </div>
    </div>
  )
}