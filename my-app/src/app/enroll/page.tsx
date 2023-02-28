'use client';
import React, { useState } from 'react';

export default function Enroll() {
    const [date, setDate] = useState('');
    console.log(typeof date);
    return (
        <div className="flex flex-col items-center content-center max-w-6xl p-4 mx-auto md:pt-8 md:flex-row md:space-x-6">
            <form className="flex flex-col items-center justify-between max-w-6xl px-5 mx-auto">
                <input value={date} onChange={(e) => setDate(e.target.value)} placeholder="enroll Date" type="date"></input>
                <button type="submit" className="text-amber-500 disabled:text-gray-400">
                    등록하기
                </button>
            </form>
        </div>
    );
}
