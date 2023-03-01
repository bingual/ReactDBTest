import React, { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import { useAppContext } from 'store';

export default function PostList() {
    const { store } = useAppContext();
    console.log(store);

    const [postList, setPostList] = useState([]);

    const [{ data: originPostList, loding, error }, refetch] = useAxios({
        url: 'http://localhost:8080/posts',
        withCredentials: true,
    });

    useEffect(() => {
        setPostList(originPostList);
    }, [originPostList]);

    if (postList) console.log(postList);

    return (
        <div>
            {postList &&
                postList.length > 0 &&
                postList.map((post, id) => {
                    return (
                        <span key={id}>
                            {post.title}
                            <br />
                        </span>
                    );
                })}
        </div>
    );
}
