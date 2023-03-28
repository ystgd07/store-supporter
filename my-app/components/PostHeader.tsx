'use client';
import React from 'react';
import { useState } from 'react';
import { ArrowSmallLeftIcon, ArrowSmallRightIcon } from '@heroicons/react/24/solid';
export default function PostHeader() {
    const [month, setMonth] = useState(1);
    return (
        <div className="flex items-center justify-center">
            <ArrowSmallLeftIcon
                className="w-12 mr-3 cursor-pointer h-9"
                onClick={() => {
                    if (month > 1) setMonth(month - 1);
                }}
            />
            <p className="font-extrabold">{month}월</p>
            <ArrowSmallRightIcon className="w-12 m-3 cursor-pointer h-9" onClick={() => setMonth(month + 1)} />
        </div>
    );
}
