'use client';
import React, { useRef, useState } from 'react';
import Select from 'react-select';
import { CameraIcon } from '@heroicons/react/24/outline';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../../firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useCallback } from 'preact/hooks';

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
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const dateRef = useRef(null);
    const imgRef = useRef(null);
    const prdNameRef = useRef(null);
    const selectRef = useRef(null);

    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption.vlaue);
        console.log(selectedOption.value);
    };
    async function uploadPost() {
        if (loading) return;
        setLoading(true);
        const docRef = await addDoc(collection(db, 'posts'), {
            caption: prdNameRef.current.value,
            date: dateRef.current.value,
            // expireTime: selectedOption.value,
            timestamp: serverTimestamp(),
        });
        const imageRef = ref(storage, `posts/${docRef.id}/image`);
        await uploadString(imageRef, selectedFile, 'data_url').then(async (snapshot) => {
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(doc(db, 'posts', docRef.id), {
                image: downloadURL,
            });
        });
        setLoading(false);
        setSelectedFile(null);
    }
    function addImageToPost(event) {
        const reader = new FileReader();
        if (event.target.files[0]) {
            reader.readAsDataURL(event.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result);
        };
    }
    return (
        <div className="flex flex-wrap items-center justify-center max-w-6xl p-4 mx-auto space-y-4 md:pt-8 md:flex-row md:space-x-6">
            {/* TODO: div 태그 추후 컴포넌트화 필요 */}
            <div className="flex items-center justify-between w-full max-w-2xl px-5 mx-auto my-8 align-baseline bg-white border rounded-md">
                <div className="flex flex-col flex-1">
                    {selectedFile ? (
                        <img
                            onClick={() => setSelectedFile(null)}
                            src={selectedFile}
                            alt=""
                            className="w-full max-h-[250px] object-cover cursor-pointer"
                        />
                    ) : (
                        <CameraIcon
                            className="p-2 mt-2 text-red-500 transition-transform duration-200 ease-out bg-red-200 border-2 rounded-full cursor-pointer h-14 hover:scale-105"
                            onClick={() => imgRef.current.click()}
                        />
                    )}
                    <input type="file" hidden ref={imgRef} onChange={addImageToPost} />
                    <input
                        className="m-3 mt-2 text-center border-gray-500 rounded-md cursor-pointer focus:ring-black focus:border-black bg-slate-100"
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
            </div>
            <div className="border rounded-md w-[50%]">
                <button
                    type="submit"
                    className="w-full p-2 text-white bg-red-600 shadow-md hover:brightness-125 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100"
                    onClick={uploadPost}
                    disabled={!selectedFile || loading || !prdNameRef}
                >
                    등록하기
                </button>
            </div>
        </div>
    );
}
