import dynamic from 'next/dynamic';
import { AreaChart, BarChart, DonutChart } from '../../components/MockGraphs';
// const AreaChart = dynamic(
//   () => import('../../components/MockGraphs'),
//   { ssr: false } // This will load the component only on client side
// )

export default function Layout() {
    return (
      <div
        className="bg-auto bg-center pb-10"
        //style={{ backgroundImage: `url("/images/bg1_blur.jpg")` }}
      >
        <div className="flex flex-col min-h-screen max-w-screen-sm md:max-w-screen-2xl mx-auto border-l-8 border-r-8 border-black bg-white bg-opacity-100">
          <div className='text-4xl font-bold p-4 w-full text-center'>
            Gráficos
          </div>
          <div className='p-2 sm:p-4 md:p-6 lg:p-14 grid grid-cols-auto-fit-288 md:grid-cols-auto-fit-500 gap-2 sm:gap-4 md:gap-6 lg:gap-8 items-center justify-items-center'>
            <AreaChart/>
            <BarChart/>
            <DonutChart/>
            <AreaChart/>
          </div>
        </div>
      </div>
    )
}