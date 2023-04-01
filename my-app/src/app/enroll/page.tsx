'use client';
import React, { useRef, useState } from 'react';
import Select from 'react-select';
import { CameraIcon } from '@heroicons/react/24/outline';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../../firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import Image from 'next/image';
interface TimeDataItem {
    value: string;
    label: string;
}

const TimeData: TimeDataItem[] = [
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
    const [date, setDate] = useState<string | null>(null);
    const [selectedOption, setSelectedOption] = useState<string | null>(TimeData[0].value);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [caption, setCaption] = useState<string | null>(null);
    const dateRef = useRef<HTMLInputElement>(null);
    const imgRef = useRef<HTMLInputElement>(null);
    const prdNameRef = useRef<HTMLInputElement>(null);

    async function uploadPost() {
        if (loading) return;
        setLoading(true);
        const docRef = await addDoc(collection(db, 'posts'), {
            caption: caption,
            date: date,
            expireTime: selectedOption,
            timestamp: serverTimestamp(),
        });

        const imageRef = ref(storage, `posts/${docRef.id}/image`);
        if (selectedFile) {
            await uploadString(imageRef, selectedFile, 'data_url').then(async (snapshot) => {
                const downloadURL = await getDownloadURL(imageRef);
                await updateDoc(doc(db, 'posts', docRef.id), {
                    image: downloadURL,
                });
            });
        }

        setCaption(null);
        setDate(null);
        setLoading(false);
        setSelectedFile(null);
    }

    function addImageToPost(event: React.ChangeEvent<HTMLInputElement>) {
        const reader = new FileReader();
        if (event.target.files && event.target.files[0]) {
            reader.readAsDataURL(event.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            if (readerEvent.target && typeof readerEvent.target.result === 'string') {
                setSelectedFile(readerEvent.target.result);
            }
        };
    }

    return (
        <div className="flex flex-wrap items-center justify-center max-w-6xl p-4 mx-auto space-y-4 md:pt-8 md:flex-row md:space-x-6">
            {/* TODO: div 태그 추후 컴포넌트화 필요 */}
            <div className="flex flex-col items-center justify-between w-full max-w-2xl px-5 mx-auto my-8 align-baseline bg-white border rounded-md lg:flex-row xl:flex-row md:flex-row 2xl:flex-row">
                <div className="flex flex-col flex-1">
                    {selectedFile ? (
                        <Image
                            onClick={() => setSelectedFile(null)}
                            src={selectedFile}
                            alt=""
                            width={300}
                            height={250}
                            className="w-full max-h-[250px] object-cover cursor-pointer"
                        />
                    ) : (
                        <CameraIcon
                            className="p-2 mt-2 text-red-500 transition-transform duration-200 ease-out bg-red-200 border-2 rounded-full cursor-pointer h-14 hover:scale-105"
                            onClick={() => imgRef.current?.click()}
                        />
                    )}
                    <input type="file" hidden ref={imgRef} onChange={addImageToPost} />
                    <input
                        className="m-3 mt-2 text-center border-gray-500 rounded-md cursor-pointer focus:ring-black focus:border-black bg-slate-100"
                        type="text"
                        onChange={(e) => setCaption(e.target.value)}
                        value={caption || ''}
                        placeholder="상품이름"
                    />
                </div>
                {/* //TODO: 모바일 접속 시 화면 깨짐 -> 아래의 div영역의 최대 사이즈를 조절해야함  */}
                <div className="flex flex-col justify-between flex-1 h-full ml-5">
                    <input
                        placeholder="enroll Date"
                        type="date"
                        value={date ?? ''}
                        onChange={(e) => setDate(e.target.value as string | null)}
                    ></input>

                    <Select options={TimeData} defaultValue={TimeData[0]} onChange={(e) => setSelectedOption(e?.value ?? null)} />
                </div>
            </div>
            <div className="border rounded-md w-[50%]">
                <button
                    type="submit"
                    className="w-full p-2 text-white bg-red-600 shadow-md hover:brightness-125 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100"
                    onClick={uploadPost}
                    disabled={!selectedFile || loading || !caption || !date}
                >
                    등록하기
                </button>
            </div>
        </div>
    );
}
