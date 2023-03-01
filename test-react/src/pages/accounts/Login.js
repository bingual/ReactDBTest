import React from 'react';
import Axios from 'axios';
import { Form, Input, Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from 'store';
import { setSession } from 'store';
import { deleteSession } from 'store';

export default function Login() {
    const { dispatch } = useAppContext();
    const nav = useNavigate();

    const handleFinish = (values) => {
        async function fn() {
            const { username, password } = values;
            const params = {
                username,
                password,
            };

            try {
                const response = await Axios.post(
                    'http://localhost:8080/accounts/login',
                    params,
                    { withCredentials: true },
                );
                const { data } = response;
                dispatch(setSession(data));
            } catch (error) {
                console.error(error);
            }
        }
        fn();
    };
    return (
        <div>
            <Form onFinish={handleFinish}>
                <Card title={'로그인'}>
                    <Form.Item
                        label="아이디"
                        name={'username'}
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="패스워드"
                        name={'password'}
                        rules={[{ required: true }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            로그인
                        </Button>
                    </Form.Item>
                </Card>
            </Form>
        </div>
    );
}
