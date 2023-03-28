import React from 'react';
import Image from 'next/image';

export default function Post({ caption, image, expireTime, timestamp, date }) {
    return (
        <div className="mt-3 mr-5 transition-shadow duration-200 rounded-lg cursor-pointer min-h-min sm:p-3 sm:hover:shadow-slate-400 sm:shadow-md sm:border-slate-400">
            <Image
                width={500}
                height={200}
                className="transition-opacity duration-200 sm:rounded-t-lg group-hover:opacity-80"
                src={image}
                style={{
                    maxWidth: '100%',
                    height: '50%',
                }}
                placeholder="blur"
                blurDataURL="/spinner.svg"
                alt="image not found"
            ></Image>
            <div className="p-2">
                <h2 className="text-lg font-bold truncate">{caption}</h2>
                <p className="flex item-center">{date}</p>
                <p className="line-clamp-2 text-md">{expireTime}</p>
            </div>
        </div>
    );
}
