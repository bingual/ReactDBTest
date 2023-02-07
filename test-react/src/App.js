import axios from 'axios';
import useAxios from 'axios-hooks';
import React, { useEffect, useState } from 'react';

export default function App() {
    const [userList, setUserList] = useState([]);

    const [{ data: userdata, loading, error }, refetch] = useAxios({
        url: 'http://localhost:8080/products',
    });

    useEffect(() => {
        if (userdata) {
            setUserList(userdata.products);
        }
    }, [userdata]);

    return (
        <div>
            {userList &&
                userList.map((user, id) => (
                    <div key={id}>{JSON.stringify(user)}</div>
                ))}
        </div>
    );
}
