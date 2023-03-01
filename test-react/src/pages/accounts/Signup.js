import React from 'react';
import Axios from 'axios';
import { Button, Card, Form, Input } from 'antd';

export default function Signup() {
    const handleFinish = (values) => {
        async function fn() {
            const { username, password } = values;
            const params = {
                username,
                password,
            };

            try {
                const response = await Axios.post(
                    'http://localhost:8080/accounts/signup',
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
                <Card title={'회원가입'}>
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
                            회원가입
                        </Button>
                    </Form.Item>
                </Card>
            </Form>
        </div>
    );
}
