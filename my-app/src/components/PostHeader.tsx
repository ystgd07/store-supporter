'use client';
import React from 'react';
import { useState } from 'react';
import { ArrowSmallLeftIcon, ArrowSmallRightIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { changeDTM } from 'store/slices/postSlice';
export default function PostHeader() {
    const dispatch = useDispatch();

    const month = useSelector((state: any) => {
        return state.post.month;
    });
    const handleMonthChangeP = () => {
        dispatch(changeDTM(month + 1));
    };
    const handleMonthChangeM = () => {
        dispatch(changeDTM(month - 1));
    };
    return (
        <div className="flex items-center justify-center mt-3 rounded-sm">
            <ArrowSmallLeftIcon
                className="w-12 mr-3 cursor-pointer h-9"
                onClick={() => {
                    if (month - 1 > 0) handleMonthChangeM();
                }}
            />
            <p className="font-extrabold">{month}월</p>
            <ArrowSmallRightIcon className="w-12 m-3 cursor-pointer h-9" onClick={() => handleMonthChangeP()} />
        </div>
    );
}
