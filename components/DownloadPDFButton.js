import { useEffect, useState } from 'react';
import { RiFile3Line } from "react-icons/ri";
import styles from '../styles/DownloadPDFButton.module.css';

import { event as gaEvent } from "nextjs-google-analytics";

function serializeSVG(svg) {
  const serializer = new XMLSerializer();
  let svgString = serializer.serializeToString(svg);
  
  // Fix namespace issues
  if (!svgString.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
    svgString = svgString.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  if (!svgString.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
    svgString = svgString.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
  }

  return svgString;
}

const DownloadPDFButton = ({ data, language }) => {
  const [isLoading, setIsLoading] = useState(false);

  console.log('[DownloadPDFButton] data', data);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const chartElt = document.getElementById('doghnut-chart');
      let chartHtml = '';
      console.log('[DownloadPDFButton] chartElt', chartElt);
      if (chartElt) {
        chartHtml = chartElt.outerHTML;
      }
      const response = await fetch('/api/generatePDF', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...data, language, chartHtml}),
      });

      if (response.ok) {
        // Create a blob from the PDF Stream
        const blob = await response.blob();
        // Create a link element, click it, and remove it
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'resultado.pdf';
        link.click();
        link.remove();

        gaEvent("download_pdf", {
          pdf_name: "Report",
        });
        
        // const blob = await response.blob();
        // const url = window.URL.createObjectURL(blob);
        // window.open(url);
      } else {
        throw new Error('Failed to generate PDF');
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to download PDF');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleDownload} 
      disabled={isLoading}
      className={` ${styles.button} | w-full flex justify-center items-center gap-2 whitespace-nowrap rounded bg-csf-main hover:bg-csf-dark rounded-xl font-medium text-white tracking-wide p-4 disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <RiFile3Line size={`1.5rem`} />
      {isLoading ? (language === 'pt' ? 'GERANDO O PDF...' : 'GENERATING PDF...') : 'DOWNLOAD PDF'}
    </button>
  );
};

export default DownloadPDFButton;