import React, {useState} from "react";
import styled from "styled-components";
import {Achievements} from '@stackoverflow/stacks-icons'
import {FcGoogle} from 'react-icons/fc'
import Logo from "./Logo";


export default function Login () {





    return (
        <>

        <FcGoogle></FcGoogle>
        <div className="lg:w-full w-full bg-gray-200 h-screen flex justify-center items-center">
            <div className="items-center flex flex-col h-fit">
                <div className="flex">
                <div className="mt-24 mx-auto">
                    <div className="mb-5 flex items-center justify-center">
                        <svg aria-hidden="true" width="32" height="37" viewBox="0 0 32 37">
                            <path d="M 26 33 v -9 h 4 v 13 H 0 V 24 h 4 v 9 h 22 Z" fill="#c2c3c4"/>
                            <path d="m21.5 0-2.7 2 9.9 13.3 2.7-2L21.5 0ZM26 18.4 13.3 7.8l2.1-2.5 12.7 10.6-2.1 2.5ZM9.1 15.2l15 7 1.4-3-15-7-1.4 3Zm14 10.79.68-2.95-16.1-3.35L7 23l16.1 2.99ZM23 30H7v-3h16v3Z" fill="#F48024"></path>

                        </svg>
                    </div>
                    <button 
        type="button"
        className="w-full rounded bg-white my-1 px-16 py-2 text-center text-base hover:bg-gray-100 focus:outline-none focus:ring focus:ring-blue-300 block"
        
        >

        </button>
                </div>
                </div>
            </div>
        </div>

     

        </>
    )
}




/** icon css 
 *         <>
        
        <div className="lg:w-full w-full bg-gray-200 h-screen flex justify-center items-center">
            <div className="items-center flex flex-col h-fit">
                <div className="flex">
                <div className="mt-24 mx-auto">
                    <div className="mb-5 flex items-center justify-center">
                        <svg aria-hidden="true" width="32" height="37" viewBox="0 0 32 37">
                            <path d="M 26 33 v -9 h 4 v 13 H 0 V 24 h 4 v 9 h 22 Z" fill="#c2c3c4"/>
                            <path d="m21.5 0-2.7 2 9.9 13.3 2.7-2L21.5 0ZM26 18.4 13.3 7.8l2.1-2.5 12.7 10.6-2.1 2.5ZM9.1 15.2l15 7 1.4-3-15-7-1.4 3Zm14 10.79.68-2.95-16.1-3.35L7 23l16.1 2.99ZM23 30H7v-3h16v3Z" fill="#F48024"></path>

                        </svg>
                    </div>
                </div>
                </div>
            </div>
        </div>

        </>
 */