import { useState, useContext, useCallback, useRef } from "react";
import { Language, PORTUGUES, ENGLISH } from "../context/provider";
import { RiArrowDropDownLine } from "react-icons/ri";

const label = {
    [ENGLISH]: "English",
    [PORTUGUES]: "Português",
}

export const LanguageSelector = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { language, setLanguage } = useContext(Language);
    const timeoutRef = useRef(null);

    const onClickOutside = useCallback(() => {
        // if(!isOpen) return
        if(timeoutRef.current) clearTimeout(timeoutRef.current);
        setTimeout(() => {
            setIsOpen(false);
        }, 100);
    },[timeoutRef.current]);

    return (
        <div className="relative text-white"
        onBlur={onClickOutside}
        >
            <button
            className="relative"
            onClick={() => setIsOpen(prev => !prev)}
            >
                {language ? label[language] : ''}
                <RiArrowDropDownLine color="white" size={28} className={`absolute top-1/2 -translate-y-1/2 right-0 translate-x-[120%] transition-transform ${isOpen ? '-rotate-180' : ''}`}/>

            </button>
            <div className={`
                px-1 py-2 text-sm flex flex-col gap-1 transition-opacity
                ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}                
            `}>
                <button 
                className="w-full py-2 opacity-70"
                onClick={() => setLanguage(PORTUGUES)}
                >
                    {label[PORTUGUES]}
                </button>
                <button
                className="w-full py-2 opacity-70"
                onClick={() => setLanguage(ENGLISH)}
                >
                    {label[ENGLISH]}
                </button>            
            </div>
        </div>
    )
}