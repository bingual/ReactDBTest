import React from 'react';
import Axios from 'axios';
import { Form, Input, Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Login() {
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
                console.log(response);
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
