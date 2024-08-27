import { Roboto_Condensed } from 'next/font/google';
import { RiArticleFill } from "react-icons/ri";

const robotoCondensed = Roboto_Condensed({
  weight: ['300', '400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

const SectionSubtitle = ({ children }) => {
  return (
    <h3 className={`font-bold text-2xl ${robotoCondensed.className}`}>{children}</h3>
  )
}

const SectionBodyText = ({ children }) => {
  return (
    <p className={`text-lg tracking-wide max-w-35ch`}>{children}</p>
  )
}

export default function ResultsSeparateHeader() {
  // const robotoClass = robotoCondensed.className;

  return (
    <div className="flex flex-col w-full">    
      <div className="px-8 py-10 flex items-center gap-4 w-full mt-40 border-t-8 border-black text-[#073C29] text-2xl md:text-2xl font-bold ">
        <RiArticleFill />
        <h3 className="font-bold text-2xl ">Resultados</h3>
      </div>
      <div className="px-8 py-10 flex flex-col gap-4 w-full border-t-8 border-black">
        <div className='flex flex-col gap-4'>
          <SectionSubtitle>Custo total estimado</SectionSubtitle>
          <SectionBodyText>O custo total do desmatamento na Amazônia, calculado a partir dos valores inseridos, é de </SectionBodyText>
        </div>
        <div>
          <SectionSubtitle>Custos Detalhados</SectionSubtitle>
        </div>
        <div>
          <SectionSubtitle>Resumo dos Resultados</SectionSubtitle>
        </div>
      </div>
    </div>
  )
}