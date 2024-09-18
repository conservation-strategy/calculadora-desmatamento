import { useContext } from "react";
import { Language, ENGLISH } from "../context/provider";
import CurrencyToggle from "./CurrencyToggle";
import { Tooltip } from "@mui/material";
import { RiInformationLine } from "react-icons/ri";
import { formatDateToBrazilianStandard } from "../utils";
import { Roboto_Condensed } from "next/font/google";

const robotoCondensed = Roboto_Condensed({
  weight: ['300', '400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export default function Currency({ currency, onCurrencyChange, quotation }) {
  const { content, language } = useContext(Language);
  const { results } = content;

  // 320 to 676px

  //max-[409px]:max-w-[35ch] 

  return (
    <div id="currency-box" className={`flex flex-col gap-6 p-6 pr-10 bg-gray-200 max-[800px]:w-full max-[800px]:mt-4 ${robotoCondensed.className}`}>
      <div className="flex items-center justify-star gap-3 max-[403px]:flex-col max-[403px]:items-start ">
        <p>{results.currency.intro}</p>
        <CurrencyToggle onCurrencyChange={onCurrencyChange} currency={currency} dense={true} />
      </div>
      <div className='flex items-start text-left text-xs italic'>
        <span className='flex flex-wrap'>
          <span className=''>
            {results.note.quotation}{' '}{Number(quotation.value).toFixed(2)}{' R$/US$,'}
            &nbsp;
          </span>
          <span>{results.note.date}{' '}{language === ENGLISH ? quotation.date.slice(0, 10) : formatDateToBrazilianStandard(quotation.date)}{','}
            &nbsp;
          </span>
          <span className='whitespace-nowrap relative'>
            {results.note.source}{' '}{quotation.fallback ? 'Currencybeacon' : 'Banco Central do Brasil'}{'.'}
            <Tooltip 
              title={results.note.intro}
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
              <span className="absolute right-[-18px] bottom-[3px] max-[339px]:ml-1 text-[1.4rem] text-gray-500 cursor-pointer">
                <RiInformationLine color={'#313131'} style={{width: '0.9rem', height: '0.9rem'}} />
              </span>
            </Tooltip>
          </span>
        </span>
      </div>
    </div>
  );
}