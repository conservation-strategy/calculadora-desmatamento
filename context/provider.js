import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import data from "../data/language.json";

export const PORTUGUES = "pt";
export const ENGLISH = "en";

export const Language = createContext(null);
export const Quotation = createContext(null);

export const currencies = {
    real: 'R$',
    dollar: 'U$'
}

const findContent = (language) => {
    const content = data.content.filter((item) => item.id === language);
    return content[0];
}

export function AppContextProvider ({children}) {
    const [language, setLanguage] = useState(PORTUGUES);
    const [content, setContent] = useState(findContent(PORTUGUES));
    const [quotation, setQuotation] = useState();
    const [currency, setCurrency] = useState();
    const [exchangeRate, setExchangeRate] = useState();
    const blocker = useRef(false);

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
    }, [language]);

    const setLanguageBlocker = useCallback(() => {
        blocker.current = true;
    }, [blocker])

    useEffect(() => {
        if(!blocker.current) {
            setCurrency(
                language === ENGLISH
                 ? currencies.dollar
                 : currencies.real
            );
        }
    }, [language]);

    useEffect(() => {
        if(!quotation) return
        setExchangeRate(
            currency === currencies.dollar
             ? quotation.value
             : 1
        );
    }, [currency, quotation]);


    return (
        <Language.Provider value={{ content, language, setLanguage }}>
            <Quotation.Provider value={{ quotation, currency, setCurrency, exchangeRate, setLanguageBlocker }}>
                {children}
            </Quotation.Provider>
        </Language.Provider>
    )
}

export function useQuotation() {
    const context = useContext(Quotation);
    return context.quotation;
}


export function useCurrency() {
    const context = useContext(Quotation);
    const { currency, setCurrency, exchangeRate, setLanguageBlocker } = context;
    return { 
        currency, 
        setCurrency,
        exchangeRate,
        setLanguageBlocker
    }
}
