import React from 'react';
import MenuItem from './MenuItem';
import { AiFillHome } from 'react-icons/ai';
import { BsFillInfoSquareFill } from 'react-icons/bs';
import { MdAppRegistration } from 'react-icons/md';
import Link from 'next/link';
import DarkModeSwitch from './DarkModeSwitch';
interface HeaderProps {}
export default function Header(props: HeaderProps) {
    return (
        <div className="flex items-center justify-between max-w-6xl py-6 mx-2 shadow-md sm:mx-auto ">
            <div className="flex">
                <MenuItem title="HOME" address="/" Icon={AiFillHome}></MenuItem>
                <MenuItem title="소개" address="/about" Icon={BsFillInfoSquareFill}></MenuItem>
                <MenuItem title="등록" address="/enroll" Icon={MdAppRegistration}></MenuItem>
            </div>
            <div className="flex items-center mt-6 mb-3 space-x-5">
                <DarkModeSwitch></DarkModeSwitch>
                <Link href="/">
                    <h2 className="text-2xl">
                        <span className="px-2 py-1 mr-1 font-bold bg-green-500 rounded-lg ">편유기24</span>
                        <span className="hidden mr-5 text-xl sm:inline">App</span>
                    </h2>
                </Link>
            </div>
        </div>
    );
}
