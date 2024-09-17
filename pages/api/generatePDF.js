const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { toImage } = require('html-to-image');
const DoughnutChartStatic = require('../../components/DoughnutChartStatic');

import chromium from '@sparticuz/chromium';
import { formatCurrencyNoDecimals } from '../../utils';
import fs from 'fs';
import path from 'path';
import { generateHTML_PT } from '../../utils/generateHTML-PT';
import { ENGLISH } from '../../context/provider';
import { generateHTML_EN } from '../../utils/generateHTML-EN';

export default async function handler(req, res) {
  // // Render the React component to HTML
  // const chartComponent = ReactDOMServer.renderToString(React.createElement(DoughnutChartStatic));

  // // Wrap the component HTML in a full HTML document
  // const fullHtmlChartComponent = `
  //   <!DOCTYPE html>
  //   <html>
  //     <head>
  //       <style>
  //         body { margin: 0; padding: 0; }
  //       </style>
  //     </head>
  //     <body>
  //       <div id="chart">${chartComponent}</div>
  //     </body>
  //   </html>
  // `;

  // // Generate the image from the HTML
  // const image = await toImage(fullHtmlChartComponent, { width: 400, height: 400 });

  // // Save the image to a file
  // fs.writeFileSync('chart.png', image);

  // console.log(`Chart image saved to: ${outputPath}`);

  if (req.method === 'POST') {
    try {
      const { 
        inputData, 
        custos, 
        chartHtml, 
        currentBarHeights,
        // isBrasil,
        currentURL,
        currency,
        quotation,
        language
      } = req.body;

      // console.log('[PDFGenerator] chartHtml', chartHtml);
      // console.log('[PDFGenerator] custos', custos);

      // const fullHtmlChartComponent = `
      //   <!DOCTYPE html>
      //   <html>
      //     <head>
      //       <style>
      //         body { margin: 0; padding: 0; }
      //         #doghnut-chart {
      //           font-family: 'Roboto', sans-serif;
      //           display: flex;
      //           justify-content: center;
      //           align-items: center;
      //         }
      //       </style>
      //     </head>
      //     <body>
      //       <div id="chart">${chartHtml}</div>
      //     </body>
      //   </html>
      // `;

      // Generate the image from the HTML
      // const image = await toImage(fullHtmlChartComponent, { width: 400, height: 400 });

      // // Save the image to a file
      // fs.writeFileSync('chart.png', image);

      // // Launch a new browser instance
      // const browser = await puppeteer.launch({
      //   args: chromium.args,
      //   defaultViewport: chromium.defaultViewport,
      //   executablePath: await chromium.executablePath(),
      //   headless: chromium.headless,
      //   ignoreHTTPSErrors: true,
      // });
      let browser;
      let puppeteer;

      if (process.env.NODE_ENV === 'production') {
        // Use puppeteer-core and @sparticuz/chromium in production
        puppeteer = require('puppeteer-core');
        browser = await puppeteer.launch({
          args: chromium.args,
          defaultViewport: chromium.defaultViewport,
          executablePath: await chromium.executablePath(),
          headless: chromium.headless,
          ignoreHTTPSErrors: true,
        });
      } else {
        // Use regular puppeteer in development
        puppeteer = require('puppeteer');
        browser = await puppeteer.launch();
      }

      // Create a new page
      const page = await browser.newPage();

      // const logoPath = path.join(process.cwd(), 'public', 'images', 'logo.svg');
      // const logoPath = path.join(process.cwd(), 'public', 'images', 'logo-desmatamento.svg');
      // const logoBase64 = fs.readFileSync(logoPath, { encoding: 'base64' });
      const logoUrl = process.env.PUBLIC_URL + '/images/logo-desmatamento-color.png';
      const logoCSFUrl = process.env.PUBLIC_URL + '/images/logo.svg';


      // const htmlContent = fs.readFileSync(path.join(process.cwd(), 'public', 'teste.html'), 'utf8');
      const htmlContent = language === ENGLISH 
      ? generateHTML_EN({
        inputData, 
        custos, 
        chartHtml, 
        currentBarHeights, 
        logoUrl,
        logoCSFUrl,
        currentURL,
        currency,
        quotation
      })
      : generateHTML_PT({
        inputData, 
        custos, 
        chartHtml, 
        currentBarHeights, 
        logoUrl,
        logoCSFUrl,
        currentURL,
        currency,
        quotation
      });

      // console.log('[PDFGenerator] htmlContent', htmlContent);
      // Set the content of the page
      // await page.setContent(htmlContent, {
      //   waitUntil: 'networkidle0'
      // });
      await page.setContent(htmlContent, {
        waitUntil: 'networkidle0'
      });

      // Generate PDF
      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' }
      });

      // Close the browser
      await browser.close();

      // Send the PDF as a response
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');
      res.send(pdf);

    } catch (error) {
      console.error('PDF generation failed:', error);
      res.status(500).json({ error: 'PDF generation failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}