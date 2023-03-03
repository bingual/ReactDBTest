import React, { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import moment from 'moment';
import { Alert } from 'antd';
import { Link } from 'react-router-dom';

export default function PostList() {
    const [postList, setPostList] = useState([]);

    const [{ data: originPostList, loding, error }, refetch] = useAxios({
        url: 'http://localhost:8080/posts',
        withCredentials: true,
    });

    useEffect(() => {
        setPostList(originPostList);
    }, [originPostList]);

    console.log(originPostList);

    return (
        <div>
            <table
                className="table table-striped table-hover"
                style={{ textAlign: 'center' }}
            >
                <thead className="bg-warning">
                    <tr>
                        <th>번호</th>
                        <th>작성자</th>
                        <th>제목</th>
                        <th>생성일</th>
                    </tr>
                </thead>
                <tbody>
                    {postList && postList.length === 0 && (
                        <tr>
                            <td colSpan={4}>
                                <Alert
                                    type="warning"
                                    className="mt-3"
                                    message="게시글이 없습니다."
                                />
                            </td>
                        </tr>
                    )}
                    {postList &&
                        postList.map((post, id) => {
                            return (
                                <tr key={id}>
                                    <td>{post.id}</td>
                                    <td>{post.author.username}</td>
                                    <td>
                                        <Link to={`/posts/${post.id}`}>
                                            {post.title}
                                        </Link>
                                    </td>
                                    <td>
                                        {/* 날짜/시간을 포멧팅 해주는 라이브러리 */}
                                        {moment(post.created_at).format(
                                            'YYYY-MM-DD HH:mm:ss',
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}
