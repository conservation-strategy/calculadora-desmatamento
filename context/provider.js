import { createContext, useCallback, useContext, useEffect, useState } from "react";
import data from "../data/language.json";

export const PORTUGUES = "pt";
export const ENGLISH = "en";

export const Language = createContext(null);
export const Quotation = createContext(null);

const findContent = (language) => {
    const content = data.content.filter((item) => item.id === language);
    return content[0];
}

export function AppContextProvider ({children}) {
    const [language, setLanguage] = useState(PORTUGUES);
    const [content, setContent] = useState(findContent(PORTUGUES));
    const [quotation, setQuotation] = useState();

    useEffect(() => {
        async function fetchQuotation() {
          try {
            const response = await fetch('/api/dollarQuotation');
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            // console.log('data', data);
            setQuotation(data);
          } catch (e) {
            console.error('Failed to fetch dollar quotation', e.message);
          }
        }
            
        fetchQuotation();
    }, []);


    const changeContentLanguage = useCallback((language) => {
        // if(language !== PORTUGUES || language !== ENGLISH)
        //     throw new Error(`invlaid language: ${language}`);
        setContent(findContent(language));
    }, [setContent]);

    useEffect(() => {
        changeContentLanguage(language);
    }, [language])

    return (
        <Language.Provider value={{ content, language, setLanguage }}>
            <Quotation.Provider value={{ quotation }}>
                {children}
            </Quotation.Provider>
        </Language.Provider>
    )
}

export function useQuotation() {
    const context = useContext(Quotation);
    if(context.quotation) {
        const { fallback, data } = context.quotation;
        if(fallback) {
            return { 
                fallback,
                value: data.response.rates.BRL,
                date: data.response.date
            }
        } else {
            const quot = data.value[0];
            const value = (quot.cotacaoCompra + quot.cotacaoVenda) / 2;
            return {
                fallback,
                value,
                date: quot.dataHoraCotacao
            }
        }
    }
}

