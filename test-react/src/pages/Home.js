import PostList from 'components/postList';
import React from 'react';
import { deleteSession, useAppContext } from 'store';

export default function Home() {
    const { dispatch } = useAppContext();
    return (
        <div>
            잘됨
            <br />
            <button onClick={() => dispatch(deleteSession())}>로그아웃</button>
        </div>
    );
}
