"use client";

import React from 'react'
import Button from "@mui/material/Button"
import { useContext } from 'react';
import { Language } from '../context/provider';

function Header2({ title, image , bgPosition}) {
    // const { content } = useContext(Language);
    // const { common } = content;

    return (
        <div
            className={`flex items-center pt-24 pb-16 bg-cover bg-${bgPosition} max-[500px]:px-8 px-14 bg-black relative mt-20`}
            style={{ backgroundImage: `url(${image})` }}
        >
            <div className='w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.6)]'></div>
            <div className='font-bold text-2xl min-[375px]:text-[1.75rem] md:text-3xl text-white z-10 relative pt-10'>
                {title}
            </div>
            {/* <div className="flex mx-auto items-center border-b-0 border-black">
                <div className="flex mx-auto items-center border-b-8 border-black">
                    <div className="flex flex-col lg:flex-row w-full items-center justify-between text-white pt-16 lg:pt-16 pb-10 px-4 lg:px-10 lg:pb-10 gap-10 lg:gap-0">
                        <div className="text-lg font-light text-left mb-0 pt-0 lg:w-1/2">                            
                            {title}
                        </div>
                        <div className="hidden mx-auto gap-8">
                            <Button
                                className="bg-green-400 hover:bg-green-100 py-4 px-8 text-green-900 font-bold"
                                variant="contained"
                                color="primary"
                                size="large"
                                href="/"
                                target="_blank"
                            >
                                CALCULATOR
                            </Button>
                            <Button
                                className="bg-green-400 hover:bg-green-100 py-4 px-8 text-green-900 font-bold"
                                variant="contained"
                                color="primary"
                                size="large"
                                href="/"
                                target="_blank"
                            >
                                GUIA DE USO
                            </Button>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default Header2
