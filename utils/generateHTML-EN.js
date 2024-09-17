import { formatCostNumber, formatDate } from ".";

export const generateHTML_EN = ({
  inputData,
  custos,
  chartHtml,
  currentBarHeights,
  logoUrl,
  logoCSFUrl,
//   isBrasil,
  currentURL,
  currency
}) => {

    const isRecoverCostZero = custos.custosDeRecuperacao >= 0 && custos.custosDeRecuperacao < 0.01;
    const isEnvironmentCostZero = custos.custosAmbientais.total >= 0 && custos.custosAmbientais.total < 0.01;

    const recCostPercent = parseInt(custos.custosDeRecuperacao / custos.custoTotal * 100);
    const envCostPercent = parseInt(custos.custosAmbientais.total / custos.custoTotal * 100);
    const bioprosCostPercent = parseInt(custos.custosAmbientais.custoBiopros / custos.custosAmbientais.total * 100);
    const carbonoCostPercent = parseInt(custos.custosAmbientais.custoCarbono / custos.custosAmbientais.total * 100);
    const assoreamentoCostPercent = parseInt(custos.custosAmbientais.custoAssoreamento / custos.custosAmbientais.total * 100);
    const madeireiroOuNaoMadeireiroCostPercent = parseInt(custos.custosAmbientais.custoMadeireiroOuNaoMadeireiro / custos.custosAmbientais.total * 100);
    const recreacaoCostPercent = parseInt(custos.custosAmbientais.custoRecreacao / custos.custosAmbientais.total * 100);

    const currentDate = formatDate('en-US', currentURL);

    const colorsCostsLegend = {
        'custoBiopros': '#639DE3',
        'custoCarbono': '#FF8C00',
        'custoAssoreamento': '#5A8A70',
        'custoMadeireiroOuNaoMadeireiro': '#EA6557',
        'custoRecreacao': '#6D213C',
    }

    // const originalMaxHeight = 350;
    // const newMaxHeight = 200;
    // const resizedBarHeights = {
    //     recoverCost: Math.round(currentBarHeights.recoverCost * (newMaxHeight / originalMaxHeight)),
    //     environmentCost: Math.round(currentBarHeights.environmentCost * (newMaxHeight / originalMaxHeight)),
    //     opportunityCost: Math.round(currentBarHeights.opportunityCost * (newMaxHeight / originalMaxHeight)),
    // }

  return (`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Results</title>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap" rel="stylesheet">
        <style>
            /* CSS Reset and Global Styles */
            *, *::before, *::after {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
            }

            html {
                font-size: 16px;
                line-height: 1.5;
                -webkit-text-size-adjust: 100%;
                -webkit-tap-highlight-color: transparent;
            }

            body {
                font-family: 'Roboto', sans-serif;
                color: #333;
                background-color: #fff;
                min-height: 100vh;
                text-rendering: optimizeSpeed;
            }

            img, picture, video, canvas, svg {
                display: block;
                max-width: 100%;
            }

            /* Component Styles */
             @page {
                size: A4;
            }
            .page-break {
                page-break-before: always;
            }
            
            .header {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.2rem 2rem;
                background-color: #0C130F;
                flex-grow: 0;
            }

            .header--small {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.8rem 2rem;
                background-color: #0C130F;
                flex-grow: 0;
            }

            .logo {
                display: flex;
                align-items: center;
                gap: 1rem;
            }

            .title {
                color: #F7EEEE;
                font-size: 1.5rem;
                font-weight: bold;
                font-family: 'Roboto', sans-serif;
                letter-spacing: 0.025em;
            }

            .header--small .title {
                font-size: 1rem;
            }

            .csf-logo {
                opacity: 0.5;
            }

            .footer {
                width: 100%;
                height: 40px;
                background-color: #0C130F;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                padding: 0.4rem 2rem;
                color: #EAEAEA;
                font-size: 0.8rem;
                flex-grow: 0;
                position: relative;
            }

            .page-container {
                height: 1048px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: stretch;
                gap: 2rem;
            }

            .results-container {
                height: 100%;
                padding: 0rem 2rem;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: flex-start;
                flex-grow: 1;
                gap: 2.5rem;
                width: 100%;
            }

            .content-wrapper {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
                width: 100%;
                max-width: 1163px;
                margin-left: auto;
                margin-right: auto;
            }

            .section-subtitle {
                color: #0C130F;
                font-weight: bold;
                font-size: 1.5rem;
                line-height: 1.2;
                font-family: 'Roboto Condensed', sans-serif;
                border-left: 5px solid #0C130F;
                padding-left: 0.8rem;
            }

            .flex-container {
                display: flex;
                justify-content: space-between;
                gap: 5rem;
                width: 100%;
            }

            .content-column {
                display: flex;
                flex-direction: column;
                gap: 0.8rem;
                width: 100%;
                /* min-width: 32ch; */
                /* max-width: 75ch; */
            }

            .body-text {
                display: flex;
                /* max-width: 65ch; */
            }

            .body-text p {
                font-size: 1.05rem;
                line-height: 1.7;
                letter-spacing: 0.025em;
                font-family: 'Roboto', sans-serif;
            }

            .highlighted-cost {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                line-height: 190%;
            }

            .highlighted-cost span {
                font-size: 1.4rem;
                font-weight: 700;
                color: #EA6557;
                font-family: 'Roboto', sans-serif;
            }

            .highlighted-cost .currency {
                font-size: 1.2rem;
            }

            .body-comment, 
            .body-comment--small {
                display: flex;
            }
            
            .body-comment--centered {
                width: 100%;
                display: flex;
                justify-content: center;
                /* max-width: 42ch; */
            }
            
            .body-comment--small p {
                width: 100%;
                font-size: 0.8rem;
                line-height: 1.625;
                border-left: 1px solid #6E6E6E;
                padding-left: 1rem;
                margin-top: 0.3rem;
                color: #3D3D3D;
                font-family: 'Roboto', sans-serif;
            }

            .notes-container {
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 1rem;
                border-top: 1px solid #AFAFAF;
                padding-top: 1rem;
                margin-top: 1rem;
            }

            .notes-container span {
                font-size: 0.9rem;
            }

            .note {
                width: 100%;
                font-size: 0.7rem;
                color: #3D3D3D;
                font-family: 'Roboto', sans-serif;
                letter-spacing: 0.025em;
            }

            .body-comment p,
            .body-comment--centered p {
                max-width: 65ch;
                font-size: 0.9rem;
                letter-spacing: 0.025em;
                line-height: 1.625;
                border-left: 1px solid #6E6E6E;
                padding-left: 1rem;
                margin-top: 1rem;
                color: #3D3D3D;
                font-family: 'Roboto', sans-serif;
            }

            .info-rectangle-container {
                margin-top: 0.5rem;
                width: 100%;
                max-width: 42rem;
                place-content: center;
            }

            .info-rectangle {
                display: flex;
                width: 100%;
                /* max-width: 32rem; */
                background-color: transparent;
                color: hsl(133, 0%, 18%);
                border-radius: 0.3rem;
                padding: 2rem 3rem;
                font-size: 1.125rem;
                font-weight: 500;
                border: 1px solid #d3d3d3;
                /* box-shadow: rgba(100, 100, 111, 0.07) 0px 7px 29px 0px; */
            }

            .info-content {
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 2rem;
                white-space: nowrap;
            }

            .info-row {
                height: auto;
                display: flex;
                flex: nowrap;
                gap: 3rem;
                justify-content: space-between;
                border-bottom: 1px solid #d3d3d3;
                padding-bottom: 1rem;
            }

            .info-label {
                font-family: 'Roboto Condensed', sans-serif;
                font-weight: 400;
                opacity: 0.8;
            }

            .info-value {
                font-family: 'Roboto', sans-serif;
                font-weight: 400;
                opacity: 1;
            }

            .font-bold {
                font-weight: bold;
            }

            .bar-chart-container {
                height: 478px;
                display: flex;
                justify-content: flex-end;
                align-items: flex-end;
                gap: 1rem;
                padding: 2rem;
                padding-right: 1.5rem;
                padding-bottom: 0;
                width: 100%;
                background-color: #F3F4F6;
                position: relative;
            }

            .stack-bar-container,
            .simple-bar-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0;
            }

            .bar-label {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                gap: 0.3rem;
                font-size: 0.9rem;
                letter-spacing: 0.025em;
                font-family: 'Roboto Condensed', sans-serif;
                font-weight: 500;
                margin-bottom: 1rem;
                /* padding-left: 0.5rem;
                border-left: 1px solid #6E6E6E; */
                border: 1px solid #cfcfcf;
                border-radius: 4px;
                background-color: #FFFFFF;
                padding: 0.8rem;
            }

            .bar-label span {
                font-family: 'Roboto', sans-serif;
                font-size: 1rem;
                font-weight: 500;
            }

            .bar-label .currency-small {
                font-size: 0.8rem;
                font-weight: 500;
            }

            .bar {
                width: 120px;
                max-height: 350px;
                position: relative;
                display: flex;
                justify-content: flex-end;
                align-items: flex-end;
                padding-right: 0.2rem;
            }

            .bar#rec {
                background-color: #EA6557;
            }

            .bar#env {
                background-color: #C6402F;
            }

            .bar#opt {
                background-color: #5A8A70;
            }

            .tooltips-container {
                position: absolute;
                top: 2rem;
                left: 2rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
                gap: 2rem;
            }

            .fixed-tooltip-container {
                width: 20ch;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
                gap: 0.3rem;
            }

            #fixed-rec,
            #fixed-env {
                display: none;
            }

            .tooltip-container,
            .tooltip-container--null-value {
                position: absolute;
                right: calc(100% + 5px); /* 100% of its own width plus 10px */
                top: 50%;
                transform: translateY(-50%);
                width: 220px;
                /* height: 80px; */
                background-color: transparent;
                /* border: 1px solid blue; */
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 0.3rem;
            }

            .tooltip-container--null-value {
                top: 100%;
            }

            .tooltip-label {
                /* border-top: 1px solid #EA6557; */
                padding-top: 0.5rem;
                padding-right: 1.2rem;
                font-size: 0.9rem;
                font-weight: 500;
                font-family: 'Roboto Condensed', sans-serif;
                width: 100%;
                text-align: left;
                position: relative;
            }

            #rec .tooltip-label,
            #fixed-rec .tooltip-label {
                border-top: 1px solid #EA6557;
            }

            #env .tooltip-label,
            #fixed-env .tooltip-label {
                border-top: 1px solid #C6402F;
            }

            .tooltip-value {
                width: 100%;
                text-align: left;
                font-size: 1.2rem;
                font-weight: 500;
                padding-right: 1.2rem;
            }

            #rec .tooltip-value,
            #fixed-rec .tooltip-value {
                color: #EA6557;
            }

            #env .tooltip-value,
            #fixed-env .tooltip-value {
                color: #C6402F;
            }

            .tooltip-value span {
                font-size: 0.9rem;
                font-weight: 500;
            }

            .marker {
                position: absolute;
                top: -0.25rem;
                right: 0;
                border-radius: 50%;
                /* background-color: #8e8e8e; */
                width: 0.5rem;
                height: 0.5rem;
            }

            #rec .marker {
                background-color: #EA6557;
            }

            #env .marker {
                background-color: #C6402F;
            }

     …      .doghnut-chart-container {
                width: 100%;
                font-family: 'Roboto', sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
            }

            #doghnut-chart {
                margin-top: -3rem;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .bold-text {
                font-weight: 500;
            }

            .percent-label {
                width: 100%;
                text-align: right;
                font-size: 0.9rem;
                font-weight: 500;
                color: #F9D5D2;
                line-height: 100%;
                margin-bottom: 2px;
            }

            #env .percent-label {
                color: #F6BDB6;
            }

            .custom-table {
                max-width: 950px;
                border-collapse: collapse;
                border: 1px solid rgba(0, 0, 0, 0.3);
            }

            .table-header {
                padding: 24px;
                font-size: 1rem;
                font-weight: bold;
                border: 1px solid rgba(0, 0, 0, 0.3);
                text-align: left;
            }

            .table-cell {
                padding: 20px;
                font-size: 1rem;
                border: 1px solid rgba(0, 0, 0, 0.3);
            }

            .text-right {
                text-align: right;
                white-space: nowrap;
            }

            .table-cell:first-child {
                font-weight: 500;
            }

            .table-cell:last-child {
                font-size: 1.1rem;
            }

            .chart-legend-container {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
            }
            .chart-legend {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                grid-template-rows: repeat(3, auto);
                column-gap: 3rem;
                row-gap: 1rem;
                margin-left: 3.5rem;
            }

            .legend-item {
                display: flex;
                flex-direction: row;
                gap: 0.7rem;
            }

            .legend-color {
                margin-top: 5px;
                min-width: 1rem;
                width: 1rem;
                min-height: 1rem;
                height: 1rem;
            }

            .legend-text {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }

            .legend-label {
                font-size: 1rem;
                font-weight: 600;
            }

            .legend-value {
                font-size: 0.9rem;
                font-weight: 500;
                color: #2C2C2C;
            }
            

        </style>
    </head>
    <body>
        <div class="page-container page-break">
            <div class="header">
                <div class="logo">
                    <img src="${logoUrl}" alt="CSF Logo" width="56" height="56" />
                    <span class="title">Deforestation Impact Calculator</span>
                </div>
                <div class="csf-logo">
                    <img src="${logoCSFUrl}" alt="CSF Logo" width="36" height="36" />
                </div>
            </div>
            <div class="results-container">
                <div class="content-wrapper">
                    <div class="content-column">
                        <div class="body-text">
                            <p>This report is automatically generated from the inputs entered in the <span class="bold-text">Deforestation Impact Calculator</span>. It presents an analysis of the loss of ecosystem services and of the restoration costs associated with the deforestation of the Amazon, to give a broad vision of the economical and environmental impacts in the region. </p>
                        </div>
                    </div>
                </div>    
                <div class="content-wrapper">
                    <h3 class="section-subtitle">Inputs</h3>
                    <div class="flex-container">
                        <div class="info-rectangle-container">
                            <div class="info-rectangle">
                                <div class="info-content">
                                    <div class="info-row">
                                        <span class="info-label">${inputData.city && inputData.uf ? 'Municipality / State' : 'Location'}</span>
                                        <span class="info-value">${inputData.city && inputData.uf ? `${inputData.city} / ${inputData.uf}` : 'Average values for the Amazon'}</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">Total impacted area</span>
                                        <span class="info-value">${inputData.ha} ha</span>
                                    </div>
                                    <div class="info-row">
                                    <span class="info-label">Riparian Forest</span>
                                    <span class="info-value">${inputData.app ? 'Yes' : 'No'}</span>
                                    </div>
                                    <div class="info-row">
                                    <span class="info-label">Area with recreational potential</span>
                                    <span class="info-value">${inputData.recreacao ? 'Yes' : 'No'}</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">Subsequent land use</span>
                                        <span class="info-value">${inputData.usoPosterior === 'pecuária' ? 'Livestock farming' : 'Agriculture'}</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">Legality of deforestation</span>
                                        <span class="info-value">${inputData.legal ? 'Legal' : 'Ilegal'}</span>
                                    </div>
                                    ${
                                        !inputData.legal ?
                                            `<div class="info-row">
                                                <span class="info-label">Restoration techniques</span>
                                                <span class="info-value">${inputData.restauracao === 'natural' ? 'Natural Regeneration' : 'Direct Seeding'}</span>
                                            </div>`
                                        :
                                            ''
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer" style="margin-top: 1rem;">${currentDate}</div>
          </div>
          <div class="page-container page-break">
            <div class="header--small">
                <div class="logo">
                    <img src="${logoUrl}" alt="CSF Logo" width="36" height="36" />
                    <span class="title">Deforestation Impact Calculator</span>
                </div>
                <div class="csf-logo">
                    <img src="${logoCSFUrl}" alt="CSF Logo" width="24" height="24" />
                </div>
            </div>
            <div class="results-container" style="gap: 2rem;">
                <div class="content-wrapper">
                    <h3 class="section-subtitle">Total estimated costs</h3>
                    <div class="flex-container" style="margin-top: -0.5rem;">
                        <div class="content-column" >
                            <div class="body-text">
                                <p>The total cost of deforestation ${inputData.city && inputData.uf ? `in the municipality of ${inputData.city} (${inputData.uf})` : 'in the Amazon'}, calculated based on the values entered, is </p>
                            </div>
                            <div class="highlighted-cost">
                                <span><span class="currency">${currency} </span>${formatCostNumber(custos.custoTotal)}</span>
                            </div>
                            <div class="body-text">
                                ${
                                    inputData.legal ?
                                        `<p>This value represents the sum of all environmental damages needed to mitigate the impacts caused by deforestation. </p>`
                                    :
                                        `<p>This value represents the sum of all environmental damages and the restoration costs needed to mitigate the impacts caused by deforestation.</p>`
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-wrapper" style="margin-top: -1rem;">
                    <h3 class="section-subtitle">Comparative analysis</h3>
                    <div class="flex-container" style="margin-top: -0.5rem;">
                        <div class="content-column">
                            <div class="body-text">
                                <p>The estimated values can be divided into two main categories: <span class="font-bold">restoration costs</span> and <span class="font-bold">loss of ecosystem services</span>. </p>
                            </div>
                            <div class="bar-chart-container">
                                <div class="tooltips-container">
                                    <div id="fixed-rec" class="fixed-tooltip-container">
                                        <span class="tooltip-value"><span>${currency} </span>${formatCostNumber(custos.custosDeRecuperacao)}</span>
                                        <span class="tooltip-label">${ 
                                                isRecoverCostZero ? 
                                                    'Estimated value of <span class="bold-text">restoration costs</span> is zero for legal deforestation.' 
                                                : 
                                                    'Estimated value of <span class="bold-text">restoration costs</span>'
                                                } 
                                            <div class="marker"></div>
                                        </span>
                                    </div>
                                    <div id="fixed-env" class="fixed-tooltip-container"> 
                                        <span class="tooltip-value"><span>${currency} </span>${formatCostNumber(custos.custosAmbientais.total)}</span>
                                        <span class="tooltip-label">Estimated value of <span class="bold-text">ecosystem service loss</span><div class="marker"></div></span>
                                    </div>
                                </div>
                                <div class="stack-bar-container">
                                    <div class="bar-label">
                                        Total estimated impact
                                        <span><span class="currency-small">${currency} </span>${formatCostNumber(custos.custoTotal)}</span>
                                    </div>
                                    <div class="bar" id="rec" style="height: ${currentBarHeights.recoverCost}px;">
                                        <div id="rec-tooltip" class="tooltip-container ${isRecoverCostZero ? 'tooltip-container--null-value' : ''}"> 
                                            <span class="tooltip-value"><span>${currency} </span>${formatCostNumber(custos.custosDeRecuperacao)}</span>
                                            <span class="tooltip-label">${ 
                                                    isRecoverCostZero ? 
                                                        'Estimated value of restoration costs is zero for legal deforestation.' 
                                                    : 
                                                        'Estimated value of restoration costs'
                                                    } 
                                                <div class="marker"></div>
                                            </span>
                                        </div>
                                        <div class="percent-label">${recCostPercent}%</div>
                                    </div>
                                    <div class="bar" id="env" style="height: ${currentBarHeights.environmentCost}px;">
                                        <div id="env-tooltip" class="tooltip-container ${isEnvironmentCostZero ? 'tooltip-container--null-value' : ''}"> 
                                            <span class="tooltip-value"><span>${currency} </span>${formatCostNumber(custos.custosAmbientais.total)}</span>
                                            <span class="tooltip-label">Estimated value of ecosystem service loss <div class="marker"></div></span>
                                        </div>
                                        <div class="percent-label">${envCostPercent}%</div>
                                    </div>
                                </div>
                                <div class="simple-bar-container">
                                    <div class="bar-label">
                                        Profitability of ${inputData.usoPosterior === 'pecuária' ? 'livestock farming' : 'agriculture'}¹
                                        <span><span class="currency-small">${currency} </span>${formatCostNumber(custos.custoDeOportunidade)}</span>
                                    </div>
                                    <div class="bar" id="opt" style="height: ${currentBarHeights.opportunityCost}px;">
                                        
                                    </div>
                                </div>
                            </div>
                            
                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer" style="margin-top: -32px;">
                ${currentDate}
            </div>
            
          </div>
          <div class="page-container page-break">
            <div class="header--small">
                <div class="logo">
                    <img src="${logoUrl}" alt="CSF Logo" width="36" height="36" />
                    <span class="title">Deforestation Impact Calculator</span>
                </div>
                <div class="csf-logo">
                    <img src="${logoCSFUrl}" alt="CSF Logo" width="24" height="24" />
                </div>
            </div>
            <div class="results-container" style="justify-content: flex-start; margin-top: 1rem;">
              <div class="content-wrapper">
                <h3 class="section-subtitle">Loss of ecosystem services</h3>
                <div class="flex-container">
                    <div class="content-column" style="gap: 2rem;">
                        <div class="body-text">
                            <p>With the estimated values, we can analyze the environmental costs of deforestation in the Amazon. These costs include the loss of ecosystem services such as the potential for bioprospecting, the negative impact on the forest's capacity to capture and store carbon, erosion and sedimentation of water bodies, and the reduction in land use alternatives such as the loss of potential for recreation, as well as the loss of forest products, both timber and non-timber.</p>
                        </div>
                        <div class="doghnut-chart-container">
                            ${chartHtml}
                        </div>
                        <div class="chart-legend-container" style="margin-top: -0.8rem;">
                            <div class="chart-legend">
                                <div class="legend-item">
                                    <div class="legend-color" style="background-color: ${colorsCostsLegend.custoCarbono};"></div>
                                    <div class="legend-text">
                                        <span class="legend-label">Loss of Carbon Sequestration</span>
                                        <span class="legend-value">${`${currency} ${formatCostNumber(custos.custosAmbientais.custoCarbono)}`} ${` (${carbonoCostPercent}%)`}</span>
                                    </div>
                                </div>
                                <div class="legend-item">
                                    <div class="legend-color" style="background-color: ${colorsCostsLegend.custoAssoreamento};"></div>
                                    <div class="legend-text">
                                        <span class="legend-label">Erosion and Siltation</span>
                                        <span class="legend-value">${`${currency} ${formatCostNumber(custos.custosAmbientais.custoAssoreamento)}`} ${` (${assoreamentoCostPercent}%)`}</span>
                                    </div>
                                </div>
                                <div class="legend-item">
                                    <div class="legend-color" style="background-color: ${colorsCostsLegend.custoMadeireiroOuNaoMadeireiro};"></div>
                                    <div class="legend-text">
                                        <span class="legend-label">Loss of Producing Timber or Non-Timber Products</span>
                                        <span class="legend-value">${`${currency} ${formatCostNumber(custos.custosAmbientais.custoMadeireiroOuNaoMadeireiro)}`} ${` (${madeireiroOuNaoMadeireiroCostPercent}%)`}</span>
                                    </div>
                                </div>
                                <div class="legend-item">
                                    <div class="legend-color" style="background-color: ${colorsCostsLegend.custoRecreacao};"></div>
                                    <div class="legend-text">
                                        <span class="legend-label">Loss of Recreational <br /> Opportunities</span>
                                        <span class="legend-value">${`${currency} ${formatCostNumber(custos.custosAmbientais.custoRecreacao)}`} ${` (${recreacaoCostPercent}%)`}</span>
                                    </div>
                                </div>
                                <div class="legend-item">
                                    <div class="legend-color" style="background-color: ${colorsCostsLegend.custoBiopros};"></div>
                                    <div class="legend-text">
                                        <span class="legend-label">Loss of Future Potential with Bioprospecting</span>
                                        <span class="legend-value">${`${currency} ${formatCostNumber(custos.custosAmbientais.custoBiopros)}`} ${` (${bioprosCostPercent}%)`}</span>
                                    </div>
                                </div>
                                

                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
            <div class="footer" style="margin-top: -12px;">${currentDate}</div>
          </div>
          <div class="page-container page-break">
            <div class="header--small">
                <div class="logo">
                    <img src="${logoUrl}" alt="CSF Logo" width="36" height="36" />
                    <span class="title">Deforestation Impact Calculator</span>
                </div>
                <div class="csf-logo">
                    <img src="${logoCSFUrl}" alt="CSF Logo" width="24" height="24" />
                </div>
            </div>
            <div class="results-container" style="justify-content: flex-start; margin-top: 1rem;">
              <div class="content-wrapper">
                  <h3 class="section-subtitle">Summary</h3>
                  <div class="flex-container">
                      <div class="content-column" style="margin-top: 1rem;">
                          <table class="custom-table">
                              <thead>
                                  <tr>
                                  <th class="table-header">Cost description</th>
                                  <th class="table-header text-right">Value (${currency})</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr>
                                  <td class="table-cell">Loss of Future Potential with Bioprospecting</td>
                                  <td class="table-cell text-right">${currency} ${formatCostNumber(custos.custosAmbientais.custoBiopros)}</td>
                                  </tr>
  
                                  <tr>
                                  <td class="table-cell">Loss of Carbon Sequestration</td>
                                  <td class="table-cell text-right">${currency} ${formatCostNumber(custos.custosAmbientais.custoCarbono)}</td>
                                  </tr>
  
                                  <tr>
                                  <td class="table-cell">Erosion and Siltation</td>
                                  <td class="table-cell text-right">${currency} ${formatCostNumber(custos.custosAmbientais.custoAssoreamento)}</td>
                                  </tr>
  
                                  <tr>
                                  <td class="table-cell">Loss of Producing Timber or Non-Timber Products</td>
                                  <td class="table-cell text-right">${currency} ${formatCostNumber(custos.custosAmbientais.custoMadeireiroOuNaoMadeireiro)}</td>
                                  </tr>
  
                                  <tr>
                                  <td class="table-cell">Loss of Recreational Opportunities</td>
                                  <td class="table-cell text-right">${currency} ${formatCostNumber(custos.custosAmbientais.custoRecreacao)}</td>
                                  </tr>
  
                                  <tr>
                                  <td class="table-cell">Total loss of ecosystem services</td>
                                  <td class="table-cell text-right">${currency} ${formatCostNumber(custos.custosAmbientais.total)}</td>
                                  </tr>
  
                                  <tr>
                                  <td class="table-cell">Restoration costs</td>
                                  <td class="table-cell text-right">${currency} ${formatCostNumber(custos.custosDeRecuperacao)}</td>
                                  </tr>
  
                                  <tr>
                                  <td class="table-cell">Total</td>
                                  <td class="table-cell text-right">${currency} ${formatCostNumber(custos.custoTotal)}</td>
                                  </tr>
                              </tbody>
                              </table>
                      </div>
                  </div>
              </div>
                <div class="notes-container">
                    <span>Notas</span>
                    <div class="note">
                        <p>¹ The profitability value of ${inputData.usoPosterior === 'pecuária' ? 'livestock farming' : 'agriculture'} was included as external data for comparison purposes. This data allows for contextualizing the financial impacts of deforestation in relation to a common economic alternative in the region.</p>
                    </div>
                </div>
            </div>
            
            <div class="footer" style="margin-top: -12px;">${currentDate}</div>
          </div>

        <script>
            document.addEventListener('DOMContentLoaded', function() {
                const tooltipRec = document.querySelector('#rec-tooltip');
                const tooltipEnv = document.querySelector('#env-tooltip');
                const container = document.querySelector('.stack-bar-container');
                
                function checkCollision(rect1, rect2) {
                    return !(rect1.right < rect2.left || 
                            rect1.left > rect2.right || 
                            rect1.bottom < rect2.top || 
                            rect1.top > rect2.bottom);
                }

                function checkOutOfBounds(rect, containerRect) {
                    return (rect.bottom > containerRect.bottom); 
                }

                function adjustTooltips() {
                    const rectRec = tooltipRec.getBoundingClientRect();
                    const rectEnv = tooltipEnv.getBoundingClientRect();
                    const rectContainer = container.getBoundingClientRect();
                            
                    if (checkCollision(rectRec, rectEnv) || checkOutOfBounds(rectEnv, rectContainer)) {
                        tooltipRec.style.display = 'none';
                        tooltipEnv.style.display = 'none';

                        const fixedTooltipRec = document.querySelector('#fixed-rec');
                        const fixedTooltipEnv = document.querySelector('#fixed-env');
                        fixedTooltipRec.style.display = 'flex';
                        fixedTooltipEnv.style.display = 'flex';
                    }
                }

                // Run the check initially
                adjustTooltips();
            });
        </script>
    </body>
    </html>
  `)
}