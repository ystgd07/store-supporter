import React from 'react';
import Link from 'next/link';
import { IconType } from 'react-icons';
export default function MenuItem({ title, address, Icon }: { title: string; address: string; Icon: IconType }) {
    return (
        <div>
            <Link href={address} className={`mx-4 lg:mx-6 hover:text-amber-600`}>
                <Icon className="mx-4 text-2xl sm:hidden" />
                {title === '등록' ? (
                    <p className="hidden my-2 text-sm font-bold text-green-500 sm:inline hover:text-amber-500">{title}</p>
                ) : (
                    <p className="hidden my-2 text-sm sm:inline">{title}</p>
                )}
            </Link>
        </div>
    );
}
