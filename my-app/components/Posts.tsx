'use client';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import PostHeader from './PostHeader';
import React from 'react';
import Post from './Post';

export default function Posts() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), (snapshot) => {
            setPosts(snapshot.docs);
        });
        return unsubscribe;
    }, [db]);

    return (
        <div className="flex flex-col items-center justify-center">
            <PostHeader />
            <div className="max-w-6xl py-4 mx-auto my-6 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {posts.map((post: any) => (
                    <Post
                        key={post.id}
                        id={post.id}
                        caption={post.data().caption}
                        date={post.data().date}
                        expireTime={post.data().expireTime}
                        image={post.data().image}
                        timestamp={post.data().timestamp}
                    />
                ))}
            </div>
        </div>
    );
}
