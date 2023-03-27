'use client';
import React, { useRef, useState } from 'react';
import Select from 'react-select';
import { CameraIcon } from '@heroicons/react/24/outline';
const TimeData = [
    {
        value: '23:30',
        label: '23:30',
    },
    {
        value: '01:30',
        label: '01:30',
    },
    {
        value: '07:30',
        label: '07:30',
    },
    {
        value: '13:30',
        label: '13:30',
    },
    {
        value: '17:30',
        label: '17:30',
    },
];
export default function Enroll() {
    const [date, setDate] = useState(null);
    const [timeDate, setTimeDate] = useState(null);
    const [selectedOption, setSelectedOption] = useState(TimeData[0]);
    const dateRef = useRef(null);
    const imgRef = useRef(null);
    const prdNameRef = useRef(null);
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!dateRef.current.value) return;
        console.log(dateRef.current.value);
        console.log(selectedOption.value);
    };
    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        console.log(selectedOption.value);
    };

    return (
        <div className="flex flex-wrap items-center justify-center max-w-6xl p-4 mx-auto space-y-4 md:pt-8 md:flex-row md:space-x-6">
            {/* TODO: form 태그 추후 컴포넌트화 필요 */}
            <form
                className="flex items-center justify-between w-full max-w-2xl px-5 mx-auto my-8 align-baseline bg-white border rounded-md"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col flex-1">
                    <CameraIcon
                        className="p-2 mt-2 text-red-500 transition-transform duration-200 ease-out bg-red-200 border-2 rounded-full cursor-pointer h-14 hover:scale-105"
                        onClick={() => imgRef.current.click()}
                    />
                    <input type="file" hidden ref={imgRef} />
                    <input
                        className="mt-2 text-center border-gray-500 rounded-md cursor-pointer focus:ring-black focus:border-black bg-slate-100"
                        type="text"
                        ref={prdNameRef}
                        placeholder="상품이름"
                    />
                </div>
                <div className="flex flex-col justify-between flex-1 h-full ml-5">
                    <input onChange={(e) => setDate(e.target.value)} placeholder="enroll Date" type="date" ref={dateRef}></input>

                    <Select
                        width="120"
                        height="40"
                        options={TimeData}
                        placeholder="00:00"
                        value={selectedOption}
                        onChange={handleSelectChange}
                    />
                </div>
            </form>
            <div className="border rounded-md w-[50%]">
                <button type="submit" className="w-full text-amber-500 disabled:text-gray-200 hover:bg-slate-200">
                    등록하기
                </button>
            </div>
        </div>
    );
}
