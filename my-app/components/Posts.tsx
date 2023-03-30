'use client';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, orderBy, query, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import PostHeader from './PostHeader';
import React from 'react';
import Post from './Post';
import { useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';
import dayjs from 'dayjs';

interface PostData {
    caption: string;
    date: string;
    expireTime: string;
    image: string;
    timestamp: number;
}

export default function Posts() {
    const month = useSelector((state: RootState) => {
        return String(state.post.month);
    });

    const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, 'posts'), orderBy('date', 'asc')), (snapshot) => {
            setPosts(snapshot.docs);
        });
        return unsubscribe;
    }, [db]);

    return (
        <div className="flex flex-col items-center justify-center">
            <PostHeader />
            <div className="max-w-6xl py-4 mx-auto my-6 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {posts.map((post: QueryDocumentSnapshot<DocumentData>) => {
                    const postData = post.data() as PostData;
                    if (dayjs(post.data().date).format('MM') == month)
                        return (
                            <Post
                                key={post.id}
                                id={post.id}
                                caption={postData.caption}
                                date={postData.date}
                                expireTime={postData.expireTime}
                                image={postData.image}
                                timestamp={postData.timestamp.toString()}
                            />
                        );
                })}
            </div>
        </div>
    );
}
