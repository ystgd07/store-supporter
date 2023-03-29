import React from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useSelector } from 'react-redux';
export default function Post({ caption, image, expireTime, timestamp, date }) {
    let flag = false;
    dayjs.extend(utc);
    dayjs.extend(timezone);
    const month = useSelector((state: any) => {
        return state.post.month;
    });
    const day = dayjs().format('DD');
    const expire = dayjs.tz(`${date} ${expireTime}`, 'YYYY-MM-DD HH:mm', 'Asia/Seoul');
    const now = dayjs().tz();
    // if (Number(day) > Number(dayjs(date).format('DD'))) flag = true;
    // console.log(`${Number(day)}` + ':' + `${Number(dayjs(date).format('DD'))}` + ':' + `${flag}`);
    if (now.isAfter(expire)) flag = true;
    return (
        <div className="mt-3 mr-5 transition-shadow duration-200 rounded-lg cursor-pointer min-h-min sm:p-3 min-w-min sm:hover:shadow-slate-400 sm:shadow-md sm:border-slate-400">
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
                {flag && month === Number(dayjs().format('MM')) ? <p className="font-bold text-red-500">유통기한 지남</p> : ''}
            </div>
        </div>
    );
}
