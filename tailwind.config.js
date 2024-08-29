/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-fill-500': 'repeat(auto-fill, minmax(500px, 1fr))',
        'auto-fit-500': 'repeat(auto-fit, minmax(500px, 1fr))',
        'auto-fit-288': 'repeat(auto-fit, minmax(288px, 1fr))',
      },
      maxWidth: {
        '32ch': '32ch',
        '42ch': '45ch',
        '45ch': '45ch',
        '55ch': '55ch',
        '65ch': '65ch',
      },
      colors: {
        /*****************/
        /* Final colors */
        /*****************/

        // Main colors
        lightGreen: '#5C8D4A',
        mediumGreen: '#558448',
        darkGreen: '#101917',
        neutral100: '#FCF8F8',
        neutral200: '#F7EEEE',

        // BarsData.js
        lowValueColor: '#FFB65C',
        highValueColor: '#E07B00',
        barLabelBorderColor: '#646464',

        //Results.js
        detailedInfoRectColor: '#DADADA',

        //HighlightedCost.js
        highlightRed: '#EA6557',


        /********************/
        /* Wireframe colors */
        /********************/

        // BarsData.js
        lowValueColor: '#EA6557',
        highValueColor: '#B62616',
        lowValueLightColor: '#E6E6E6',
        highValueLightColor: '#A6A6A6',

        recValueColor: '#EA6557',
        envValueColor: '#C6402F',
        
        optValueColor: '#5A8A70',
        recValueTooltipColor: '#F8CDC8',
        envValueTooltipColor: '#E2A8A2',
        recValueTooltipHoverColor: '#F08B80',
        envValueTooltipHoverColor: '#CC675C',
        recPercentValueColor: '#250804',
        envPercentValueColor: '#250804',
        barLabelColor: '#000000',
        barLabelBorderColor: '#646464',
        barsDataSectionBgColor: '#F3F4F6',

        //DonutChart.js
        bioprospecColor: '#00A0B0',
        carbonoColor: '#00A0B0',
        ersoaoColor: '#00A0B0',
        madeireiroColor: '#00A0B0',
        recreacaoColor: '#00A0B0',

        //Results.js
        infoRectColor: '#BFDDCE',
        detailedInfoRectColor: '#EAEAEA',

        //HighlightedCost.js
        // highlightRed: '#EA6557',
        highlightRed: '#C6402F',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
