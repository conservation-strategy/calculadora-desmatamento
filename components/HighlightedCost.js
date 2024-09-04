import { Roboto } from 'next/font/google';
import { formatCostNumber, formatCurrencyNoDecimals } from "../utils";

const roboto = Roboto({
  weight: ['400', '500','700'],
  subsets: ['latin'],
})

export default function HighlightedCost({ cost, size = 'large', color, justifyLeft = false }) {
  return (
    <div className={`
        text-[#000000]
        ${color === 'red'? 'text-highlightRed' : ''}
        ${color === 'recoverCost' ? 'text-recValueColor' : ''}
        ${color === 'environmentCost' ? 'text-envValueColor' : ''}
        ${justifyLeft ? 'text-left' : 'text-right'}
      `}>
      <span className={`
        font-bold mr-1
        ${
          size === 'large' ? 'text-xl' : 
          size === 'small' ? 'text-xl max-[844px]:text-lg max-[429px]:text-base' :
          'text-base'
        }
        ${roboto.className} 
        `}>
          R$ 
      </span>
      <span 
        className={`
          font-bold 
          ${roboto.className} 
          ${
            size === 'large' ? 'text-4xl max-[644px]:text-3xl' : 
            size === 'small' ? 'text-3xl max-[844px]:text-2xl max-[644px]:text-xl max-[429px]:text-base' : 
            size  ? size : 'text-2xl'
          }
          ${roboto.className}
        `}>
        {formatCostNumber(cost)}
      </span>
    </div>
  )
}