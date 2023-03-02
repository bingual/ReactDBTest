import React from 'react';
import Axios from 'axios';
import { Button, Card, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const navigate = useNavigate();
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
                alert('회원가입 성공. 로그인 페이지로 이동합니다.');
                navigate('/accounts/login');
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
