import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { formatCurrencyNoDecimals } from "../utils";
import LegendDonutChart from "./LegendDonutChart";
import { useCurrency } from "../context/provider";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DonutChart({
    data,
    dataLabels,
    dataColors,
    onSliceHover,
    onSliceSelection
}) {
  const chartRef = useRef(null);
  const [chartInnerElement, setChartInnerElement] = useState(null);
  const [hoveredSlice, setHoveredSlice] = useState(null);
  const [selectedSlice, setSelectedSlice] = useState(null);
  const [currentSliceInfo, setCurrentSliceInfo] = useState(null);
  const [shouldRenderChart, setShouldRenderChart] = useState(false);
  const chartContainerRef = useRef(null);
  const currentSliceInfoRef = useRef(null);
  const totalData = data.reduce((acc, curr) => acc + curr, 0);
  const percentages = {}
  data.forEach((value, index) => percentages[dataLabels[index]] = (value / totalData * 100).toFixed(2) + '%' );
  console.log('percentages', percentages);

  const { currency } = useCurrency();

  const checkScrollPosition = useCallback(() => {
    if (chartContainerRef.current) {
      const rect = chartContainerRef.current.getBoundingClientRect();
      
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const partChartVisible = rect.top + scrollY + (rect.height / 3) <= scrollY + viewportHeight;
  
      if (partChartVisible) {
        setShouldRenderChart(true);
        window.removeEventListener('scroll', checkScrollPosition);
      }
    }
  }, []);

  const addCenterText = useCallback(() => {
    if (chartInnerElement) {
      const svgElement = chartInnerElement.closest('svg');
      
      if (svgElement) {
        const pieElement = svgElement.querySelector('.apexcharts-pie');
        if (!pieElement) return;

        let textElement = svgElement.querySelector('.center-text');
        
        if (!textElement) {
          // Create a new text element if it doesn't exist
          const svgNS = "http://www.w3.org/2000/svg";
          textElement = document.createElementNS(svgNS, "text");
          textElement.setAttribute("class", "center-text");
          textElement.setAttribute("text-anchor", "middle");
          textElement.setAttribute("dominant-baseline", "middle");
          textElement.setAttribute("fill", "#585B5F");
          textElement.setAttribute("font-size", "32");
          textElement.setAttribute("font-weight", "bold");

          // Get the bounding box of the pie element
          // const pieBBox = pieElement.getBBox();

          // console.log('[DonutChart] pieBBox', pieBBox);
          // console.log('[DonutChart] svgElement bounding box', svgElement.getBoundingClientRect());
          
          // Calculate the center coordinates of the pie
          // const centerX = pieBBox.x + pieBBox.width / 2;
          // const centerY = pieBBox.y + pieBBox.height / 2;
  
          // Set the position
          textElement.setAttribute("x", '50%');
          textElement.setAttribute("y", '50%');
  
          // Append the text element to the SVG
          svgElement.appendChild(textElement);
        }
  
        // Update the text content
        if (currentSliceInfo) {
          // textElement.textContent = currentSliceInfo.value;
          textElement.textContent = percentages[currentSliceInfo.label];
          textElement.style.display = 'block';
        } else if (hoveredSlice) {
          // textElement.textContent = hoveredSlice.value;
          textElement.textContent = percentages[hoveredSlice.label];
          textElement.style.display = 'block';
        } else {
          textElement.style.display = 'none';
        }
      }
    }
  }, [chartInnerElement, currentSliceInfo, hoveredSlice]);

  useEffect(() => {
    window.addEventListener('scroll', checkScrollPosition);
    checkScrollPosition(); // Check initial position
  
    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
    };
  }, [checkScrollPosition]);

  useEffect(() => {
    addCenterText();
  }, [addCenterText, chartInnerElement, currentSliceInfo, hoveredSlice]);

  useEffect(() => {
    if (selectedSlice) {
      if (selectedSlice.label === currentSliceInfoRef?.current?.label) {
        setCurrentSliceInfo(null);
        currentSliceInfoRef.current = null;
        onSliceSelection(null);
      } else {
        setCurrentSliceInfo(selectedSlice);
        currentSliceInfoRef.current = selectedSlice;
        onSliceSelection(selectedSlice);
      }
    }
  }, [selectedSlice]);

  const onSliceClick =  useCallback((event, chartContext, config) => {
    const { dataPointIndex } = config;
    const value = data[dataPointIndex];
    const label = dataLabels[dataPointIndex];

    setSelectedSlice({ label, value });
  }, [data, dataLabels, selectedSlice]);

  const onMouseMove = useCallback((e) => {
    const sliceIndex = e.target.getAttribute('j');
    // console.log('[onMouseMove] sliceIndex', sliceIndex);
    if (sliceIndex !== null && !selectedSlice) {
      const index = parseInt(sliceIndex);
      const value = data[index];
      const label = dataLabels[index];
      // console.log(`[onMouseMove] Entered slice: ${label}, Value: ${value}`);
      setHoveredSlice({ label, value });
      onSliceHover({ label, value });
    } else {
      setHoveredSlice(null);
      onSliceHover(null);
    }
  }, [data, dataLabels, hoveredSlice]);

  const options = {
    chart: {
        type: 'donut',
        // height: 400,
        events: {
          mounted: function(chartContext, config) {
              chartContext.el.addEventListener('mousemove', onMouseMove);
              const chartInnerHTMLElement = document.querySelector('.apexcharts-pie');
              // chartInnerHTMLElement.style.position = 'relative';
              const slicesElements = chartInnerHTMLElement.querySelectorAll('.apexcharts-pie-series');
              slicesElements.forEach(sliceElement => {
                sliceElement.style.cursor = 'pointer';
                // sliceElement.addEventListener('click', onSliceClick);
              });
              setChartInnerElement(chartInnerHTMLElement);
              console.log('[DonutChart] chartInnerElement', chartInnerHTMLElement);
              // chartContext.el.addEventListener('mousemove', onSliceHover);
              // chartContext.el.addEventListener('mouseleave', onSliceLeave);
          },
          dataPointSelection: onSliceClick,
        }
    },
    labels: dataLabels,
    tooltip: {
      y: {
        formatter: function (val, opts) {
          return formatCurrencyNoDecimals(currency, val);
        }
      }
    },
    // colors: ['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.25)', 'rgba(0, 0, 0, 0.1)'],
    colors: dataColors,
    plotOptions: {
        pie: {
            donut: {
                size: '65%',
            },
        },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['#FFFFFF']
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    // legend: {
    //   offsetY: 20,
    //   height: 300,
    //   // position: 'bottom',
    //   position: 'bottom',
    //   horizontalAlign: 'left',
    //   itemMargin: {
    //     horizontal: 80,
    //     vertical: 2
    //   },
    //   containerMargin: {
    //     left: 10,
    //     top: 10
    //   },
    //   columns: 2,
    //   fontSize: '14px',
    //   fontFamily: 'Helvetica, Arial',
    //   fontWeight: 400,
    //   labels: {
    //     colors: undefined,
    //     useSeriesColors: false
    //   },
    //   markers: {
    //     radius: 0,
    //   },
    //   formatter: function(seriesName, opts) {
    //     const leftMarginSpace = '&nbsp;&nbsp;&nbsp;'

    //     let processedSeriesName = seriesName;
    //     if (seriesName.length <= 30) {
    //       processedSeriesName += '&nbsp;'.repeat(15);
    //     }
    //     if (seriesName === 'Restabelecimento do Potencial de Bioprospecção') {
    //       return ['Restabelecimento do Potencial', 
    //               ' <br />', 
    //               leftMarginSpace, 
    //               'de Bioprospecção', 
    //               ' <br />', 
    //               leftMarginSpace, 
    //               opts.w.globals.series[opts.seriesIndex]]
    //     }
    //     return [processedSeriesName, " <br /> ", leftMarginSpace, opts.w.globals.series[opts.seriesIndex]]
    //   },
    // },
    // legend: {
    //     show: true,
    //     position: 'bottom',
    //     horizontalAlign: 'left',
    //     floating: true,
    //     fontSize: '14px',
    //     fontFamily: 'Helvetica, Arial',
    //     fontWeight: 400,
    //     formatter: function(seriesName, opts) {
    //         return [seriesName, " - ", opts.w.globals.series[opts.seriesIndex]]
    //     },
    //     offsetX: 0,
    //     offsetY: 50,
    //     labels: {
    //         colors: '#333',
    //     },
    //     markers: {
    //         width: 12,
    //         height: 12,
    //         strokeWidth: 0,
    //         strokeColor: '#fff',
    //         fillColors: undefined,
    //         radius: 12,
    //     },
    //     itemMargin: {
    //         horizontal: 5,
    //         vertical: 5
    //     },
    // },
    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                width: 300
            },
            legend: {
                position: 'bottom'
            }
        }
    }]
  };

// to-do: deixar a altura do container e do chart responsiva
    return (
        <div className="w-full flex flex-col gap-10 max-[479px]:items-center" ref={chartContainerRef}>
            {shouldRenderChart && (
              <Chart
                ref={chartRef}
                options={options}
                series={data}
                type='donut'
                width='100%'
                height='400px'
              />
            )}
            {/* <div>
              <p>Hovered Slice: {hoveredSlice?.label}</p>
              <p>Value: {hoveredSlice?.value}</p>
              <br/>
              <p>Selected Slice: {currentSliceInfo?.label}</p>
              <p>Value: {currentSliceInfo?.value}</p>
            </div> */}
            <LegendDonutChart 
              data={data}
              dataLabels={dataLabels}
              dataColors={dataColors}
              open={shouldRenderChart}
            />
        </div>
    )
}